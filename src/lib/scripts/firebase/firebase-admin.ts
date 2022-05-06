import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

admin.initializeApp({
	credential: applicationDefault(),
	databaseURL: 'https://tonyswebpool.firebaseio.com'
});

export default admin;
