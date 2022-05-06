import type { Game } from '$classes/game';
import type { WeeklyPickDoc } from '$classes/picks';
import type { SeasonType } from '$classes/seasonType';
import type { WeeklyTiebreaker } from '$classes/tiebreaker';
import { Player } from '$classes/player';
import { query, where, getDocs, orderBy } from '@firebase/firestore';
import { all_icons } from '$classes/constants';
import { ErrorAndToast, myLog } from '$scripts/logging';
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
import { defaultToast } from '$scripts/toasts';

// TODO: Refactor these functions into endpoints that change the url as the params change?
export const getWeeklyPlayers = async (
	showToast = true,
	customizedQuery = query(playersCollection, where('weekly', '==', true))
) => {
	try {
		const players: Player[] = [];
		const querySnapshot = await getDocs(customizedQuery.withConverter(playerConverter));
		querySnapshot.forEach((doc) => {
			const id = doc.id;
			const ref = doc.ref;
			const player = new Player({ id: id, ref: ref, ...doc.data() });
			players.push(player);
		});
		const msg = 'Retrieved all players who are Weekly Pool players.';
		myLog({ msg, additional_params: players });
		if (showToast) {
			defaultToast({ title: 'Got Weekly Players!', msg });
		}
		return players;
	} catch (error) {
		const msg = `Encountered an error while trying to get weekly players.  Check the console for more info.`;
		ErrorAndToast({ msg, error, location: 'weeklyPlayers.ts', function_name: 'getWeeklyPlayers' });
	}
};
export const changedQuery = async (
	selectedYear: number,
	selectedSeasonType: SeasonType,
	selectedWeek: number,
	uid: string
) => {
	let gamesPromise: Promise<Game[]>;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	try {
		gamesPromise = getGames(selectedYear, selectedSeasonType, selectedWeek);
		picksPromise = getPicksForPlayer(selectedWeek, uid, selectedYear, selectedSeasonType);
		tiebreakerPromise = getTiebreaker(selectedWeek, uid, selectedYear);
		return { gamesPromise, picksPromise, tiebreakerPromise };
	} catch (error) {
		const msg = 'Error in changing query.  Check the console for more info.';
		ErrorAndToast({ msg, error, location: 'weeklyPlayers.ts', function_name: 'changedQuery' });
	}
};
export const getGames = async (
	selectedYear: number,
	selectedSeasonType: SeasonType,
	selectedWeek: number
) => {
	try {
		const games: Game[] = [];
		const q = query(
			scheduleCollection,
			where('year', '==', selectedYear),
			where('type', '==', selectedSeasonType.text),
			where('week', '==', selectedWeek),
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
		ErrorAndToast({ msg, error, location: 'weeklyPlayers.ts', function_name: 'getGames' });
	}
};
export const getPicksForPlayer = async (
	selectedWeek: number,
	uid: string,
	selectedYear: number,
	selectedSeasonType: SeasonType
) => {
	try {
		const picks: WeeklyPickDoc[] = [];
		myLog({
			msg: `querying picks for week ${selectedWeek}, ${selectedYear}, ${selectedSeasonType.text}, ${uid}`
		});
		const q = query(
			weeklyPicksCollection,
			where('year', '==', selectedYear),
			where('type', '==', selectedSeasonType.text),
			where('week', '==', selectedWeek),
			where('uid', '==', uid),
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
		ErrorAndToast({ msg, error, location: 'weeklyPlayers.ts', function_name: 'getPicksForPlayer' });
	}
};
export const getTiebreaker = async (
	selectedWeek: number,
	uid: string,
	selectedYear: number
): Promise<WeeklyTiebreaker> => {
	try {
		let tiebreaker: WeeklyTiebreaker;
		const q = query(
			weeklyTiebreakersCollection,
			where('year', '==', selectedYear),
			where('week', '==', selectedWeek),
			where('uid', '==', uid)
		);
		const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
		if (querySnapshot.empty) {
			myLog({ msg: 'no tiebreaker found', icon: all_icons.detective });
		} else if (querySnapshot.size > 1) {
			throw new Error(`Multiple tiebreakers found for this player in week ${selectedWeek}`);
		}
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				tiebreaker = doc.data();
				myLog({ msg: 'Got tiebreaker!', icon: all_icons.necktie, additional_params: tiebreaker });
			}
		});
		return tiebreaker;
	} catch (error) {
		const msg = 'Unable to get tiebreaker. Check the console for more info.';
		ErrorAndToast({ msg, error, location: 'weeklyPlayers.ts', function_name: 'getTiebreaker' });
	}
};
