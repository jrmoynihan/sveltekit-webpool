import { collection } from '@firebase/firestore';
import { firestoreDB } from '$lib/scripts/firebase/firebase';

console.log('collections.ts...');

export const scheduleCollection = collection(firestoreDB, 'Schedule');
export const toastsCollection = collection(firestoreDB, 'Toasts');
export const playersCollection = collection(firestoreDB, 'Players');
export const weeklyRulesCollection = collection(firestoreDB, 'WeeklyRules');
export const weeklyPicksCollection = collection(firestoreDB, 'WeeklyPicks');
export const weeklyTiebreakersCollection = collection(firestoreDB, 'WeeklyTiebreakers');
export const weekBoundsCollection = collection(firestoreDB, 'WeekScheduleBounds');

console.log('collections.ts... done');
