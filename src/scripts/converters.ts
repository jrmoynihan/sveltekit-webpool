import type { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { WebUserData } from './classes';

export const userConverter = {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toFirestore: (user: Partial<WebUserData>) => {
		return {
			name: user.name,
			email: user.email,
			admin: user.admin,
			college: user.college,
			pick6: user.pick6,
			playoffs: user.playoffs,
			survivor: user.survivor
		};
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WebUserData => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new WebUserData(
			docID,
			docRef,
			data.name,
			data.email,
			data.admin,
			data.college,
			data.pick6,
			data.playoffs,
			data.survivor
		);
	}
};
