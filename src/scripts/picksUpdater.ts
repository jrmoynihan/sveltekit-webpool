import { DocumentReference, getDocs, query, setDoc } from '@firebase/firestore';
import { weeklyPicksCollection } from './collections';
import { gameConverter, weeklyPickConverter } from './converters';
import { scheduleCollection } from './collections';
import type { WeeklyPickDoc } from './classes/picks';

let q = query(scheduleCollection);
const scheduleDocs = await getDocs(q.withConverter(gameConverter));
q = query(weeklyPicksCollection);
const weeklyPicksDocs = await getDocs(q.withConverter(weeklyPickConverter));

export const setWeeklyPick = async (docRef: DocumentReference, weeklyPickDoc: WeeklyPickDoc) => {
	await setDoc(docRef.withConverter(weeklyPickConverter), weeklyPickDoc);
};
