import type { DocumentReference } from '@firebase/firestore';

export class WeeklyTiebreaker {
	docRef: DocumentReference;
	tiebreaker: number;
	uid: string;
	week: number;
	year: number;
	constructor(
		docRef: DocumentReference,
		tiebreaker: number,
		uid: string,
		week: number,
		year: number
	) {
		(this.docRef = docRef),
			(this.tiebreaker = tiebreaker),
			(this.uid = uid),
			(this.week = week),
			(this.year = year);
	}
}
