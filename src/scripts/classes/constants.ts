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
export const conferences: Conference[] = [Conference.AFC, Conference.NFC];
export const divisions: Division[] = [Division.East, Division.West, Division.North, Division.South];

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

// console.log(home)
