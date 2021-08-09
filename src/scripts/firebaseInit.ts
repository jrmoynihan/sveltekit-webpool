import { FirebaseApp, initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';
// import { enableIndexedDbPersistence } from '@firebase/firestore';
// import { browser, dev } from '$app/env';
import { getApp, getApps } from '@firebase/app';

// TODO: API key should be stored in a environment variable (see: privateStuff.env) so it is not exposed publicly
// const API_KEY: string = import.meta.env['VITE_API_KEY'] as string;
// console.log(API_KEY);

const firebaseConfig = {
	// apiKey: API_KEY,
	apiKey: 'AIzaSyDEAAXuJcftdIqBRxi_OmDYmFEMs2qnpIw',
	authDomain: 'tonyswebpool.firebaseapp.com',
	databaseURL: 'https://tonyswebpool.firebaseio.com',
	projectId: 'tonyswebpool',
	storageBucket: 'tonyswebpool.appspot.com',
	messagingSenderId: '1009472673898',
	appId: '1:1009472673898:web:349b4dad1bccd89d2e9213',
	measurementId: 'G-8Y5HV7HDFZ'
};

export let firebaseApp: FirebaseApp;

// If a firebase app is already initialized, use that one
if (getApps().length === 0) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
}

export const firestoreDB = getFirestore(firebaseApp);
export const firestoreAuth = getAuth(firebaseApp);
export const firestoreStorage = getStorage(firebaseApp);

// if (browser && !dev) {
// 	enableIndexedDbPersistence(firestoreDB).catch((err) => {
// 		if (err.code == 'failed-precondition') {
// 			// Multiple tabs open, persistence can only be enabled
// 			// in one tab at a a time.
// 			// ...
// 		} else if (err.code == 'unimplemented') {
// 			console.warn(
// 				`🔥 The current browser does not support all of the features required to enable persistence. 🔥`
// 			);
// 		}
// 	});
// Subsequent queries will use persistence, if it was enabled successfully
// }