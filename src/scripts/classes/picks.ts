import type { DocumentReference, Timestamp } from '@firebase/firestore';

export class WeeklyPickDoc {
	docRef: DocumentReference;
	pick: string;
	gameId: string;
	uid: string;
	week: number;
	year: number;
	timestamp: Timestamp;
	name: string;
	// nickname: string;
	type: string;
	isCorrect: boolean;
	constructor({ ...args }) {
		(this.docRef = args.docRef),
			(this.gameId = args.gameId),
			(this.pick = args.pick),
			(this.uid = args.uid),
			(this.week = args.week);
		this.year = args.year;
		this.timestamp = args.timestamp;
		this.name = args.name;
		// this.nickname = args.nickname;
		this.type = args.type;
		this.isCorrect = args.isCorrect;
	}
}
