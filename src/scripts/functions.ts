import { browser } from '$app/env';
import type { Timestamp } from '@firebase/firestore';
import { myLog } from './classes/constants';
import { showPickWarning } from './store';

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

export const scrollToNextGame = (
	index: number,
	currentPickCount: number,
	totalGameCount: number
) => {
	if (browser) {
		const element = document.getElementById(`game-${index + 1}`);

		// NOTE: The minus 1 accounts for this function running before the parent passes in the newly updated currentPickCount
		// I.E. -- When making the 16th pick, currentPickCount will still be 15
		if (currentPickCount < totalGameCount - 1 && element) {
			const yOffset = -200;
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			scrollToTopSmooth(y);
			showPickWarning.set(false);
		} else {
			setTimeout(() => {
				if (currentPickCount < totalGameCount - 1) {
					showPickWarning.set(true);
				}
			}, 1000);
			scrollToTopSmooth();
			// focusTiebreaker();
		}
	}
};
export const focusTiebreaker = () => {
	if (browser) {
		setTimeout(() => {
			const tiebreakerInput = document.getElementById('tiebreaker-input');
			if (tiebreakerInput) {
				tiebreakerInput.focus();
			}
		}, 200);
	}
};
export const scrollToTopSmooth = (top = 0) => {
	if (browser) {
		window.scrollTo({ top, behavior: 'smooth' });
	}
};

export const getLocalStorageItem = async (key: string) => {
	if (browser) {
		const item = JSON.parse(localStorage.getItem(key));
		return item;
	} else {
		myLog('unable to check for local storage');
	}
};
export const setLocalStorageItem = async (key: string, value: string) => {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		myLog('unable to set item in local storage');
	}
};
export const convertToHttps = async (httpAddress: string) => {
	return httpAddress.replace('http', 'https');
};
