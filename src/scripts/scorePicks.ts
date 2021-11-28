import type {
	ESPNRecord,
	ESPNScore,
	ESPNTeamData,
	PrunedCompetition,
	RefOnlyESPN,
	Game
} from './classes/game';
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
	doc
} from 'firebase/firestore';
import { myLog, everyoneWinsResult, myError, checkmark, HomeOrAway, weeklyPoolFee, commishCost, webDevCost, hostingCost, maxRegularSeasonWeeks, weeklyPayout, firstPlaceWeeklySeasonPercent, secondPlaceWeeklySeasonPercent, thirdPlaceWeeklySeasonPercent } from './classes/constants';
import {
	scheduleCollection,
	usersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from './collections';
import {
	gameConverter,
	teamConverter,
	userConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from './converters';
import { defaultToast, errorToast } from './toasts';
import { teamsCollection } from './teams';
import type { Team } from './classes/team';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import { toast } from '@zerodevx/svelte-toast';
import type { WebUser } from './classes/webUser';
import type { UserRecord } from './classes/userRecord';
import { getStatus, getScores, convertToHttps } from './dataFetching';

// Score all picks for a given week
export const scorePicksForWeek = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
): Promise<void> => {
	try {
		const startingToastId = defaultToast({
			title: `Starting to Score Picks`,
			msg: `Updating game winners, scoring (net) tiebreakers, and updating user records...`,
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
		const userQuery = query(usersCollection, where('weekly', '==', true));
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
		const tiebreakers = await getDocs(tiebreakerQuery.withConverter(weeklyTiebreakerConverter));
		const users = await getDocs(userQuery.withConverter(userConverter));
		games.forEach((game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			updateGameandATSWinner(gameData, gameRef);
			scoreNetTiebreakers(gameData, tiebreakers, selectedWeek);
			markIfPickIsCorrect(picks, gameData);

			//TODO: add a function to compare & rank user records/break ties
		});
		users.forEach(async (user) => {
			const userRef = user.ref;
			// Get a fresh copy of the updated pick docs NOTE: (reads = 16 * # of users)
			const wheres: QueryConstraint[] = [
				where('week', '==', selectedWeek),
				where('year', '==', selectedYear),
				where('type', '==', seasonType),
				where('uid', '==', user.id)
			];
			const pickQuery = query(weeklyPicksCollection, ...wheres);
			const userPicks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
			await updateUserRecordForWeek(selectedWeek, userRef, userPicks);
			// const {totalWins, netTiebreaker, netTiebreakerAbsolute} = 
			// if(totalWins >= mostWins){
			// 	mostWins = totalWins
			// }
			// if(netTiebreakerAbsolute < smallestNetTiebreakerAbsolute){
			// 	smallestNetTiebreakerAbsolute = netTiebreakerAbsolute
			// }
		});
		// Get a fresh copy of the updated user docs
		const updatedUsers = await getDocs(userQuery.withConverter(userConverter));

		// Initialize variables to perform winner/tiebreaker comparisons
	let mostWins: number = 0
	let secondMostWins : number = 0
	let thirdMostWins : number = 0
	// Update weekly user season records
		updatedUsers.forEach(async (user) => {
			const userData = user.data();
			const userRef = user.ref;
			// TODO: Turn this into a cloud function trigger
			const totalWins = await updateWeeklyUserSeasonRecord(userRef, userData);

			if(totalWins > mostWins){
				mostWins = totalWins
			}else if(totalWins > secondMostWins){
				secondMostWins = totalWins
			}else if(totalWins > thirdMostWins){
				thirdMostWins = totalWins
			}
		});
		const firstPlacers = await findWeeklyUserSeasonLeaders(updatedUsers,mostWins)
		const secondPlacers = await findWeeklyUserSeasonLeaders(updatedUsers,secondMostWins)
		const thirdPlacers = await findWeeklyUserSeasonLeaders(updatedUsers,thirdMostWins)
		const paidWeeklyPlayers = updatedUsers.docs.filter(doc => doc.data().paidWeekly === true)
		const seasonTotalPrizePool =  paidWeeklyPlayers.length * weeklyPoolFee
		const seasonPrizePoolNetCosts = seasonTotalPrizePool - commishCost - webDevCost - hostingCost - (maxRegularSeasonWeeks * weeklyPayout)
		let firstPlacePrize: number
		let secondPlacePrize:number
		let thirdPlacePrize :number

		if(firstPlacers.length === 1){
			firstPlacePrize = seasonPrizePoolNetCosts * (firstPlaceWeeklySeasonPercent)
			if(secondPlacers.length === 1){
				secondPlacePrize = seasonPrizePoolNetCosts * (secondPlaceWeeklySeasonPercent)
				thirdPlacePrize = seasonPrizePoolNetCosts * (thirdPlaceWeeklySeasonPercent) / thirdPlacers.length
			}else if(secondPlacers.length >= 2){
				secondPlacePrize = seasonPrizePoolNetCosts * (secondPlaceWeeklySeasonPercent) / secondPlacers.length
				thirdPlacePrize = 0
			}
		}else if(firstPlacers.length === 2){
			firstPlacePrize = seasonPrizePoolNetCosts * (firstPlaceWeeklySeasonPercent +secondPlaceWeeklySeasonPercent) / 2
			secondPlacePrize= seasonPrizePoolNetCosts * thirdPlaceWeeklySeasonPercent / secondPlacers.length
			thirdPlacePrize = 0
		}else if(firstPlacers.length>=3){
			firstPlacePrize = seasonPrizePoolNetCosts * (firstPlaceWeeklySeasonPercent +secondPlaceWeeklySeasonPercent + thirdPlaceWeeklySeasonPercent) / firstPlacers.length
			secondPlacePrize = 0
			thirdPlacePrize = 0
		}

		toast.pop(startingToastId);
		defaultToast({
			title: `Scored Week ${selectedWeek} Picks!`,
			msg: `Successfully scored each user's picks for Week ${selectedWeek}, ${selectedYear}.`
		});
	} catch (error) {
		myError('scorePicks', error);
	}
};

export const findWeeklyUserSeasonLeaders = async (users: QuerySnapshot<WebUser>, comparisonWinCount: number) => {
	let leaders : DocumentReference[]
	users.docs.filter(doc=> {
		const totalWeeklyWins = doc.data().totalWeeklyWins
		if(totalWeeklyWins === comparisonWinCount){
			leaders.push(doc.ref)
		}
	})
	return leaders
}

/**
 * 
 * @param mostWins - The highest win total found when scoring the week
 * @param smallesNetTiebreakerAbsolute - The smallest net tiebreaker (closest to actual score in either direction) found when scoring the week
 * @param greatestNetTiebreaker - The greatest net tiebreaker ()
 */
export const findWeeklyUserWinners = (mostWins: number, smallestNetTiebreakerAbsolute: number, greatestNetTiebreaker:number) => {

}

export const updateWeeklyUserSeasonRecord = async (userRef: DocumentReference, userData: WebUser) => {
	let totalWins = 0;
	let totalLosses = 0;
	let netTiebreaker = 0
	let netTiebreakerAbsolute = 0
	const weekRecords: UserRecord[] = Object.values(userData.weeklyPickRecord);
	// Add each week's wins/losses to the the user's total season wins/losses
	for await (const week of weekRecords) {
		totalWins = +week.wins;
		totalLosses = +week.losses;
		netTiebreaker= week.netTiebreaker
		netTiebreakerAbsolute = week.netTiebreakerAbsolute
	}
	await updateDoc(userRef, {
		totalWeeklyWins: totalWins,
		totalWeeklyLosses: totalLosses
	});
	return totalWins // Return wins to compare who has the best record
};
export const updateUserRecordForWeek = async (
	selectedWeek: number,
	userRef: DocumentReference,
	userPicks: QuerySnapshot<WeeklyPickDoc>
) => {
	const correctPicks = userPicks.docs.filter((doc) => doc.data().isCorrect === true);
	const incorrectPicks = userPicks.docs.filter((doc) => doc.data().isCorrect === false);
	await updateDoc(userRef, {
		[`weeklyPickRecord.week_${selectedWeek}.wins`]: correctPicks.length,
		[`weeklyPickRecord.week_${selectedWeek}.losses`]: incorrectPicks.length
	});
};
export const markIfPickIsCorrect = async (
	picks: QuerySnapshot<WeeklyPickDoc>,
	gameData: Game
	// selectedWeek: number
) => {
	try {
		picks.forEach((pick) => {
			const pickData = pick.data();
			const pickRef = pick.ref;
			// const uid = pickData.uid;
			// const userRef = doc(usersCollection, uid);
			// if (pickData.isCorrect === null || pickData.isCorrect === undefined) {
			if (pickData.gameId === gameData.id) {
				if (gameData.ATSwinner === pickData.pick || gameData.ATSwinner === everyoneWinsResult) {
					updateDoc(pickRef, { isCorrect: true });
				} else {
					updateDoc(pickRef, { isCorrect: false });
				}
				myLog('scored pick');
			}
			// } else {
			// 	myLog('pick has already been scored!');
			// }
		});
	} catch (error) {
		myError('updateUserRecords', error);
	}
};
export const scoreNetTiebreakers = async (
	gameData: Game,
	tiebreakers: QuerySnapshot<WeeklyTiebreaker>,
	selectedWeek: number
) => {
	try {
		if (gameData.isLastGameOfWeek && gameData.winner) {
			myLog(`last game of the week: ${gameData.shortName}, totalScore: ${gameData.totalScore}`);
			tiebreakers.forEach((tiebreaker) => {
				const tiebreakerData = tiebreaker.data();
				const uid = tiebreakerData.uid;
				if (tiebreakerData.tiebreaker) {
					const netTiebreaker = gameData.totalScore - tiebreakerData.tiebreaker;
					const netTiebreakerAbsolute = Math.abs(netTiebreaker);
					const userDocRef = doc(usersCollection, uid);
					// store netTiebreakers on the USER document; easier for scoreboard
					updateDoc(userDocRef, {
						[`weeklyPickRecord.week_${selectedWeek}.netTiebreaker`]: netTiebreaker,
						[`weeklyPickRecord.week_${selectedWeek}.netTiebreakerAbsolute`]: netTiebreakerAbsolute
					});
				} else {
					myLog('no tiebreaker posted');
				}
			});
		}
	} catch (error) {
		myError('scoreNetTiebreakers', error);
	}
};

export const resetScoredPicksForWeek = async (
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
			`Are you sure you want to nullify the 'isCorrect' field from each user's picks for Week ${selectedWeek}?`
		);
		if (proceed) {
			const pickQuery = query(weeklyPicksCollection, ...wheres);
			const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));

			picks.forEach((pick) => {
				const ref = pick.ref;
				updateDoc(ref, { isCorrect: null });
			});
			defaultToast({
				title: 'Removed Picks!',
				msg: 'Successfully removed previously scored picks for the selected week.'
			});
		}
	} catch (error) {
		myError('removeScoredPicksForWeek', error);
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
			myLog(`updating game ${gameData.id}...`);
			await updateGameandATSWinner(gameData, gameRef);
		});
		defaultToast({
			title: `Completed!`,
			msg: `Winners have been added/updated to each game document.`
		});
	} catch (error) {
		myError('updateGamesAndATSWinners', error);
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
			myLog(`${gameData.id} completed: ${statusData.type.completed}`);

			const spread: number = gameData.spread;
			const scores = await getScores(competitions);
			const homeScore: number = scores.homeScoreData.value;
			const awayScore: number = scores.awayScoreData.value;
			const winnerAndLoser = await findWinnerAndLoser(scores, gameData);
			const ATSwinner = await findATSWinner(gameData, homeScore, awayScore, spread);
			const totalScore = homeScore + awayScore;
			myLog(
				`winner: ${winnerAndLoser?.winner}, ATSwinner: ${ATSwinner}, spread: ${spread}, total score: ${totalScore}`
			);
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
			myLog(`game ${gameData.id} (${gameData.shortName}, ${gameData.date}) is NOT completed`);
		}
		// } else {
		// 	myLog(
		// 		`already stored winner of game ${gameData.id} (${gameData.shortName}, ${gameData.date})`
		// 	);
		// }
	} catch (error) {
		myError('updatedGameWinner', error);
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
		myError('findWinnerAndLoser', error);
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
		myError('removeWinnersFromGames', error);
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

		myLog('teamsData', null, null, teamsData);
		myLog('Retrieving Team Record Data from ESPN:');

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

			myLog(`${teamAbbreviation} || wins: ${wins}, losses: ${losses}, ties: ${ties}`);

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
		myLog(`made ${writeCount} writes to update the records on team and game documents`);
	} catch (error) {
		myError('updateTeamRecordsFromESPN', error);
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
		myError('updateTeamRecordOnGameDocs', error);
		errorToast(`Unable to update team record on game doc.`);
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

export const resetWeeklyUserRecords = async (): Promise<void> => {
	try {
		const proceed = confirm('Are you sure you want to reset all Weekly Pool user records?');
		if (proceed) {
			const weeklyUserQuery = query(usersCollection, where('weekly', '==', true));
			const weeklyUsers = await getDocs(weeklyUserQuery);
			weeklyUsers.forEach((user) => {
				updateDoc(user.ref, {
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
				myLog(`reset records for ${user.data().name} (${user.id})`);
			});
		}
		defaultToast({
			title: `Successful Reset!`,
			msg: `${checkmark} All weekly pool user records have been reset.`
		});
	} catch (error) {
		myError('resetWeeklyUserRecords', error);
	}
};
