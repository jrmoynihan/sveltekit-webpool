import { browser } from '$app/env';
import { myLog } from '$scripts/classes/constants';
import { usersCollection } from '$scripts/collections';
import { firestoreAuth } from '$scripts/firebaseInit';
import { defaultToast } from '$scripts/toasts';
import {
	browserPopupRedirectResolver,
	fetchSignInMethodsForEmail,
	getRedirectResult
} from 'firebase/auth';
import type { AuthError } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { get, writable } from 'svelte/store';
import { currentUser } from './auth';
import { capitalizeWord } from '$scripts/functions';

export const userNotFound = writable(false);

if (browser) {
	try {
		const credential = await getRedirectResult(firestoreAuth, browserPopupRedirectResolver);
		if (credential) {
			console.log('got redirect result!', credential);

			getCurrentUserDoc();
		}
	} catch (error) {
		const errorTyped: AuthError = error; // recast the error type from 'any' to a useful type
		myLog(`no redirect result returned: ${errorTyped}`);

		if (
			error.code === 'auth/account-exists-with-different-credential' ||
			error.code === 'auth/email-already-in-use'
		) {
			const email: string = errorTyped.customData.email as string;
			// console.log('customData:', errorTyped.customData);
			if (email) {
				const existingSignInMethods = await fetchSignInMethodsForEmail(firestoreAuth, email);
				myLog(`existing sign ins:`, undefined, undefined, existingSignInMethods);
				const existingProvider = capitalizeWord(
					existingSignInMethods[0].replace('.com', '').replace('"', '')
				);
				defaultToast({
					title: `Account Already Exists!`,
					msg: `An account already exists for this email under a different sign-in provider.  
					Please login to the existing provider: <br><b> ${existingProvider} (${email})</b><br> to link the account with a different provider.`,
					duration: 30000
				});
			}
		}
	}
}

/**
 * Looks up the current Auth user, then tries to query for their user document from Firebase.
 * If it exists, the userNotFound store is set to {true}, indicating a New User prompt should be displayed.
 */
async function getCurrentUserDoc(): Promise<void> {
	const user = get(currentUser);
	const userDoc = doc(usersCollection, user.uid);
	const userDocSnapshot = await getDoc(userDoc);
	// Log if the user doc exists
	if (userDocSnapshot.exists()) {
		console.info(`User doc already exists`);
	} else {
		console.info('User doc not found!');
		// Set a global store that will indicate the user needs a New User prompt
		userNotFound.set(true);
	}
}
