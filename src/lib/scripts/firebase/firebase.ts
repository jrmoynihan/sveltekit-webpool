import { dev } from '$app/env';
import { getApps, getApp, initializeApp } from '@firebase/app';
import { getAuth, setPersistence, inMemoryPersistence } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';

const API_KEY: string = dev ? (import.meta.env.VITE_API_KEY as string) : process.env.API_KEY;
const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'tonyswebpool.firebaseapp.com',
	databaseURL: 'https://tonyswebpool.firebaseio.com',
	projectId: 'tonyswebpool',
	storageBucket: 'tonyswebpool.appspot.com',
	messagingSenderId: '1009472673898',
	appId: '1:1009472673898:web:349b4dad1bccd89d2e9213',
	measurementId: 'G-8Y5HV7HDFZ'
};

export function initializeFirebaseApp() {
	// If a firebase app is already initialized, use that one
	if (getApps().length === 0) {
		return initializeApp(firebaseConfig);
	} else {
		return getApp();
	}
}
const myApp = initializeFirebaseApp();
export const firestoreDB = getFirestore(myApp);
export const firebaseAuth = getAuth(myApp);

// Prevents persistence of Auth state in the CLIENT; the server will hold the cookie!
setPersistence(firebaseAuth, inMemoryPersistence);