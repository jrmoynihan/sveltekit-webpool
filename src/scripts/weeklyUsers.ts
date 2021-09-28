import type { Query } from '@firebase/firestore';
import { query, where, getDocs } from '@firebase/firestore';
import { myLog, myError } from './classes/constants';
import { WebUser } from './classes/webUser';
import { usersCollection } from './collections';
import { userConverter } from './converters';
import { defaultToast, errorToast } from './toasts';

export const getWeeklyUsers = async (q?: Query, showToast = true) => {
	try {
		const users: WebUser[] = [];
		if (q === undefined) {
			q = query(usersCollection, where('weekly', '==', true));
		}
		const querySnapshot = await getDocs(q.withConverter(userConverter));
		querySnapshot.forEach((doc) => {
			const id = doc.id;
			const ref = doc.ref;
			const user = new WebUser({ id: id, ref: ref, ...doc.data() });
			users.push(user);
		});
		const msg = 'Retrieved all users who are Weekly Pool players.';
		myLog(msg, 'createWeeklyPicksForUser', undefined, users);
		if (showToast) {
			defaultToast({ title: 'Got Weekly Users!', msg: msg });
		}
		return users;
	} catch (error) {
		const msg = `Encountered an error while trying to get weekly users.  Check the console for more info. ${error}`;
		errorToast(msg);
		myError('getWeeklyUsers', error, msg);
	}
};
