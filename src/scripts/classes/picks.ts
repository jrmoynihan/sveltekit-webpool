import type { DocumentReference } from 'firebase/firestore';

export class WeeklyPickDoc {
	docRef: DocumentReference;
	pick: string;
	id: string;
	uid: string;
	week: number;
	constructor(docRef: DocumentReference, id: string, pick: string, uid: string, week: number) {
		(this.docRef = docRef),
			(this.id = id),
			(this.pick = pick),
			(this.uid = uid),
			(this.week = week);
	}
}
