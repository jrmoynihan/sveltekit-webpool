import { browser } from '$app/env';
import { myLog } from '$scripts/logging';
import { playersCollection } from '$scripts/collections';
import { firebaseAuth } from '$lib/scripts/firebase/firebase';
import { defaultToast } from '$scripts/toasts';
import {
	browserPopupRedirectResolver,
	fetchSignInMethodsForEmail,
	getRedirectResult, GoogleAuthProvider, type AuthError
} from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import { get } from 'svelte/store';
import { capitalizeWord } from '$scripts/functions';
import { firebase_user } from '$scripts/store';
import { request } from '$lib/fetch';

const doStuffOnRedirect = async (): Promise<void> => {
	try {
		const result = await getRedirectResult(firebaseAuth, browserPopupRedirectResolver);
		if (result) {
			console.log('got redirect result!', result);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const id_token = credential.accessToken;
			await request('/auth',"POST", {id_token})
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
				const existingSignInMethods = await fetchSignInMethodsForEmail(firebaseAuth, email);
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

// This has to be placed after the function is declared to be lexically scoped
browser ? doStuffOnRedirect() : null;

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
	}
}