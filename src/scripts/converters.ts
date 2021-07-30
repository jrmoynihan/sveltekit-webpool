import type { QueryDocumentSnapshot, SnapshotOptions } from 'firebase/firestore';
import { Team, WebUserData } from './classes';

export const userConverter = {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toFirestore: (user: Partial<WebUserData>) => {
		return { ...user };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WebUserData => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new WebUserData(
			docID,
			docRef,
			data.name,
			data.nickname,
			data.email,
			data.admin,
			data.college,
			data.pick6,
			data.playoffs,
			data.survivor,
			data.weekly
		);
	}
};
export const teamConverter = {
	toFirestore: (team: Partial<Team>): Partial<Team> => {
		return {
			...team
		};
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Team => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new Team(
			data.city,
			data.abbreviation,
			data.name,
			data.conference,
			data.division,
			data.logoPath,
			data.fontPath,
			data.wins,
			data.losses,
			data.ties,
			docRef,
			docID
		);
	}
};
