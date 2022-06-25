import { browser } from '$app/env';
import type { Game } from '$classes/game';
import { Player } from '$classes/player';
import type { Team } from '$classes/team';
import type { User } from '@firebase/auth';
import {
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
	type FirestoreDataConverter,
	type Query
} from '@firebase/firestore';
import { derived, get, writable, type Writable } from 'svelte/store';
import type { WeeklyPickDoc } from './classes/picks';
import type { SeasonRecord } from './classes/playerRecord';
import type { SeasonBoundDoc } from './classes/seasonBound';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import {
	playersCollection,
	seasonBoundsCollection,
	seasonRecordsCollection,
	teamsCollection
} from './firebase/collections';
import {
	playerConverter,
	seasonBoundConverter,
	seasonRecordConverter,
	teamConverter
} from './firebase/converters';
import { firebaseAuth } from './firebase/firebase';
import type { ScoreViewPreference } from './types/types';

export const use_dark_theme = writable(false);
export const nav_toggled = writable(true);
export const window_width = writable(browser ? window.innerWidth : null);
export const larger_than_mobile = writable(true);
export const editing = writable(false);
export const show_missing_pick_warning = writable(false);
export const show_new_player_form = writable(false);
export const show_IDs = writable(false);
export const show_net_tiebreakers = writable(false);
export const show_spreads = writable(false);
export const show_timestamps = writable(false);
export const show_ATS_winner = writable(false);
export const preferred_score_view = writable<ScoreViewPreference>('Both');
export const current_season = writable<SeasonBoundDoc>();
export const current_season_type_number = derived(
	current_season,
	($currentSeason) => $currentSeason?.type_number
);
export const current_season_start = derived(
	current_season,
	($currentSeason) => $currentSeason?.start_date
);
export const current_season_end = derived(
	current_season,
	($currentSeason) => $currentSeason?.end_date
);
export const current_season_type_name = derived(
	current_season,
	($currentSeasonType) => $currentSeasonType?.type_name
);
export const current_season_year = derived(current_season, ($currentSeason) =>
	parseInt($currentSeason?.doc_id)
);
export const current_season_week = writable(1);
export const selected_season = writable<SeasonBoundDoc>();
export const selected_season_type = writable<string>('Regular Season');
export const selected_season_type_number = derived(
	selected_season,
	($selectedSeason) => $selectedSeason?.type_number
);
export const selected_season_year = derived(selected_season, ($selectedSeason) =>
	parseInt($selectedSeason?.doc_id)
);
export const selected_player = writable<Player>(new Player({}));
export const selected_week = writable(get(current_season_week) || 1);
export const selected_year = writable(get(current_season_year) || new Date().getFullYear());
export const selected_team = writable<Team>();
export const games_promise = writable<Promise<Game[]>>();
export const picks_promise = writable<Promise<WeeklyPickDoc[]>>();
export const current_picks = writable<WeeklyPickDoc[]>([]);
export const tiebreaker_promise = writable<Promise<WeeklyTiebreaker[]>>();
export const players_promise = writable<Promise<Player[]>>(new Promise<Player[]>(() => {}));
export const override_locked_picks = writable(false);
export const firebase_user = writable<User>(firebaseAuth.currentUser); // The firebase user. Not necessarily a player yet, and without web pool-specific data
export const current_player = writable<Player>(new Player({})); // Who is logged into the app; their player data
export const tiebreaker_score_guess = writable(0);

export const writableQueryAsStore = (
	query: Query,
	converter: FirestoreDataConverter<unknown>
): Writable<unknown> =>
	writable([], (set) => {
		const unsubscribe = onSnapshot(query.withConverter(converter), async (snap) => {
			const data = snap.docs.map((doc) => doc.data());
			set(data);
		});
		return unsubscribe;
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
			const player_data = snap.docs.map((doc) => doc.data());
			set(player_data);
		});
		return unsubscribe;
	});

export const updatePlayer = async (player: Player): Promise<void> => {
	const docRef = doc(playersCollection, player.uid);
	try {
		console.log(`attempting to update ${player.name}`);
		await updateDoc(docRef.withConverter(playerConverter), { ...player });
	} catch (error) {
		console.error('Error updating Player document', error);
	}
};

export const all_seasons = writableQueryAsStore(
	query(seasonBoundsCollection),
	seasonBoundConverter
) as Writable<SeasonBoundDoc[]>;
export const all_teams = writableQueryAsStore(query(teamsCollection), teamConverter) as Writable<
	Team[]
>;
export const all_players = writableQueryAsStore(
	query(playersCollection),
	playerConverter
) as Writable<Player[]>;
export const weekly_players = derived(all_players, ($allPlayers) =>
	$allPlayers.filter((player) => player.weekly)
);
export const current_season_records = writableQueryAsStore(
	query(seasonRecordsCollection, where('season_year', '==', get(current_season_year))),
	seasonRecordConverter
) as Writable<SeasonRecord[]>;

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
