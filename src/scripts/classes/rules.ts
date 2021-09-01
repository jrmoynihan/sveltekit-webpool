import {
	collection,
	CollectionReference,
	DocumentData,
	DocumentReference
} from '@firebase/firestore';

export class Rule {
	order: number;
	text: string;
}

export class RuleCategory {
	docRef: DocumentReference;
	docID: string;
	order: number;
	title: string;
	endOfSeason?: string;
	prizeTBDmessage?: string;
	weeklyFirst?: number;
	weeklySecond?: number;
	weeklyThird?: number;
	hasWeeklyPayout?: boolean;
	rules?: CollectionReference;
	constructor({ ...args }) {
		(this.docRef = args.docRef),
			(this.docID = args.docID),
			(this.order = args.order),
			(this.title = args.title),
			(this.endOfSeason = args.endOfSeason),
			(this.prizeTBDmessage = args.prizeTBDmessage),
			(this.weeklyFirst = args.weeklyFirst),
			(this.weeklySecond = args.weeklySecond),
			(this.weeklyThird = args.weeklyThird),
			(this.hasWeeklyPayout = args.hasWeeklyPayout),
			(this.rules = collection(args.docRef, 'Rules'));
	}
}
