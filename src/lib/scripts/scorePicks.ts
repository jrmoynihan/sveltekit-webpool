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
	doc, type DocumentData, setDoc, QueryDocumentSnapshot
} from '@firebase/firestore';
import {
	everyoneWinsResult,
	checkmark,
	HomeOrAway,
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
	thirdPlaceWeeklyAmount
} from './classes/constants';
import { ErrorAndToast, myError, myLog } from '$scripts/logging';
import {
	scheduleCollection,
	playersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection,
	teamsCollection,
	seasonRecordsCollection
} from './collections';
import {
	gameConverter,
	teamConverter,
	playerConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter,
	recordConverter,
	seasonRecordConverter
} from './converters';
import { defaultToast } from './toasts';
import type { Team } from './classes/team';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import { toast } from '@zerodevx/svelte-toast';
import type { Player } from './classes/player';
import type { PlayerRecord, SeasonRecord } from './classes/playerRecord';
import { getStatus, getScores, convertToHttps } from './dataFetching';
import { isBeforeGameTime } from './functions';
import { getWeeklyPlayers, getWeeklyRecords } from './weekly/weeklyPlayers';
import { weekly_players } from './store';
import { get } from 'svelte/store';

// Score all picks for a given week
export const scorePicksForWeek = async (
	selected_week: number,
	selected_year = new Date().getFullYear(),
	season_type = 'Regular Season',
	assignSeasonPrizes = false
): Promise<void> => {
	try {
		const startingToastId = defaultToast({
			title: `Starting to Score Picks`,
			msg: `Updating game winners, scoring (net) tiebreakers, and updating player records...`,
			duration: 60000
		});
		const wheres: QueryConstraint[] = [
			where('week', '==', selected_week),
			where('year', '==', selected_year),
			where('type', '==', season_type)
		];
		const gameQuery = query(scheduleCollection, ...wheres);
		const pickQuery = query(weeklyPicksCollection, ...wheres);
		const tiebreakerQuery = query(weeklyTiebreakersCollection, ...wheres);
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
		const tiebreakers = await getDocs(tiebreakerQuery.withConverter(weeklyTiebreakerConverter));
		const weeklyPlayers = get(weekly_players) || await getWeeklyPlayers();

		games.forEach((game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			toast.set(startingToastId, { msg: `Updating ATS gamer winners...` });
			updateGameandATSWinner(gameData, gameRef);
			toast.set(startingToastId, { msg: `Scoring net tiebreakers...` });
			scoreNetTiebreakers(gameData, tiebreakers, selected_week);
			toast.set(startingToastId, { msg: `Marking correct picks...` });
			markIfPickIsCorrect(picks, gameData);
		});

		// Initialize variables to perform winner/tiebreaker comparisons
		let mostWins: number = 0;
		let secondMostWins: number = 0;
		let thirdMostWins: number = 0;
		const record_constraints = [where('year', '==', selected_year)]

		weeklyPlayers.forEach(async (player) => {
			const playerRef = player.ref;
			// Get a fresh copy of the updated pick docs NOTE: (reads = # of games * # of players)
			const wheres: QueryConstraint[] = [
				where('week', '==', selected_week),
				where('year', '==', selected_year),
				where('type', '==', season_type),
				where('uid', '==', player.uid)
			];
			const pickQuery = query(weeklyPicksCollection, ...wheres);
			const playerPicks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
			toast.set(startingToastId, {
				msg: `Updating week ${selected_week} record for ${player.name}`
			});
			const totalWins = await updatePlayerRecordForWeek(playerRef, playerPicks, record_constraints);

			// While we iterate through updating player records, also store what the 1st, 2nd, and 3rd most win totals are
			if (totalWins > mostWins) {
				mostWins = totalWins;
			} else if (totalWins > secondMostWins) {
				secondMostWins = totalWins;
			} else if (totalWins > thirdMostWins) {
				thirdMostWins = totalWins;
			}
		});
		console.log('most wins:', mostWins);
		console.log('second most wins: ', secondMostWins);
		console.log('third most wins: ', thirdMostWins);

		// Now that records have been updated, query them all to compare wins
		const weeklyPickRecordsForWholeYear = await getWeeklyRecords({constraints: record_constraints})
		const weeklyPickRecordDocs = weeklyPickRecordsForWholeYear.docs;
		const weeklyPickRecordDocsForSelectedWeek = weeklyPickRecordDocs.filter(doc => doc.data().week === selected_week);

		toast.set(startingToastId, { msg: `Finding week ${selected_week} leaders...` });
		const firstPlacersForWeek = await findWeeklyLeaders(weeklyPickRecordDocsForSelectedWeek, mostWins);
		const secondPlacersForWeek = await findWeeklyLeaders(
			weeklyPickRecordDocsForSelectedWeek,
			secondMostWins,
		);
		const thirdPlacersForWeek = await findWeeklyLeaders(
			weeklyPickRecordDocsForSelectedWeek,
			thirdMostWins,
		);

		toast.set(startingToastId, { msg: `Calculating weekly prize splits...` });
		// Find out how the week's prize pool should be split
		const { firstPlaceWeeklyPrize, secondPlaceWeeklyPrize, thirdPlaceWeeklyPrize } =
			await calculateWeekPrizeSplits(
				firstPlacersForWeek,
				secondPlacersForWeek,
				thirdPlacersForWeek
			);
			console.log('1st Placers: ', firstPlacersForWeek);
			console.log('2nd Placers: ', secondPlacersForWeek);
			console.log('3rd Placers: ', thirdPlacersForWeek);

		toast.set(startingToastId, { msg: `Awarding weekly prizes...` });
	
			weeklyPlayers.forEach(async (player) => {
				const record_to_update = weeklyPickRecordDocs.find(doc => doc.data().uid === player.uid);
				if(record_to_update){
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
					} else if(record_to_update){
						myLog({
							msg: `non-winner for week ${selected_week}: `,
							additional_params: player.name
						});
						await assignWeeklyPrize(record_to_update, 0);
					}
				}
			})

		// Initialize variables to perform season winner/tiebreaker comparisons
		let mostSeasonWins: number = 0;
		let secondMostSeasonWins: number = 0;
		let thirdMostSeasonWins: number = 0;

		// Update weekly player season records
		weeklyPlayers.forEach(async (player) => {
			const all_players_weekly_record_data = weeklyPickRecordsForWholeYear.docs.map(doc => doc.data());
			const player_weekly_record_data = all_players_weekly_record_data.filter(data => data.uid === player.uid);

			toast.set(startingToastId, { msg: `Updating season record for ${player.name} (${player.nickname})...` });
			// TODO: Turn this into a cloud function trigger
			const totalSeasonWins = await updateWeeklyPlayerSeasonRecord(player, player_weekly_record_data, selected_year);

			if (totalSeasonWins > mostSeasonWins) {
				mostSeasonWins = totalSeasonWins;
			} else if (totalSeasonWins > secondMostSeasonWins) {
				secondMostSeasonWins = totalSeasonWins;
			} else if (totalSeasonWins > thirdMostSeasonWins) {
				thirdMostSeasonWins = totalSeasonWins;
			}
		});

		if (assignSeasonPrizes) {
			toast.set(startingToastId, { msg: `Finding season leaders...` });
			const constraints = [where('year','==',selected_year)];
			const season_record_snapshot = await getSeasonRecords({constraints})
			const firstPlacersForSeason = await filterWeeklySeasonLeaders(season_record_snapshot, mostSeasonWins);
			const secondPlacersForSeason = await filterWeeklySeasonLeaders(
				season_record_snapshot,
				secondMostSeasonWins
			);
			const thirdPlacersForSeason = await filterWeeklySeasonLeaders(
				season_record_snapshot,
				thirdMostSeasonWins
			);

			// Find out how the weekly pool season prizes should be split
			toast.set(startingToastId, { msg: `Calculating season prize splits...` });
			const { firstPlaceSeasonPrize, secondPlaceSeasonPrize, thirdPlaceSeasonPrize } =
				await calculateSeasonPrizeSplits(
					weeklyPlayers,
					firstPlacersForSeason,
					secondPlacersForSeason,
					thirdPlacersForSeason
				);

			// Assign either the first, second, third, or no prize value to the player for the season
			weeklyPlayers.forEach(async (player) => {
				const {uid, ref, name, nickname} = player
				toast.set(startingToastId, { msg: `Assigning season prizes for ${name} (${nickname})...` });
				if (firstPlacersForSeason.includes(uid)) {
					await assignSeasonPrize(ref, firstPlaceSeasonPrize);
				} else if (secondPlacersForSeason.includes(uid)) {
					await assignSeasonPrize(ref, secondPlaceSeasonPrize);
				} else if (thirdPlacersForSeason.includes(uid)) {
					await assignSeasonPrize(ref, thirdPlaceSeasonPrize);
				} else {
					await assignSeasonPrize(ref, 0);
				}
			});
		} else {
			myLog({ msg: 'skipping assignment of season prizes', traceLocation: true });
		}

		toast.pop(startingToastId);
		defaultToast({
			title: `Scored Week ${selected_week} Picks!`,
			msg: `Successfully scored each player's picks for Week ${selected_week}, ${selected_year}.`
		});
	} catch (error) {
		myError({ error });
	}
};

export const assignWeeklyPrize = async (
	prize_winner_record: QueryDocumentSnapshot<PlayerRecord>,
	prize_amount: number,
) => {
	try {
		const {data, ref} = prize_winner_record;
		setDoc(ref.withConverter(recordConverter), {...data(), prize_amount});
	} catch (error) {
		myError({ msg: 'Error assigning weekly prize',error });
	}
};
export const assignSeasonPrize = async (
	prizeWinner: DocumentReference<DocumentData>,
	prizeAmount: number
) => {
	updateDoc(prizeWinner.withConverter(playerConverter), {weekly_pool_season_winnings: prizeAmount});
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
 * @param comparisonWinCount - The number of wins a player must have (exactly) to be added to the return array
 * @returns An array of player document references of players who meet the criteria
 */
export const filterWeeklySeasonLeaders = async (
	season_records: QuerySnapshot<SeasonRecord>,
	comparisonWinCount: number
) => {
	try {
		let leaders: string[] = [];
		season_records.docs.filter((doc) => {
			const {total_weekly_wins, uid} = doc.data();
			if (total_weekly_wins === comparisonWinCount) {
				leaders.push(uid);
			}
		});
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
	comparison_win_count: number,
) => {
	try {
		let leaders: string[] = [];
		records.forEach((record) => {
			const {wins, uid} = record.data();
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
	year: number,
) => {
	try {
		let total_weekly_wins : number = 0
		let total_weekly_losses: number = 0

		// Sum all weekly wins/losses
		for (const record of players_records){
			const {wins, losses} = record
			total_weekly_wins += wins
			total_weekly_losses += losses
		}
		// Get the player's season record doc to update
		const { uid } = player
		const constraints = [where('year','==',year), where('uid','==', uid)];
		const season_record_snapshot = await getSeasonRecords({constraints});

		// If only one doc is returned (expected), update the doc
		if(season_record_snapshot.size === 1){
			const {ref} = season_record_snapshot.docs[0]
			await updateDoc(ref, { total_weekly_wins, total_weekly_losses })
			return total_weekly_wins; // Return wins to compare who has the best record

		// If no docs are returned (unexpected), create a new doc
		}else if(season_record_snapshot.size === 0){
			const new_doc = doc(seasonRecordsCollection);
			await setDoc(new_doc, { uid, year, total_weekly_wins, total_weekly_losses })
			return total_weekly_wins; // Return wins to compare who has the best record

		// If more than one doc is returned (unexpected), throw an error
		}else{
			throw new Error(`More than one season record found for this ${ player.name } (${player.nickname})`)
		}
	} catch (error) {
		ErrorAndToast({ title: 'Error updating weekly player season record!', error });
	}
};

type SeasonRecordOptions ={
	constraints: QueryConstraint[]
}
export const getSeasonRecords = async(input: SeasonRecordOptions) => {
	try {
		const {constraints} = input
		const season_record_query = query(seasonRecordsCollection.withConverter(seasonRecordConverter), ...constraints);
		const season_record_snapshot = await getDocs(season_record_query);	
		return season_record_snapshot;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records!', error });
	}
}
export const getSeasonRecordsData = async(input: SeasonRecordOptions) => {
	try {
		const {constraints} = input
		const records = await getSeasonRecords({constraints});
		const data = records.docs.map((doc) => doc.data());
		return data;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records data!', error });
	}
}
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
	constraints: QueryConstraint[]
): Promise<number> => {
	try {
		const correct_picks = player_picks.docs.filter((doc) => doc.data().is_correct === true);
		const incorrect_picks = player_picks.docs.filter((doc) => doc.data().is_correct === false);
		const record_constraints = [...constraints, where('uid', '==', player_ref.id)];
		const record_docs = await getWeeklyRecords({constraints: record_constraints})
		if(record_docs.size === 1){
			await updateDoc(record_docs.docs[0].ref, {
				wins: correct_picks.length,
				losses: incorrect_picks.length
			});
			// Return the number of wins the player had in the week for tiebreaker purposes
			return correct_picks.length;
		}else if(record_docs.size > 1){
			throw new Error(`More than one record found for uid: ${player_ref.id} for specified week.`)
		}
		else if(record_docs.size === 0){
			throw new Error(`No record found for uid: ${player_ref.id} for specified week.`);
		}
	} catch (error) {
		ErrorAndToast({ title: 'Unable to update player record', error })
	}
};
export const markIfPickIsCorrect = async (
	picks: QuerySnapshot<WeeklyPickDoc>,
	gameData: Game
	// selectedWeek: number
) => {
	try {
		picks.forEach(async (pick) => {
			const pickData = pick.data();
			const pickRef = pick.ref;
			// const uid = pickData.uid;
			// const playerRef = doc(playersCollection, uid);
			// if (pickData.isCorrect === null || pickData.isCorrect === undefined) {
			if (pickData.game_id === gameData.id) {
				if (
					(gameData.ATS_winner && gameData.ATS_winner === pickData.pick) ||
					gameData.ATS_winner === everyoneWinsResult
				) {
					updateDoc(pickRef, { is_correct: true });
				} else if (await isBeforeGameTime(gameData.timestamp)) {
					updateDoc(pickRef, { is_correct: null });
				} else {
					updateDoc(pickRef, { is_correct: false });
				}
			}
		});
	} catch (error) {
		myError({  error });
	}
};
export const scoreNetTiebreakers = async (
	game_data: Game,
	tiebreakers: QuerySnapshot<WeeklyTiebreaker>,
	selected_week: number
) => {
	try {
		if (game_data.is_last_game_of_week && game_data.winner) {
			myLog({
				msg: `last game of the week: ${game_data.short_name}, totalScore: ${game_data.total_score}`
			});
			tiebreakers.forEach((tiebreaker) => {
				const tiebreakerData = tiebreaker.data();
				const uid = tiebreakerData.uid;
				if (tiebreakerData.score_guess) {
					const net_tiebreaker = game_data.total_score - tiebreakerData.score_guess;
					const net_tiebreaker_absolute = Math.abs(net_tiebreaker);
					const player_doc_ref = doc(playersCollection, uid);
					// store netTiebreakers on the Player document; easier for scoreboard
					// updateDoc(player_doc_ref, {
					// 	[`weeklyPickRecord.week_${selected_week}.netTiebreaker`]: net_tiebreaker,
					// 	[`weeklyPickRecord.week_${selected_week}.netTiebreakerAbsolute`]:
					// 		net_tiebreaker_absolute
					// });
					throw new Error("Not yet implemented");
					
				} else {
					myLog({ msg: 'no tiebreaker posted' });
				}
			});
		}
	} catch (error) {
		myError({  error });
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
			where('year', '==', selected_year),
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
		myError({  error });
	}
};

export const updateGamesAndATSWinners = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
) => {
	try {
		defaultToast({
			title: `Starting to Find Winners`,
			msg: `Finding straight up and ATS winners on each game doc.`
		});
		const wheres: QueryConstraint[] = [
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear),
			where('type', '==', seasonType)
		];
		const gameQuery = query(scheduleCollection, ...wheres);
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		games.forEach(async (game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			myLog({ msg: `updating game ${gameData.id}...` });
			await updateGameandATSWinner(gameData, gameRef);
		});
		defaultToast({
			title: `Completed!`,
			msg: `Winners have been added/updated to each game document.`
		});
	} catch (error) {
		myError({  error });
	}
};

export const updateGameandATSWinner = async (
	gameData: Game,
	gameRef: DocumentReference
): Promise<{ winnerAndLoser: { winner: string; loser: string }; ATSwinner: string }> => {
	try {
		// if (!gameData.winner) {
		const competitions: PrunedCompetition[] = gameData.competitions;
		const statusData = await getStatus(competitions);
		if (statusData.type?.completed) {
			myLog({ msg: `${gameData.id} completed: ${statusData.type.completed}` });

			const spread: number = gameData.spread;
			const scores = await getScores(competitions);
			const homeScore: number = scores.homeScoreData.value;
			const awayScore: number = scores.awayScoreData.value;
			const winnerAndLoser = await findWinnerAndLoser(scores, gameData);
			const ATSwinner = await findATSWinner(gameData, homeScore, awayScore, spread);
			const totalScore = homeScore + awayScore;

			myLog({
				msg: `winner: ${winnerAndLoser?.winner}, ATSwinner: ${ATSwinner}, spread: ${spread}, total score: ${totalScore}`
			});

			await updateDoc(gameRef.withConverter(gameConverter), {
				winner: winnerAndLoser?.winner,
				loser: winnerAndLoser?.loser,
				ATS_winner: ATSwinner,
				total_score: totalScore
			});
			return { winnerAndLoser, ATSwinner };
			// // Update the team record
			// await updateTeamRecord(winnerAndLoser, teams, gameData);
		} else {
			myLog({
				msg: `game ${gameData.id} (${gameData.short_name}, ${gameData.date}) is NOT completed`
			});
		}
	} catch (error) {
		myError({ error });
	}
};

export const findWinnerAndLoser = async (
	scores: { homeScoreData: ESPNScore; awayScoreData: ESPNScore },
	gameData: Game
): Promise<{ winner: string; loser: string }> => {
	try {
		if (scores.homeScoreData.winner === true) {
			return { winner: gameData.home_team.abbreviation, loser: gameData.away_team.abbreviation };
		} else if (scores.awayScoreData.winner === true) {
			return { winner: gameData.away_team.abbreviation, loser: gameData.home_team.abbreviation };
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
			return game.home_team.abbreviation;
		}
		// Home Team Favored, Doesn't Cover
		else if (homeScore + spread < awayScore) {
			return game.away_team.abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// Away Team Favored
	} else if (spread > 0) {
		// Away Team Favored, Covers
		if (awayScore - spread > homeScore) {
			return game.away_team.abbreviation;
		}
		// Away Team Favored, Doesn't Cover
		else if (awayScore - spread < homeScore) {
			return game.home_team.abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// No team favored
	} else {
		// Home Team wins
		if (homeScore > awayScore) {
			return game.home_team.abbreviation;
			// Away Team wins
		} else if (awayScore > homeScore) {
			return game.away_team.abbreviation;
			// Straight-up Tie
		} else {
			return everyoneWinsResult;
		}
	}
};

// TODO: Turn this into a cloud function listener!
export const updateTeamRecordOnTeamDoc = async (
	winnerAndLoser: { winner: string; loser: string },
	teams: QuerySnapshot<Team>,
	gameData: Game
): Promise<void> => {
	// Update for ties
	if (winnerAndLoser.winner === null && winnerAndLoser.loser === null) {
		const homeTeamRef = gameData.home_team.docRef;
		const awayTeamRef = gameData.away_team.docRef;
		incrementTies(homeTeamRef);
		incrementTies(awayTeamRef);
	} else {
		// Update winners and losers
		teams.forEach((teamDoc) => {
			if (teamDoc.id === winnerAndLoser.winner) {
				const teamRef = teamDoc.ref;
				incrementWins(teamRef);
			}
			if (teamDoc.id === winnerAndLoser.loser) {
				const teamRef = teamDoc.ref;
				incrementLosses(teamRef);
			}
		});
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
			where('year', '==', selectedYear),
			where('type', '==', seasonType)
		];
		const proceed = confirm(
			`Are you sure you want to nullify the 'winner' field from each game document for Week ${selectedWeek}?`
		);
		if (proceed) {
			const gameQuery = query(scheduleCollection, ...wheres);
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
// TODO: turn this into a cloud function listener!
// ** Update the team records on both team and game documents **
export const updateTeamRecordsFromESPN = async (
	selectedYear: number = new Date().getFullYear()
) => {
	try {
		let writeCount = 0;
		const toastId = defaultToast({
			title: 'Updating Team Records',
			msg: 'Starting to update team records... ',
			duration: 360000
		});
		const gameQuery = query(
			scheduleCollection.withConverter(gameConverter),
			where('year', '==', selectedYear)
		);
		const games = await getDocsFromServer(gameQuery);

		// Gets references to all teams data from ESPN; the limit=50 condition is important, because it will default to only 25 teams returned otherwise despite there being 32 total.
		const teamFetchResponse = await fetch(
			`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${selectedYear}/teams?lang=en&region=us&limit=50`
		);
		const teamsData = await teamFetchResponse.json();
		const teamsRefs: RefOnlyESPN[] = teamsData.items;

		myLog({ msg: 'Teams data received from ESPN:', additional_params: teamsData });
		myLog({ msg: 'Retrieving Team Record Data from ESPN...' });

		for await (const team of teamsRefs) {
			const teamResponse = await fetch(await convertToHttps(team.$ref));
			const teamData: ESPNTeamData = await teamResponse.json();
			const teamAbbreviation = teamData.abbreviation;
			const teamRecordRef: RefOnlyESPN = teamData.record;
			const recordResponse = await fetch(await convertToHttps(teamRecordRef.$ref));
			const recordData: ESPNRecord = await recordResponse.json();
			const wins = recordData.items[0].stats[1].value;
			const losses = recordData.items[0].stats[2].value;
			const ties = recordData.items[0].stats[5].value;
			const record = {
				wins: wins,
				losses: losses,
				ties: ties
			};
			const teamDoc = doc(teamsCollection, teamAbbreviation);

			toast.set(toastId, { msg: `Updating ${teamData.displayName}`, duration: 30000 });

			myLog({ msg: `${teamAbbreviation} || wins: ${wins}, losses: ${losses}, ties: ${ties}` });

			// Update the information on the team document (didn't need any reads to do this!)
			// TODO: remove this in favor of the records object used below; anywhere in the app that uses wins,losses,ties should use records.wins, records.losses, records.ties instead
			const currentYear = new Date().getFullYear();
			if (selectedYear === currentYear) {
				await updateDoc(teamDoc.withConverter(teamConverter), {
					wins,
					losses,
					ties
				});
				writeCount++;

				// Iterate through all games to keep team records up to date on those documents
				writeCount = await updateTeamRecordOnGameDocs(
					games,
					teamAbbreviation,
					wins,
					losses,
					ties,
					writeCount
				);
			}

			// Need to delay this write to be at least 1sec after the previous write
			// TODO: move this up to replace the prior updateDoc function
			await updateDoc(teamDoc.withConverter(teamConverter), `records.${selectedYear}`, record);
			writeCount++;
		}
		toast.set(toastId, { msg: `Finished updating teams!`, duration: 10000 });
		toast.push({ msg: `wrote ${writeCount} times!`, duration: 30000 });
		myLog({ msg: `made ${writeCount} writes to update the records on team and game documents` });
	} catch (error) {
		myError({ error });
	}
};

export const updateTeamRecordOnGameDocs = async (
	games: QuerySnapshot<Game>,
	teamAbbreviation: string,
	wins: number,
	losses: number,
	ties: number,
	writeCount: number
) => {
	try {
		for await (const game of games.docs) {
			const gameData: Game = game.data();
			const gameRef = game.ref;

			if (gameData.away_team.abbreviation === teamAbbreviation) {
				writeCount = await updateTeamRecord(
					gameData,
					gameRef,
					HomeOrAway.Away,
					wins,
					losses,
					ties,
					writeCount
				);
			} else if (gameData.home_team.abbreviation === teamAbbreviation) {
				writeCount = await updateTeamRecord(
					gameData,
					gameRef,
					HomeOrAway.Home,
					wins,
					losses,
					ties,
					writeCount
				);
			}
		}
		return writeCount;
	} catch (error) {
		ErrorAndToast({msg: `Unable to update team record on game doc.`, error});
	}
};
export const updateTeamRecord = async (
	gameData: Game,
	gameRef: DocumentReference,
	homeOrAway: HomeOrAway,
	wins: number,
	losses: number,
	ties: number,
	writeCount: number
) => {
	// Copy the current data to a new Game object, then modify its typed fields
	const newData: Game = JSON.parse(JSON.stringify(gameData));

	// Modify the team record fields needed
	if (homeOrAway === HomeOrAway.Away) {
		newData.away_team.wins = wins;
		newData.away_team.losses = losses;
		newData.away_team.ties = ties;

		await updateDoc(gameRef, {
			'awayTeam.wins': wins,
			'awayTeam.losses': losses,
			'awayTeam.ties': ties,
			'awayTeam.docRef': `/Teams/${gameData.away_team.abbreviation}`
		});
		writeCount++;
		// }
	} else {
		newData.home_team.wins = wins;
		newData.home_team.losses = losses;
		newData.home_team.ties = ties;

		await updateDoc(gameRef, {
			'homeTeam.wins': wins,
			'homeTeam.losses': losses,
			'homeTeam.ties': ties,
			'homeTeam.docRef': `/Teams/${gameData.home_team.abbreviation}`
		});
		writeCount++;
	}
	return writeCount;
};