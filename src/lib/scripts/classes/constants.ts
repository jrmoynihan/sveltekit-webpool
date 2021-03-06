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

export const conferences: Conference[] = [Conference.AFC, Conference.NFC];
export const divisions: Division[] = [Division.East, Division.West, Division.North, Division.South];
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
export const everyoneWinsResult = 'push';
export const image_sizes = [200, 400, 800, 1200];
export const screen_sizes = [375, 768, 1024, 1920];
export const screen_size_queries = screen_sizes.map((size, index) => `(max-width: ${size}px)`);
export const responsive_sizes = screen_sizes.map((screen_size, index) => {
	const image_size = image_sizes[index];
	return `${screen_size_queries[index]} ${image_size}px`;
});

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
export const checkeredFlag = String.fromCodePoint(0x1f3c1);
export const hourglass = String.fromCodePoint(0x231b);
export const butter = String.fromCodePoint(0x1f9c8);
export const all_icons = {
	okHand: okHand,
	policeCarLight: policeCarLight,
	pencil: pencil,
	key: key,
	lock: lock,
	unlock: unlock,
	pick: pick,
	football: football,
	checkmark: checkmark,
	checkeredFlag: checkeredFlag,
	dog: dog,
	dogFace: dogFace,
	airplaneDeparture: airplaneDeparture,
	home: home,
	hourglass: hourglass,
	stopSign: stopSign,
	bread: bread,
	bomb: bomb,
	detective: detective,
	necktie: necktie,
	butter: butter
};

export const defaultConsoleLogStyle = [
	'align-items:center',
	'display:grid',
	'grid-template-columns:repeat(auto-fit, minmax(0,auto))',
	'font-size: 1.5rem',
	'padding: 0.25rem'
].join(';');
