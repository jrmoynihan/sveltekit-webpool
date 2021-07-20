import type { DocumentReference } from 'firebase/firestore';

export class WebUserData {
	id: string;
	ref: DocumentReference;
	name: string;
	email: string;
	admin: boolean;
	college: boolean;
	pick6: boolean;
	playoffs: boolean;
	survivor: boolean;
	constructor(
		id?: string,
		ref?: DocumentReference,
		name?: string,
		email?: string,
		admin?: boolean,
		college?: boolean,
		pick6?: boolean,
		playoffs?: boolean,
		survivor?: boolean
	) {
		(this.id = id),
			(this.ref = ref),
			(this.name = name),
			(this.email = email),
			(this.admin = admin);
		this.college = college;
		this.pick6 = pick6;
		this.playoffs = playoffs;
		this.survivor = survivor;
	}
}
