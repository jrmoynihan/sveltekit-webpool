import type {
	ESPNRecord,
	ESPNScore,
	ESPNTeamData,
	PrunedCompetition,
	RefOnlyESPN,
	Game
} from '$classes/game';
import {
	DocumentReference,
	QuerySnapshot,
	QueryConstraint,
	getDocsFromServer,
	updateDoc,
	getDocs,
	query,
	where,
	increment,
	doc,
	type DocumentData,
	setDoc,
	QueryDocumentSnapshot,
	getDoc,
	deleteDoc
} from '@firebase/firestore';
import {
	everyoneWinsResult,
	weeklyPoolFee,
	commishCost,
	webDevCost,
	hostingCost,
	maxRegularSeasonWeeks,
	weeklyPayout,
	firstPlaceWeeklySeasonPercent,
	secondPlaceWeeklySeasonPercent,
	thirdPlaceWeeklySeasonPercent,
	firstPlaceWeeklyAmount,
	secondPlaceWeeklyAmount,
	thirdPlaceWeeklyAmount,
	checkeredFlag
} from './classes/constants';
import { ErrorAndToast, LogAndToast, myError, myLog, myWarning } from '$scripts/logging';
import {
	gamesCollection,
	weeklyPicksCollection,
	teamsCollection,
	seasonRecordsCollection,
	weeklyRecordsCollection
} from './collections';
import {
	gameConverter,
	teamConverter,
	playerConverter,
	weeklyPickConverter,
	recordConverter,
	seasonRecordConverter
} from './converters';
import { defaultToast } from './toasts';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import { toast } from '@zerodevx/svelte-toast';
import type { Player } from './classes/player';
import { SeasonRecord, type PlayerRecord } from './classes/playerRecord';
import { getStatus, getScoreData, convertToHttps } from './dataFetching';
import { isBeforeGameTime } from './functions';
import {
	getGameData,
	getPicksData,
	getTiebreakerData,
	getWeeklyPlayers,
	getWeeklyRecordData,
	getWeeklyRecords
} from './weekly/weeklyPlayers';
import { all_players, all_seasons, weekly_players } from './store';
import { get } from 'svelte/store';
import { createWeeklyRecordsForPlayer } from './weekly/weeklyAdmin';

// Score all picks for a given week
export const scorePicksForWeek = async (
	selected_week: number,
	selected_year: number,
	season_type = 'Regular Season'
): Promise<void> => {
	try {
		const starting_toast_id = defaultToast({
			title: `Starting to Score Picks`,
			msg: `Updating game winners, scoring (net) tiebreakers, and updating player records...`,
			duration: 60000
		});
		const constraints: QueryConstraint[] = [
			where('week', '==', selected_week),
			where('season_year', '==', selected_year),
			where('season_type', '==', season_type)
		];
		const games = await getGameData({ constraints });
		const picks = await getPicksData({ constraints });
		const tiebreakers = await getTiebreakerData({ constraints });
		const weeklyPlayers = get(weekly_players) || (await getWeeklyPlayers());
		const weekly_records = await getWeeklyRecordData({ constraints });

		for await (const game of games) {
			LogAndToast({
				id: starting_toast_id,
				msg: `Updating ATS games winners...${game.short_name}`
			});
			await updateGameandATSWinner(game, game.doc_ref);
			LogAndToast({ id: starting_toast_id, msg: `Scoring net tiebreakers...` });
			await scoreNetTiebreakers(game, tiebreakers, weekly_records);
			LogAndToast({ id: starting_toast_id, msg: `Marking correct picks...` });
			await markIfPickIsCorrect(picks, game);
		}

		// // Initialize variables to perform winner/tiebreaker comparisons
		let most_wins: number = 0;
		let second_most_wins: number = 0;
		let third_most_wins: number = 0;
		const record_constraints = [
			where('season_year', '==', selected_year),
			where('week', '==', selected_week)
		];

		for await (const player of weeklyPlayers) {
			// Get a fresh copy of the updated pick docs NOTE: (reads = # of games * # of players)
			const pick_doc_constraints: QueryConstraint[] = [
				where('week', '==', selected_week),
				where('season_year', '==', selected_year),
				where('season_type', '==', season_type),
				where('uid', '==', player.uid)
			];
			const pick_query = query(weeklyPicksCollection, ...pick_doc_constraints);
			const player_picks = await getDocsFromServer(pick_query.withConverter(weeklyPickConverter));
			LogAndToast({
				id: starting_toast_id,
				msg: `Updating week ${selected_week} record for ${player.name}`
			});
			const total_wins = await updatePlayerRecordForWeek(
				player.ref,
				player_picks,
				record_constraints,
				selected_year,
				season_type
			);

			// While we iterate through updating player records, also store what the 1st, 2nd, and 3rd most win totals are
			if (total_wins > most_wins) {
				most_wins = total_wins;
			} else if (total_wins > second_most_wins) {
				second_most_wins = total_wins;
			} else if (total_wins > third_most_wins) {
				third_most_wins = total_wins;
			}
		}
		myLog({ msg: 'most wins:', additional_params: most_wins });
		myLog({ msg: 'second most wins: ', additional_params: second_most_wins });
		myLog({ msg: 'third most wins: ', additional_params: third_most_wins });

		// Now that records have been updated, query them all to compare wins
		const weeklyPickRecordsForWholeYear = await getWeeklyRecords({
			constraints: record_constraints
		});
		const weeklyPickRecordDocs = weeklyPickRecordsForWholeYear.docs;
		const weeklyPickRecordDocsForSelectedWeek = weeklyPickRecordDocs.filter(
			(doc) => doc.data().week === selected_week
		);

		LogAndToast({ id: starting_toast_id, msg: `Finding week ${selected_week} leaders...` });
		const firstPlacersForWeek = await findWeeklyLeaders(
			weeklyPickRecordDocsForSelectedWeek,
			most_wins
		);
		const secondPlacersForWeek = await findWeeklyLeaders(
			weeklyPickRecordDocsForSelectedWeek,
			second_most_wins
		);
		const thirdPlacersForWeek = await findWeeklyLeaders(
			weeklyPickRecordDocsForSelectedWeek,
			third_most_wins
		);

		LogAndToast({ id: starting_toast_id, msg: `Calculating weekly prize splits...` });
		// Find out how the week's prize pool should be split
		const { firstPlaceWeeklyPrize, secondPlaceWeeklyPrize, thirdPlaceWeeklyPrize } =
			await calculateWeekPrizeSplits(
				firstPlacersForWeek,
				secondPlacersForWeek,
				thirdPlacersForWeek
			);
		myLog({ msg: '1st Placers: ', additional_params: firstPlacersForWeek });
		myLog({ msg: '2nd Placers: ', additional_params: secondPlacersForWeek });
		myLog({ msg: '3rd Placers: ', additional_params: thirdPlacersForWeek });

		LogAndToast({ id: starting_toast_id, msg: `Awarding weekly prizes...` });

		weeklyPlayers.forEach(async (player) => {
			const record_to_update = weeklyPickRecordDocs.find((doc) => doc.data().uid === player.uid);
			if (record_to_update) {
				if (firstPlacersForWeek.includes(player.uid)) {
					myLog({
						msg: `first place winner for week ${selected_week}: `,
						additional_params: player.name
					});
					await assignWeeklyPrize(record_to_update, firstPlaceWeeklyPrize);
				} else if (secondPlacersForWeek.includes(player.uid)) {
					myLog({
						msg: `second place winner for week ${selected_week}: `,
						additional_params: player.name
					});
					await assignWeeklyPrize(record_to_update, secondPlaceWeeklyPrize);
				} else if (thirdPlacersForWeek.includes(player.uid)) {
					myLog({
						msg: `third place winner for week ${selected_week}: `,
						additional_params: player.name
					});
					await assignWeeklyPrize(record_to_update, thirdPlaceWeeklyPrize);
				} else if (record_to_update) {
					myLog({
						msg: `non-winner for week ${selected_week}: `,
						additional_params: player.name
					});
					await assignWeeklyPrize(record_to_update, 0);
				}
			}
		});

		// Update weekly player season records
		weeklyPlayers.forEach(async (player) => {
			const all_players_weekly_record_data = weeklyPickRecordsForWholeYear.docs.map((doc) =>
				doc.data()
			);
			const player_weekly_record_data = all_players_weekly_record_data.filter(
				(data) => data.uid === player.uid
			);

			LogAndToast({
				id: starting_toast_id,
				msg: `Updating season record for ${player.name} (${player.nickname})...`
			});
			// TODO: Turn this into a cloud function trigger
			await updateWeeklyPlayerSeasonRecord(player, player_weekly_record_data, selected_year);
		});

		toast.pop(starting_toast_id);
		defaultToast({
			title: `Scored Week ${selected_week} Picks!`,
			msg: `Successfully scored each player's picks for Week ${selected_week}, ${selected_year}.`
		});
	} catch (error) {
		myError({ error });
	}
};

/**
 * Returns the weekly pool players who have the top three most wins for the season
 * @param {number} selected_year - The *season* year to find season leaders for (the year at the start of the season)
 * @returns {Promise<Array<Object>>} An object comprised of three string arrays containing player uid's who have either the most, second most, or third most wins for the season
 */
export const getWeeklyPoolSeasonLeaders = async (
	selected_year: number
): Promise<{
	first_placers_for_season: string[];
	second_placers_for_season: string[];
	third_placers_for_season: string[];
}> => {
	const constraints = [where('season_year', '==', selected_year)];
	const season_records = await getSeasonRecordsData({ constraints });
	// Initialize variables to perform season winner/tiebreaker comparisons
	let most_season_wins: number = 0;
	let second_most_season_wins: number = 0;
	let third_most_season_wins: number = 0;
	season_records.forEach((season_record) => {
		const { total_weekly_wins } = season_record;
		if (total_weekly_wins > most_season_wins) {
			third_most_season_wins = second_most_season_wins;
			second_most_season_wins = most_season_wins;
			most_season_wins = total_weekly_wins;
		} else if (total_weekly_wins > second_most_season_wins) {
			third_most_season_wins = second_most_season_wins;
			second_most_season_wins = total_weekly_wins;
		} else if (total_weekly_wins > third_most_season_wins) {
			third_most_season_wins = total_weekly_wins;
		}
	});
	const first_placers_for_season = await filterWeeklySeasonLeaders(
		season_records,
		most_season_wins
	);
	const second_placers_for_season = await filterWeeklySeasonLeaders(
		season_records,
		second_most_season_wins
	);
	const third_placers_for_season = await filterWeeklySeasonLeaders(
		season_records,
		third_most_season_wins
	);
	return { first_placers_for_season, second_placers_for_season, third_placers_for_season };
};

export const assignWeeklyPrize = async (
	prize_winner_record: QueryDocumentSnapshot<PlayerRecord>,
	prize_amount: number
) => {
	try {
		const { ref } = prize_winner_record;
		const data = prize_winner_record.data();
		setDoc(ref.withConverter(recordConverter), { ...data, prize_amount });
	} catch (error) {
		myError({ msg: 'Error assigning weekly prize', error });
	}
};
export const assignWeeklyPoolSeasonPrizes = async (selected_year: number) => {
	const toast_id = defaultToast({
		title: 'Assigning Season Prizes',
		msg: `Finding season leaders...`
	});
	const { first_placers_for_season, second_placers_for_season, third_placers_for_season } =
		await getWeeklyPoolSeasonLeaders(selected_year);

	// Find out how the weekly pool season prizes should be split
	toast.set(toast_id, { msg: `Calculating season prize splits...` });
	const weeklyPlayers = get(weekly_players);
	const { firstPlaceSeasonPrize, secondPlaceSeasonPrize, thirdPlaceSeasonPrize } =
		await calculateSeasonPrizeSplits(
			weeklyPlayers,
			first_placers_for_season,
			second_placers_for_season,
			third_placers_for_season
		);

	// Assign either the first, second, third, or no prize value to the player for the season
	weeklyPlayers.forEach(async (player) => {
		const { uid, ref, name, nickname } = player;
		toast.set(toast_id, { msg: `Assigning season prizes for ${name} (${nickname})...` });
		if (first_placers_for_season.includes(uid)) {
			await assignSeasonPrize(ref, firstPlaceSeasonPrize);
		} else if (second_placers_for_season.includes(uid)) {
			await assignSeasonPrize(ref, secondPlaceSeasonPrize);
		} else if (third_placers_for_season.includes(uid)) {
			await assignSeasonPrize(ref, thirdPlaceSeasonPrize);
		} else {
			await assignSeasonPrize(ref, 0);
		}
	});
};

export const assignSeasonPrize = async (
	prize_winner: DocumentReference<DocumentData>,
	prize_amount: number
) => {
	updateDoc(prize_winner.withConverter(playerConverter), {
		weekly_pool_season_winnings: prize_amount
	});
};

export const calculateWeekPrizeSplits = async (
	firstPlacers: string[],
	secondPlacers: string[],
	thirdPlacers: string[]
) => {
	let firstPlaceWeeklyPrize: number;
	let secondPlaceWeeklyPrize: number;
	let thirdPlaceWeeklyPrize: number;

	if (firstPlacers.length === 1) {
		firstPlaceWeeklyPrize = firstPlaceWeeklyAmount;
		if (secondPlacers.length === 1) {
			secondPlaceWeeklyPrize = secondPlaceWeeklyAmount;
			thirdPlaceWeeklyPrize = thirdPlaceWeeklyAmount / thirdPlacers.length;
		} else if (secondPlacers.length >= 2) {
			secondPlaceWeeklyPrize =
				(secondPlaceWeeklyAmount + thirdPlaceWeeklyAmount) / secondPlacers.length;
			thirdPlaceWeeklyPrize = 0;
		}
	} else if (firstPlacers.length === 2) {
		firstPlaceWeeklyPrize = (firstPlaceWeeklyAmount + secondPlaceWeeklyAmount) / 2;
		secondPlaceWeeklyPrize = thirdPlaceWeeklyAmount / secondPlacers.length;
		thirdPlaceWeeklyPrize = 0;
	} else if (firstPlacers.length >= 3) {
		firstPlaceWeeklyPrize =
			(firstPlaceWeeklyAmount + secondPlaceWeeklyAmount + thirdPlaceWeeklyAmount) /
			firstPlacers.length;
		secondPlaceWeeklyPrize = 0;
		thirdPlaceWeeklyPrize = 0;
	}
	return { firstPlaceWeeklyPrize, secondPlaceWeeklyPrize, thirdPlaceWeeklyPrize };
};

export const calculateSeasonPrizeSplits = async (
	players: Player[],
	first_placers: string[],
	second_placers: string[],
	third_placers: string[]
) => {
	const paidWeeklyPlayers = players.filter((player) => player.paid_weekly === true);
	const seasonTotalPrizePool = paidWeeklyPlayers.length * weeklyPoolFee;
	const seasonPrizePoolNetCosts =
		seasonTotalPrizePool -
		commishCost -
		webDevCost -
		hostingCost -
		maxRegularSeasonWeeks * weeklyPayout;
	let firstPlaceSeasonPrize: number;
	let secondPlaceSeasonPrize: number;
	let thirdPlaceSeasonPrize: number;

	if (first_placers.length === 1) {
		firstPlaceSeasonPrize = seasonPrizePoolNetCosts * firstPlaceWeeklySeasonPercent;
		if (second_placers.length === 1) {
			secondPlaceSeasonPrize = seasonPrizePoolNetCosts * secondPlaceWeeklySeasonPercent;
			thirdPlaceSeasonPrize =
				(seasonPrizePoolNetCosts * thirdPlaceWeeklySeasonPercent) / third_placers.length;
		} else if (second_placers.length >= 2) {
			secondPlaceSeasonPrize =
				(seasonPrizePoolNetCosts * secondPlaceWeeklySeasonPercent) / second_placers.length;
			thirdPlaceSeasonPrize = 0;
		}
	} else if (first_placers.length === 2) {
		firstPlaceSeasonPrize =
			(seasonPrizePoolNetCosts * (firstPlaceWeeklySeasonPercent + secondPlaceWeeklySeasonPercent)) /
			2;
		secondPlaceSeasonPrize =
			(seasonPrizePoolNetCosts * thirdPlaceWeeklySeasonPercent) / second_placers.length;
		thirdPlaceSeasonPrize = 0;
	} else if (first_placers.length >= 3) {
		firstPlaceSeasonPrize =
			(seasonPrizePoolNetCosts *
				(firstPlaceWeeklySeasonPercent +
					secondPlaceWeeklySeasonPercent +
					thirdPlaceWeeklySeasonPercent)) /
			first_placers.length;
		secondPlaceSeasonPrize = 0;
		thirdPlaceSeasonPrize = 0;
	}
	return { firstPlaceSeasonPrize, secondPlaceSeasonPrize, thirdPlaceSeasonPrize };
};

/**
 * Returns an array of player uid's who have the specified number of wins for the entire season
 * @param players - The array of weekly pool players
 * @param comparison_win_count - The number of wins a player must have (exactly) to be added to the return array
 * @returns An array of player document references of players who meet the criteria
 */
export const filterWeeklySeasonLeaders = async (
	season_records: SeasonRecord[],
	comparison_win_count: number
) => {
	try {
		let leaders: string[] = [];
		season_records.filter((record) => {
			// Destructure the record
			const { total_weekly_wins, uid } = record;

			// If the player has the specified number of wins, add their uid to the return array
			if (total_weekly_wins === comparison_win_count) {
				leaders.push(uid);
			}
		});
		// Return the array of player uid's
		return leaders;
	} catch (error) {
		myError({ error });
	}
};

/**
 * Returns an array of players who have the specified number of wins in the specified week
 * @param records - The array of weekly pool player records
 * @param comparison_win_count - The number of wins a player must have (exactly) to be added to the return array
 * @returns An array of player uid's of players who meet the win criteria
 */
export const findWeeklyLeaders = async (
	records: QueryDocumentSnapshot<PlayerRecord>[],
	comparison_win_count: number
) => {
	try {
		let leaders: string[] = [];
		records.forEach((record) => {
			const { wins, uid } = record.data();
			if (wins === comparison_win_count) {
				leaders.push(uid);
			}
		});
		return leaders;
	} catch (error) {
		myError({ error });
	}
};

// /**
//  *
//  * @param mostWins - The highest win total found when scoring the week
//  * @param smallesNetTiebreakerAbsolute - The smallest net tiebreaker (closest to actual score in either direction) found when scoring the week
//  * @param greatestNetTiebreaker - The greatest net tiebreaker ()
//  */
// export const findWeeklyPlayerWinners = (
// 	mostWins: number,
// 	smallestNetTiebreakerAbsolute: number,
// 	greatestNetTiebreaker: number
// ) => {};

export const updateWeeklyPlayerSeasonRecord = async (
	player: Player,
	players_records: PlayerRecord[],
	season_year: number
) => {
	try {
		let total_weekly_wins: number = 0;
		let total_weekly_losses: number = 0;

		// Sum all weekly wins/losses
		for (const record of players_records) {
			const { wins, losses } = record;
			total_weekly_wins += wins;
			total_weekly_losses += losses;
		}
		// Get the player's season record doc to update
		const { uid } = player;
		const constraints = [where('season_year', '==', season_year), where('uid', '==', uid)];
		const season_record_snapshot = await getSeasonRecords({ constraints });

		// If only one doc is returned (expected), update the doc
		if (season_record_snapshot.size === 1) {
			const { ref } = season_record_snapshot.docs[0];
			await updateDoc(ref, { total_weekly_wins, total_weekly_losses });
			return total_weekly_wins; // Return wins to compare who has the best record

			// If no docs are returned (unexpected), create a new doc
		} else if (season_record_snapshot.empty) {
			const new_doc = doc(seasonRecordsCollection.withConverter(seasonRecordConverter));
			const new_season_record_data = new SeasonRecord({
				uid,
				doc_ref: new_doc,
				season_year,
				total_weekly_wins,
				total_weekly_losses
			});
			await setDoc(new_doc, new_season_record_data);
			return total_weekly_wins; // Return wins to compare who has the best record

			// If more than one doc is returned (unexpected), throw an error
		} else {
			throw new Error(
				`More than one season record found for this ${player.name} (${player.nickname})`
			);
		}
	} catch (error) {
		ErrorAndToast({ title: 'Error updating weekly player season record!', error });
	}
};

type SeasonRecordOptions = {
	constraints: QueryConstraint[];
};
export const getSeasonRecords = async (input: SeasonRecordOptions) => {
	try {
		const { constraints } = input;
		const season_record_query = query(
			seasonRecordsCollection.withConverter(seasonRecordConverter),
			...constraints
		);
		const season_record_snapshot = await getDocs(season_record_query);
		return season_record_snapshot;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records!', error });
	}
};
export const getSeasonRecordsData = async (input: SeasonRecordOptions) => {
	try {
		const { constraints } = input;
		const records = await getSeasonRecords({ constraints });
		const data = records.docs.map((doc) => doc.data());
		return data;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records data!', error });
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
		console.log('record_constraints', record_constraints);
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
export const markIfPickIsCorrect = async (picks: WeeklyPickDoc[], gameData: Game) => {
	try {
		picks.forEach(async (pick) => {
			if (pick.game_id === gameData.id) {
				if (gameData.ATS_winner === pick.pick || gameData.ATS_winner === everyoneWinsResult) {
					updateDoc(pick.doc_ref, { is_correct: true });
				} else if (await isBeforeGameTime(gameData.timestamp)) {
					updateDoc(pick.doc_ref, { is_correct: null });
				} else {
					updateDoc(pick.doc_ref, { is_correct: false });
				}
			}
		});
	} catch (error) {
		myError({ error });
	}
};
export const scoreNetTiebreakers = async (
	game: Game,
	tiebreakers: WeeklyTiebreaker[],
	records: PlayerRecord[]
) => {
	try {
		const { is_last_game_of_week, winner, total_score } = game;
		if (is_last_game_of_week && winner) {
			myLog({
				msg: `${checkeredFlag} Last Game of the Week: ${game.short_name}, Total Score: ${total_score}`
			});
			// Iterate through each player's tiebreaker for that week
			tiebreakers.forEach((tiebreaker) => {
				const { uid, score_guess, week, season_year, season_type } = tiebreaker;
				if (score_guess) {
					const net_tiebreaker = total_score - score_guess;
					const net_tiebreaker_absolute = Math.abs(net_tiebreaker);

					// Filter to the player's record
					const player_record = records.find(
						(record) =>
							record.uid === uid &&
							record.week === week &&
							record.season_year === season_year &&
							record.season_type === season_type
					);

					// Store the net tiebreaker in the weekly record doc
					updateDoc(player_record.doc_ref, { net_tiebreaker, net_tiebreaker_absolute });
				} else {
					myLog({ msg: 'no tiebreaker posted' });
				}
			});
		}
	} catch (error) {
		myError({ error });
		throw error;
	}
};

export const resetScoredPicksForWeek = async (
	selected_week: number,
	selected_year = new Date().getFullYear(),
	season_type = 'Regular Season'
): Promise<void> => {
	try {
		const wheres: QueryConstraint[] = [
			where('week', '==', selected_week),
			where('season_year', '==', selected_year),
			where('type', '==', season_type)
		];
		const proceed = confirm(
			`Are you sure you want to nullify the 'isCorrect' field from each player's picks for Week ${selected_week}?`
		);
		if (proceed) {
			const pickQuery = query(weeklyPicksCollection, ...wheres);
			const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));

			picks.forEach((pick) => {
				const ref = pick.ref;
				updateDoc(ref, { is_correct: null });
			});
			defaultToast({
				title: 'Reset Picks!',
				msg: 'Successfully reset previously scored picks for the selected week.'
			});
		}
	} catch (error) {
		myError({ error });
	}
};

export const updateGamesAndATSWinners = async (
	week: number,
	year: number,
	season_type = 'Regular Season'
) => {
	try {
		defaultToast({
			title: `Starting to Find Winners`,
			msg: `Finding straight up and ATS winners on each game doc.`
		});
		const game_constraints: QueryConstraint[] = [
			where('week', '==', week),
			where('season_year', '==', year),
			where('season_type', '==', season_type)
		];
		const games = await getGameData({ constraints: game_constraints });
		for (const game of games) {
			myLog({ msg: `updating game ${game.id}...` });
			await updateGameandATSWinner(game, game.doc_ref);
		}
		defaultToast({
			title: `Completed!`,
			msg: `Winners have been added/updated to each game document.`
		});
	} catch (error) {
		myError({ error });
	}
};

export const updateGameandATSWinner = async (
	game_data: Game,
	game_ref: DocumentReference
): Promise<{ winnerAndLoser: { winner: string; loser: string }; ATSwinner: string }> => {
	try {
		const competitions: PrunedCompetition[] = game_data.competitions;
		const status_data = await getStatus(competitions);
		if (status_data?.type?.completed) {
			myLog({ msg: `${game_data.id} completed: ${status_data.type.completed}` });

			const spread: number = game_data.spread;
			const { home_score_data, away_score_data } = await getScoreData(competitions);
			const home_score: number = home_score_data.value;
			const away_score: number = away_score_data.value;
			const winner_and_loser = await findWinnerAndLoser(
				home_score_data,
				away_score_data,
				game_data
			);
			const ATS_winner = await findATSWinner(game_data, home_score, away_score, spread);
			const total_score = home_score + away_score;

			myLog({
				msg: `winner: ${winner_and_loser?.winner}, ATSwinner: ${ATS_winner}, spread: ${spread}, total score: ${total_score}`
			});

			// Update the game doc with the straight-up winner and loser, the ATS winner, and the total score of the game
			await updateDoc(game_ref.withConverter(gameConverter), {
				winner: winner_and_loser?.winner,
				loser: winner_and_loser?.loser,
				ATS_winner,
				total_score
			});
			return { winnerAndLoser: winner_and_loser, ATSwinner: ATS_winner };
		} else {
			myLog({
				msg: `game ${game_data.id} (${game_data.short_name}, ${game_data.date}) is NOT completed`
			});
		}
	} catch (error) {
		myError({ error });
	}
};

export const findWinnerAndLoser = async (
	home_score_data: ESPNScore,
	away_score_data: ESPNScore,
	game: Game
): Promise<{ winner: string; loser: string }> => {
	try {
		if (home_score_data.winner === true) {
			return { winner: game.home_team_abbreviation, loser: game.away_team_abbreviation };
		} else if (away_score_data.winner === true) {
			return { winner: game.away_team_abbreviation, loser: game.home_team_abbreviation };
		} else {
			return { winner: everyoneWinsResult, loser: everyoneWinsResult };
		}
	} catch (error) {
		myError({ error });
	}
};
export const findATSWinner = async (
	game: Game,
	homeScore: number,
	awayScore: number,
	spread: number
): Promise<string> => {
	// Home Team Favored
	if (spread < 0) {
		// Home Team Favored, Covers
		if (homeScore + spread > awayScore) {
			return game.home_team_abbreviation;
		}
		// Home Team Favored, Doesn't Cover
		else if (homeScore + spread < awayScore) {
			return game.away_team_abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// Away Team Favored
	} else if (spread > 0) {
		// Away Team Favored, Covers
		if (awayScore - spread > homeScore) {
			return game.away_team_abbreviation;
		}
		// Away Team Favored, Doesn't Cover
		else if (awayScore - spread < homeScore) {
			return game.home_team_abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// No team favored
	} else {
		// Home Team wins
		if (homeScore > awayScore) {
			return game.home_team_abbreviation;
			// Away Team wins
		} else if (awayScore > homeScore) {
			return game.away_team_abbreviation;
			// Straight-up Tie
		} else {
			return everyoneWinsResult;
		}
	}
};

export const incrementTies = async (teamRef: DocumentReference): Promise<void> => {
	await updateDoc(teamRef, { ties: increment(1) });
};
export const incrementWins = async (teamRef: DocumentReference): Promise<void> => {
	await updateDoc(teamRef, { wins: increment(1) });
};
export const incrementLosses = async (teamRef: DocumentReference): Promise<void> => {
	await updateDoc(teamRef, { losses: increment(1) });
};
export const removeWinnersFromGames = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
): Promise<void> => {
	try {
		const wheres: QueryConstraint[] = [
			where('week', '==', selectedWeek),
			where('season_year', '==', selectedYear),
			where('type', '==', seasonType)
		];
		const proceed = confirm(
			`Are you sure you want to nullify the 'winner' field from each game document for Week ${selectedWeek}?`
		);
		if (proceed) {
			const gameQuery = query(gamesCollection, ...wheres);
			const games = await getDocs(gameQuery.withConverter(gameConverter));

			games.forEach((game) => {
				const ref = game.ref;
				updateDoc(ref, { winner: null });
			});
		}
		defaultToast({
			title: 'Removed Winners!',
			msg: `Successfully removed winners from games for week ${selectedWeek}.`
		});
	} catch (error) {
		myError({ error });
	}
};

export const getTeamRecordFromESPN = async (team_ref: RefOnlyESPN) => {
	const teamResponse = await fetch(await convertToHttps(team_ref.$ref));
	const teamData: ESPNTeamData = await teamResponse.json();
	const team_abbreviation = teamData.abbreviation;
	const team_display_name = teamData.displayName;
	const teamRecordRef: RefOnlyESPN = teamData.record;
	const recordResponse = await fetch(await convertToHttps(teamRecordRef.$ref));
	const recordData: ESPNRecord = await recordResponse.json();

	// If record data is found, use it.  Otherwise, the season likely hasn't started and the API will return empty. Set records to zero.
	const wins = recordData?.items[0]?.stats[1]?.value || 0;
	const losses = recordData?.items[0]?.stats[2]?.value || 0;
	const ties = recordData?.items[0]?.stats[5]?.value || 0;
	const record = {
		wins: wins,
		losses: losses,
		ties: ties
	};
	return { team_abbreviation, team_display_name, record };
};

// TODO: turn this into a cloud function listener!
// ** Update the team records on team documents **
export const updateTeamRecordsFromESPN = async (season_year: number) => {
	try {
		const toastId = defaultToast({
			title: 'Updating Team Records',
			msg: 'Starting to update team records... ',
			duration: 360000
		});
		const gameQuery = query(
			gamesCollection.withConverter(gameConverter),
			where('season_year', '==', season_year)
		);
		const games = await getDocsFromServer(gameQuery);

		// Gets references to all teams data from ESPN
		// NOTE: the limit=50 condition is important, because it will default to only 25 teams returned otherwise despite there being 32 total.
		const teamFetchResponse = await fetch(
			`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${season_year}/teams?lang=en&region=us&limit=50`
		);
		const teamsData = await teamFetchResponse.json();
		const teams_refs: RefOnlyESPN[] = teamsData.items;

		myLog({ msg: 'Teams data received from ESPN:', additional_params: teamsData });
		myLog({ msg: 'Retrieving Team Record Data from ESPN...' });

		for await (const team_ref of teams_refs) {
			const { team_abbreviation, team_display_name, record } = await getTeamRecordFromESPN(
				team_ref
			);
			const { wins, losses, ties } = record;
			const new_record = { wins, losses, ties, year: season_year };
			const teamDoc = doc(teamsCollection, team_abbreviation);
			const teamDocSnapshot = await getDoc(teamDoc.withConverter(teamConverter));
			const teamDocData = teamDocSnapshot.data();
			const team_records = teamDocData.records;
			// Throw out the old record for the selected year
			const existing_records_to_keep = team_records.filter((record) => record.year !== season_year);
			const new_records = [...existing_records_to_keep, new_record];

			toast.set(toastId, { msg: `Updating ${team_display_name}`, duration: 30000 });

			myLog({ msg: `${team_abbreviation} || wins: ${wins}, losses: ${losses}, ties: ${ties}` });

			// Update the information on the team document
			await updateDoc(teamDoc.withConverter(teamConverter), { records: new_records });
		}
		toast.set(toastId, { msg: `Finished updating teams!`, duration: 10000 });
	} catch (error) {
		myError({ error });
	}
};

// export const updateTeamRecord = async (
// 	game_data: Game,
// 	game_ref: DocumentReference,
// 	team_abbreviation: string,
// 	record: { wins: number; losses: number; ties: number },
// 	year: number
// ) => {
// 	try {
// 		// Modify the team record fields needed
// 		if (game_data.away_team_abbreviation === team_abbreviation) {
// 			game_data.away_team.records[year] = record;
// 			await updateDoc(game_ref.withConverter(gameConverter), game_data);
// 		} else if (game_data.home_team_abbreviation === team_abbreviation) {
// 			game_data.home_team.records[year] = record;
// 			await updateDoc(game_ref.withConverter(gameConverter), game_data);
// 		}
// 	} catch (error) {
// 		myError({ error });
// 	}
// };

// // TODO: Turn this into a cloud function listener!
// export const updateTeamRecordOnTeamDoc = async (
// 	winnerAndLoser: { winner: string; loser: string },
// 	teams: QuerySnapshot<Team>,
// 	gameData: Game
// ): Promise<void> => {
// 	// Update for ties
// 	if (winnerAndLoser.winner === null && winnerAndLoser.loser === null) {
// 		const homeTeamRef = gameData.home_team.docRef;
// 		const awayTeamRef = gameData.away_team.docRef;
// 		incrementTies(homeTeamRef);
// 		incrementTies(awayTeamRef);
// 	} else {
// 		// Update winners and losers
// 		teams.forEach((teamDoc) => {
// 			if (teamDoc.id === winnerAndLoser.winner) {
// 				const teamRef = teamDoc.ref;
// 				incrementWins(teamRef);
// 			}
// 			if (teamDoc.id === winnerAndLoser.loser) {
// 				const teamRef = teamDoc.ref;
// 				incrementLosses(teamRef);
// 			}
// 		});
// 	}
// };
