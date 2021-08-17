import type { DocumentReference, Timestamp } from 'firebase/firestore';

export class WeeklyPickDoc {
	docRef: DocumentReference;
	pick: string;
	id: string;
	uid: string;
	week: number;
	timestamp: Timestamp;
	constructor(
		docRef: DocumentReference,
		id: string,
		pick: string,
		uid: string,
		week: number,
		timestamp: Timestamp
	) {
		(this.docRef = docRef),
			(this.id = id),
			(this.pick = pick),
			(this.uid = uid),
			(this.week = week);
		this.timestamp = timestamp;
	}
}
