import type { Game } from '$lib/scripts/classes/game';
import type { WeeklyPickDoc } from '$lib/scripts/classes/picks';
import type { SeasonType } from '$lib/scripts/classes/seasonType';
import type { WeeklyTiebreaker } from '$lib/scripts/classes/tiebreaker';
import { query, where, getDocs, orderBy } from 'firebase/firestore';
import { myLog, myError, checkmark, pick, detective, necktie } from '../classes/constants';
import { WebUser } from '../classes/webUser';
import {
	scheduleCollection,
	usersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from '../collections';
import {
	gameConverter,
	userConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '../converters';
import { defaultToast, errorToast } from '../toasts';

// TODO: Refactor these functions into endpoints that change the url as the params change?
export const getWeeklyUsers = async (
	showToast = true,
	customizedQuery = query(usersCollection, where('weekly', '==', true))
) => {
	try {
		const users: WebUser[] = [];
		const querySnapshot = await getDocs(customizedQuery.withConverter(userConverter));
		querySnapshot.forEach((doc) => {
			const id = doc.id;
			const ref = doc.ref;
			const user = new WebUser({ id: id, ref: ref, ...doc.data() });
			users.push(user);
		});
		const msg = 'Retrieved all users who are Weekly Pool players.';
		myLog(msg, 'createWeeklyPicksForUser', undefined, users);
		if (showToast) {
			defaultToast({ title: 'Got Weekly Users!', msg: msg });
		}
		return users;
	} catch (error) {
		const msg = `Encountered an error while trying to get weekly users.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('getWeeklyUsers', error, msg);
	}
};
export const changedQuery = async (
	selectedYear: number,
	selectedSeasonType: SeasonType,
	selectedWeek: number,
	uid: string
) => {
	let gamesPromise: Promise<Game[]>;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	try {
		gamesPromise = getGames(selectedYear, selectedSeasonType, selectedWeek);
		picksPromise = getPicksForUser(selectedWeek, uid, selectedYear, selectedSeasonType);
		tiebreakerPromise = getTiebreaker(selectedWeek, uid, selectedYear);
		return { gamesPromise, picksPromise, tiebreakerPromise };
	} catch (error) {
		errorToast(`Error in changing query... ${error}`);
		myError('changedQuery', error);
	}
};
export const getGames = async (
	selectedYear: number,
	selectedSeasonType: SeasonType,
	selectedWeek: number
) => {
	try {
		const games: Game[] = [];
		const q = query(
			scheduleCollection,
			where('year', '==', selectedYear),
			where('type', '==', selectedSeasonType.text),
			where('week', '==', selectedWeek),
			orderBy('timestamp')
		);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		querySnapshot.forEach((doc) => {
			games.push(doc.data());
		});

		myLog('got games!', '', checkmark, games);
		return games;
	} catch (error) {
		errorToast(
			'Unable to get games. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
		);
		myError('getGames', error);
	}
};
export const getPicksForUser = async (
	selectedWeek: number,
	uid: string,
	selectedYear: number,
	selectedSeasonType: SeasonType
) => {
	try {
		const picks: WeeklyPickDoc[] = [];
		myLog(
			`querying picks for week ${selectedWeek}, ${selectedYear}, ${selectedSeasonType.text}, ${uid}`
		);
		const q = query(
			weeklyPicksCollection,
			where('year', '==', selectedYear),
			where('type', '==', selectedSeasonType.text),
			where('week', '==', selectedWeek),
			where('uid', '==', uid),
			orderBy('timestamp'),
			orderBy('gameId')
		);
		const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
		querySnapshot.forEach((doc) => {
			picks.push(doc.data());
		});
		myLog('got picks!', '', pick, picks);
		return picks;
	} catch (error) {
		errorToast(
			'Unable to get picks. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
		);
		myError('getPicks', error);
	}
};
export const getTiebreaker = async (
	selectedWeek: number,
	uid: string,
	selectedYear: number
): Promise<WeeklyTiebreaker> => {
	try {
		let tiebreaker: WeeklyTiebreaker;
		const q = query(
			weeklyTiebreakersCollection,
			where('year', '==', selectedYear),
			where('week', '==', selectedWeek),
			where('uid', '==', uid)
		);
		const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
		if (querySnapshot.empty) {
			myLog('no tiebreaker found', '', detective);
		} else if (querySnapshot.size > 1) {
			throw new Error(`Multiple tiebreakers found for this user in week ${selectedWeek}`);
		}
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				tiebreaker = doc.data();
				myLog('got tiebreaker!', '', necktie, tiebreaker);
			}
		});
		return tiebreaker;
	} catch (error) {
		errorToast(error.message);
		myError('getTiebreaker', error);
	}
};
