import type { DocumentReference, Timestamp } from '@firebase/firestore';

export class WeeklyPickDoc {
	doc_ref: DocumentReference;
	pick: string;
	game_id: string;
	uid: string;
	week: number;
	season_year: number;
	timestamp: Timestamp;
	name: string;
	season_type: string;
	is_correct: boolean;
	is_before_game_time?: boolean;
	constructor({ ...args }) {
		(this.doc_ref = args.doc_ref),
			(this.game_id = args.game_id),
			(this.pick = args.pick),
			(this.uid = args.uid),
			(this.week = args.week);
		this.season_year = args.season_year;
		this.timestamp = args.timestamp;
		this.name = args.name;
		this.season_type = args.season_type;
		this.is_correct = args.is_correct;
		this.is_before_game_time = args.is_before_game_time || false;
	}
}
export class PickSixDoc {
	doc_ref: DocumentReference;
	picks: string[];
	uid: string;
	season_year: number;
	name: string;
	nickname: string;
	constructor({ ...args }) {
		(this.doc_ref = args.doc_ref),
			(this.picks = args.picks),
			(this.uid = args.uid),
			(this.season_year = args.season_year);
		this.name = args.name;
		this.nickname = args.nickname;
	}
}
