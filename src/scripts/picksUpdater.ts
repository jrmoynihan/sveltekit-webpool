import { getDocs, query } from "firebase/firestore";
import { weeklyPicksCollection } from "./collections";
import { gameConverter, weeklyPickConverter } from "./converters";
import { scheduleCollection } from "./schedule";

let q = query(scheduleCollection)
const scheduleDocs = await getDocs(q.withConverter(gameConverter))
q = query(weeklyPicksCollection)
const weeklyPicksDocs = await getDocs(q.withConverter(weeklyPickConverter))

