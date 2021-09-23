import type { Game } from './classes/game';
import type { DocumentReference, QuerySnapshot } from '@firebase/firestore';
import { myLog, everyoneWinsResult, myError } from './classes/constants';
import { scheduleCollection, weeklyPicksCollection } from './collections';
import { gameConverter, teamConverter, weeklyPickConverter } from './converters';
import { getStatus, getScores } from './functions';
import { defaultToast, errorToast } from './toasts';
import { updateDoc, getDocs, query, where, QueryConstraint, increment } from '@firebase/firestore';
import { teamsCollection } from './teams';
import type { Team } from './classes/team';

// Score all picks for a given week
export const scorePicksForWeek = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
) => {
	try {
		const wheres: QueryConstraint[] = [
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear),
			where('type', '==', seasonType)
		];
		const gameQuery = query(scheduleCollection, ...wheres);
		const pickQuery = query(weeklyPicksCollection, ...wheres);
		const teamQuery = query(teamsCollection);
		const games = await getDocs(gameQuery.withConverter(gameConverter));
		const picks = await getDocs(pickQuery.withConverter(weeklyPickConverter));
		const teams = await getDocs(teamQuery.withConverter(teamConverter));
		games.forEach((game) => {
			const gameData = game.data();
			const ref = game.ref;
			if (!gameData.winner) {
				updateGameWinner(gameData, ref, teams);
			} else {
				myLog('already stored winners');
			}
			picks.forEach((pick) => {
				const pickData = pick.data();
				const ref = pick.ref;
				if (pickData.isCorrect === null || pickData.isCorrect === undefined) {
					if (pickData.id === game.id) {
						if (gameData.ATSwinner === pickData.pick || gameData.ATSwinner === everyoneWinsResult) {
							updateDoc(ref, { isCorrect: true });
						} else {
							updateDoc(ref, { isCorrect: false });
						}
						myLog('scored pick');
					}
				} else {
					myLog('pick has already been scored!');
				}
			});
		});
		// await updateTeamsOnPickDocs(selectedWeek,selectedYear,seasonType)
		defaultToast({
			title: `Scored Week ${selectedWeek} Picks!`,
			msg: `Successfully scored each user's picks for the selected week.`
		});
	} catch (error) {
		myError('scorePicks', error);
	}
};
export const removeScoredPicksForWeek = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
) => {
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

export const updateGameWinner = async (
	gameData: Game,
	ref: DocumentReference,
	teams: QuerySnapshot<Team>
) => {
	try {
		const competitions: any[] = gameData.competitions;
		const statusData = await getStatus(competitions);
		if (statusData.type?.completed) {
			myLog(`${gameData.id} completed: ${statusData.type.completed}`);

			const spread = gameData.spread;
			const scores = await getScores(competitions);
			const homeScore: number = scores.homeScoreData.value;
			const awayScore: number = scores.awayScoreData.value;
			const winnerAndLoser = await findWinnerAndLoser(scores, gameData);
			const ATSwinner = await findATSWinner(gameData, homeScore, awayScore, spread);
			myLog(`winner: ${winnerAndLoser?.winner}, ATSwinner: ${ATSwinner}, spread: ${spread}`);
			await updateDoc(ref, { winner: winnerAndLoser?.winner, ATSwinner: ATSwinner });

			// Update the team record
			await updateTeamRecord(winnerAndLoser, teams, gameData);
		} else {
			myLog(`${gameData.id} is NOT completed`);
		}
	} catch (error) {
		myError('updatedGameWinner', error);
	}
};

export const findWinnerAndLoser = async (
	scores: { homeScoreData: { winner: boolean }; awayScoreData: { winner: boolean } },
	gameData: Game
) => {
	try {
		if (scores.homeScoreData.winner === true) {
			return { winner: gameData.homeTeam.abbreviation, loser: gameData.awayTeam.abbreviation };
		} else if (scores.awayScoreData.winner === true) {
			return { winner: gameData.awayTeam.abbreviation, loser: gameData.homeTeam.abbreviation };
		} else {
			return null;
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
) => {
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
) => {
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

export const incrementTies = async (teamRef: DocumentReference) => {
	await updateDoc(teamRef, { ties: increment(1) });
};
export const incrementWins = async (teamRef: DocumentReference) => {
	await updateDoc(teamRef, { wins: increment(1) });
};
export const incrementLosses = async (teamRef: DocumentReference) => {
	await updateDoc(teamRef, { losses: increment(1) });
};
export const removeWinnersFromGames = async (
	selectedWeek: number,
	selectedYear = new Date().getFullYear(),
	seasonType = 'Regular Season'
) => {
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
) => {
	try {
		const wheres = [where('year', '==', selectedYear), where('type', '==', seasonType)];
		const gamesQuery = query(scheduleCollection, ...wheres);
		const teamQuery = query(teamsCollection);
		const games = await getDocs(gamesQuery.withConverter(gameConverter));
		const teams = await getDocs(teamQuery.withConverter(teamConverter));
		games.forEach((game) => {
			const gameData = game.data();
			const gameRef = game.ref;
			teams.forEach((team) => {
				const teamData = team.data();
				const teamID = team.id;
				if (gameData.awayTeam.abbreviation === teamID) {
					updateDoc(gameRef, { awayTeam: { ...teamData } });
				}
				if (gameData.homeTeam.abbreviation === teamID) {
					updateDoc(gameRef, { homeTeam: { ...teamData } });
				}
			});
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
