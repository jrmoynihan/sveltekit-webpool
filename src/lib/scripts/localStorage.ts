import { browser } from '$app/env';
import { get } from 'svelte/store';
import { playersCollection } from '$scripts/collections';
import { playerConverter } from '$scripts/converters';
import { firebase_user, playerData } from '$scripts/store';
import { doc, getDoc } from 'firebase/firestore';
import { Player } from '$lib/scripts/classes/player';
import { detective, myError, myLog } from '$classes/constants';
import type { User } from 'firebase/auth';

export const getLocalStorageItem = async <T>(key: string): Promise<T | null> => {
	if (browser) {
		const item = JSON.parse(localStorage.getItem(key));
		return item !== null ? item : null;
	} else {
		myLog('unable to check for local storage without the browser available');
	}
};
export const setLocalStorageItem = async (key: string, value: unknown): Promise<void> => {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		myLog('unable to set item in local storage without the browser available');
	}
};

export const saveUserData = async (firebase_user: User) => {
	try {
		const userDocRef = doc(playersCollection, firebase_user.uid);
		const snapshot = await getDoc(userDocRef.withConverter(playerConverter));
		const user = new Player({ ...snapshot.data() });

		playerData.set(user);
		myLog(`set userData:`, 'saveUserData', undefined, playerData);

		for (const property in user) {
			setLocalStorageItem(property, user[property]);
		}

		myLog('saved user data to local storage', 'saveUserData', detective);
	} catch (error) {
		myError('saveUserData', error, 'unable to save user data to local storage.');
	}
};
