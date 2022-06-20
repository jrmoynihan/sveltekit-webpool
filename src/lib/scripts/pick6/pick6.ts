import { doc, getDocs, query, setDoc, type QueryConstraint } from '@firebase/firestore';
import { all_icons } from '../classes/constants';
import { PickSixDoc } from '../classes/picks';
import type { Player } from '../classes/player';
import { pickSixCollection } from '../firebase/collections';
import { pickSixConverter } from '../firebase/converters';
import { ErrorAndToast, myLog, myWarning } from '../utilities/logging';

type getPickSixOptions = {
	constraints?: QueryConstraint[];
};
export const getPickSixDocs = async (input: getPickSixOptions) => {
	const { constraints = [] } = input;
	try {
		const q = query(pickSixCollection, ...constraints);
		const querySnapshot = await getDocs(q.withConverter(pickSixConverter));
		if (querySnapshot?.empty) myWarning({ msg: 'No pick 6 docs found.' });
		myLog({ msg: 'Got survivor docs!', icon: all_icons.checkmark });
		return querySnapshot;
	} catch (error) {
		const msg = 'Unable to get pick 6 docs. Check the console for more info.';
		ErrorAndToast({ msg, error, additional_params: constraints });
	}
};
export const getPickSixData = async (input: getPickSixOptions) => {
	try {
		const pick_six: PickSixDoc[] = [];
		const docs = await getPickSixDocs(input);

		if (docs?.empty) {
			myWarning({
				msg: 'No pick 6 data found. Check that the query constraints are correct and the selected pick 6 docs have been created.'
			});
		}

		docs.forEach((doc) => {
			pick_six.push(doc.data());
		});
		myLog({ msg: 'Pick 6 data:', additional_params: pick_six });
		return pick_six;
	} catch (error) {
		const msg = 'Error getting pick 6 data. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
type createPickSixDocOptions = {
	player: Player;
	season_year: number;
};
export const createPickSixDoc = async (input: createPickSixDocOptions) => {
	const { player, season_year } = input;
	try {
		const new_doc_ref = doc(pickSixCollection);
		const new_pick_six_doc = new PickSixDoc({
			doc_ref: new_doc_ref,
			name: player.name,
			nickname: player.nickname,
			uid: player.uid,
			picks: [],
			season_year
		});
		await setDoc(new_doc_ref.withConverter(pickSixConverter), new_pick_six_doc);
		return new_pick_six_doc;
	} catch (error) {}
};
