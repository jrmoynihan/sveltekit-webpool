import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { doc, updateDoc, onSnapshot, query } from '@firebase/firestore';
import type { Query, FirestoreDataConverter } from '@firebase/firestore';
import { userConverter } from './converters';
import { WebUser } from '$scripts/classes/webUser';
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
export const godMode = writable(false);
export const godSequence = writable<string[]>([]);

// export const queryAsStore = (
// 	query: Query,
// 	converter?: FirestoreDataConverter<unknown>
// ): Readable<unknown[]> => {
// 	return readable<Array<unknown>>([], (set) => {
// 		onSnapshot(query.withConverter(converter), async (snap) => {
// 			set(snap.docs.map((doc) => doc.data()));
// 		});
// 	});
// };
export const writableQueryAsStore = (
	query: Query,
	converter: FirestoreDataConverter<unknown>
): Writable<unknown[]> =>
	writable<Array<unknown>>([], (set) => {
		onSnapshot(query.withConverter(converter), async (snap) => {
			set(snap.docs.map((doc) => doc.data()));
		});
	});

// ** Return a single user document as a dynamic store **
export const userQueryAsStore = (query: Query): Writable<WebUser> =>
	writable<WebUser>(new WebUser({}), (set) => {
		onSnapshot(query.withConverter(userConverter), async (snap) => {
			set(snap.docs[0].data());
		});
	});

// export const queryDocumentAsStore = (
// 	query: Query,
// 	converter: FirestoreDataConverter<unknown>
// ): Readable<unknown> =>
// 	readable<unknown>({}, (set) => {
// 		onSnapshot(query.withConverter(converter), async (snap) => {
// 			set(snap.docs.map((doc) => doc.data()));
// 		});
// 	});

// export const collectionAsStore = (
// 	path: string,
// 	converter: FirestoreDataConverter<unknown>
// ): Readable<unknown[]> => queryAsStore(query(collection(firestoreDB, path)), converter);

export const updateUser = async (userData: WebUser): Promise<void> => {
	const docRef = doc(usersCollection, userData.id);
	try {
		console.log(`attempting to update ${userData.name}`);
		await updateDoc(docRef.withConverter(userConverter), { ...userData });
	} catch (error) {
		console.error('Error updating User document', error);
	}
};
export const allUsers = writableQueryAsStore(query(usersCollection), userConverter);
