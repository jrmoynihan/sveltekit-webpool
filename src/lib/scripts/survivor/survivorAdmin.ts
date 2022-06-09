import {
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	type QueryConstraint
} from '@firebase/firestore';
import { all_icons } from '../classes/constants';
import type { Survivor, SurvivorPick } from '../classes/survivor';
import { survivorCollection } from '../collections';
import { survivorConverter } from '../converters';
import { myLog, ErrorAndToast, myWarning, myError } from '../logging';

type getSurvivorOptions = {
	constraints?: QueryConstraint[];
};
export const getSurvivorDocs = async (input: getSurvivorOptions) => {
	const { constraints = [] } = input;
	try {
		const q = query(survivorCollection, ...constraints);
		const querySnapshot = await getDocs(q.withConverter(survivorConverter));
		if (querySnapshot?.empty) myWarning({ msg: 'No survivor docs found.' });
		myLog({ msg: 'Got survivor docs!', icon: all_icons.checkmark });
		return querySnapshot;
	} catch (error) {
		const msg = 'Unable to get survivors. Check the console for more info.';
		ErrorAndToast({ msg, error, additional_params: constraints });
	}
};
export const getSurvivorData = async (input: getSurvivorOptions) => {
	try {
		const survivors: Survivor[] = [];
		const docs = await getSurvivorDocs(input);

		if (docs?.empty) {
			myWarning({
				msg: 'No survivor data found. Check that the query constraints are correct and the selected survivor docs have been created.'
			});
		}

		docs.forEach((doc) => {
			survivors.push(doc.data());
		});
		myLog({ msg: 'Survivor data:', additional_params: survivors });
		return survivors;
	} catch (error) {
		const msg = 'Error getting survivor data. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
export const createSurvivorDoc = async (survivor: Survivor) => {
	try {
		const new_survivor = doc(survivorCollection);
		await setDoc(new_survivor.withConverter(survivorConverter), {
			...survivor,
			doc_ref: new_survivor
		});
		myLog({ msg: 'Created survivor doc!' });
	} catch (error) {
		const msg = 'Error creating survivor doc. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
export const scoreSurvivorPick = async (
	week: number,
	year: number,
	winner: string,
	loser: string
) => {
	try {
		// Get all players' survivor docs for the selected year
		const survivor_doc_constraints: QueryConstraint[] = [where('season_year', '==', year)];
		const survivor_docs = await getSurvivorData({ constraints: survivor_doc_constraints });
		// For each player's doc...
		for await (const doc of survivor_docs) {
			// Filter to the SurvivorPick object in the picks array that corresponds to the week
			const pick_for_week = doc.picks.filter(
				(p) => p.week === week && (p.pick === winner || p.pick === loser)
			) as SurvivorPick[];
			if (pick_for_week.length === 1) {
				pick_for_week[0].is_correct = winner === pick_for_week[0].pick;
				updateDoc(doc.doc_ref, { picks: doc.picks });
			} else if (pick_for_week.length > 1) {
				myWarning({ msg: 'Multiple picks for the same week found.' });
			} else if (pick_for_week.length === 0) {
				myWarning({ msg: 'No pick found for the week.' });
			}
		}
	} catch (error) {
		myError({ error });
	}
};
