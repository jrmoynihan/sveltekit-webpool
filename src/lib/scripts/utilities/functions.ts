import type { Timestamp } from '@firebase/firestore';

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
	if (now < gameTime) {
		return true;
	} else {
		return false;
	}
};

export const makeNumericArrayOfDesiredLength = (length: number): number[] => {
	return Array.from({ length }, (_, index) => index + 1);
};
