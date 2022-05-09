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
	type User, type UserCredential, type AuthProvider, onAuthStateChanged
} from '@firebase/auth';
import { firebaseAuth } from '$lib/scripts/firebase/firebase';
import { Player } from '$lib/scripts/classes/player';
import { doc, setDoc } from '@firebase/firestore';
import { playersCollection } from '$scripts/collections';
import { goto } from '$app/navigation';
import { playerConverter } from '$scripts/converters';
import { WeeklyPickRecord, PlayerWinnings } from '$classes/playerRecord';
import { savePlayerData } from '$scripts/localStorage';
import { firebase_user, current_player } from '$scripts/store';
import { myError, myLog } from '$scripts/logging';
import {browser} from '$app/env';

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
		let result: UserCredential
		if (useRedirect) {
			await signInWithRedirect(firebaseAuth, provider, browserPopupRedirectResolver);
			result = await getRedirectResult(firebaseAuth);
		} else {
			result = await signInWithPopup(firebaseAuth, provider, browserPopupRedirectResolver);
		}

		if(result){
			console.log('signed in user: ',result.user);
			return result;
		}

	} catch (error) {
		myError({location: 'login.ts', function_name: 'getUserCredential', error});
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
	if (firebaseAuth.currentUser) {
		if (useRedirect) {
			await linkWithRedirect(firebaseAuth.currentUser, provider, browserPopupRedirectResolver);
		} else {
			await linkWithPopup(firebaseAuth.currentUser, provider);
		}
	}

	// Store the promised user credential that the auth provider returns
		myLog({msg:'signing in...'});
		await signInWithRedirectOrPopup(provider, useRedirect);
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
export const createNewPlayerDocument = async (
	firebase_user: User,
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
		// Make a document reference for the user with the user's UID, making it both unique and easy to lookup after they login
		const new_player_ref = doc(playersCollection, firebase_user.uid);

		const new_player_data = new Player({
			uid: firebase_user.uid,
			ref: new_player_ref,
			name: firebase_user.displayName,
			nickname: nickname || firebase_user.displayName,
			email: firebase_user.email,
			active: true,
			admin: false,
			college: pools.college,
			pick6: pools.pick6,
			playoffs: pools.playoffs,
			survivor: pools.survivor,
			weekly: pools.weekly,
			weeklyPickRecord: { ...new WeeklyPickRecord({}) },
			weeklyWinnings: { ...new PlayerWinnings({}) },
			amountOwedToPools,
			amountPaidToPools,
			paidWeekly: false,
			paidCollege: false,
			paidPlayoffs: false,
			paidSurvivor: false,
			paidPick6: false
		});
		// Write some initial data to the user document
		await setDoc(new_player_ref.withConverter(playerConverter), new_player_data);

		myLog({msg: `New player doc for ${firebase_user.displayName} (${firebase_user.uid}) added!`});
	} catch (error) {
		myError({msg: 'error in createNewPlayerDocument', error});
	}
};

export const startSignOut = async (): Promise<void> => {
	current_player.set(undefined);
	firebase_user.set(undefined);
	signOut(firebaseAuth);
	myLog({msg: 'user has signed out ', traceLocation: true, additional_params: {player_data: current_player, firebase_user, firestoreAuth: firebaseAuth}});
	goto('/'); // go to the index page, navigating the user away from any authorized page they may be on currently
};

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

onAuthStateChanged(firebaseAuth,
	async () => {
		if (firebaseAuth.currentUser) {
			firebase_user.set(firebaseAuth.currentUser);
			savePlayerData(firebaseAuth.currentUser);
			myLog({msg: `Current user is: ${firebaseAuth.currentUser.displayName}`, traceLocation: true})
		} else if (browser) {
			goto('/');
			myLog({msg: 'No current user.', traceLocation: true});
		}
	},
	(error) => myError({location: 'login.ts', function_name: 'onAuthStateChanged', error})
);