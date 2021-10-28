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
	browserPopupRedirectResolver
} from 'firebase/auth';
import type { User, UserCredential, AuthProvider } from 'firebase/auth';
import { firestoreAuth } from '$scripts/firebaseInit';
import { get, writable } from 'svelte/store';
import { WebUser } from '$scripts/classes/webUser';
import { doc, setDoc, query } from 'firebase/firestore';
import { usersCollection } from '$scripts/collections';
import { goto } from '$app/navigation';
import { userConverter } from '../converters';
import { myError, myLog } from '../classes/constants';
import { WeeklyPickRecord, UserWinnings } from '$scripts/classes/userRecord';
import { userQueryAsStore } from '$scripts/store';
import { saveUserData } from '$scripts/localStorage';

export const currentUser = writable<User>(firestoreAuth.currentUser);
export const userData = writable<WebUser>();
const currentUserQuery = query(usersCollection);
export const userDataSnapshot = userQueryAsStore(currentUserQuery);

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

export const setPendingProviderInSessionStorage = async (provider: AuthProvider) => {
	const pendingProvider = sessionStorage.setItem('pendingProvider', JSON.stringify(provider));
	return pendingProvider;
};
export const getPendingProviderFromSessionStorage = async () => {
	const pendingProvider = sessionStorage.getItem('pendingProvider');
	return pendingProvider;
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

export const startSignIn = async (loginPlatform: string, useRedirect = true) => {
	// Set which Auth provider we want to use to authenticate the user
	const provider = await getProvider(loginPlatform);

	// Store which provider we're using in session storage for the browser tab
	// We might need to look this up again if the login failed
	await setPendingProviderInSessionStorage(provider);

	// Save the credential in session storage so that it can be retrieved after a redirect login
	switch (provider.providerId) {
		case 'google.com': {
			// const pendingCredential = GoogleAuthProvider.credential();
			// sessionStorage.setItem('pendingCredential', JSON.stringify(pendingCredential));
		}
		case 'facebook.com':
			{
				// const pendingCredential = FacebookAuthProvider.credential();
				// sessionStorage.setItem('pendingCredential', JSON.stringify(pendingCredential));
			}
			break;
	}

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
		const newUser: User = get(currentUser);
		// Make a document reference for the user with the user's UID, making it both unique and easy to lookup after they login
		const newUserRef = doc(usersCollection, newUser.uid);

		const newUserData = new WebUser({
			id: newUser.uid,
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
			amountPaidToPools
		});
		console.log('newUserData', newUserData);
		// Write some initial data to the user document
		await setDoc(newUserRef.withConverter(userConverter), newUserData);

		console.info(`New user doc for ${newUser.displayName} (${newUser.uid}) added!`);
	} catch (error) {
		console.warn('error in createNewUserDocument', error);
	}
};

export const startSignOut = async (): Promise<void> => {
	userData.set(undefined);
	myLog(`userData is ${userData}`);
	currentUser.set(undefined);
	myLog(`currentUser is ${currentUser}`);
	signOut(firestoreAuth);
	myLog(`firestoreAuth is ${firestoreAuth}`);
	goto('/'); // go to the index page, navigating the user away from any authorized page they may be on currently
};
firestoreAuth.onAuthStateChanged(
	() => {
		if (firestoreAuth.currentUser) {
			currentUser.set(firestoreAuth.currentUser);
			saveUserData();
			myLog(`the current user is ${get(currentUser).displayName}`, 'auth.ts => onAuthStateChanged');
		} else {
			myLog(
				`auth state changed, but current user is falsy (null or undefined): currentUser is ${
					get(currentUser)?.displayName
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
