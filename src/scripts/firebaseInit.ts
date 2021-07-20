import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';
import { enableIndexedDbPersistence } from '@firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDEAAXuJcftdIqBRxi_OmDYmFEMs2qnpIw',
	authDomain: 'tonyswebpool.firebaseapp.com',
	databaseURL: 'https://tonyswebpool.firebaseio.com',
	projectId: 'tonyswebpool',
	storageBucket: 'tonyswebpool.appspot.com',
	messagingSenderId: '1009472673898',
	appId: '1:1009472673898:web:349b4dad1bccd89d2e9213',
	measurementId: 'G-8Y5HV7HDFZ'
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore();
export const firestoreAuth = getAuth(firebaseApp);
export const firestoreStorage = getStorage(firebaseApp);

enableIndexedDbPersistence(firestoreDB).catch((err) => {
	if (err.code == 'failed-precondition') {
		// Multiple tabs open, persistence can only be enabled
		// in one tab at a a time.
		// ...
	} else if (err.code == 'unimplemented') {
		console.warn(
			`🔥 The current browser does not support all of the features required to enable persistence. 🔥`
		);
	}
});
// Subsequent queries will use persistence, if it was enabled successfully
