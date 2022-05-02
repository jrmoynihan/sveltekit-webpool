import type { DocumentReference } from 'firebase/firestore';

export class WeeklyTiebreaker {
	docRef: DocumentReference;
	scoreGuess: number;
	uid: string;
	type: string;
	week: number;
	year: number;
	constructor({ ...args }) {
		(this.docRef = args.docRef),
			(this.scoreGuess = args.scoreGuess),
			(this.uid = args.uid),
			(this.type = args.type),
			(this.week = args.week),
			(this.year = args.year);
	}
}
