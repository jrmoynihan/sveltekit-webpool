import type { Team } from '$scripts/classes/team';
import { collection, onSnapshot, query, getDocs, updateDoc } from '@firebase/firestore';
import { firestoreDB } from './firebaseInit';
import { writable } from 'svelte/store';
import { teamConverter } from './converters';
import { defaultToast } from './toasts';

export const teamsCollection = collection(firestoreDB, 'Teams');
export const allTeams = writable<Team[]>([]);

export const getTeams = onSnapshot(teamsCollection.withConverter(teamConverter), (snap) => {
	snap.forEach((doc) => {
		allTeams.update((allTeams) => {
			return [...allTeams, doc.data()];
		});
	});
});

export const resetTeamRecords = async () => {
	const proceed = confirm('Are you sure you want to reset the team records?');
	if (proceed) {
		const teamQuery = query(teamsCollection);
		const teams = await getDocs(teamQuery.withConverter(teamConverter));
		teams.forEach((team) => {
			updateDoc(team.ref, { wins: 0, losses: 0, ties: 0 });
		});
		defaultToast({
			title: 'Records Reset!',
			msg: 'All team records have been reset to 0-0-0 (Wins-Losses-Ties).'
		});
	}
};
