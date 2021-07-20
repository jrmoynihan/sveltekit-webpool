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
import type { WebUserData } from './classes';

export const useDarkTheme = writable(true);
export const chosenMixBlendMode = writable('exclusion');
export const navChecked = writable(true);
export const sidePanelChecked = writable(true);

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

export const usersCollection = collection(firestoreDB, 'Users');

export const updateUser = async (userData: WebUserData): Promise<void> => {
	const docRef = doc(usersCollection, userData.id);
	try {
		console.log(`attempting to update ${userData.name}`);
		await updateDoc(docRef.withConverter(userConverter), {
			name: userData.name,
			email: userData.email,
			admin: userData.admin
		});
	} catch (error) {
		console.error('Error updating User document', error);
	}
};
