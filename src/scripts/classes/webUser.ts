import type { DocumentReference } from '@firebase/firestore';
import type { WeeklyPickRecord } from './userRecord';

export class WebUser {
	id: string;
	ref: DocumentReference;
	name: string;
	nickname: string;
	email: string;
	admin: boolean;
	college: boolean;
	pick6: boolean;
	playoffs: boolean;
	survivor: boolean;
	weekly: boolean;
	weeklyPickRecord: WeeklyPickRecord;
	constructor({ ...args }) {
		(this.id = args.id),
			(this.ref = args.ref),
			(this.name = args.name),
			(this.nickname = args.nickname),
			(this.email = args.email),
			(this.admin = args.admin);
		this.college = args.college;
		this.pick6 = args.pick6;
		this.playoffs = args.playoffs;
		this.survivor = args.survivor;
		this.weekly = args.weekly;
		this.weeklyPickRecord = args.weeklyPickRecord;
	}
}
