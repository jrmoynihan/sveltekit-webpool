import type { Team } from '$scripts/classes/team';
import { collection, onSnapshot } from '@firebase/firestore';
import { firestoreDB } from './firebaseInit';
import { get, writable } from 'svelte/store';
import { teamConverter } from './converters';

export const teamsCollection = collection(firestoreDB, 'Teams');
export const allTeams = writable<Team[]>([]);

// export const getTeams = onSnapshot(teamsCollection.withConverter(teamConverter), (snap) => {
// 	snap.forEach((doc) => {
// 		allTeams.set([...get(allTeams), doc.data()]);
// 	});
// 	getTeams();
// });

export default allTeams;

// export const sortedTeams = allTeams.sort((firstItem, secondItem) => {
// 	if (firstItem.abbreviation > secondItem.abbreviation) {
// 		return 1;
// 	}
// 	if (firstItem.abbreviation < secondItem.abbreviation) {
// 		return -1;
// 	}
// 	return 0;
// });
