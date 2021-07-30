import type { DocumentReference } from 'firebase/firestore';

export class PageOption {
	navigationText: string;
	path: string;
	requiresAdmin: boolean;
	requiresWeekly: boolean;
	requiresSurvivor: boolean;
	requiresPlayoffs: boolean;
	requiresPick6: boolean;
	requiresCollege: boolean;
	// hasSidePanel: boolean;
	// sideComponent: any;

	constructor(
		{
			navigationText,
			path,
			requiresAdmin,
			requiresWeekly,
			requiresSurvivor,
			requiresPlayoffs,
			requiresPick6,
			requiresCollege
		}: {
			navigationText: string;
			path: string;
			requiresAdmin?: boolean;
			requiresWeekly?: boolean;
			requiresSurvivor?: boolean;
			requiresPlayoffs?: boolean;
			requiresPick6?: boolean;
			requiresCollege?: boolean;
		} // hasSidePanel?: boolean, // sideComponent?: any,
	) {
		(this.navigationText = navigationText),
			(this.path = path),
			(this.requiresAdmin = requiresAdmin);
		this.requiresCollege = requiresCollege;
		this.requiresPick6 = requiresPick6;
		this.requiresPlayoffs = requiresPlayoffs;
		this.requiresSurvivor = requiresSurvivor;
		this.requiresWeekly = requiresWeekly;
		// (this.hasSidePanel = hasSidePanel);
		// this.sideComponent = sideComponent;
	}
}

export class WebUserData {
	id: string;
	ref: DocumentReference;
	name: string;
	nickname: string;
	email: string;
	admin: boolean;
	college: boolean;
	pick6: boolean;
	playoffs: boolean;
	survivor: boolean;
	weekly: boolean;
	constructor(
		id?: string,
		ref?: DocumentReference,
		name?: string,
		nickname?: string,
		email?: string,
		admin?: boolean,
		college?: boolean,
		pick6?: boolean,
		playoffs?: boolean,
		survivor?: boolean,
		weekly?: boolean
	) {
		(this.id = id),
			(this.ref = ref),
			(this.name = name),
			(this.nickname = nickname),
			(this.email = email),
			(this.admin = admin);
		this.college = college;
		this.pick6 = pick6;
		this.playoffs = playoffs;
		this.survivor = survivor;
		this.weekly = weekly;
	}
}

export class Team {
	name: string;
	abbreviation: string;
	city: string;
	conference: string;
	division: string;
	logoPath: string;
	fontPath: string;
	wins: number;
	losses: number;
	ties: number;
	docRef?: DocumentReference;
	docID?: string;
	constructor(
		city: string,
		abbreviation: string,
		name: string,
		conference: string,
		division: string,
		logoPath?: string,
		fontPath?: string,
		wins?: number,
		losses?: number,
		ties?: number,
		docRef?: DocumentReference,
		docID?: string
	) {
		this.name = name;
		this.abbreviation = abbreviation;
		this.city = city;
		this.conference = conference;
		this.division = division;
		this.logoPath = logoPath;
		this.fontPath = fontPath;
		this.wins = wins;
		this.losses = losses;
		this.ties = ties;
		this.docRef = docRef;
		this.docID = docID;
	}
}

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
