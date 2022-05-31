import type { DocumentReference } from '@firebase/firestore';

export class WeeklyTiebreaker {
	doc_ref: DocumentReference;
	score_guess: number;
	uid: string;
	season_type: string;
	week: number;
	season_year: number;
	constructor({ ...args }) {
		(this.doc_ref = args.doc_ref),
			(this.score_guess = args.score_guess),
			(this.uid = args.uid),
			(this.season_type = args.season_type),
			(this.week = args.week),
			(this.season_year = args.season_year);
	}
}
