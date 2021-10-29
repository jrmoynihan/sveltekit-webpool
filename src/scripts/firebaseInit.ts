import {
	debugErrorMap,
	indexedDBLocalPersistence,
	initializeAuth,
	prodErrorMap
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getApp, getApps, initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';
import { dev } from '$app/env';
// import { browser, dev } from '$app/env';

// TODO: API key should be stored in a environment variable (see: privateStuff.env) so it is not exposed publicly
export const API_KEY = import.meta.env.VITE_API_KEY;
// console.log('api?', API_KEY);

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

export let myApp: FirebaseApp;

// If a firebase app is already initialized, use that one
if (getApps().length === 0) {
	myApp = initializeApp(firebaseConfig);
} else {
	myApp = getApp();
}

export const firestoreDB = getFirestore(myApp);

// NOTE https://firebase.google.com/docs/auth/web/custom-dependencies
// export const firestoreAuth = getAuth(myApp)		// calls a persistence function by default  that depends on window being available, which fails under SSR
export const firestoreAuth = initializeAuth(myApp, {
	persistence: indexedDBLocalPersistence,
	errorMap: dev ? debugErrorMap : prodErrorMap
});

// export const firestoreStorage = getStorage(myApp);

// if (browser && !dev) {
// 	setPersistence(firestoreAuth, browserLocalPersistence);
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
// 	// Subsequent queries will use persistence, if it was enabled successfully
// }
