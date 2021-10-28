import { browser } from '$app/env';
import { overrideDisabled, showPickWarning } from './store';
import { maxPreseasonWeeks, maxRegularSeasonWeeks, myError } from './classes/constants';
import type { WeeklyPickDoc } from './classes/picks';
import type { Timestamp } from 'firebase/firestore';
import { getLocalStorageItem } from './localStorage';
import { get } from 'svelte/store';

export const isPropertyOf = <T>(
	varToBeChecked: unknown,
	propertyToCheckFor: keyof T
): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export const capitalizeWord = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getWindowSize(): number {
	return window.innerWidth;
}
export const matchPath = (testPath: string, currentPath: string) => {
	try {
		const currentPathSegments = currentPath.split('/');
		const testPathSegments = testPath.split('/');

		let didNotMatch = false;

		testPathSegments.forEach((testSegment) => {
			// if the segment isn't found, trigger the flag, otherwise keep matching substring segments
			if (!currentPathSegments.includes(testSegment)) {
				didNotMatch = true;
			}
		});

		// return the inverse of the matching (yes, it's a little confusing that way)
		return !didNotMatch;
		
	} catch (err) {
		console.error('An error occurred in functions:{matchPath}');
	}
};

export const sortByWins = (firstPlayer: { wins: number }, secondPlayer: { wins: number }): number =>
	secondPlayer.wins - firstPlayer.wins;

export const isBeforeGameTime = async (timestamp: Timestamp): Promise<boolean> => {
	const now = new Date().getTime();
	const gameTime = timestamp.toDate().getTime();
	// const now = new Date().getTime();
	// console.log('gameTime', gameTime);
	// console.log('now', now);
	if (now < gameTime) {
		// console.log(true);
		return true;
	} else {
		// console.log(false);
		return false;
	}
};

export const getRegularSeasonWeeks = async (): Promise<number[]> => {
	const weeks: number[] = [];
	for (let i = 1; i <= maxRegularSeasonWeeks; i++) {
		weeks.push(i);
	}
	// console.log('setRegularSeasonWeeks');
	return weeks;
};
export const getPreSeasonWeeks = async (): Promise<number[]> => {
	const weeks: number[] = [];
	for (let i = 1; i <= maxPreseasonWeeks; i++) {
		weeks.push(i);
	}
	// console.log('setPreSeasonWeeks');
	return weeks;
};

export const scrollToNextGame = (
	index: number,
	currentPickCount: number,
	upcomingGameCount: number
): void => {
	if (browser) {
		const element = document.getElementById(`game-${index + 1}`);

		// NOTE: The minus 1 accounts for this function running before the parent passes in the newly updated currentPickCount
		// I.E. -- When making the 16th pick, currentPickCount will still be 15
		if (currentPickCount < upcomingGameCount - 1 && element) {
			const yOffset = -300;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			scrollToTopSmooth(y);
			showPickWarning.set(false);
		} else if (!get(overrideDisabled)) {
			setTimeout(() => {
				if (currentPickCount < upcomingGameCount - 1) {
					showPickWarning.set(true);
				}
			}, 1000);
			scrollToTopSmooth();
			// focusTiebreaker();
		}
	}
};
export const focusTiebreaker = (): void => {
	if (browser) {
		setTimeout(() => {
			const tiebreakerInput = document.getElementById('tiebreaker-input');
			if (tiebreakerInput) {
				tiebreakerInput.focus();
			}
		}, 200);
	}
};
export const scrollToTopSmooth = (top = 0): void => {
	if (browser) {
		window.scrollTo({ top, behavior: 'smooth' });
	}
};

export const findMissedPick = async (currentPicks: WeeklyPickDoc[]): Promise<number> => {
	for (const [i, value] of currentPicks.entries()) {
		if (value.pick === '') {
			if (await isBeforeGameTime(value.timestamp)) {
				return i;
			}
		}
	}
};
export const goToMissedPick = async (currentPicks: WeeklyPickDoc[]): Promise<void> => {
	const pickIndex = await findMissedPick(currentPicks);
	// console.log(pickIndex);
	if (pickIndex) {
		scrollToNextGame(pickIndex - 1, 0, 2); // Force it to run the scroll to game instead of scroll to top;
	} else {
		scrollToTopSmooth();
	}
};
export const getUserId = async (): Promise<any> => {
	try {
		const id = await getLocalStorageItem('id');
		return id;
	} catch (error) {
		myError('getUserId', error);
	}
};
