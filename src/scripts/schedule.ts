import {
	query,
	where,
	getDocs,
	getDoc,
	setDoc,
	updateDoc,
	doc,
	Timestamp,
	getDocFromServer
} from 'firebase/firestore';
import type { QuerySnapshot, DocumentReference } from 'firebase/firestore';
import { myError, myLog } from './classes/constants';
import type { Game } from './classes/game';
import { WeekBound } from './classes/weekBound';
import { scheduleCollection, weekBoundsCollection } from './collections';
import { gameConverter, weekBoundConverter } from './converters';
import { defaultToast, errorToast } from './toasts';
import { getRegularSeasonWeeks } from './functions';
import { toast } from '@zerodevx/svelte-toast';

export const findWeekDateTimeBounds = async (): Promise<void> => {
	const startToastId = defaultToast({
		title: 'Starting Week Bounds Search!',
		msg: 'Iterating through the schedule to find and set the weekly bounds.  Please wait a few seconds...',
		duration: 60000
	});
	const thisYear = new Date().getFullYear();
	const regSeasonWeeks = await getRegularSeasonWeeks();
	for await (const week of regSeasonWeeks) {
		console.log(`finding bounds for week: ${week}`);
		const wheres = [
			where('week', '==', week),
			where('type', '==', 'Regular Season'),
			where('year', '==', thisYear)
		];
		const scheduleQuery = query(scheduleCollection, ...wheres);
		const weekOfGames = await getDocs(scheduleQuery.withConverter(gameConverter));
		const times = await getFirstAndLastGameTime(weekOfGames);
		const weekBound = new WeekBound({ week, firstGameTime: times.first, lastGameTime: times.last });
		await setBounds(weekBound);
		myLog(`finished week ${week}`);
	}
	myLog(`finished all weeks!`);
	defaultToast({
		title: 'Found Week Bounds!',
		msg: 'Successfully found the start and ending game times for each week of the schedule. See WeeklyScheduleBounds collection in the Firebase console.'
	});
	// Remove the 'starting search' message toast
	toast.pop(startToastId);
};

export const getFirstAndLastGameTime = async (
	weekOfGames: QuerySnapshot<Game>
): Promise<{ first: Timestamp; last: Timestamp }> => {
	let firstGameofWeekTime: Timestamp;
	let lastGameofWeekTime: Timestamp;
	let lastGameRef: DocumentReference<Game>;

	for await (const game of weekOfGames.docs) {
		const data = game.data();
		myLog('game data:', null, null, data);
		const gameTime = data.timestamp;
		if (firstGameofWeekTime === undefined || gameTime < firstGameofWeekTime) {
			firstGameofWeekTime = gameTime;
			// alert(`gameTime: ${gameTime.toDate()} is less than ${firstGameofWeekTime.toDate()}`);
		}
		if (lastGameofWeekTime === undefined || gameTime > lastGameofWeekTime) {
			lastGameofWeekTime = gameTime;
			lastGameRef = game.ref;
			// alert(`gameTime: ${gameTime.toDate()} is greater than ${lastGameofWeekTime.toDate()}`);
		}
	}
	// Set the flag to indicate that this game's score will be used for the tiebreaker comparison
	updateDoc(lastGameRef, { isLastGameOfWeek: true });
	return { first: firstGameofWeekTime, last: lastGameofWeekTime };
};

export const setBounds = async (weekBound: WeekBound, year?: number): Promise<void> => {
	try {
		myLog(`week ${weekBound.week} firstGameTime: ${weekBound.firstGameTime}`);
		myLog(`week ${weekBound.week} lastGameTime: ${weekBound.lastGameTime}`);
		const currentYear = year || new Date().getFullYear();
		const docRef = doc(weekBoundsCollection, currentYear.toString());
		const data = {
			[`week_${weekBound.week}`]: {
				firstGameTime: weekBound.firstGameTime,
				lastGameTime: weekBound.lastGameTime,
				week: weekBound.week
			}
		};
		const boundsDoc = await getDoc(docRef);
		if (boundsDoc.exists()) {
			await updateDoc(docRef, data);
		} else {
			await setDoc(docRef, data);
		}

		myLog(`set week bound document: ${data}`);
	} catch (error) {
		myError('setBounds', error);
	}
};
export const findCurrentWeekOfSchedule = async (showToast?: boolean): Promise<number> => {
	try {
		const now = new Date();
		const currentYear = now.getFullYear();
		const boundsDoc = doc(weekBoundsCollection, currentYear.toString());
		const allBounds = await getDocFromServer(boundsDoc.withConverter(weekBoundConverter));

		// This is the offset from the start of the last game of the week when the function will return the next week.
		// i.e. if it has been 8 hours after the MNF game for week 3, it should return weekBounds.week = 4
		const hoursSinceLastGame = 8;
		// This is a multiplier for the hours above to get the number into milliseconds for a Date.getTime()
		const millisecondsPerHour = 3_600_000;

		if (allBounds.exists) {
			myLog('got gameBounds doc!');
			const data = allBounds.data();
			myLog('data', null, null, data);
			const regSeasonWeeks = await getRegularSeasonWeeks();
			for (const week of regSeasonWeeks) {
				const weekBounds: WeekBound = data[`week_${week}`];
				const firstGameTime = weekBounds.firstGameTime.toDate();
				const lastGameTime = weekBounds.lastGameTime.toDate();
				if (now < firstGameTime && week === 1) {
					return 1;
				}
				if (now.getTime() > lastGameTime.getTime() + hoursSinceLastGame * millisecondsPerHour) {
					continue;
				} else {
					myLog(`current week is ${weekBounds.week}!`);
					return weekBounds.week;
				}
			}
		}
	} catch (error) {
		myError('findCurrentWeekOfSchedule', error);
		if (showToast) {
			errorToast(`findCurrentWeekOfSchedule had an error: ${error}`);
		}
	}
};
