import type { Timestamp } from '@firebase/firestore';
import type { Game } from './classes/game';

export const isPropertyOf = <T>(
	varToBeChecked: unknown,
	propertyToCheckFor: keyof T
): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export function getWindowSize(): number {
	return window.innerWidth;
}
export const matchPath = (testPath: string, currentPath: string): boolean => {
	try {
		let replaced = testPath;
		replaced = replaced + `\\W*`;
		const regex = new RegExp(replaced);
		// console.log(`current: ${currentPath}`, regex.test(currentPath));
		return regex.test(currentPath);
	} catch (err) {
		console.error('An error occurred in functions:{matchPath}');
	}
};
export const hideModal = async (modalID: string): Promise<void> => {
	const modal: HTMLDialogElement = document.getElementById(`modal-${modalID}`) as HTMLDialogElement;
	let isDialogSupported = true;

	if (!window.HTMLDialogElement) {
		document.body.classList.add('no-dialog');
		isDialogSupported = false;
	}

	if (isDialogSupported) {
		modal.close();
	} else {
		modal.removeAttribute('open');
	}
};
export const sortByWins = (firstPlayer: { wins: number }, secondPlayer: { wins: number }): number =>
	secondPlayer.wins - firstPlayer.wins;

export const isBeforeGameTime = async (timestamp: Timestamp, now: number): Promise<boolean> => {
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

export const setRegularSeasonWeeks = () => {
	const weeks = [];
	for (let i = 1; i < 18; i++) {
		weeks.push(i);
	}
	// console.log('setRegularSeasonWeeks');
	return weeks;
};
export const setPreSeasonWeeks = () => {
	const weeks = [];
	for (let i = 1; i < 5; i++) {
		weeks.push(i);
	}
	// console.log('setPreSeasonWeeks');
	return weeks;
};
