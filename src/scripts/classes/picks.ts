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
	constructor(
		docRef: DocumentReference,
		id: string,
		pick: string,
		uid: string,
		week: number,
		year: number,
		timestamp: Timestamp,
		game: Game
	) {
		(this.docRef = docRef),
			(this.id = id),
			(this.pick = pick),
			(this.uid = uid),
			(this.week = week);
		this.year = year;
		this.timestamp = timestamp;
		this.game = game;
	}
}
