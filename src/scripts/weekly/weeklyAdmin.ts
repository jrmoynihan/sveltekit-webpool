import { myLog, myError, okHand } from '$scripts/classes/constants';
import { Game } from '$scripts/classes/game';
import { WeeklyPickDoc } from '$scripts/classes/picks';
import type { WebUser } from '$scripts/classes/webUser';
import {
	scheduleCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from '$scripts/collections';
import { gameConverter, weeklyPickConverter, weeklyTiebreakerConverter } from '$scripts/converters';
import { defaultToast, errorToast } from '$scripts/toasts';
import { getWeeklyUsers } from './weeklyUsers';
import { updateDoc, deleteDoc, doc, getDocs, query, setDoc, where } from '@firebase/firestore';
import type { QueryConstraint } from '@firebase/firestore';
import { findCurrentWeekOfSchedule } from '$scripts/schedule';
import { getConsensusSpread } from '$scripts/functions';

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
		const maxWeek: number = Math.max.apply(Math, gameWeeks);
		const msg = `determined the max game week was ${maxWeek}`;
		myLog(msg, 'getMaxGameWeek');
		return maxWeek;
	} catch (error) {
		let msg = `Encountered an error while finding max game week.`;
		errorToast(msg);
		myError('getMaxGameWeek', error, msg);
	}
};

export const createWeeklyPicksForAllUsers = async () => {
	try {
		const weeklyUsers = await getWeeklyUsers();
		const games = await getAllGames();
		for await (const user of weeklyUsers) {
			await createWeeklyPicksForUser(user, true, false, games);
		}
		const title = 'Created Weekly Picks!';
		const msg = 'Pick documents were created for every game, for every Weekly pool user.';
		defaultToast({ title, msg });
		myLog(msg, 'createWeeklyPicksForUser');
	} catch (error) {
		const msg = `Encountered an error while trying to create all users' picks.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('createWeeklyPicksForAllUsers', error, msg);
	}
};

//TODO: Move to a triggered Cloud Function when a user joins the Weekly pool
export const createWeeklyPicksForUser = async (
	user: WebUser,
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
				uid: user.id,
				week: game.week,
				year: game.timestamp.toDate().getFullYear(),
				timestamp: game.timestamp,
				name: user.name,
				nickname: user.nickname,
				type: game.type,
				isCorrect: null
			});
			setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
		}
		const title = 'Created Weekly Picks!';
		const msg = `Pick documents were created for every game for ${user.name} (${user.nickname})`;
		if (logAll) {
			myLog(msg, 'createWeeklyPicksForUser');
		}
		if (showToast) {
			defaultToast({ title, msg });
		}
	} catch (error) {
		const msg = `Encountered an error while trying to create ${user.name}'s picks.  Check the console for more info. ${error}`;
		if (logAll) {
			errorToast(msg);
			myError('createWeeklyPicksForUser', error, msg);
		} else {
			throw error;
		}
	}
};

export const deleteWeeklyPicksForAllUsers = async () => {
	try {
		const q = query(weeklyPicksCollection);
		const allWeeklyDocs = await getDocs(q);
		allWeeklyDocs.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = 'All pick documents were deleted.';
		defaultToast({ title, msg });
		myLog(msg, 'deleteWeeklyPicksForAllUsers');
	} catch (error) {
		const msg = `Encountered an error while trying to delete all user's picks.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyPicksForAllUsers', error, msg);
	}
};
export const deleteWeeklyPicksForUser = async (
	user: WebUser,
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
			where('uid', '==', user.id),
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear)
		];
		const q = query(weeklyPicksCollection, ...wheres);
		const allWeeklyDocsForUser = await getDocs(q);
		allWeeklyDocsForUser.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = `All pick documents were deleted for ${user.name} (${user.nickname})`;
		defaultToast({ title, msg });
		myLog(msg, 'deleteWeeklyPicksForUser');
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${user.name}'s picks. Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyPicksForUser', error, msg);
	}
};
export const createTiebreakersForAllUsers = async () => {
	try {
		const weeklyUsers = await getWeeklyUsers();
		weeklyUsers.forEach((user) => {
			createTiebreakersForUser(user, undefined, undefined, false);
		});
		const title = 'Created Tiebreakers!';
		const msg = 'Tiebreaker documents were created for every game, for every Weekly pool user.';
		defaultToast({ title, msg });
		myLog(msg, 'createTiebreakersForAllUsers');
	} catch (error) {
		const msg = `Encountered an error while trying to create all users' tiebreaker documents.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('createTiebreakersForAllUsers', error, msg);
	}
};
export const createTiebreakersForUser = async (
	user: WebUser,
	selectedWeek?: number,
	selectedYear?: number,
	logAll: boolean = true
) => {
	try {
		const uid = user.id;
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
			myLog(`set tiebreaker for ${user.name} (${user.nickname})`);
		}
	} catch (error) {
		const msg = `Encountered an error while trying to create tiebreaker documents for ${user.name} (${user.nickname})`;
		errorToast(msg);
		myError('createTiebreakersForAllUsers', error, msg);
	}
};
export const setNewTiebreakerDoc = async (
	uid: string,
	selectedWeek: number,
	selectedYear: number,
	type = 'Regular Season',
	tiebreaker = null
) => {
	const docRef = doc(weeklyTiebreakersCollection);
	try {
		await setDoc(docRef.withConverter(weeklyTiebreakerConverter), {
			tiebreaker,
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
			`unable to update tiebreaker ${docRef.path} for user ${uid}`
		);
		errorToast(
			`We encountered an error while trying to set tiebreaker docs.  Please contact your admin with the following information: <br> ${error}`
		);
	}
};
export const deleteTiebreakersForAllUsers = async () => {
	try {
		const proceed = confirm(
			'Are you sure you want to delete all picks for all users?  This is not reversible.'
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
			myLog(msg, 'deleteWeeklyTiebreakersForAllUsers');
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete all user's tiebreakers.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyTiebreakersForAllUsers', error, msg);
	}
};
export const deleteTiebreakersForUser = async (
	user: WebUser,
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		const proceed = confirm(
			`Are you sure you want to delete tiebreakers for ${user.name} (${user.nickname})? ${
				selectedWeek ? `for ${selectedWeek},` : ''
			} ${selectedYear ? selectedYear : ''}`
		);
		if (proceed) {
			const wheres: QueryConstraint[] = [where('uid', '==', user.id)];
			if (selectedWeek) {
				wheres.push(where('week', '==', selectedWeek));
			}
			if (selectedYear) {
				wheres.push(where('year', '==', selectedYear));
			}
			const q = query(weeklyTiebreakersCollection, ...wheres);
			const userTiebreakerDocs = await getDocs(q.withConverter(weeklyPickConverter));
			userTiebreakerDocs.forEach((doc) => deleteDoc(doc.ref));
			const title = `Deleted Weekly Tiebreakers for ${user.name}!`;
			const msg = `All tiebreaker documents were deleted ${
				selectedWeek ? selectedYear : null ? `for Week ${selectedWeek}, ${selectedYear}` : null
			}.`;
			defaultToast({ title, msg });
			myLog(msg, 'deleteWeeklyTiebreakersForUser');
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${user.name}'s tiebreakers.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyTiebreakersForUser', error, msg);
	}
};
export const updateGameSpreads = async (week: number, year: number) => {
	try {
		// Update the pick game objects on the pick documents?
		const q = query(scheduleCollection, where('week', '==', week), where('year', '==', year));
		const games = await getDocs(q.withConverter(gameConverter));
		games.forEach((gameDoc) => {
			const game = gameDoc.data();
			if (isNaN(game.spread)) {
				getUpdatedSpread(game).then((updatedSpread) => {
					updateDoc(gameDoc.ref, { spread: updatedSpread });
				});
			}
		});
		defaultToast({
			title: 'Updated Spreads!',
			msg: `Week ${week} spreads were successfully updated!`
		});
	} catch (error) {
		errorToast('Failed to update spreads.  See console logs.');
		myError('updateSpreads', error);
	}
};
export const getUpdatedSpread = async (game: Game) => {
	const updatedSpread = await getConsensusSpread(game.id);
	return updatedSpread;
};
