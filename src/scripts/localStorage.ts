import { WebUser } from './classes/webUser';
import { usersCollection } from './collections';
import { userConverter } from './converters';
import { doc, getDoc } from '@firebase/firestore';
import { currentUser, userData } from './auth/auth';
import { get } from 'svelte/store';
import { browser } from '$app/env';
import { myError, myLog } from './classes/constants';

export const getLocalStorageItem = async (key: string): Promise<any> => {
	if (browser) {
		const item = JSON.parse(localStorage.getItem(key));
		return item;
	} else {
		myLog('unable to check for local storage');
	}
};
export const setLocalStorageItem = async (key: string, value: string): Promise<void> => {
	if (browser) {
		localStorage.setItem(key, JSON.stringify(value));
	} else {
		myLog('unable to set item in local storage');
	}
};

export const saveUserData = async () => {
	try {
		const userDocRef = doc(usersCollection, get(currentUser).uid);
		const snapshot = await getDoc(userDocRef.withConverter(userConverter));
		const user = new WebUser({ ...snapshot.data() });
		userData.set(user);
	for (const property in user) {
		setLocalStorageItem(property, user[property]);
	}	
	} catch (error) {
		myError('saveUserData',error,'unable to save user data to local storage.')	
	}
	
};
