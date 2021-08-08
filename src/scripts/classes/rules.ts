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
	constructor({
		docRef,
		docID,
		order,
		title,
		endOfSeason,
		prizeTBDmessage,
		weeklyFirst,
		weeklySecond,
		weeklyThird,
		hasWeeklyPayout
	}: {
		docRef?: DocumentReference<DocumentData>;
		docID?: string;
		order?: number;
		title?: string;
		endOfSeason?: string;
		prizeTBDmessage?: string;
		weeklyFirst?: number;
		weeklySecond?: number;
		weeklyThird?: number;
		hasWeeklyPayout?: boolean;
	} = {}) {
		(this.docRef = docRef),
			(this.docID = docID),
			(this.order = order),
			(this.title = title),
			(this.endOfSeason = endOfSeason),
			(this.prizeTBDmessage = prizeTBDmessage),
			(this.weeklyFirst = weeklyFirst),
			(this.weeklySecond = weeklySecond),
			(this.weeklyThird = weeklyThird),
			(this.hasWeeklyPayout = hasWeeklyPayout),
			(this.rules = collection(docRef, 'Rules'));
	}
}
