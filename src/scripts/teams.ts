import { collection, query, getDocs, onSnapshot, updateDoc } from '@firebase/firestore';
import { firestoreDB } from './firebaseInit';
import { teamConverter } from './converters';
import { defaultToast } from './toasts';
import type { Team } from './classes/team';
import { writable } from 'svelte/store';

export const teamsCollection = collection(firestoreDB, 'Teams');
export const allTeams = writable<Team[]>([]);

export const getTeams = onSnapshot(teamsCollection.withConverter(teamConverter), (snap) => {
	snap.forEach((doc) => {
		allTeams.update((allTeams) => {
			return [...allTeams, doc.data()];
		});
	});
});
export const getAllTeams = async (): Promise<Team[]> => {
	let teamsToReturn: Team[];
	const teamDocs = await getDocs(query(teamsCollection).withConverter(teamConverter));
	teamDocs.forEach((teamDoc) => {
		const teamData = teamDoc.data();
		teamsToReturn.push(teamData);
	});
	return teamsToReturn;
};

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
