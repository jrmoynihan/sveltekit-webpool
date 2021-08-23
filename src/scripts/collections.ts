import { collection } from '@firebase/firestore';
import { firestoreDB } from './firebaseInit';

export const usersCollection = collection(firestoreDB, 'Users');
export const weeklyRulesCollection = collection(firestoreDB, 'WeeklyRules');
export const weeklyPicksCollection = collection(firestoreDB, 'WeeklyPicks');
export const weeklyTiebreakersCollection = collection(firestoreDB, 'WeeklyTiebreakers');
export const scheduleCollection = collection(firestoreDB, 'Schedule');
