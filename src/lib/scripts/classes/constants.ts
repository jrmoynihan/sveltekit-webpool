import { defaultToast, type myToastOptions } from '../toasts';
import type { SeasonType } from './seasonType';

export const maxRegularSeasonWeeks = 18;
export const maxPreseasonWeeks = 4;

export enum Conference {
	NFC = 'NFC',
	AFC = 'AFC'
}
export enum Division {
	North = 'North',
	South = 'South',
	East = 'East',
	West = 'West'
}
export enum HomeOrAway {
	Home = 'Home',
	Away = 'Away'
}

export const conferences: Conference[] = [Conference.AFC, Conference.NFC];
export const divisions: Division[] = [Division.East, Division.West, Division.North, Division.South];
export const startingYear = 2021;
export const weeklyPoolFee = 50;
export const weeklyPayout = 90;
export const commishCost = 50;
export const webDevCost = 50;
export const hostingCost = 50;
export const firstPlaceWeeklySeasonPercent = 0.5;
export const secondPlaceWeeklySeasonPercent = 0.3;
export const thirdPlaceWeeklySeasonPercent = 0.2;
export const firstPlaceWeeklyAmount = 50;
export const secondPlaceWeeklyAmount = 25;
export const thirdPlaceWeeklyAmount = 15;
export const seasonTypes: SeasonType[] = [
	{ id: 1, text: 'Pre-Season' },
	{ id: 2, text: 'Regular Season' }
];
export const everyoneWinsResult = 'push';

// CSS emoji for console logging (https://unicode.org/emoji/charts/full-emoji-list.html)
export const okHand = String.fromCodePoint(0x1f44c);
export const policeCarLight = String.fromCodePoint(0x1f6a8);
export const pencil = String.fromCodePoint(0x270f);
export const key = String.fromCodePoint(0x1f511);
export const lock = String.fromCodePoint(0x1f512);
export const unlock = String.fromCodePoint(0x1f513);
export const pick = String.fromCodePoint(0x26cf);
export const football = String.fromCodePoint(0x1f3c8);
export const checkmark = String.fromCodePoint(0x2705);
export const dog = String.fromCodePoint(0x1f415);
export const dogFace = String.fromCodePoint(0x1f436);
export const airplaneDeparture = String.fromCodePoint(0x1f6eb);
export const home = String.fromCodePoint(0x1f3e0);
export const stopSign = String.fromCodePoint(0x1f6d1);
export const bread = String.fromCodePoint(0x1f35e);
export const bomb = String.fromCodePoint(0x1f4a3);
export const detective = String.fromCodePoint(0x1f575);
export const necktie = String.fromCodePoint(0x1f454);
export enum all_icons {
	okHand,
	policeCarLight,
	pencil,
	key,
	lock,
	unlock,
	pick,
	football,
	checkmark,
	dog,
	dogFace,
	airplaneDeparture,
	home,
	stopSign,
	bread,
	bomb,
	detective,
	necktie
}

export const defaultConsoleLogStyle = [
	'align-items:center',
	'display:grid',
	'font-size: 2rem',
	'padding: 0.5rem'
].join(';');

export type myErrorType = {
	error: Error;
	msg?: string;
	icon?: all_icons | null;
	function_name?: string;
	location?: string;
	additional_params?: any;
};
export type myLogType = {
	msg: string;
	icon?: all_icons;
	function_name?: string;
	location?: string;
	additional_params?: any;
};
export type LogAndToastType = myToastOptions & myLogType;
export type ErrorAndToastType = myToastOptions & myErrorType;

export const myError = (input: myErrorType): void => {
	const { error, msg, icon, function_name, location, additional_params } = input;
	console.error(
		`${icon ? `%c${icon} ` : '%c'}Error in ${location ? `${location} ->` : ''} ${function_name ?? ''}! \n ${msg ?? ''}`, defaultConsoleLogStyle, error ?? '', additional_params ?? '');
};
export const myLog = (input: myLogType): void => {
	const { msg, icon, function_name, location, additional_params } = input;
	console.log(
		`${icon ? `%c${icon} ` : '%c'} ${location ? `${location} ->` : ''} ${function_name ?? ''} \n ${msg ?? ''}`,
		defaultConsoleLogStyle,
		additional_params ?? ''
	);
};


export const LogAndToast = (options: LogAndToastType ): void => {
	myLog({...options});
	defaultToast({...options});
}
export const ErrorAndToast = (options: ErrorAndToastType ): void => {
	myError({...options});
	defaultToast({...options});
}
