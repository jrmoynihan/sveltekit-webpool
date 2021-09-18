import type { SeasonType } from './seasonType';

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
export const startingYear = 2020;
export const seasonTypes: SeasonType[] = [
	{ id: 1, text: 'Pre-Season' },
	{ id: 2, text: 'Regular Season' }
];

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

// console.log(bread)

export const defaultConsoleLogStyle = [
	'align-items:center',
	'display:grid',
	'font-size: 2rem',
	'padding: 0.5rem'
].join(';');

export const myError = (
	functionName: string,
	error: Error,
	additionalMessage: string = null,
	icon: string = policeCarLight
) => {
	console.error(
		`%c${icon} ${functionName} had an error! ${additionalMessage}`,
		defaultConsoleLogStyle,
		error
	);
};
export const myLog = (
	message: string,
	functionName: string = '',
	icon: string = '',
	additionalParameters = null
) => {
	console.log(
		`%c${icon} ${functionName ? `${functionName}:` : ''} ${message}`,
		defaultConsoleLogStyle,
		additionalParameters
	);
};
