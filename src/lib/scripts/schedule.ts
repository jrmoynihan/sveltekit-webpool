console.log('Schedule.ts loaded');
import {
	query,
	where,
	getDocs,
	getDoc,
	setDoc,
	updateDoc,
	doc,
	Timestamp,
	getDocFromServer
} from '@firebase/firestore';
import type { QuerySnapshot, DocumentReference } from '@firebase/firestore';
import { myError, myLog } from '$scripts/logging';
import type { ESPNSeason, ESPNWeek, Game, RefOnlyESPN } from '$classes/game';
import { WeekBound } from '$classes/weekBound';
import { scheduleCollection, weekBoundsCollection } from './collections';
import { gameConverter, weekBoundConverter } from './converters';
import { defaultToast, errorToast } from './toasts';
import { getRegularSeasonWeeks } from './functions';
import { toast } from '@zerodevx/svelte-toast';
import { currentSeasonYear } from '$scripts/store';
import { get } from 'svelte/store';
import type { SeasonType } from '$classes/seasonType';

export const findWeekDateTimeBounds = async (): Promise<void> => {
	const startToastId = defaultToast({
		title: 'Starting Week Bounds Search!',
		msg: 'Iterating through the schedule to find and set the weekly bounds.  Please wait a few seconds...',
		duration: 60000
	});
	const thisYear = new Date().getFullYear();
	const regSeasonWeeks = await getRegularSeasonWeeks();
	for await (const week of regSeasonWeeks) {
		console.log(`finding bounds for week: ${week}`);
		const wheres = [
			where('week', '==', week),
			where('type', '==', 'Regular Season'),
			where('year', '==', thisYear)
		];
		const scheduleQuery = query(scheduleCollection, ...wheres);
		const weekOfGames = await getDocs(scheduleQuery.withConverter(gameConverter));
		const times = await getFirstAndLastGameTime(weekOfGames);
		const weekBound = new WeekBound({ week, firstGameTime: times.first, lastGameTime: times.last });
		await setBounds(weekBound);
		myLog({ msg: `finished week ${week}` });
	}
	myLog({ msg: 'Finished all weeks!' });
	defaultToast({
		title: 'Found Week Bounds!',
		msg: 'Successfully found the start and ending game times for each week of the schedule. See WeeklyScheduleBounds collection in the Firebase console.'
	});
	// Remove the 'starting search' message toast
	toast.pop(startToastId);
};

export const getFirstAndLastGameTime = async (
	weekOfGames: QuerySnapshot<Game>
): Promise<{ first: Timestamp; last: Timestamp }> => {
	let firstGameofWeekTime: Timestamp;
	let lastGameofWeekTime: Timestamp;
	let lastGameRef: DocumentReference<Game>;

	for await (const game of weekOfGames.docs) {
		const data = game.data();
		const gameTime = data.timestamp;
		if (firstGameofWeekTime === undefined || gameTime < firstGameofWeekTime) {
			firstGameofWeekTime = gameTime;
			// alert(`gameTime: ${gameTime.toDate()} is less than ${firstGameofWeekTime.toDate()}`);
		}
		if (lastGameofWeekTime === undefined || gameTime > lastGameofWeekTime) {
			lastGameofWeekTime = gameTime;
			lastGameRef = game.ref;
			// alert(`gameTime: ${gameTime.toDate()} is greater than ${lastGameofWeekTime.toDate()}`);
		}
	}
	// Set the flag to indicate that this game's score will be used for the tiebreaker comparison
	updateDoc(lastGameRef, { isLastGameOfWeek: true });
	return { first: firstGameofWeekTime, last: lastGameofWeekTime };
};

export const setBounds = async (weekBound: WeekBound, year?: number): Promise<void> => {
	try {
		myLog({
			msg: `week ${weekBound.week} firstGameTime: ${weekBound.firstGameTime}, lastGameTime: ${weekBound.lastGameTime}`
		});
		const currentYear = year || new Date().getFullYear();
		const docRef = doc(weekBoundsCollection, currentYear.toString());
		const data = {
			[`week_${weekBound.week}`]: {
				firstGameTime: weekBound.firstGameTime,
				lastGameTime: weekBound.lastGameTime,
				week: weekBound.week
			}
		};
		const boundsDoc = await getDoc(docRef);
		if (boundsDoc.exists()) {
			await updateDoc(docRef, data);
		} else {
			await setDoc(docRef, data);
		}

		myLog({ msg: 'set Week Bound document: ', additional_params: data });
	} catch (error) {
		myError({ location: 'schedule.ts', function_name: 'setBounds', error });
	}
};
export const findCurrentWeekOfSchedule = async (showToast?: boolean): Promise<number> => {
	try {
		const now = new Date();
		const current_season_year = get(currentSeasonYear);
		const bounds_doc_ref = doc(weekBoundsCollection, current_season_year.toString());
		const bounds_doc = await getDocFromServer(bounds_doc_ref.withConverter(weekBoundConverter));

		// This is the offset from the start of the last game of the week when the function will return the next week.
		// i.e. if it has been 8 hours after the MNF game for week 3, it should return weekBounds.week = 4
		const hoursSinceLastGame = 8;
		// This is a multiplier for the hours above to get the number into milliseconds for a Date.getTime()
		const millisecondsPerHour = 3_600_000;

		if (bounds_doc.exists()) {
			const data = bounds_doc.data();
			myLog({ msg: 'found bounds document: ', additional_params: [data, current_season_year] });
			const regSeasonWeeks = await getRegularSeasonWeeks(); // TODO: need a solution to find non-Regular Season weeks
			for (const week of regSeasonWeeks) {
				const weekBounds: WeekBound = data[`week_${week}`];
				const firstGameTime = weekBounds.firstGameTime.toDate();
				const lastGameTime = weekBounds.lastGameTime.toDate();
				if (now < firstGameTime && week === 1) {
					return 1;
				}
				if (now.getTime() > lastGameTime.getTime() + hoursSinceLastGame * millisecondsPerHour) {
					continue;
				} else {
					myLog({ msg: `current week is ${weekBounds.week}!` });
					return weekBounds.week;
				}
			}
		} else {
			myLog({ msg: 'no bounds document found! Attempting to use ESPN API to find week...' });
			const espn_week = await getWeekFromESPN();
			if (espn_week) {
				myLog({ msg: `ESPN API returned week ${espn_week}.` });
				return espn_week;
			} else throw new Error('Could not find current week of schedule via ESPN API either.');
		}
	} catch (error) {
		myError({ location: 'schedule.ts', function_name: 'findCurrentWeekOfSchedule', error });
		if (showToast) {
			errorToast(`We ran into an error finding the current week: ${error}`);
		}
	}
};
const getWeekFromESPN = async () => {
	try {
		let season_type = { id: 2, text: 'Regular Season' };
		const espn_regular_season_data = await fetchESPNSeasonData(get(currentSeasonYear), season_type);
		const today_date = new Date('October 28, 2022 03:00:00');
		const today = Date.parse(today_date.toDateString());
		let start_of_season = Date.parse(espn_regular_season_data.startDate);
		let end_of_season = Date.parse(espn_regular_season_data.endDate);

		if (today < start_of_season) {
			// The regular season hasn't started yet; check if the preseason has started
			season_type = { id: 1, text: 'Preseason' };
			const espn_preseason_data = await fetchESPNSeasonData(get(currentSeasonYear), season_type);
			start_of_season = Date.parse(espn_preseason_data.startDate);
			end_of_season = Date.parse(espn_preseason_data.endDate);

			if (today < start_of_season) {
				// The preseason hasn't started yet; just return 1
				return 1;
			} else if (today > start_of_season && today < end_of_season) {
				const week_refs = await fetchWeekRefsOfSeason(espn_preseason_data);
				return findWhichWeekIncludesToday(today, week_refs);
			}
		} else if (today > start_of_season && today < end_of_season) {
			// The regular season has started; return the current week of it
			const week_refs = await fetchWeekRefsOfSeason(espn_regular_season_data);
			return findWhichWeekIncludesToday(today, week_refs);
		}
	} catch (error) {}
};
const fetchESPNSeasonData = async (
	current_season_year = get(currentSeasonYear),
	season_type: SeasonType = { id: 2, text: 'Regular Season' }
) => {
	const espn_season_response = await fetch(
		`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${current_season_year}/types/${season_type.id}`
	);
	const espn_season_data = await espn_season_response.json();
	return espn_season_data as ESPNSeason;
};

const fetchWeekRefsOfSeason = async (season_data: ESPNSeason) => {
	const { weeks } = season_data;
	const weeks_response = await fetch(weeks.$ref);
	const { items } = await weeks_response.json();
	const week_refs: string[] = items.map((item: RefOnlyESPN) => item.$ref);
	return week_refs;
};
const findWhichWeekIncludesToday = async (today: number, week_refs: string[]) => {
	for await (const week of week_refs) {
		const week_response = await fetch(week);
		const week_data = (await week_response.json()) as ESPNWeek;

		// Since we got here because the DB didn't have the data, we should write it here.
		const { startDate, endDate, number } = week_data;
		const start_timestamp = Timestamp.fromDate(new Date(startDate));
		const end_timestamp = Timestamp.fromDate(new Date(endDate));
		const new_doc = doc(weekBoundsCollection, `${get(currentSeasonYear)}`);
		await setDoc(new_doc, {
			[`week_${number}`]: {
				firstGameTime: start_timestamp,
				lastGameTime: end_timestamp,
				week: number
			}
		});

		const isDuringWeek = await occursInWeek(today, week_data);
		if (isDuringWeek) {
			myLog({ msg: `Today is during week ${number}!` });
			return week_data.number;
		}
	}
	return 1;
};
const occursInWeek = async (today: number, week_data: ESPNWeek) => {
	return today > Date.parse(week_data.startDate) && today < Date.parse(week_data.endDate);
};

console.log('Schedule.ts done');
