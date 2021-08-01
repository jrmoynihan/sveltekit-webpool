import type { DocumentReference } from 'firebase/firestore';

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
