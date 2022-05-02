import { myLog, myError } from '$lib/scripts/classes/constants';
import { Game } from '$lib/scripts/classes/game';
import { WeeklyPickDoc } from '$lib/scripts/classes/picks';
import type { Player } from '$lib/scripts/classes/player';
import {
	scheduleCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from '$lib/scripts/collections';
import {
	gameConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '$lib/scripts/converters';
import { defaultToast, errorToast } from '$lib/scripts/toasts';
import { getWeeklyPlayers } from './weeklyPlayers';
import { updateDoc, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import type { QueryConstraint } from 'firebase/firestore';
import { findCurrentWeekOfSchedule } from '$lib/scripts/schedule';
import { getConsensusSpread } from '$lib/scripts/dataFetching';
import { toast } from '@zerodevx/svelte-toast';

export const getAllGames = async (showToast = true) => {
	try {
		const games: Game[] = [];
		const q = query(scheduleCollection);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		querySnapshot.forEach((doc) => {
			const docRef = doc.ref;
			const id = doc.id;
			const game = new Game({ id, docRef, ...doc.data() });
			games.push(game);
		});
		const title = 'Got All Games!';
		const msg = 'Retrieved all game documents from the Schedule collection.';
		if (showToast) {
			defaultToast({ title, msg });
		}
		myLog(msg, 'getAllGames');
		return games;
	} catch (error) {
		const msg = `Encountered an error while trying to get all game documents.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('getAllGames', error, msg);
	}
};
export const getSpecificGames = async (
	selectedWeek: number,
	selectedYear: number,
	showToast = false
) => {
	try {
		const games: Game[] = [];
		const wheres = [where('week', '==', selectedWeek), where('year', '==', selectedYear)];
		const q = query(scheduleCollection, ...wheres);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		querySnapshot.forEach((doc) => {
			const docRef = doc.ref;
			const id = doc.id;
			const game = new Game({ id, docRef, ...doc.data() });
			games.push(game);
		});
		const title = `Got Games for Week ${selectedWeek}, ${selectedYear}!`;
		const msg = 'Retrieved all specified game documents from the Schedule collection.';
		if (showToast) {
			defaultToast({ title, msg });
		}
		myLog(msg, 'getSpecificGames');
		return games;
	} catch (error) {
		const msg = `Encountered an error while trying to get a specific week/year of game documents.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('getSpecificGames', error, msg);
	}
};
const getMaxGameWeek = async (): Promise<number> => {
	try {
		const weeklyGames = await getAllGames(false);
		const gameWeeks = weeklyGames.map((game) => {
			return game.week;
		});
		const maxWeek: number = Math.max(...gameWeeks);
		const msg = `determined the max game week was ${maxWeek}`;
		myLog(msg, 'getMaxGameWeek');
		return maxWeek;
	} catch (error) {
		const msg = `Encountered an error while finding max game week.`;
		errorToast(msg);
		myError('getMaxGameWeek', error, msg);
	}
};

export const createWeeklyPicksForAllPlayers = async () => {
	try {
		const weeklyPlayers = await getWeeklyPlayers();
		const games = await getAllGames();
		for await (const player of weeklyPlayers) {
			await createWeeklyPicksForPlayer(player, true, false, games);
		}
		const title = 'Created Weekly Picks!';
		const msg = 'Pick documents were created for every game, for every Weekly pool player.';
		defaultToast({ title, msg });
		myLog(msg, 'createWeeklyPicksForPlayer');
	} catch (error) {
		const msg = `Encountered an error while trying to create all players' picks.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('createWeeklyPicksForAllPlayers', error, msg);
	}
};

//TODO: Move to a triggered Cloud Function when a player joins the Weekly pool
export const createWeeklyPicksForPlayer = async (
	player: Player,
	logAll = true,
	showToast = true,
	games?: Game[],
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		if (!games && !selectedWeek && !selectedYear) {
			games = await getAllGames(showToast);
		} else if (!games && selectedWeek && selectedYear) {
			games = await getSpecificGames(selectedWeek, selectedYear);
		}
		for await (const game of games) {
			const newWeeklyPickRef = doc(weeklyPicksCollection);
			const pickDoc = new WeeklyPickDoc({
				docRef: newWeeklyPickRef,
				gameId: game.id,
				pick: '',
				uid: player.uid,
				week: game.week,
				year: game.timestamp.toDate().getFullYear(),
				timestamp: game.timestamp,
				name: player.name,
				nickname: player.nickname,
				type: game.type,
				isCorrect: null
			});
			setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
		}
		const title = 'Created Weekly Picks!';
		const msg = `Pick documents were created for every game for ${player.name} (${player.nickname})`;
		if (logAll) {
			myLog(msg, 'createWeeklyPicksForPlayer');
		}
		if (showToast) {
			defaultToast({ title, msg });
		}
	} catch (error) {
		const msg = `Encountered an error while trying to create ${player.name}'s picks.  Check the console for more info. ${error}`;
		if (logAll) {
			errorToast(msg);
			myError('createWeeklyPicksForPlayer', error, msg);
		} else {
			throw error;
		}
	}
};

export const deleteWeeklyPicksForAllPlayers = async () => {
	try {
		const q = query(weeklyPicksCollection);
		const allWeeklyDocs = await getDocs(q);
		allWeeklyDocs.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = 'All pick documents were deleted.';
		defaultToast({ title, msg });
		myLog(msg, 'deleteWeeklyPicksForAllPlayers');
	} catch (error) {
		const msg = `Encountered an error while trying to delete all players's picks.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyPicksForAllPlayers', error, msg);
	}
};
export const deleteWeeklyPicksForPlayer = async (
	player: Player,
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		if (!selectedWeek) {
			selectedWeek = await findCurrentWeekOfSchedule();
		}
		if (!selectedYear) {
			selectedYear = new Date().getFullYear();
		}
		const wheres = [
			where('uid', '==', player.uid),
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear)
		];
		const q = query(weeklyPicksCollection, ...wheres);
		const allWeeklyDocsForPlayer = await getDocs(q);
		allWeeklyDocsForPlayer.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = `All pick documents were deleted for ${player.name} (${player.nickname})`;
		defaultToast({ title, msg });
		myLog(msg, 'deleteWeeklyPicksForPlayer');
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${player.name}'s picks. Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyPicksForPlayer', error, msg);
	}
};
export const createTiebreakersForAllPlayers = async () => {
	try {
		const weeklyPlayers = await getWeeklyPlayers();
		weeklyPlayers.forEach((player) => {
			createTiebreakersForPlayer(player, undefined, undefined, false);
		});
		const title = 'Created Tiebreakers!';
		const msg = 'Tiebreaker documents were created for every game, for every Weekly pool player.';
		defaultToast({ title, msg });
		myLog(msg, 'createTiebreakersForAllPlayers');
	} catch (error) {
		const msg = `Encountered an error while trying to create all players' tiebreaker documents.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('createTiebreakersForAllPlayers', error, msg);
	}
};
export const createTiebreakersForPlayer = async (
	player: Player,
	selectedWeek?: number,
	selectedYear?: number,
	logAll = true
) => {
	try {
		const uid = player.uid;
		if (!selectedYear) {
			selectedYear = new Date().getFullYear();
		}
		if (!selectedWeek) {
			const maxWeek = await getMaxGameWeek();
			for await (const week of Array(maxWeek).keys()) {
				const selectedWeek = week;
				await setNewTiebreakerDoc(uid, selectedWeek, selectedYear);
			}
		} else {
			await setNewTiebreakerDoc(uid, selectedWeek, selectedYear);
		}

		if (logAll) {
			myLog(`set tiebreaker for ${player.name} (${player.nickname})`);
		}
	} catch (error) {
		const msg = `Encountered an error while trying to create tiebreaker documents for ${player.name} (${player.nickname})`;
		errorToast(msg);
		myError('createTiebreakersForAllPlayers', error, msg);
	}
};
export const setNewTiebreakerDoc = async (
	uid: string,
	selectedWeek: number,
	selectedYear: number,
	type = 'Regular Season',
	scoreGuess = null
) => {
	const docRef = doc(weeklyTiebreakersCollection);
	try {
		await setDoc(docRef.withConverter(weeklyTiebreakerConverter), {
			scoreGuess,
			docRef,
			uid,
			type,
			week: selectedWeek,
			year: selectedYear
		});
		myLog(`set tiebreaker doc (${docRef}); uid: ${uid}, week ${selectedWeek}, ${selectedYear}`);
	} catch (error) {
		myError(
			'setTiebreakerDoc',
			error,
			`unable to update tiebreaker ${docRef.path} for player ${uid}`
		);
		errorToast(
			`We encountered an error while trying to set tiebreaker docs.  Please contact your admin with the following information: <br> ${error}`
		);
	}
};
export const deleteTiebreakersForAllPlayers = async () => {
	try {
		const proceed = confirm(
			'Are you sure you want to delete all picks for all players?  This is not reversible.'
		);
		if (proceed) {
			const q = query(weeklyTiebreakersCollection);
			const allWeeklyDocs = await getDocs(q);
			allWeeklyDocs.forEach((doc) => {
				deleteDoc(doc.ref);
			});
			const title = 'Deleted Weekly Tiebreakers!';
			const msg = 'All tiebreaker documents were deleted.';
			defaultToast({ title, msg });
			myLog(msg, 'deleteWeeklyTiebreakersForAllPlayers');
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete all players's tiebreakers.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyTiebreakersForAllPlayers', error, msg);
	}
};
export const deleteTiebreakersForPlayer = async (
	player: Player,
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		const proceed = confirm(
			`Are you sure you want to delete tiebreakers for ${player.name} (${player.nickname})? ${
				selectedWeek ? `for ${selectedWeek},` : ''
			} ${selectedYear ? selectedYear : ''}`
		);
		if (proceed) {
			const wheres: QueryConstraint[] = [where('uid', '==', player.uid)];
			if (selectedWeek) {
				wheres.push(where('week', '==', selectedWeek));
			}
			if (selectedYear) {
				wheres.push(where('year', '==', selectedYear));
			}
			const q = query(weeklyTiebreakersCollection, ...wheres);
			const playerTiebreakerDocs = await getDocs(q.withConverter(weeklyPickConverter));
			playerTiebreakerDocs.forEach((doc) => deleteDoc(doc.ref));
			const title = `Deleted Weekly Tiebreakers for ${player.name}!`;
			const msg = `All tiebreaker documents were deleted ${
				selectedWeek && selectedYear ? `for Week ${selectedWeek}, ${selectedYear}` : null
			}.`;
			defaultToast({ title, msg });
			myLog(msg, 'deleteWeeklyTiebreakersForPlayer');
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${player.name}'s tiebreakers.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyTiebreakersForPlayer', error, msg);
	}
};
export const updateGameSpreads = async (week: number, year: number) => {
	try {
		const startToast = defaultToast({
			title: 'Updating spreads...',
			msg: `Getting consensus spreads from ESPN...`
		});
		// Update the pick game objects on the pick documents?
		const q = query(scheduleCollection, where('week', '==', week), where('year', '==', year));
		const games = await getDocs(q.withConverter(gameConverter));
		for await (const gameDoc of games.docs) {
			const gameData = gameDoc.data();
			if (gameData.spread === null || gameData.spread === undefined) {
				myLog(`no spread found for game id:${gameData.id}`);
				const updatedSpread = await getConsensusSpread(gameData.id);
				updateDoc(gameDoc.ref, { spread: updatedSpread });
			} else {
				myLog(`existing spread found for game (${gameData.id}) was: ${gameData.spread}`);
			}
		}
		toast.pop(startToast);
		defaultToast({
			title: 'Updated Spreads!',
			msg: `Week ${week} spreads were successfully updated!`
		});
	} catch (error) {
		errorToast('Failed to update spreads.  See console logs.');
		myError('updateSpreads', error);
	}
};

export const fixAllTiebreakers = async () => {
	const q = query(weeklyTiebreakersCollection);
	const tiebreakerDocs = await getDocs(q.withConverter(weeklyTiebreakerConverter));
	for await (const doc of tiebreakerDocs.docs) {
		const ref = doc.ref;
		const data = doc.data();

		// Do stuff
		alert('thankfully, nothing happened');
	}
};
