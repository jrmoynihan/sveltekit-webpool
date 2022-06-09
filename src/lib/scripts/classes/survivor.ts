import type { DocumentReference } from '@firebase/firestore';

export class Survivor {
	doc_ref: DocumentReference;
	uid: string;
	nickname: string;
	season_year: number;
	picks: SurvivorPick[];
	constructor({ ...args }) {
		this.doc_ref = args.doc_ref;
		this.uid = args.uid;
		this.nickname = args.nickname;
		this.season_year = args.season_year;
		this.picks = args.picks;
	}
}
export class SurvivorPick {
	week: number;
	pick: string;
	is_correct: boolean;
	constructor({ ...args }) {
		this.week = args.week;
		this.pick = args.pick || '';
		this.is_correct = args.is_correct || false;
	}
}
