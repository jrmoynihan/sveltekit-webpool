import { collection, CollectionReference, DocumentReference } from '@firebase/firestore';
import { Tab } from './tab';

export class Rule {
	docRef: DocumentReference;
	order: number;
	text: string;
	subtext?: string;
	constructor({ ...args }) {
		this.docRef = args.docRef;
		this.order = args.order;
		this.text = args.text;
		if (args.subtext) {
			this.subtext = args.subtext;
		}
	}
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
			(this.rules = args.rules ?? collection(args.docRef, 'Rules'));
	}
}
export class RuleTab extends Tab {
	data: {};
	ref: DocumentReference;
	constructor({ ...args }) {
		super(args);
		this.data = args.data;
		this.ref = args.ref;
	}
}
