import type { DocumentReference } from '@firebase/firestore';
import type { UserWinnings, WeeklyPickRecord } from './userRecord';

export class WebUser {
	id: string;
	ref: DocumentReference;
	name: string;
	nickname: string;
	email: string;
	active: boolean;
	admin: boolean;
	college: boolean;
	pick6: boolean;
	playoffs: boolean;
	survivor: boolean;
	weekly: boolean;
	weeklyPickRecord: WeeklyPickRecord;
	weeklyWinnings: UserWinnings;
	constructor({ ...args }) {
		(this.id = args.id),
			(this.ref = args.ref),
			(this.name = args.name),
			(this.nickname = args.nickname),
			(this.email = args.email),
			(this.active = args.active || true),
			(this.admin = args.admin || false);
		this.college = args.college || false;
		this.pick6 = args.pick6 || false;
		this.playoffs = args.playoffs || false;
		this.survivor = args.survivor || false;
		this.weekly = args.weekly || false;
		this.weeklyPickRecord = args.weeklyPickRecord;
		this.weeklyWinnings = args.weeklyWinnings;
	}
}
