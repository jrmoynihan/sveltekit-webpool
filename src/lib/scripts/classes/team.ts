import type { DocumentReference } from '@firebase/firestore';

export class Team {
	name: string;
	abbreviation: string;
	city: string;
	conference: string;
	division: string;
	logoPath: string;
	fontPath: string;
	records: TeamRecord[];
	docRef?: DocumentReference;
	docID?: string;
	constructor({ ...args }) {
		this.name = args.name;
		this.abbreviation = args.abbreviation;
		this.city = args.city;
		this.conference = args.conference;
		this.division = args.division;
		this.logoPath = args.logoPath;
		this.fontPath = args.fontPath;
		this.records = args.records;
		this.docRef = args.docRef;
		this.docID = args.docID;
	}
}
export class TeamRecord {
	year: number;
	wins: number;
	losses: number;
	ties: number;
}
