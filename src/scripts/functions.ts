import { browser } from '$app/env';
import { overrideDisabled, showPickWarning } from './store';
import {
	maxPreseasonWeeks,
	maxRegularSeasonWeeks,
	myError,
	policeCarLight
} from './classes/constants';
import type { WeeklyPickDoc } from './classes/picks';
import type { Timestamp } from '@firebase/firestore';
import { getLocalStorageItem } from './localStorage';
import { get } from 'svelte/store';

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

export const convertToHttps = async (httpAddress: string): Promise<string> => {
	return httpAddress.replace('http', 'https');
};
export const getStatus = async (competitions: { status: { $ref: string } }[]): Promise<any> => {
	const httpGameStatusEndpoint: string = competitions[0].status.$ref;
	const httpsGameStatusEndpoint: string = await convertToHttps(httpGameStatusEndpoint);
	// console.log(httpsGameStatusEndpoint)
	const statusResponse = await fetch(httpsGameStatusEndpoint);
	const statusData = statusResponse.json();
	return statusData;
};
export const getSituation = async (
	competitions: { situation: { $ref: string } }[]
): Promise<any> => {
	const httpGameSituationEndpoint: string = competitions[0].situation.$ref;
	const httpsGameSituationEndpoint: string = await convertToHttps(httpGameSituationEndpoint);
	const situationResponse = await fetch(httpsGameSituationEndpoint);
	const situationData = situationResponse.json();
	// console.table(situationData);
	return situationData;
};

export const getScores = async (
	competitions: { competitors: { score: { $ref: any } }[] }[]
): Promise<{ homeScoreData: any; awayScoreData: any }> => {
	try {
		let homeScoreData: any;
		let awayScoreData: any;
		const httpHomeEndpoint = competitions[0].competitors[0].score.$ref;
		const httpAwayEndpoint = competitions[0].competitors[1].score.$ref;
		const httpsHomeEndpoint = await convertToHttps(httpHomeEndpoint);
		const httpsAwayEndpoint = await convertToHttps(httpAwayEndpoint);
		const homeScoreResponse = await fetch(httpsHomeEndpoint);
		const awayScoreResponse = await fetch(httpsAwayEndpoint);

		if (homeScoreResponse.ok) {
			homeScoreData = await homeScoreResponse.json();
		}
		if (awayScoreResponse.ok) {
			awayScoreData = await awayScoreResponse.json();
		}
		if (homeScoreData !== undefined && awayScoreData !== undefined) {
			return { homeScoreData, awayScoreData };
		} else {
			throw `error getting scores`;
		}
	} catch (error) {
		console.error(`%c${policeCarLight} error getting scores!`);
	}
};

export const getConsensusSpread = async (gameID: string): Promise<number> => {
	try {
		const response = await fetch(
			`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${gameID}/competitions/${gameID}/odds`
		);
		const data = await response.json();
		const spreadProviders = data.items;
		let consensus: number;
		for (const spreadProvider of spreadProviders) {
			if (spreadProvider.provider.name === 'consensus') {
				consensus = spreadProvider.spread;
			}
		}
		if (consensus === undefined) {
			consensus = null;
		}
		return consensus;
	} catch (error) {
		console.error(error);
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
