import type { DocumentReference, Timestamp } from '@firebase/firestore';
import type { Game } from './game';

export class WeeklyPickDoc {
	docRef: DocumentReference;
	pick: string;
	id: string;
	uid: string;
	week: number;
	year: number;
	timestamp: Timestamp;
	game: Game;
	type: string;
	constructor({ ...args }) {
		(this.docRef = args.docRef),
			(this.id = args.id),
			(this.pick = args.pick),
			(this.uid = args.uid),
			(this.week = args.week);
		this.year = args.year;
		this.timestamp = args.timestamp;
		this.game = args.game;
		this.type = args.type;
	}
}
