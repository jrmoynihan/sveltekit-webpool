import type { Game } from '$classes/game';
import type { WeeklyPickDoc } from '$classes/picks';
import type { WeeklyTiebreaker } from '$classes/tiebreaker';
import { Player } from '$classes/player';
import { query, where, getDocs, QueryConstraint, doc, getDoc } from '@firebase/firestore';
import { all_icons } from '$classes/constants';
import { ErrorAndToast, LogAndToast, myError, myLog } from '$scripts/logging';
import {
	gamesCollection,
	playersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection,
	weeklyRecordsCollection
} from '$scripts/collections';
import {
	gameConverter,
	playerConverter,
	recordConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '$scripts/converters';
import type { PoolsToQuery } from '$scripts/types/types';
import type { User } from '@firebase/auth';

export const getPlayer = async (firebase_user: User): Promise<Player> => {
	const player_doc_ref = doc(playersCollection, firebase_user.uid);
	const player_snapshot = await getDoc(player_doc_ref.withConverter(playerConverter));
	return player_snapshot.exists() ? new Player({ ...player_snapshot.data() }) : undefined;
};

type getPlayersOptions = {
	roles?: PoolsToQuery[];
	constraints?: QueryConstraint[];
	showToast?: boolean;
};
export const getPlayers = async (input: getPlayersOptions) => {
	const { showToast, roles = [], constraints = [] } = input;
	try {
		const players: Player[] = [];
		const role_constraints = roles.map((role) => where(`${role}`, '==', true));
		const query_constraints = [...role_constraints, ...constraints];
		const player_query = query(
			playersCollection.withConverter(playerConverter),
			...query_constraints
		);
		const player_docs = await getDocs(player_query);
		player_docs.forEach((player_doc) => {
			players.push(new Player({ ...player_doc.data() }));
		});
		const msg = 'Retrieved all requested players.';
		showToast
			? LogAndToast({ title: 'Got Players!', msg })
			: myLog({ msg, additional_params: players });
		return players;
	} catch (error) {
		ErrorAndToast({ title: 'Error Retrieving Players', error });
	}
};

export const getWeeklyPlayers = async () => {
	return getPlayers({ roles: ['weekly'] });
};

type getRecordsOptions = {
	constraints?: QueryConstraint[];
	showToast?: boolean;
	returnDocs?: boolean;
};
export const getWeeklyRecords = async (input: getRecordsOptions) => {
	const { constraints = [], showToast } = input;
	try {
		const record_query = query(
			weeklyRecordsCollection.withConverter(recordConverter),
			...constraints
		);
		const record_docs = await getDocs(record_query);
		const msg = 'Retrieved all requested weekly records.';
		showToast
			? LogAndToast({ title: 'Got Weekly Records', msg })
			: myLog({ msg, additional_params: record_docs });
		return record_docs;
	} catch (error) {
		ErrorAndToast({ title: 'Error Retrieving Records', error });
	}
};

export const getWeeklyRecordData = async (input: getRecordsOptions) => {
	try {
		const records = await getWeeklyRecords(input);
		if (records?.empty) throw new Error('No records found.');
		const record_data = records.docs.map((record) => record.data());
		myLog({ msg: 'Weekly records: ', additional_params: record_data });
		return record_data;
	} catch (error) {
		myError({ msg: error, error });
		return [];
	}
};

type getGamesOptions = {
	constraints?: QueryConstraint[];
};
export const getGames = async (input: getGamesOptions) => {
	const { constraints = [] } = input;
	try {
		const q = query(gamesCollection, ...constraints);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		if (querySnapshot?.empty) throw new Error('No games found.');
		myLog({ msg: 'Got games!', icon: all_icons.checkmark });
		return querySnapshot;
	} catch (error) {
		const msg = 'Unable to get games. Check the console for more info.';
		ErrorAndToast({ msg, error, additional_params: constraints });
	}
};
export const getGameData = async (input: getGamesOptions) => {
	try {
		const games: Game[] = [];
		const docs = await getGames(input);

		if (docs?.empty) {
			throw new Error(
				'No games found. Check that the query constraints are correct and the selected game docs have been created.'
			);
		}

		docs.forEach((doc) => {
			games.push(doc.data());
		});
		myLog({ msg: 'Game data:', additional_params: games });
		return games;
	} catch (error) {
		const msg = 'Error getting game data. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
type getPicksOptions = {
	constraints: QueryConstraint[];
};
export const getPicksData = async (input: getPicksOptions): Promise<WeeklyPickDoc[]> => {
	try {
		const { constraints = [] } = input;
		const picks: WeeklyPickDoc[] = [];
		const q = query(weeklyPicksCollection, ...constraints);
		const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
		querySnapshot.forEach((doc) => {
			picks.push(doc.data());
		});

		myLog({ msg: 'Got picks!', icon: all_icons.pick, additional_params: [picks, constraints] });

		return picks;
	} catch (error) {
		const msg = 'Unable to get picks. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
type getTiebreakerOptions = {
	constraints: QueryConstraint[];
	show_toast?: boolean;
};
export const getTiebreakerData = async (
	input: getTiebreakerOptions
): Promise<WeeklyTiebreaker[]> => {
	const { constraints = [], show_toast } = input;
	try {
		let tiebreakers: WeeklyTiebreaker[] = [];
		const q = query(weeklyTiebreakersCollection, ...constraints);
		const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
		if (querySnapshot?.empty) {
			throw new Error('No tiebreaker found.');
		}
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				tiebreakers.push(doc.data());
			}
		});
		myLog({
			msg: `Got tiebreaker!`,
			icon: all_icons.necktie,
			additional_params: tiebreakers
		});
		return tiebreakers;
	} catch (error) {
		const msg = 'Error getting tiebreaker. Check the console for more info.';
		show_toast
			? ErrorAndToast({ msg, error, icon: all_icons.detective, additional_params: input })
			: myError({ msg, error, icon: all_icons.detective, additional_params: input });
		return [];
	}
};
