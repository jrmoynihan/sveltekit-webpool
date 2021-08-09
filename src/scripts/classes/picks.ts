import type { DocumentReference } from 'firebase/firestore';

export class WeeklyPickDoc {
	docRef: DocumentReference;
	picks: WeeklyGamePick[];
	uid: string;
	week: number;
	constructor(
		docRef: DocumentReference,
		picks: { id: string; pick: string }[],
		uid: string,
		week: number
	) {
		(this.docRef = docRef), (this.picks = picks), (this.uid = uid), (this.week = week);
	}
}
export class WeeklyGamePick {
	id: string;
	pick: string;
}
