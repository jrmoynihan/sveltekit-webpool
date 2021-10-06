import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	linkWithPopup,
	linkWithRedirect,
	OAuthCredential,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	getRedirectResult
} from '@firebase/auth';
import type { User, UserCredential, AuthProvider } from '@firebase/auth';
import { firestoreAuth } from '$scripts/firebaseInit';
import { get, writable } from 'svelte/store';
import { WebUser } from '$scripts/classes/webUser';
import { getDoc, doc, setDoc } from '@firebase/firestore';
import { usersCollection } from '$scripts/collections';
import { goto } from '$app/navigation';
import { userConverter } from '../converters';
import { myError, myLog } from '../classes/constants';
import { userNotFound } from './signInRedirectResult';
import { dev } from '$app/env';
import { WeeklyPickRecord, UserWinnings } from '$scripts/classes/userRecord';

export const currentUser = writable<User>(firestoreAuth.currentUser);
export const userData = writable<WebUser>();

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

// export const getUserCredentialFromRedirect = async (
// 	provider: AuthProvider
// ): Promise<void> => {
// 	try {
// 		await signInWithRedirect(firestoreAuth, provider); // If useRedirect is true, signInWithRedirect...
// 	} catch (error) {
// 		alert(error);
// 	}
// };

// export const getUserCredentialFromPopup = async (
// 	provider: AuthProvider
// ): Promise<UserCredential> => {
// 	try {
// 		return await signInWithPopup(firestoreAuth, provider); // Else signInWithPopup
// 	} catch (error) {
// 		alert(error);
// 	}
// };

export const startSignIn = async (loginPlatform: string, useRedirect: boolean) => {
	// Set which Auth provider we want to use to authenticate the user
	const provider = await getProvider(loginPlatform);

	// If the user is already signed in, this will link the new provider credentials with the existing user account under the initial login provider
	if (firestoreAuth.currentUser) {
		useRedirect
			? await linkWithRedirect(firestoreAuth.currentUser, provider)
			: await linkWithPopup(firestoreAuth.currentUser, provider);
	}

	// Store the promised user credential that the auth provider returns
	if (useRedirect) {
		await signInWithRedirect(firestoreAuth, provider);
	}
	// Everything below here will not run if the redirect sign-in above occurs
	// const userCredential = await signInWithPopup(firestoreAuth, provider);
	// if (userCredential) {
	// 	// const OAuthCredential = await getOAuthCredential(provider, userCredential);
	// 	// const token = OAuthCredential.accessToken;
	// 	currentUser.set(userCredential.user);
	// 	const _currentUser = get(currentUser);

	// 	// Find if the user document already exists before trying to write a new one
	// 	const userDocSnapshot = await getDoc(doc(usersCollection, _currentUser.uid));

	// 	// Log if the user doc exists
	// 	if (userDocSnapshot.exists()) {
	// 		console.info(`User ${userDocSnapshot.exists()} already exists`);
	// 	}
	// 	// Else, create a new document for the user
	// 	else {
	// 		console.info('user not found!');
	// 		userNotFound.set(true);
	// 		if (dev) {
	// 			try {
	// 				await createNewUserDocument();
	// 				console.log('created new user doc!');
	// 			} catch (error) {
	// 				console.warn('failed to create user doc!', error);
	// 			}
	// 		}
	// 	}
	// }
	// if (modalID) {
	// 	hideModal(modalID);
	// }
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
	signOut(firestoreAuth);
	goto('/'); // go to the index page, navigating the user away from any authorized page they may be on currently
};
firestoreAuth.onAuthStateChanged(
	() => {
		if (firestoreAuth.currentUser) {
			currentUser.set(firestoreAuth.currentUser);
			myLog(`the current user is ${get(currentUser).displayName}`, 'auth.ts => onAuthStateChanged');
		} else {
			myLog(`auth state changed, but current user is null or undefined: ${currentUser}`);
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
