import type {
	ESPNSeason,
	ESPNSeasonCollection,
	ESPNSeasonWeek,
	ESPNSeasonYear,
	ESPNWeekEvent,
	RefOnlyESPN
} from '$classes/game';
import { ErrorAndToast, myError, myLog } from '$lib/scripts/utilities/logging';
import { current_season, current_season_type_number, current_season_year } from '$scripts/store';
import { doc, getDocs, query, setDoc, Timestamp, where } from '@firebase/firestore';
import { get } from 'svelte/store';
import { SeasonBoundDoc } from './classes/seasonBound';
import { seasonBoundsCollection, weekBoundsCollection } from './firebase/collections';
import { seasonBoundConverter, weekBoundConverter } from './firebase/converters';

export const findCurrentWeekOfSchedule = async (showToast?: boolean): Promise<number> => {
	try {
		const now = Timestamp.fromDate(new Date());
		const year = parseInt((await findCurrentSeason()).doc_id);
		const q = query(
			weekBoundsCollection,
			where('year', '==', year),
			where('lastGameTime', '>=', now)
		);
		const week_bounds_docs = await getDocs(q.withConverter(weekBoundConverter));

		if (week_bounds_docs.size === 1) {
			const data = week_bounds_docs.docs[0].data();
			myLog({ msg: 'found week bounds document: ', additional_params: [data, year] });
			return data.week;
		} else {
			myLog({ msg: 'no bounds document found! Attempting to use ESPN API to find week...' });
			const espn_week = await getWeekFromESPN();
			if (espn_week) {
				myLog({ msg: `ESPN API returned week ${espn_week}.` });
				return espn_week;
			} else throw new Error('Could not find current week of schedule via ESPN API either.');
		}
	} catch (error) {
		const msg = 'Ran into an error finding the current week.';
		showToast ? ErrorAndToast({ error, msg }) : myError({ error, msg });
	}
};
const getWeekFromESPN = async () => {
	try {
		let espn_season_data: ESPNSeason;
		if (get(current_season_year) && get(current_season_type_number)) {
			espn_season_data = await fetchESPNSeasonData(
				get(current_season_year),
				get(current_season_type_number)
			);
		} else {
		}

		const week_refs = await fetchWeekRefsOfSeason(espn_season_data);
		return findWhichWeekIncludesToday(week_refs);
	} catch (error) {
		myError({ error });
	}
};

const fetchESPNSeasonData = async (year: number, season_type_number: number) => {
	console.log('fetching espn season data...', year, season_type_number);
	const espn_season_response = await fetch(
		`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/types/${season_type_number}`
	);
	const espn_season_data = (await espn_season_response.json()) as ESPNSeason;
	console.log('espn season data: ', espn_season_data);
	return espn_season_data;
};

const fetchWeekRefsOfSeason = async (season_data: ESPNSeason) => {
	const { weeks } = season_data;
	const weeks_response = await fetch(weeks.$ref);
	const { items } = await weeks_response.json();
	const week_refs: string[] = items.map((item: RefOnlyESPN) => item.$ref);
	return week_refs;
};
const findWhichWeekIncludesToday = async (week_refs: string[]) => {
	const today = Date.parse(new Date().toDateString());
	console.log('schedule.ts -> week_refs', week_refs);
	for await (const week_ref of week_refs) {
		const week_response = await fetch(week_ref);
		const week_data = (await week_response.json()) as ESPNSeasonWeek;

		// Since we call this function because the DB didn't have the data, we should write to the DB now to solve that issue.
		const { startDate, endDate, number } = week_data;
		const year = get(current_season_year);
		const start_timestamp = Timestamp.fromDate(new Date(startDate));
		const end_timestamp = Timestamp.fromDate(new Date(endDate));
		const new_doc = doc(weekBoundsCollection, `${year}_${number}`);
		await setDoc(new_doc.withConverter(weekBoundConverter), {
			firstGameTime: start_timestamp,
			lastGameTime: end_timestamp,
			week: number,
			year
		});

		const isDuringWeek = await occursInWeek(today, week_data);
		if (isDuringWeek) {
			myLog({ msg: `Today is during week ${number}!` });
			return week_data.number;
		}
	}
	return 1;
};
const occursInWeek = async (today: number, week_data: ESPNSeasonWeek) => {
	return today > Date.parse(week_data.startDate) && today < Date.parse(week_data.endDate);
};
export const findCurrentSeason = async (specificDate?: Date): Promise<SeasonBoundDoc> => {
	try {
		console.log('finding current season...');
		// NOTE: This can be manually set to force a specific season/date to search for.
		const now = Timestamp.fromDate(specificDate ? specificDate : new Date());
		const q = query(
			seasonBoundsCollection,
			where('end_date', '>=', now)
			// where('endDate', '>=', now)  NOTE: can't use two equality operators on *different* fields in Firestore!
			// https://firebase.google.com/docs/firestore/query-data/queries#query_limitations
		);
		const season_bounds_docs = await getDocs(q.withConverter(seasonBoundConverter));
		const start_date_filtered_docs = season_bounds_docs.docs.filter((doc) => {
			const { start_date } = doc.data();
			return start_date.toMillis() <= now.toMillis();
		});

		if (start_date_filtered_docs.length === 1) {
			const current_season_doc = start_date_filtered_docs[0];
			const data = current_season_doc.data();
			myLog({ msg: 'found season bounds document: ', additional_params: data });
			return data;
		} else if (start_date_filtered_docs.length > 1) {
			throw new Error('Found more than one season bounds document!');
		} else {
			myLog({ msg: 'no bounds document found! Attempting to use ESPN API to find week...' });
			const espn_season_year_data = await getCurrentSeasonFromESPN(specificDate);

			if (espn_season_year_data) {
				myLog({
					msg: `ESPN API returned year ${espn_season_year_data.year}.`,
					additional_params: espn_season_year_data
				});

				// Set the document so you don't have to repeat this polling of the ESPN API
				const new_doc_ref = doc(
					seasonBoundsCollection,
					`${espn_season_year_data.year}_${espn_season_year_data.name
						.toLocaleLowerCase()
						.replace(' ', '')}`
				);
				const data = new SeasonBoundDoc({
					end_date: Timestamp.fromDate(new Date(espn_season_year_data.endDate)),
					start_date: Timestamp.fromDate(new Date(espn_season_year_data.startDate)),
					type_name: espn_season_year_data.name,
					type_number: espn_season_year_data.type,
					year: espn_season_year_data.year,
					number_of_weeks: espn_season_year_data.number_of_weeks,
					doc_ref: new_doc_ref,
					doc_id: new_doc_ref.id
				});
				await setDoc(new_doc_ref.withConverter(seasonBoundConverter), data);

				// Set the year in the store
				current_season?.set(data);

				return data;
			} else throw new Error('Could not find current week of schedule via ESPN API either.');
		}
	} catch (error) {
		ErrorAndToast({ msg: `Error finding the current season.`, error });
	}
};

export const getCurrentSeasonFromESPN = async (specificDate?: Date) => {
	const response = await fetch(
		'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/'
	);
	const data = (await response.json()) as ESPNSeasonCollection;

	// Items are an array of the url refs to every season ESPN's API has available.
	const { items } = data;

	// The first item in the array is the most recent season, so this will return on the very first iteration.
	for await (const item of items) {
		const latest_season_response = await fetch(item.$ref);
		const latest_season_data = (await latest_season_response.json()) as ESPNSeasonYear;
		const current_season = await identifyCurrentSeasonType(latest_season_data, specificDate);
		if (current_season) {
			const number_of_weeks_response = await fetch(current_season.weeks.$ref);
			const number_of_weeks_data = (await number_of_weeks_response.json()) as ESPNWeekEvent;
			const number_of_weeks = number_of_weeks_data.count;
			return { ...current_season, number_of_weeks };
		}
	}
	return null;
};
export const identifyCurrentSeasonType = async (
	latest_season_data: ESPNSeasonYear,
	specificDate?: Date
) => {
	const { types } = latest_season_data;
	const { items } = types;
	// NOTE: This can be manually set to force a specific season period to be queried
	const now_numeric = specificDate ? specificDate : new Date();
	const currentSeasonType = items.find((item) => {
		const { startDate, endDate } = item;
		const start_date_numeric = new Date(startDate);
		const end_date_numeric = new Date(endDate);
		return now_numeric >= start_date_numeric && now_numeric <= end_date_numeric;
	});
	if (currentSeasonType) {
		return currentSeasonType;
	} else {
		return null;
	}
};
