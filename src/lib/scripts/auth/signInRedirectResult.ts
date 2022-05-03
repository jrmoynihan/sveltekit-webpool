import { browser } from '$app/env';
import { myLog } from '$scripts/classes/constants';
import { playersCollection } from '$scripts/collections';
import { firestoreAuth } from '$scripts/firebaseInit';
import { defaultToast } from '$scripts/toasts';
import {
	browserPopupRedirectResolver,
	fetchSignInMethodsForEmail,
	getRedirectResult
} from 'firebase/auth';
import type { AuthError } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { get } from 'svelte/store';
import { capitalizeWord } from '$scripts/functions';
import { firebase_user, player_not_found } from '$scripts/store';

const obtainPlayerDocOnRedirect = async (): Promise<void> => {
	try {
		const credential = await getRedirectResult(firestoreAuth, browserPopupRedirectResolver);
		if (credential) {
			console.log('got redirect result!', credential);

			getCurrentPlayerDoc();
		}
	} catch (error) {
		const typed_error: AuthError = error; // recast the error type from 'any' to a useful type
		myLog({ msg: 'no redirect result returned: ', additional_params: typed_error });

		if (
			error.code === 'auth/account-exists-with-different-credential' ||
			error.code === 'auth/email-already-in-use'
		) {
			const email: string = typed_error.customData.email as string;
			// console.log('customData:', errorTyped.customData);
			if (email) {
				const existingSignInMethods = await fetchSignInMethodsForEmail(firestoreAuth, email);
				myLog({ msg: 'existing sign ins: ', additional_params: existingSignInMethods });
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
};

browser ? obtainPlayerDocOnRedirect() : null;

/**
 * Looks up the current Auth user, then tries to query for their user document from Firebase.
 * If it exists, the userNotFound store is set to {true}, indicating a New User prompt should be displayed.
 */
async function getCurrentPlayerDoc(): Promise<void> {
	const user = get(firebase_user);
	const player_doc = doc(playersCollection, user.uid);
	const player_doc_snapshot = await getDoc(player_doc);
	// Log if the user doc exists
	if (player_doc_snapshot.exists()) {
		console.info(`Player doc already exists`);
	} else {
		console.info('Player doc not found!');
		// Set a global store that will indicate the user needs a New User prompt
		player_not_found.set(true);
	}
}
