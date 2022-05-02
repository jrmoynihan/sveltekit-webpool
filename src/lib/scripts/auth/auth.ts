import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	linkWithPopup,
	linkWithRedirect,
	OAuthCredential,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	getRedirectResult,
	browserPopupRedirectResolver,
	type User, type UserCredential, type AuthProvider
} from 'firebase/auth';
import { firestoreAuth } from '$scripts/firebaseInit';
import { get } from 'svelte/store';
import { Player } from '$lib/scripts/classes/player';
import { doc, setDoc } from 'firebase/firestore';
import { playersCollection } from '$scripts/collections';
import { goto } from '$app/navigation';
import { playerConverter } from '../converters';
import { myError, myLog } from '$classes/constants';
import { WeeklyPickRecord, UserWinnings } from '$classes/userRecord';
import { saveUserData } from '$scripts/localStorage';
import { authorizedUser, playerData } from '$scripts/store';

// const currentUserQuery = query(usersCollection);
// export const userDataSnapshot = userQueryAsStore(currentUserQuery);

/**
 *
 * @param {string} loginPlatform - The name of the Auth provider being used
 * @returns {Promise<AuthProvider>} An instance of the correct AuthProvider needed for the chosen login platform
 */
export const getProvider = async (loginPlatform: string): Promise<AuthProvider> => {
	let provider: AuthProvider;
	switch (loginPlatform) {
		case 'Google':
			provider = new GoogleAuthProvider();
			break;
		case 'Facebook':
			provider = new FacebookAuthProvider();
			break;
		default:
			provider = new GoogleAuthProvider();
			break;
	}
	return provider;
};

export const signInWithRedirectOrPopup = async (
	provider: AuthProvider,
	useRedirect: boolean
): Promise<UserCredential> => {
	try {
		if (useRedirect) {
			await signInWithRedirect(firestoreAuth, provider);
			const result = await getRedirectResult(firestoreAuth);
			console.log(result);
			return result;
		} else {
			const result = await signInWithPopup(firestoreAuth, provider);
			console.log(result);
			return result;
		}
	} catch (error) {
		myError('getUserCredential', error);
	}
};

/**
 * Finds the right Auth provider interface to use for the chosen platform, and then calls
 * Firebase login functions to sign in with a page redirect or a popup window.
 * @param {string} loginPlatform - The name of the Auth provider to be used
 * @param {boolean} useRedirect - If the login process should use a page redirect (true) or a popup (false).
 */
export const startSignIn = async (loginPlatform: string, useRedirect: boolean = true) => {
	// Set which Auth provider we want to use to authenticate the user
	const provider = await getProvider(loginPlatform);

	// @TODO move this to its own function and UI
	// If the user is already signed in, this will link the new provider credentials with the existing user account under the initial login provider
	if (firestoreAuth.currentUser) {
		if (useRedirect) {
			await linkWithRedirect(firestoreAuth.currentUser, provider, browserPopupRedirectResolver);
		} else {
			await linkWithPopup(firestoreAuth.currentUser, provider);
		}
	}

	// Store the promised user credential that the auth provider returns
	if (useRedirect) {
		myLog('signing in with redirect...');
		await signInWithRedirect(firestoreAuth, provider, browserPopupRedirectResolver);
	}
};

/**
 * Sets a new user document in the Users collection
 * @param {string} nickname - The nickname the user wants to use for the new account
 * @param pools - The pools the user will join.
 * @param pools.college - If the user will join the College Bowl pool
 * @param pools.pick6 - If the user join the Pick6 pool
 * @param pools.playoffs - If the user join the NFL Playoffs pool
 * @param pools.survivor - If the user join the Survivor pool
 * @param pools.weekly - If the user join the Weekly ATS pool
 * @param amountOwedToPools - The amount they owe the pool upon joining (default: $0, but this total should be provided to the function when calling it)
 * @param amountPaidToPools - The amount they have already paid the pool (default: $0)
 */
export const createNewUserDocument = async (
	nickname: string,
	pools: {
		college: boolean;
		pick6: boolean;
		playoffs: boolean;
		survivor: boolean;
		weekly: boolean;
	},
	amountOwedToPools = 0,
	amountPaidToPools = 0
): Promise<void> => {
	try {
		const newUser: User = get(authorizedUser);
		// Make a document reference for the user with the user's UID, making it both unique and easy to lookup after they login
		const newUserRef = doc(playersCollection, newUser.uid);

		const newUserData = new Player({
			uid: newUser.uid,
			ref: newUserRef,
			name: newUser.displayName,
			nickname: nickname || newUser.displayName,
			email: newUser.email,
			active: true,
			admin: false,
			college: pools.college,
			pick6: pools.pick6,
			playoffs: pools.playoffs,
			survivor: pools.survivor,
			weekly: pools.weekly,
			weeklyPickRecord: { ...new WeeklyPickRecord({}) },
			weeklyWinnings: { ...new UserWinnings({}) },
			amountOwedToPools,
			amountPaidToPools,
			paidWeekly: false,
			paidCollege: false,
			paidPlayoffs: false,
			paidSurvivor: false,
			paidPick6: false
		});
		console.log('newUserData', newUserData);
		// Write some initial data to the user document
		await setDoc(newUserRef.withConverter(playerConverter), newUserData);

		console.info(`New user doc for ${newUser.displayName} (${newUser.uid}) added!`);
	} catch (error) {
		console.warn('error in createNewUserDocument', error);
	}
};

export const startSignOut = async (): Promise<void> => {
	playerData.set(undefined);
	myLog(`userData is ${playerData}`);
	authorizedUser.set(undefined);
	myLog(`currentUser is ${authorizedUser}`);
	signOut(firestoreAuth);
	myLog(`firestoreAuth is ${firestoreAuth}`);
	goto('/'); // go to the index page, navigating the user away from any authorized page they may be on currently
};
firestoreAuth.onAuthStateChanged(
	async () => {
		if (firestoreAuth.currentUser) {
			authorizedUser.set(firestoreAuth.currentUser);
			saveUserData();
			myLog(`the current user is ${get(authorizedUser).displayName}`, 'auth.ts => onAuthStateChanged');
		} else {
			myLog(
				`auth state changed, but current user is falsy (null or undefined): currentUser is ${
					get(authorizedUser)?.displayName
				}`
			);
		}
	},
	(error) => myError('auth.ts => onAuthStateChanged', error)
);

export const getOAuthCredential = async (
	provider: AuthProvider,
	userCredential: UserCredential
): Promise<OAuthCredential> => {
	if (provider instanceof GoogleAuthProvider) {
		return GoogleAuthProvider.credentialFromResult(userCredential);
	}
	if (provider instanceof FacebookAuthProvider) {
		return FacebookAuthProvider.credentialFromResult(userCredential);
	}
};
