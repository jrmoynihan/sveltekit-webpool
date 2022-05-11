import type { Game } from '$classes/game';
import type { WeeklyPickDoc } from '$classes/picks';
import type { WeeklyTiebreaker } from '$classes/tiebreaker';
import { Player } from '$classes/player';
import { query, where, getDocs, orderBy, QueryConstraint } from '@firebase/firestore';
import { all_icons } from '$classes/constants';
import { ErrorAndToast, LogAndToast, myLog } from '$scripts/logging';
import {
	scheduleCollection,
	playersCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from '$scripts/collections';
import {
	gameConverter,
	playerConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '$scripts/converters';
import type { PoolsToQuery } from '$scripts/types/types';

type getPlayersOptions = {
	roles?: PoolsToQuery[];
	constraints?: QueryConstraint[];
	showToast?: boolean;
};
export const getPlayers = async (input: getPlayersOptions) => {
	const { roles, showToast, constraints = [] } = input;
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
		const msg = 'Retrieved all players who are Weekly Pool players.';
		showToast
			? LogAndToast({ title: 'Got Weekly Players!', msg })
			: myLog({ msg, additional_params: players });
		return players;
	} catch (error) {
		ErrorAndToast({ title: 'Error Retrieving Players', error });
	}
};

export const getWeeklyPlayers = async () => {
	return getPlayers({ roles: ['weekly'] });
};

export const changedQuery = async (
	selected_year: number,
	selected_season_type: string,
	selected_week: number,
	player: Player
) => {
	let gamesPromise: Promise<Game[]>;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	try {
		gamesPromise = getGames(selected_year, selected_season_type, selected_week);
		picksPromise = getPicksForPlayer(selected_week, player, selected_year, selected_season_type);
		tiebreakerPromise = getTiebreaker(selected_week, player, selected_year);
		return { gamesPromise, picksPromise, tiebreakerPromise };
	} catch (error) {
		const msg = 'Error in changing query.  Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
export const getGames = async (
	selected_year: number,
	selected_season_type: string,
	selected_week: number
) => {
	try {
		const games: Game[] = [];
		const q = query(
			scheduleCollection,
			where('year', '==', selected_year),
			where('type', '==', selected_season_type),
			where('week', '==', selected_week),
			orderBy('timestamp')
		);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		querySnapshot.forEach((doc) => {
			games.push(doc.data());
		});

		myLog({ msg: 'got games!', icon: all_icons.checkmark, additional_params: games });
		return games;
	} catch (error) {
		const msg = 'Unable to get games. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
export const getPicksForPlayer = async (
	selected_week: number,
	player: Player,
	selected_year: number,
	selected_season_type: string
) => {
	try {
		const picks: WeeklyPickDoc[] = [];
		myLog({
			msg: `querying picks for ${selected_year} ${selected_season_type}, week ${selected_week}`,
			additional_params: player
		});
		const q = query(
			weeklyPicksCollection,
			where('year', '==', selected_year),
			where('type', '==', selected_season_type),
			where('week', '==', selected_week),
			where('uid', '==', player.uid),
			orderBy('timestamp'),
			orderBy('gameId')
		);
		const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
		querySnapshot.forEach((doc) => {
			picks.push(doc.data());
		});

		myLog({ msg: 'Got picks!', icon: all_icons.pick, additional_params: picks });

		return picks;
	} catch (error) {
		const msg = 'Unable to get picks. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
export const getTiebreaker = async (
	selectedWeek: number,
	player: Player,
	selectedYear: number
): Promise<WeeklyTiebreaker> => {
	try {
		let tiebreaker: WeeklyTiebreaker;
		const q = query(
			weeklyTiebreakersCollection,
			where('year', '==', selectedYear),
			where('week', '==', selectedWeek),
			where('uid', '==', player.uid)
		);
		const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
		if (querySnapshot.empty) {
			myLog({ msg: 'no tiebreaker found', icon: all_icons.detective });
		} else if (querySnapshot.size > 1) {
			throw new Error(
				`Multiple tiebreaker docs found for ${player.name} (${player.nickname}) in week ${selectedWeek}`
			);
		}
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				tiebreaker = doc.data();
				myLog({
					msg: `Got tiebreaker for ${player.name} (${player.nickname})!`,
					icon: all_icons.necktie,
					additional_params: tiebreaker
				});
			}
		});
		return tiebreaker;
	} catch (error) {
		const msg = 'Unable to get tiebreaker. Check the console for more info.';
		ErrorAndToast({ msg, error });
	}
};
