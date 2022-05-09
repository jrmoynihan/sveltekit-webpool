import { maxPreseasonWeeks, maxRegularSeasonWeeks } from '$classes/constants';
import type { Timestamp } from '@firebase/firestore';
import { getLocalStorageItem } from '$scripts/localStorage';
import { myError } from '$scripts/logging';

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
	// console.log('timestamp', gameTime);
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

export const getUserId = async (): Promise<any> => {
	try {
		const id = await getLocalStorageItem('id');
		return id;
	} catch (error) {
		myError({ location: 'functions.ts', function_name: 'getUserId', error });
	}
};
