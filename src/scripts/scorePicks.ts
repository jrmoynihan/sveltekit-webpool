import type { Game } from './classes/game';
import type { DocumentReference, QuerySnapshot, QueryConstraint } from '@firebase/firestore';
import { myLog, everyoneWinsResult, myError, checkmark } from './classes/constants';
import {
	scheduleCollection,
	usersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from './collections';
import {
	gameConverter,
	teamConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from './converters';
import { getStatus, getScores } from './functions';
import { defaultToast, errorToast } from './toasts';
import { updateDoc, getDocs, query, where, increment, doc } from '@firebase/firestore';
import { teamsCollection } from './teams';
import type { Team } from './classes/team';
import { getWeeklyUsers } from './weeklyUsers';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';

// Score all picks for a given week
export const scorePicksForWeek = async (
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
		const gameQuery = query(scheduleCollection, ...wheres);
		const pickQuery = query(weeklyPicksCollection, ...wheres);
		const tiebreakerQuery = query(weeklyTiebreakersCollection, ...wheres);
		const teamQuery = query(teamsCollection);
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
		const tiebreakers = await getDocs(tiebreakerQuery.withConverter(weeklyTiebreakerConverter));
		const teams = await getDocs(teamQuery.withConverter(teamConverter));

		games.forEach((game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			if (!gameData.winner) {
				updateGameandATSWinner(gameData, gameRef, teams);
			} else {
				myLog(
					`already stored winner of game ${gameData.id} (${gameData.shortName}, ${gameData.date})`
				);
			}
			scoreNetTiebreakers(gameData, tiebreakers, selectedWeek);
			updateUserRecords(picks, gameData, selectedWeek);
		});

		defaultToast({
			title: `Scored Week ${selectedWeek} Picks!`,
			msg: `Successfully scored each user's picks for the selected week.`
		});
	} catch (error) {
		myError('scorePicks', error);
	}
};
export const updateUserRecords = async (
	picks: QuerySnapshot<WeeklyPickDoc>,
	gameData: Game,
	selectedWeek: number
) => {
	try {
		picks.forEach((pick) => {
			const pickData = pick.data();
			const pickRef = pick.ref;
			const uid = pickData.uid;
			const userRef = doc(usersCollection, uid);
			if (pickData.isCorrect === null || pickData.isCorrect === undefined) {
				if (pickData.id === gameData.id) {
					if (gameData.ATSwinner === pickData.pick || gameData.ATSwinner === everyoneWinsResult) {
						updateDoc(pickRef, { isCorrect: true });
						updateDoc(userRef, {
							'weeklyPickRecord.total.wins': increment(1),
							[`weeklyPickRecord.week_${selectedWeek}.wins`]: increment(1)
						});
					} else {
						updateDoc(pickRef, { isCorrect: false });
						updateDoc(userRef, {
							'weeklyPickRecord.total.losses': increment(1),
							[`weeklyPickRecord.week_${selectedWeek}.losses`]: increment(1)
						});
					}
					myLog('scored pick');
				}
			} else {
				myLog('pick has already been scored!');
			}
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

export const removeScoredPicksForWeek = async (
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
		}
		defaultToast({
			title: 'Removed Picks!',
			msg: 'Successfully removed previously scored picks for the selected week.'
		});
	} catch (error) {
		myError('removeScoredPicksForWeek', error);
	}
};

export const updateGameandATSWinner = async (
	gameData: Game,
	gameRef: DocumentReference,
	teams: QuerySnapshot<Team>
): Promise<void> => {
	try {
		const competitions: any[] = gameData.competitions;
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
				ATSwinner: ATSwinner,
				totalScore: totalScore
			});

			// Update the team record
			await updateTeamRecord(winnerAndLoser, teams, gameData);
		} else {
			myLog(`game ${gameData.id} (${gameData.shortName}, ${gameData.date}) is NOT completed`);
		}
	} catch (error) {
		myError('updatedGameWinner', error);
	}
};

export const findWinnerAndLoser = async (
	scores: { homeScoreData: { winner: boolean }; awayScoreData: { winner: boolean } },
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
export const updateTeamRecord = async (
	winnerAndLoser: { winner: string; loser: string },
	teams: QuerySnapshot<Team>,
	gameData: Game
): Promise<void> => {
	// Update for ties
	if (winnerAndLoser === null) {
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
export const updateTeamsOnScheduleDocs = async (
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
): Promise<void> => {
	try {
		const wheres = [where('year', '==', selectedYear), where('type', '==', seasonType)];
		const gamesQuery = query(scheduleCollection, ...wheres);
		const teamQuery = query(teamsCollection);
		const games = await getDocs(gamesQuery.withConverter(gameConverter));
		const teams = await getDocs(teamQuery.withConverter(teamConverter));
		games.forEach(async (game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			const competitions: any[] = gameData.competitions;
			const scores = await getScores(competitions);
			const winnerAndLoser = await findWinnerAndLoser(scores, gameData);
			await updateTeamRecord(winnerAndLoser, teams, gameData);
			// Then update the team document data
			for await (const team of teams.docs) {
				const teamData = team.data();
				const teamID = team.id;
				if (gameData.awayTeam.abbreviation === teamID) {
					updateDoc(gameRef, { awayTeam: { ...teamData } });
				}
				if (gameData.homeTeam.abbreviation === teamID) {
					updateDoc(gameRef, { homeTeam: { ...teamData } });
				}
			}
		});
		defaultToast({
			title: 'Updated Teams!',
			msg: 'Successfully updated teams on scheduled game documents!'
		});
	} catch (error) {
		errorToast('Error updating teams on scheduled game documents!');
		myError('updateTeamsOnScheduleDocs', error);
	}
};

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
