import { browser } from '$app/env';
import { playersCollection } from '$scripts/collections';
import { playerConverter } from '$scripts/converters';
import { playerData } from '$scripts/store';
import { doc, getDoc } from 'firebase/firestore';
import { Player } from '$lib/scripts/classes/player';
import { all_icons, myError, myLog } from '$classes/constants';
import type { User } from 'firebase/auth';

export const getLocalStorageItem = async <T>(key: string): Promise<T | null> => {
	if (browser) {
		const item = JSON.parse(localStorage.getItem(key));
		return item !== null ? item : null;
	} else {
		myLog({ msg: 'unable to check for local storage without the browser available' });
	}
};
export const setLocalStorageItem = async (key: string, value: unknown): Promise<void> => {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		myLog({ msg: 'unable to set item in local storage without the browser available' });
	}
};

export const savePlayerData = async (firebase_user: User) => {
	try {
		const player_doc_ref = doc(playersCollection, firebase_user.uid);
		const snapshot = await getDoc(player_doc_ref.withConverter(playerConverter));
		const player = new Player({ ...snapshot.data() });

		playerData.set(player);

		for (const property in player) {
			setLocalStorageItem(property, player[property]);
		}

		myLog({
			msg: 'Set player data and saved it to local storage:',
			function_name: 'savePlayerData',
			icon: all_icons.detective,
			additional_params: playerData
		});
	} catch (error) {
		myError({
			location: 'localStorage.ts',
			function_name: 'savePlayerData',
			error,
			msg: 'Unable to save player data to local storage!'
		});
	}
};
