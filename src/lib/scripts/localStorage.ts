import { browser } from '$app/env';
import { playersCollection } from '$scripts/collections';
import { playerConverter } from '$scripts/converters';
import { current_player, selected_player } from '$scripts/store';
import { doc, getDoc } from '@firebase/firestore';
import { Player } from '$classes/player';
import { all_icons } from '$classes/constants';
import { myError, myLog } from '$scripts/logging';
import type { User } from '@firebase/auth';
import { getPlayer } from './weekly/weeklyPlayers';

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

/**  Saves player data to local storage and sets it in the $player_data store */
export const savePlayerData = async (firebase_user: User) => {
	try {
		const player = await getPlayer(firebase_user);

		for (const property in player) {
			setLocalStorageItem(property, player[property]);
		}

		myLog({
			msg: 'Set player data and saved it to local storage:',
			icon: all_icons.detective,
			additional_params: current_player
		});
	} catch (error) {
		myError({ msg: 'Unable to save player data to local storage!', error });
	}
};
