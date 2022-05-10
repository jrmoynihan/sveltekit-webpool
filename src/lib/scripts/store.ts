import { browser } from '$app/env';
import { type Writable, writable, derived } from 'svelte/store';
import { doc, updateDoc, onSnapshot, query, type Query, type FirestoreDataConverter } from '@firebase/firestore';
import { playerConverter, seasonBoundConverter, teamConverter } from './converters';
import { Player } from '$classes/player';
import { playersCollection, seasonBoundsCollection, teamsCollection } from './collections';
import type { ScoreViewPreference } from './types/types';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import type { Game } from '$classes/game';
import type { Team } from '$classes/team';
import type { User } from '@firebase/auth';
import { firebaseAuth } from './firebase/firebase';
import type { SeasonBoundDoc } from './classes/seasonBound';

export const useDarkTheme = writable(false);
export const chosenMixBlendMode = writable('normal');
export const navChecked = writable(true);
export const sidePanelChecked = writable(true);
export const windowWidth = writable(browser ? window.innerWidth : null);
export const largerThanMobile = writable(true);
export const editing = writable(false);
export const showPickWarning = writable(false);
export const showIDs = writable(false);
export const showNetTiebreakers = writable(false);
export const showSpreads = writable(false);
export const preferredScoreView = writable<ScoreViewPreference>('Both');
export const showTimestamps = writable(false);
export const selected_week = writable(1);
export const selected_year = writable(new Date().getFullYear());
export const current_season = writable<SeasonBoundDoc>()
export const current_season_type_number = derived(current_season, $currentSeason => $currentSeason?.type_number)
export const current_season_start = derived(current_season, $currentSeason => $currentSeason?.start_date)
export const current_season_end = derived(current_season, $currentSeason => $currentSeason?.end_date)
export const current_season_type_name = derived(current_season, $currentSeasonType => $currentSeasonType?.type_name)
export const current_season_year = derived(current_season, $currentSeason => parseInt($currentSeason?.doc_id))
export const selected_season = writable<SeasonBoundDoc>();
export const selected_season_type = writable<string>('Regular Season')
export const selected_season_type_number = derived(selected_season, $selectedSeason => $selectedSeason?.type_number)
export const selected_season_year = derived(selected_season, $selectedSeason => parseInt($selectedSeason?.doc_id))
export const selected_player = writable<Player>(new Player({}));
export const gamesPromise = writable<Promise<Game[]>>();
export const picksPromise = writable<Promise<WeeklyPickDoc[]>>();
export const currentPicks = writable<WeeklyPickDoc[]>([]);
export const tiebreakerPromise = writable<Promise<WeeklyTiebreaker>>(null);
export const players_promise = writable<Promise<Player[]>>(new Promise<Player[]>(() => {}));
export const changeableTiebreakerScoreGuess = writable<number>(0);
export const showATSwinner = writable(false);
export const overrideDisabled = writable(false);
export const godMode = writable(false);
export const godSequence = writable<string[]>([]);
export const firebase_user = writable<User>(firebaseAuth.currentUser); // The firebase user. Not necessarily a player yet, and without web pool-specific data
export const current_player = writable<Player>(new Player({}));  // Who is logged into the app; their player data
export const player_not_found = writable(false);

// export const queryAsStore = (
// 	query: Query,
// 	converter?: FirestoreDataConverter<unknown>
// ): Readable<unknown[]> => {
// 	return readable<Array<unknown>>([], (set) => {
// 		onSnapshot(query.withConverter(converter), async (snap) => {
// 			set(snap.docs.map((doc) => doc.data()));
// 		});
// 	});
// };

export const writableQueryAsStore = (
	query: Query,
	converter: FirestoreDataConverter<unknown>
) : Writable<unknown> =>
	writable([], (set) => {
		const unsubscribe = onSnapshot(query.withConverter(converter), async (snap) => {
			const data = snap.docs.map((doc) => doc.data());
			set(data);
		});
		return unsubscribe
	});

/**
 * Returns user documents as a dynamic store via a {@link userConverter}
 * @param {Query} query - A Firebase {@link Query} to use
 * @returns A Writable store of {@link WebUser} (the data returned from a {@link usersCollection} document)
 * @example 
 * const q : Query = query(usersCollection, where('id', '==', $currentUser.uid));
	let $userDataSnapshot : Writable<WebUser> = get(userQueryAsStore(q));
 */
export const playerQueryAsStore = (query: Query): Writable<Player[]> =>
	writable<Player[]>([], (set) => {
		const unsubscribe = onSnapshot(query.withConverter(playerConverter), async (snap) => {
			const player_data = snap.docs.map(doc => doc.data())
			set(player_data);
		});
		return unsubscribe;
	});

// export const queryDocumentAsStore = (
// 	query: Query,
// 	converter: FirestoreDataConverter<unknown>
// ): Readable<unknown> =>
// 	readable<unknown>({}, (set) => {
// 		onSnapshot(query.withConverter(converter), async (snap) => {
// 			set(snap.docs.map((doc) => doc.data()));
// 		});
// 	});

// export const collectionAsStore = (
// 	path: string,
// 	converter: FirestoreDataConverter<unknown>
// ): Readable<unknown[]> => queryAsStore(query(collection(firestoreDB, path)), converter);

export const updatePlayer = async (player: Player): Promise<void> => {
	const docRef = doc(playersCollection, player.uid);
	try {
		console.log(`attempting to update ${player.name}`);
		await updateDoc(docRef.withConverter(playerConverter), { ...player });
	} catch (error) {
		console.error('Error updating Player document', error);
	}
};

export const all_seasons = writableQueryAsStore(query(seasonBoundsCollection), seasonBoundConverter) as Writable<SeasonBoundDoc[]>;
export const all_teams = writableQueryAsStore(query(teamsCollection), teamConverter) as Writable<Team[]>;
export const all_players = writableQueryAsStore(query(playersCollection), playerConverter) as Writable<Player[]>;