import { browser, dev } from '$app/env';
import { myError, myLog } from '$scripts/classes/constants';
import { usersCollection } from '$scripts/collections';
import { firestoreAuth } from '$scripts/firebaseInit';
import { getRedirectResult } from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import { get, writable } from 'svelte/store';
import { currentUser } from './auth';

export const userNotFound = writable(false);

if (!dev && browser) {
	try {
		getRedirectResult(firestoreAuth).then(
			// On fulfillment of the Promise...
			async (result) => {
				try {
					console.log('got redirect result!', result);
					const user = get(currentUser);
					console.log('the current user is :', user.displayName);
					const userDoc = doc(usersCollection, user.uid);
					const userDocSnapshot = await getDoc(userDoc);
					// Log if the user doc exists
					if (userDocSnapshot.exists()) {
						console.info(`User doc already exists`);
					}
					// Else, create a new document for the user
					else {
						console.info('user doc not found!');
						userNotFound.set(true);
					}
				} catch (error) {
					myError('getRedirectResult', error);
				}
			},
			// On rejection of Promise...
			(reason) => myLog(`no redirect result returned: ${reason}`)
		);
	} catch (error) {
		myError('signInRedirectResult.ts', error);
	}
}
