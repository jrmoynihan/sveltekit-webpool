import type { DocumentReference } from '@firebase/firestore';

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
	constructor(
		id?: string,
		ref?: DocumentReference,
		name?: string,
		nickname?: string,
		email?: string,
		admin?: boolean,
		college?: boolean,
		pick6?: boolean,
		playoffs?: boolean,
		survivor?: boolean,
		weekly?: boolean
	) {
		(this.id = id),
			(this.ref = ref),
			(this.name = name),
			(this.nickname = nickname),
			(this.email = email),
			(this.admin = admin);
		this.college = college;
		this.pick6 = pick6;
		this.playoffs = playoffs;
		this.survivor = survivor;
		this.weekly = weekly;
	}
}
