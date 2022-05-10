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
	doc, type DocumentData
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
	teamsCollection
} from './collections';
import {
	gameConverter,
	teamConverter,
	playerConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from './converters';
import { defaultToast } from './toasts';
import type { Team } from './classes/team';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import { toast } from '@zerodevx/svelte-toast';
import type { Player } from './classes/player';
import type { PlayerRecord } from './classes/playerRecord';
import { getStatus, getScores, convertToHttps } from './dataFetching';
import { isBeforeGameTime } from './functions';

// Score all picks for a given week
export const scorePicksForWeek = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season',
	assignSeasonPrizes = false
): Promise<void> => {
	try {
		const startingToastId = defaultToast({
			title: `Starting to Score Picks`,
			msg: `Updating game winners, scoring (net) tiebreakers, and updating player records...`,
			duration: 60000
		});
		const wheres: QueryConstraint[] = [
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear),
			where('type', '==', seasonType)
		];
		const gameQuery = query(scheduleCollection, ...wheres);
		const pickQuery = query(weeklyPicksCollection, ...wheres);
		const tiebreakerQuery = query(weeklyTiebreakersCollection, ...wheres);
		const playerQuery = query(playersCollection, where('weekly', '==', true));
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
		const tiebreakers = await getDocs(tiebreakerQuery.withConverter(weeklyTiebreakerConverter));
		const players = await getDocs(playerQuery.withConverter(playerConverter));

		games.forEach((game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			toast.set(startingToastId, { msg: `Updating ATS gamer winners...` });
			updateGameandATSWinner(gameData, gameRef);
			toast.set(startingToastId, { msg: `Scoring net tiebreakers...` });
			scoreNetTiebreakers(gameData, tiebreakers, selectedWeek);
			toast.set(startingToastId, { msg: `Marking correct picks...` });
			markIfPickIsCorrect(picks, gameData);
		});

		// Initialize variables to perform winner/tiebreaker comparisons
		let mostWins: number = 0;
		let secondMostWins: number = 0;
		let thirdMostWins: number = 0;

		players.forEach(async (player) => {
			const playerRef = player.ref;
			// Get a fresh copy of the updated pick docs NOTE: (reads = 16 * # of players)
			const wheres: QueryConstraint[] = [
				where('week', '==', selectedWeek),
				where('year', '==', selectedYear),
				where('type', '==', seasonType),
				where('uid', '==', player.id)
			];
			const pickQuery = query(weeklyPicksCollection, ...wheres);
			const playerPicks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
			toast.set(startingToastId, {
				msg: `Updating week ${selectedWeek} record for ${player.data().name}`
			});
			const totalWins = await updatePlayerRecordForWeek(selectedWeek, playerRef, playerPicks);

			// While we iterate through updating player records, also store what the 1st, 2nd, and 3rd most win totals are
			if (totalWins > mostWins) {
				mostWins = totalWins;
			} else if (totalWins > secondMostWins) {
				secondMostWins = totalWins;
			} else if (totalWins > thirdMostWins) {
				thirdMostWins = totalWins;
			}
		});
		console.log(mostWins);
		console.log(secondMostWins);

		// Get a fresh copy of the updated player docs
		const updatedPlayers = await getDocs(playerQuery.withConverter(playerConverter));

		toast.set(startingToastId, { msg: `Finding week ${selectedWeek} leaders...` });
		const firstPlacersForWeek = await findWeeklyLeaders(updatedPlayers, mostWins, selectedWeek);
		const secondPlacersForWeek = await findWeeklyLeaders(
			updatedPlayers,
			secondMostWins,
			selectedWeek
		);
		const thirdPlacersForWeek = await findWeeklyLeaders(
			updatedPlayers,
			thirdMostWins,
			selectedWeek
		);

		toast.set(startingToastId, { msg: `Calculating weekly prize splits...` });
		// Find out how the week's prize pool should be split
		const { firstPlaceWeeklyPrize, secondPlaceWeeklyPrize, thirdPlaceWeeklyPrize } =
			await calculateWeekPrizeSplits(
				firstPlacersForWeek,
				secondPlacersForWeek,
				thirdPlacersForWeek
			);

		toast.set(startingToastId, { msg: `Awarding weekly prizes...` });
		updatedPlayers.forEach(async (player) => {
			const ref = player.ref;
			console.log('1st Placers: ', firstPlacersForWeek);
			console.log('2nd Placers: ', secondPlacersForWeek);
			console.log('3rd Placers: ', thirdPlacersForWeek);
			if (firstPlacersForWeek.includes(ref)) {
				myLog({
					msg: `first place winner for week ${selectedWeek}: `,
					additional_params: player.data().name
				});
				await assignWeeklyPrize(ref, firstPlaceWeeklyPrize, selectedWeek);
			} else if (secondPlacersForWeek.includes(ref)) {
				myLog({
					msg: `second place winner for week ${selectedWeek}: `,
					additional_params: player.data().name
				});
				await assignWeeklyPrize(ref, secondPlaceWeeklyPrize, selectedWeek);
			} else if (thirdPlacersForWeek.includes(ref)) {
				myLog({
					msg: `third place winner for week ${selectedWeek}: `,
					additional_params: player.data().name
				});
				await assignWeeklyPrize(ref, thirdPlaceWeeklyPrize, selectedWeek);
			} else {
				myLog({
					msg: `non-winner for week ${selectedWeek}: `,
					additional_params: player.data().name
				});
				await assignWeeklyPrize(ref, 0, selectedWeek);
			}
		});

		// Initialize variables to perform winner/tiebreaker comparisons
		let mostSeasonWins: number = 0;
		let secondMostSeasonWins: number = 0;
		let thirdMostSeasonWins: number = 0;

		// Update weekly player season records
		updatedPlayers.forEach(async (player) => {
			const player_data = player.data();
			const player_ref = player.ref;

			toast.set(startingToastId, { msg: `Updating season record for ${player_data.name}...` });
			// TODO: Turn this into a cloud function trigger
			const totalSeasonWins = await updateWeeklyPlayerSeasonRecord(player_ref, player_data);

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
			const firstPlacersForSeason = await findWeeklySeasonLeaders(updatedPlayers, mostSeasonWins);
			const secondPlacersForSeason = await findWeeklySeasonLeaders(
				updatedPlayers,
				secondMostSeasonWins
			);
			const thirdPlacersForSeason = await findWeeklySeasonLeaders(
				updatedPlayers,
				thirdMostSeasonWins
			);

			// Find out how the weekly pool season prizes should be split
			toast.set(startingToastId, { msg: `Calculating season prize splits...` });
			const { firstPlaceSeasonPrize, secondPlaceSeasonPrize, thirdPlaceSeasonPrize } =
				await calculateSeasonPrizeSplits(
					updatedPlayers,
					firstPlacersForSeason,
					secondPlacersForSeason,
					thirdPlacersForSeason
				);

			// Assign either the first, second, third, or no prize value to the player for the season
			updatedPlayers.forEach((player) => {
				const ref = player.ref;
				toast.set(startingToastId, { msg: `Assigning season prize for ${player.data().name}...` });
				if (firstPlacersForSeason.includes(ref)) {
					assignSeasonPrize(ref, firstPlaceSeasonPrize);
				} else if (secondPlacersForSeason.includes(ref)) {
					assignSeasonPrize(ref, secondPlaceSeasonPrize);
				} else if (thirdPlacersForSeason.includes(ref)) {
					assignSeasonPrize(ref, thirdPlaceSeasonPrize);
				} else {
					assignSeasonPrize(ref, 0);
				}
			});
		} else {
			myLog({ msg: 'skipping assignment of season prizes', traceLocation: true });
		}

		toast.pop(startingToastId);
		defaultToast({
			title: `Scored Week ${selectedWeek} Picks!`,
			msg: `Successfully scored each player's picks for Week ${selectedWeek}, ${selectedYear}.`
		});
	} catch (error) {
		myError({ error });
	}
};

export const assignWeeklyPrize = async (
	prizeWinner: DocumentReference<DocumentData>,
	prizeAmount: number,
	selectedWeek: number
) => {
	updateDoc(prizeWinner.withConverter(playerConverter), {
		[`weeklyWinnings.week_${selectedWeek}`]: prizeAmount
	});
};
export const assignSeasonPrize = async (
	prizeWinner: DocumentReference<DocumentData>,
	prizeAmount: number
) => {
	updateDoc(prizeWinner.withConverter(playerConverter), `weeklyWinnings.total`, prizeAmount);
};

export const calculateWeekPrizeSplits = async (
	firstPlacers: DocumentReference<DocumentData>[],
	secondPlacers: DocumentReference<DocumentData>[],
	thirdPlacers: DocumentReference<DocumentData>[]
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
	updated_players: QuerySnapshot<Player>,
	first_placers: DocumentReference<DocumentData>[],
	second_placers: DocumentReference<DocumentData>[],
	third_placers: DocumentReference<DocumentData>[]
) => {
	const paidWeeklyPlayers = updated_players.docs.filter((doc) => doc.data().paidWeekly === true);
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
 * Returns an array of players who have the specified number of wins for the entire season
 * @param players - The array of weekly pool players
 * @param comparisonWinCount - The number of wins a player must have (exactly) to be added to the return array
 * @returns An array of player document references of players who meet the criteria
 */
export const findWeeklySeasonLeaders = async (
	players: QuerySnapshot<Player>,
	comparisonWinCount: number
) => {
	try {
		let leaders: DocumentReference[] = [];
		players.docs.filter((doc) => {
			const totalWeeklyWins = doc.data().totalWeeklyWins;
			if (totalWeeklyWins === comparisonWinCount) {
				leaders.push(doc.ref);
			}
		});
		return leaders;
	} catch (error) {
		myError({ error });
	}
};

/**
 * Returns an array of players who have the specified number of wins in the specified week
 * @param players - The array of weekly pool players
 * @param comparison_win_count - The number of wins a player must have (exactly) to be added to the return array
 * @param week_to_compare - The week to examine records from
 * @returns An array of player document references of players who meet the criteria
 */
export const findWeeklyLeaders = async (
	players: QuerySnapshot<Player>,
	comparison_win_count: number,
	week_to_compare: number
) => {
	try {
		let leaders: DocumentReference[] = [];
		players.forEach((doc) => {
			if (doc.data().weeklyPickRecord[`week_${week_to_compare}`].wins === comparison_win_count) {
				leaders.push(doc.ref);
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
	player_ref: DocumentReference,
	player_data: Player
) => {
	let totalWins = 0;
	let totalLosses = 0;
	const weekRecords: PlayerRecord[] = Object.values(player_data.weeklyPickRecord);
	// Add each week's wins/losses to the the player's total season wins/losses
	for await (const week of weekRecords) {
		totalWins += week.wins;
		totalLosses += week.losses;
	}
	await updateDoc(player_ref, {
		totalWeeklyWins: totalWins,
		totalWeeklyLosses: totalLosses
	});
	return totalWins; // Return wins to compare who has the best record
};

/**
 * Updates the player document with the number of wins and losses in a given week
 * @param selected_week - The week record to update
 * @param player_ref - The player document to update
 * @param player_picks - The array of player picks to evaluate for correctness (win) / incorrectness (loss)
 * @returns The number of wins the player had in the week
 */
export const updatePlayerRecordForWeek = async (
	selected_week: number,
	player_ref: DocumentReference,
	player_picks: QuerySnapshot<WeeklyPickDoc>
): Promise<number> => {
	const correctPicks = player_picks.docs.filter((doc) => doc.data().isCorrect === true);
	const incorrectPicks = player_picks.docs.filter((doc) => doc.data().isCorrect === false);
	await updateDoc(player_ref, {
		[`weeklyPickRecord.week_${selected_week}.wins`]: correctPicks.length,
		[`weeklyPickRecord.week_${selected_week}.losses`]: incorrectPicks.length
	});
	return correctPicks.length;
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
			if (pickData.gameId === gameData.id) {
				if (
					(gameData.ATSwinner && gameData.ATSwinner === pickData.pick) ||
					gameData.ATSwinner === everyoneWinsResult
				) {
					updateDoc(pickRef, { isCorrect: true });
				} else if (await isBeforeGameTime(gameData.timestamp)) {
					updateDoc(pickRef, { isCorrect: null });
				} else {
					updateDoc(pickRef, { isCorrect: false });
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
		if (game_data.isLastGameOfWeek && game_data.winner) {
			myLog({
				msg: `last game of the week: ${game_data.shortName}, totalScore: ${game_data.totalScore}`
			});
			tiebreakers.forEach((tiebreaker) => {
				const tiebreakerData = tiebreaker.data();
				const uid = tiebreakerData.uid;
				if (tiebreakerData.scoreGuess) {
					const net_tiebreaker = game_data.totalScore - tiebreakerData.scoreGuess;
					const net_tiebreaker_absolute = Math.abs(net_tiebreaker);
					const player_doc_ref = doc(playersCollection, uid);
					// store netTiebreakers on the Player document; easier for scoreboard
					updateDoc(player_doc_ref, {
						[`weeklyPickRecord.week_${selected_week}.netTiebreaker`]: net_tiebreaker,
						[`weeklyPickRecord.week_${selected_week}.netTiebreakerAbsolute`]:
							net_tiebreaker_absolute
					});
				} else {
					myLog({ msg: 'no tiebreaker posted' });
				}
			});
		}
	} catch (error) {
		myError({  error });
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
				updateDoc(ref, { isCorrect: null });
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
				ATSwinner: ATSwinner,
				totalScore: totalScore
			});
			return { winnerAndLoser, ATSwinner };
			// // Update the team record
			// await updateTeamRecord(winnerAndLoser, teams, gameData);
		} else {
			myLog({
				msg: `game ${gameData.id} (${gameData.shortName}, ${gameData.date}) is NOT completed`
			});
		}
		// } else {
		// 	myLog(
		// 		`already stored winner of game ${gameData.id} (${gameData.shortName}, ${gameData.date})`
		// 	);
		// }
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
			return { winner: gameData.homeTeam.abbreviation, loser: gameData.awayTeam.abbreviation };
		} else if (scores.awayScoreData.winner === true) {
			return { winner: gameData.awayTeam.abbreviation, loser: gameData.homeTeam.abbreviation };
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
			return game.homeTeam.abbreviation;
		}
		// Home Team Favored, Doesn't Cover
		else if (homeScore + spread < awayScore) {
			return game.awayTeam.abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// Away Team Favored
	} else if (spread > 0) {
		// Away Team Favored, Covers
		if (awayScore - spread > homeScore) {
			return game.awayTeam.abbreviation;
		}
		// Away Team Favored, Doesn't Cover
		else if (awayScore - spread < homeScore) {
			return game.homeTeam.abbreviation;
		} else {
			return everyoneWinsResult;
		}
		// No team favored
	} else {
		// Home Team wins
		if (homeScore > awayScore) {
			return game.homeTeam.abbreviation;
			// Away Team wins
		} else if (awayScore > homeScore) {
			return game.awayTeam.abbreviation;
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
		const homeTeamRef = gameData.homeTeam.docRef;
		const awayTeamRef = gameData.awayTeam.docRef;
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
				updateDoc(teamDoc.withConverter(teamConverter), {
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
			updateDoc(teamDoc.withConverter(teamConverter), `records.${selectedYear}`, record);
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

			if (gameData.awayTeam.abbreviation === teamAbbreviation) {
				writeCount = await updateTeamRecord(
					gameData,
					gameRef,
					HomeOrAway.Away,
					wins,
					losses,
					ties,
					writeCount
				);
			} else if (gameData.homeTeam.abbreviation === teamAbbreviation) {
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
		newData.awayTeam.wins = wins;
		newData.awayTeam.losses = losses;
		newData.awayTeam.ties = ties;

		//** Update the doc if the record does NOT match the fresh ESPN data (don't write unnecessarily)
		// if (!doesExistingRecordMatchNewRecord(newData.awayTeam, gameData.awayTeam)) {
		await updateDoc(gameRef, {
			'awayTeam.wins': wins,
			'awayTeam.losses': losses,
			'awayTeam.ties': ties,
			'awayTeam.docRef': `/Teams/${gameData.awayTeam.abbreviation}`
		});
		writeCount++;
		// }
	} else {
		newData.homeTeam.wins = wins;
		newData.homeTeam.losses = losses;
		newData.homeTeam.ties = ties;

		//** Update the doc if the record does NOT match the fresh ESPN data (don't write unnecessarily)
		// if (!doesExistingRecordMatchNewRecord(newData.homeTeam, gameData.homeTeam)) {
		await updateDoc(gameRef, {
			'homeTeam.wins': wins,
			'homeTeam.losses': losses,
			'homeTeam.ties': ties,
			'homeTeam.docRef': `/Teams/${gameData.homeTeam.abbreviation}`
		});
		writeCount++;
		// }
	}
	return writeCount;
};

// export const doesExistingRecordMatchNewRecord = async (
// 	newTeamData: Team,
// 	existingTeamData: Team
// ) => {
// 	if (
// 		newTeamData.wins === existingTeamData.wins &&
// 		newTeamData.losses === existingTeamData.losses &&
// 		newTeamData.ties === existingTeamData.ties
// 	) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// };

export const resetWeeklyPlayerRecords = async (): Promise<void> => {
	try {
		const proceed = confirm('Are you sure you want to reset all Weekly Pool player records?');
		if (proceed) {
			const weekly_player_query = query(playersCollection, where('weekly', '==', true));
			const weekly_player = await getDocs(weekly_player_query);
			weekly_player.forEach((player) => {
				updateDoc(player.ref, {
					'weeklyPickRecord.total.wins': 0,
					'weeklyPickRecord.total.losses': 0,
					'weeklyPickRecord.week_1.wins': 0,
					'weeklyPickRecord.week_1.losses': 0,
					'weeklyPickRecord.week_2.wins': 0,
					'weeklyPickRecord.week_2.losses': 0,
					'weeklyPickRecord.week_3.wins': 0,
					'weeklyPickRecord.week_3.losses': 0,
					'weeklyPickRecord.week_4.wins': 0,
					'weeklyPickRecord.week_4.losses': 0,
					'weeklyPickRecord.week_5.wins': 0,
					'weeklyPickRecord.week_5.losses': 0,
					'weeklyPickRecord.week_6.wins': 0,
					'weeklyPickRecord.week_6.losses': 0,
					'weeklyPickRecord.week_7.wins': 0,
					'weeklyPickRecord.week_7.losses': 0,
					'weeklyPickRecord.week_8.wins': 0,
					'weeklyPickRecord.week_8.losses': 0,
					'weeklyPickRecord.week_9.wins': 0,
					'weeklyPickRecord.week_9.losses': 0,
					'weeklyPickRecord.week_10.wins': 0,
					'weeklyPickRecord.week_10.losses': 0,
					'weeklyPickRecord.week_11.wins': 0,
					'weeklyPickRecord.week_11.losses': 0,
					'weeklyPickRecord.week_12.wins': 0,
					'weeklyPickRecord.week_12.losses': 0,
					'weeklyPickRecord.week_13.wins': 0,
					'weeklyPickRecord.week_13.losses': 0,
					'weeklyPickRecord.week_14.wins': 0,
					'weeklyPickRecord.week_14.losses': 0,
					'weeklyPickRecord.week_15.wins': 0,
					'weeklyPickRecord.week_15.losses': 0,
					'weeklyPickRecord.week_16.wins': 0,
					'weeklyPickRecord.week_16.losses': 0,
					'weeklyPickRecord.week_17.wins': 0,
					'weeklyPickRecord.week_17.losses': 0,
					'weeklyPickRecord.week_18.wins': 0,
					'weeklyPickRecord.week_18.losses': 0
				});
				myLog({ msg: `reset records for ${player.data().name} (${player.id})` });
			});
		}
		defaultToast({
			title: `Successful Reset!`,
			msg: `${checkmark} All weekly pool player records have been reset.`
		});
	} catch (error) {
		myError({ error });
	}
};
