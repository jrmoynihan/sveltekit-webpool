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
import { deleteDoc, doc, getDocs, query, setDoc, where } from '@firebase/firestore';

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
const getMaxGameWeek = async (): Promise<number> => {
	try {
		const weeklyGames = await getAllGames();
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
		const weeklyUsers = await getWeeklyUsers({});
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
	logAll: boolean = true,
	showToast = true,
	games?: Game[]
) => {
	if (games === undefined) {
		games = await getAllGames(showToast);
	}
	try {
		for await (const game of games) {
			const newWeeklyPickRef = doc(weeklyPicksCollection);
			const pickDoc = new WeeklyPickDoc({
				docRef: newWeeklyPickRef,
				id: game.id,
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
export const deleteWeeklyPicksForUser = async (user: WebUser) => {
	try {
		const q = query(weeklyPicksCollection, where('uid', '==', user.id));
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
		const weeklyUsers = await getWeeklyUsers({});
		weeklyUsers.forEach((user) => {
			createTiebreakersForUser(user, false);
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
// @TODO: need to finish this function!
export const createTiebreakersForUser = async (user: WebUser, logAll: boolean = true) => {
	try {
		const maxWeek = await getMaxGameWeek();
		const uid = user.id;
		const selectedYear = new Date().getFullYear();
		for await (const week of Array(maxWeek).keys()) {
			const selectedWeek = week;
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
		const q = query(weeklyTiebreakersCollection);
		const allWeeklyDocs = await getDocs(q);
		allWeeklyDocs.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Tiebreakers!';
		const msg = 'All tiebreaker documents were deleted.';
		defaultToast({ title, msg });
		myLog(msg, 'deleteWeeklyTiebreakersForAllUsers');
	} catch (error) {
		const msg = `Encountered an error while trying to delete all user's tiebreakers.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('deleteWeeklyTiebreakersForAllUsers', error, msg);
	}
};
