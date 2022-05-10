import { getApps, getApp, initializeApp, type FirebaseApp } from '@firebase/app';
import { getAuth, type Auth } from '@firebase/auth';
import { Firestore, getFirestore } from '@firebase/firestore';

const API_KEY: string = import.meta.env.DEV ? import.meta.env.API_KEY as string : process.env.API_KEY as string;
const firebaseConfig = {
	apiKey: 'AIzaSyDEAAXuJcftdIqBRxi_OmDYmFEMs2qnpIw', // FIXME - why isn't Vercel processing this?
	authDomain: 'tonyswebpool.firebaseapp.com',
	databaseURL: 'https://tonyswebpool.firebaseio.com',
	projectId: 'tonyswebpool',
	storageBucket: 'tonyswebpool.appspot.com',
	messagingSenderId: '1009472673898',
	appId: '1:1009472673898:web:349b4dad1bccd89d2e9213',
	measurementId: 'G-8Y5HV7HDFZ'
};
console.log('test env var',`${process.env.TEST}`)

export function initializeFirebaseApp(): FirebaseApp {
	// If a firebase app is already initialized, use that one
	if (getApps().length === 0) {
		return initializeApp(firebaseConfig);
	} else {
		return getApp();
	}
}
const myApp : FirebaseApp = initializeFirebaseApp();
export const firestoreDB : Firestore = getFirestore(myApp);
export const firebaseAuth : Auth = getAuth(myApp);

// Prevents persistence of Auth state in the CLIENT; the server will hold the cookie!
// setPersistence(firebaseAuth, inMemoryPersistence);
