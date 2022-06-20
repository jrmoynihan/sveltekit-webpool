import {
	deleteDoc,
	doc,
	DocumentReference,
	getDocs,
	getDocsFromServer,
	query,
	setDoc,
	updateDoc,
	where,
	type QueryConstraint,
	type QuerySnapshot
} from '@firebase/firestore';
import { get } from 'svelte/store';
import type { WeeklyPickDoc } from '../classes/picks';
import type { Player } from '../classes/player';
import { PlayerRecord } from '../classes/playerRecord';
import type { SeasonBoundDoc } from '../classes/seasonBound';
import { weeklyPicksCollection, weeklyRecordsCollection } from '../firebase/collections';
import { recordConverter, weeklyPickConverter } from '../firebase/converters';
import { all_players, all_seasons, weekly_players } from '../store';
import { makeNumericArrayOfDesiredLength } from '../utilities/functions';
import { ErrorAndToast, LogAndToast, myError, myLog, myWarning } from '../utilities/logging';
import { getWeeklyPlayers, getWeeklyRecords } from './weeklyPlayers';

interface createWeeklyRecordsForPlayerOptions {
	player: Player;
	season: SeasonBoundDoc;
}
export const createWeeklyRecordsForPlayer = async (input: createWeeklyRecordsForPlayerOptions) => {
	const { player, season } = input;
	try {
		const { year, type_name, number_of_weeks } = season;
		const weeks = makeNumericArrayOfDesiredLength(number_of_weeks);
		for (const week of weeks) {
			createWeeklyRecordForPlayer({ player, season_year: year, week, season_type: type_name });
		}
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set weekly record doc for player: ${player.name} for ${season.year} season`,
			error,
			additional_params: `unable to update weekly record for player ${player.name}`
		});
	}
};
interface createWeeklyRecordForPlayerOptions {
	player: Player;
	season_year: number;
	week: number;
	season_type: string;
	net_tiebreaker?: number;
	net_tiebreaker_absolute?: number;
	perform_prexisting_doc_check?: boolean;
}
export const createWeeklyRecordForPlayer = async (input: createWeeklyRecordForPlayerOptions) => {
	const {
		player,
		season_year,
		week,
		season_type,
		net_tiebreaker = null,
		net_tiebreaker_absolute = null,
		perform_prexisting_doc_check = true
	} = input;
	try {
		let snapshot: QuerySnapshot<PlayerRecord>;
		if (perform_prexisting_doc_check) {
			const constraints = [
				where('uid', '==', player.uid),
				where('season_year', '==', season_year),
				where('week', '==', week)
			];
			snapshot = await getWeeklyRecords({ constraints });
		}
		if (!perform_prexisting_doc_check || snapshot?.empty) {
			const msg = perform_prexisting_doc_check
				? `no weekly records found for player: ${player.name} for ${season_year} season, week ${week}`
				: `Skipping check for existing weekly record doc...`;
			myLog({ msg });
			const doc_ref = doc(weeklyRecordsCollection.withConverter(recordConverter));
			const record: PlayerRecord = new PlayerRecord({
				doc_ref,
				uid: player.uid,
				season_year,
				season_type,
				week,
				net_tiebreaker,
				net_tiebreaker_absolute
			});
			await setDoc(doc_ref, record);
			myLog({
				msg: `set weekly record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season, week ${week}`
			});
			return record;
		} else {
			myLog({
				msg: `weekly records found for player: ${player.name} for ${season_year} season, week ${week}`,
				additional_params: snapshot.docs
			});
			return snapshot.docs[0].data();
		}
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set weekly record doc for player: ${player.name} for ${season_year} season, week ${week}`,
			error,
			additional_params: `unable to update weekly record for player ${player.name}`
		});
	}
};
interface deleteWeeklyRecordsForPlayerOptions {
	player: Player;
	constraints?: QueryConstraint[];
}
export const deleteWeeklyRecordsForPlayer = async (input: deleteWeeklyRecordsForPlayerOptions) => {
	const { player, constraints } = input;
	const player_record_constraints = [where('uid', '==', player.uid), ...constraints];
	const confirmed = confirm(
		'Are you sure you want to delete all weekly records for this player? This cannot be undone.'
	);
	if (confirmed) {
		try {
			const q = query(weeklyRecordsCollection, ...player_record_constraints);
			const player_records = await getDocs(q.withConverter(recordConverter));
			if (!player_records.empty) {
				myLog({
					msg: `Weekly records found for player: ${player.name}`
				});
				for await (const doc of player_records.docs) {
					deleteDoc(doc.ref);
				}
				LogAndToast({
					title: 'Deleted Weekly Records',
					msg: `Deleted weekly records for ${player.name}`
				});
			} else {
				myLog({
					msg: `No weekly records found for ${player.name} matching the provided constraints`,
					additional_params: constraints
				});
			}
		} catch (error) {
			ErrorAndToast({
				msg: `Encountered an error while trying to delete weekly records for ${player.name}`,
				error,
				additional_params: constraints
			});
		}
	}
};

/**
 * Updates the player document with the number of wins and losses in a given week
 * @param selected_week - The week record to update
 * @param player_ref - The player document to update
 * @param player_picks - The array of player picks to evaluate for correctness (win) / incorrectness (loss)
 * @returns The number of wins the player had in the week
 */
export const updatePlayerRecordForWeek = async (
	player_ref: DocumentReference,
	player_picks: QuerySnapshot<WeeklyPickDoc>,
	constraints: QueryConstraint[],
	year?: number,
	season_type?: string
): Promise<number> => {
	try {
		const correct_picks = player_picks.docs.filter((doc) => doc.data().is_correct === true);
		const incorrect_picks = player_picks.docs.filter((doc) => doc.data().is_correct === false);
		const record_constraints = [...constraints, where('uid', '==', player_ref.id)];
		const record_docs = await getWeeklyRecords({ constraints: record_constraints });
		if (record_docs.size === 1) {
			await updateDoc(record_docs.docs[0].ref, {
				wins: correct_picks.length,
				losses: incorrect_picks.length
			});
		} else if (record_docs.size > 1) {
			// Delete the extra docs (self-healing)
			record_docs.docs.forEach((doc, i) => {
				if (i > 0) {
					deleteDoc(doc.ref);
				}
				myWarning({
					msg: `More than one record found for uid: ${player_ref.id} for specified week. Extra records were deleted.`
				});
			});
		} else if (record_docs.size === 0) {
			// Create records since none exist (self-healing)
			const player = get(all_players).find((player) => player.uid === player_ref.id);
			const season = get(all_seasons).find((s) => s.year === year && s.type_name === season_type);
			createWeeklyRecordsForPlayer({ player, season });
			myWarning({
				msg: `No record found for uid: ${player_ref.id} for specified week.  Created a new record.`
			});
		}
		// Return the number of wins the player had in the week for tiebreaker purposes
		return correct_picks.length;
	} catch (error) {
		ErrorAndToast({ title: 'Error encountered while updating player record', error });
	}
};
/**
 * Returns the weekly pool players who have the top three most wins for the week after updating all players' records
 * @param {number} year - The *season* year to search for weekly  player records
 * @param {number} week - The week to search for weekly player records
 * @param {string} season_type - The season type to search for weekly player records
 * @param {number} toast_id - (Optional) A toast id to use for the toast message
 * @returns {Promise<Array<Object>>} An object comprised of three string arrays containing player uid's who have either the most, second most, or third most wins for the season
 */
export const updateAllWeeklyPlayerRecordsForWeek = async (
	year: number,
	week: number,
	season_type: string,
	toast_id?: number
) => {
	try {
		// Get the weekly players from the store or query the DB
		const weeklyPlayers = get(weekly_players) || (await getWeeklyPlayers());
		const record_constraints = [where('season_year', '==', year), where('week', '==', week)];
		// Initialize variables to perform winner/tiebreaker comparison
		let most_wins = 0;
		let second_most_wins = 0;
		let third_most_wins = 0;

		for await (const player of weeklyPlayers) {
			// Get a fresh copy of the updated pick docs NOTE: (reads = # of games * # of players)
			const pick_doc_constraints: QueryConstraint[] = [
				where('week', '==', week),
				where('season_year', '==', year),
				where('season_type', '==', season_type),
				where('uid', '==', player.uid)
			];
			const pick_query = query(weeklyPicksCollection, ...pick_doc_constraints);
			const player_picks = await getDocsFromServer(pick_query.withConverter(weeklyPickConverter));
			LogAndToast({
				id: toast_id || null,
				msg: `Updating week ${week} record for ${player.name}`
			});
			const total_wins = await updatePlayerRecordForWeek(
				player.ref,
				player_picks,
				record_constraints,
				year,
				season_type
			);

			// While we iterate through updating player records, also store what the 1st, 2nd, and 3rd most win totals are
			if (total_wins > most_wins) {
				// Shift the first and second most wins down one slot
				third_most_wins = second_most_wins;
				second_most_wins = most_wins;
				most_wins = total_wins;
			} else if (total_wins > second_most_wins) {
				third_most_wins = second_most_wins;
				second_most_wins = total_wins;
			} else if (total_wins > third_most_wins) {
				third_most_wins = total_wins;
			}
		}
		// Return the three most win totals
		return { most_wins, second_most_wins, third_most_wins };
	} catch (error) {
		myError({ error });
	}
};
