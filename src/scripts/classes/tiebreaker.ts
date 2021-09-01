import type { DocumentReference } from '@firebase/firestore';

export class WeeklyTiebreaker {
	docRef: DocumentReference;
	tiebreaker: number;
	uid: string;
	week: number;
	year: number;
	constructor({ ...args }) {
		(this.docRef = args.docRef),
			(this.tiebreaker = args.tiebreaker),
			(this.uid = args.uid),
			(this.week = args.week),
			(this.year = args.year);
	}
}
