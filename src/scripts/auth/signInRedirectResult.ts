import { browser, dev } from '$app/env';
import { myError } from '$scripts/classes/constants';
import { usersCollection } from '$scripts/collections';
import { firestoreAuth } from '$scripts/firebaseInit';
import { getRedirectResult } from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import { get, writable } from 'svelte/store';
import { currentUser } from './auth';

export const userNotFound = writable(false);

if (!dev && browser) {
	try {
		getRedirectResult(firestoreAuth).then(async (result) => {
			try {
				console.log(result);
				currentUser.set(result.user);
				console.log(currentUser);
				const userDoc = doc(usersCollection, get(currentUser).uid);
				const userDocSnapshot = await getDoc(userDoc);
				console.log('userDocSnapshot exists:', userDocSnapshot.exists());
				// Log if the user doc exists
				if (userDocSnapshot.exists()) {
					console.info(`User ${userDocSnapshot.exists()} already exists`);
				}
				// Else, create a new document for the user
				else {
					console.info('user not found!');
					userNotFound.set(true);
				}
			} catch (error) {
				myError('getRedirectResult', error);
			}
		});
	} catch (error) {
		myError('signInRedirectResult', error);
	}
}
