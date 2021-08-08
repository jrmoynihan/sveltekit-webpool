import { collection } from 'firebase/firestore';
import { firestoreDB } from './firebaseInit';

export const scheduleCollection = collection(firestoreDB, 'Schedule');
