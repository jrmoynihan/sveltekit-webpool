import { Readable, readable, Writable, writable } from 'svelte/store';
import {
	Query,
	FirestoreDataConverter,
	onSnapshot,
	query,
	collection,
	doc,
	updateDoc
} from '@firebase/firestore';
import { firestoreDB } from './firebaseInit';
import { userConverter } from './converters';
import type { WebUser } from '$scripts/classes/webUser';
import { usersCollection } from './collections';
import { browser } from '$app/env';

export const useDarkTheme = writable(false);
export const chosenMixBlendMode = writable('normal');
export const navChecked = writable(true);
export const sidePanelChecked = writable(true);
export const windowWidth = writable(browser ? window.innerWidth : null);
export const largerThanMobile = writable(true);
export const editing = writable(false);
export const showPickWarning = writable(false);
export const showIDs = writable(false);
export const showSpreads = writable(false);
export const showTimestamps = writable(false);
export const overrideDisabled = writable(false);

export const queryAsStore = (
	query: Query,
	converter?: FirestoreDataConverter<unknown>
): Readable<unknown[]> => {
	return readable<Array<unknown>>([], (set) => {
		onSnapshot(query.withConverter(converter), async (snap) => {
			set(snap.docs.map((doc) => doc.data()));
		});
	});
};
export const writableQueryAsStore = (
	query: Query,
	converter: FirestoreDataConverter<unknown>
): Writable<unknown[]> =>
	writable<Array<unknown>>([], (set) => {
		onSnapshot(query.withConverter(converter), async (snap) => {
			set(snap.docs.map((doc) => doc.data()));
		});
	});

export const queryDocumentAsStore = (
	query: Query,
	converter: FirestoreDataConverter<unknown>
): Readable<unknown> =>
	readable<unknown>({}, (set) => {
		onSnapshot(query.withConverter(converter), async (snap) => {
			set(snap.docs.map((doc) => doc.data()));
		});
	});

export const collectionAsStore = (
	path: string,
	converter: FirestoreDataConverter<unknown>
): Readable<unknown[]> => queryAsStore(query(collection(firestoreDB, path)), converter);

export const updateUser = async (userData: WebUser): Promise<void> => {
	const docRef = doc(usersCollection, userData.id);
	try {
		console.log(`attempting to update ${userData.name}`);
		await updateDoc(docRef.withConverter(userConverter), userData);
	} catch (error) {
		console.error('Error updating User document', error);
	}
};
