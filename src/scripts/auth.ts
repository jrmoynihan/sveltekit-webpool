import {
	AuthProvider,
	FacebookAuthProvider,
	GoogleAuthProvider,
	linkWithPopup,
	linkWithRedirect,
	OAuthCredential,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	User,
	UserCredential
} from '@firebase/auth';
import { firestoreAuth } from '$scripts/firebaseInit';
import { get, writable } from 'svelte/store';
import type { WebUser } from '$scripts/classes/webUser';
import { getDoc, doc, setDoc } from '@firebase/firestore';
import { usersCollection } from '$scripts/collections';
import { hideModal } from './functions';
import { goto } from '$app/navigation';

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

export const getUserCredential = async (
	provider: AuthProvider,
	useRedirect: boolean
): Promise<UserCredential> => {
	if (useRedirect) {
		return await getUserCredentialFromRedirect(provider);
	} else {
		return await getUserCredentialFromPopup(provider);
	}
};

export const getUserCredentialFromRedirect = async (
	provider: AuthProvider
): Promise<UserCredential> => {
	try {
		return await signInWithRedirect(firestoreAuth, provider); // If useRedirect is true, signInWithRedirect...
	} catch (error) {
		alert(error);
	}
};

export const getUserCredentialFromPopup = async (
	provider: AuthProvider
): Promise<UserCredential> => {
	try {
		return await signInWithPopup(firestoreAuth, provider); // Else signInWithPopup
	} catch (error) {
		alert(error);
	}
};

export const startSignIn = async (
	loginPlatform: string,
	useRedirect: boolean,
	modalID?: string
): Promise<void> => {
	// Set which Auth provider we want to use to authenticate the user
	const provider = await getProvider(loginPlatform);

	// If the user is already signed in, this will link the new provider credentials with the existing user account under the initial login provider
	if (firestoreAuth.currentUser) {
		useRedirect
			? await linkWithRedirect(firestoreAuth.currentUser, provider)
			: await linkWithPopup(firestoreAuth.currentUser, provider);
	}

	// Store the promised user credential that the auth provider returns
	const userCredential = await getUserCredential(provider, useRedirect);

	if (userCredential) {
		// const OAuthCredential = await getOAuthCredential(provider, userCredential);
		// const token = OAuthCredential.accessToken;
		currentUser.set(userCredential.user);
		const _currentUser = get(currentUser);

		// Find if the user document already exists before trying to write a new one
		const userDocSnapshot = await getDoc(doc(usersCollection, _currentUser.uid));

		// Log if the user doc exists
		if (userDocSnapshot.exists()) {
			console.info(`User ${userDocSnapshot.exists() ? 'already exists' : 'does not exist!'}`);
		}
		// Else, create a new document for the user
		else {
			try {
				createNewUserDocument();
				console.log('created bew yser doc!');
			} catch (error) {
				console.warn('failed to create user doc!', error);
			}
		}
	}
	if (modalID) {
		hideModal(modalID);
	}
};

export const createNewUserDocument = async (): Promise<void> => {
	try {
		const newUser: User = get(currentUser);
		// Make a document reference for the user with the user's UID, making it both unique and easy to lookup after they login
		const newUserRef = doc(usersCollection, newUser.uid);

		// Write some initial data to the user document
		await setDoc(newUserRef, {
			name: newUser.displayName,
			nickname: newUser.displayName,
			email: newUser.email,
			admin: false,
			college: false,
			pick6: false,
			playoffs: false,
			survivor: false,
			weekly: false,
			id: newUser.uid,
			ref: newUserRef
		});
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
firestoreAuth.onAuthStateChanged(() => {
	currentUser.set(firestoreAuth.currentUser);
});

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
