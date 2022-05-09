console.log('store...');
import { browser } from '$app/env';
import { type Writable, writable, get } from 'svelte/store';
import { doc, updateDoc, onSnapshot, query, getDoc, type Query, type FirestoreDataConverter } from '@firebase/firestore';
import { playerConverter } from './converters';
import { Player } from '$classes/player';
import { playersCollection } from './collections';
import type { ScoreViewPreference } from './types/types';
import type { WeeklyTiebreaker } from './classes/tiebreaker';
import type { WeeklyPickDoc } from './classes/picks';
import type { Game } from '$classes/game';
import type { Team } from '$classes/team';
import type { User } from '@firebase/auth';
import { firebaseAuth } from './firebase/firebase';
import type { SeasonType } from '$classes/seasonType';

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
export const selectedWeek = writable(1);
// If date is before March, use the previous year's season
export const currentSeasonYear = writable(
	new Date().getMonth() < 3 ? new Date().getFullYear() - 1 : new Date().getFullYear()
);
export const selectedSeasonYear = writable(get(currentSeasonYear));
export const selectedSeasonType = writable<SeasonType>();
export const selectedPlayer = writable<Player>(new Player({}));
export const gamesPromise = writable<Promise<Game[]>>();
export const picksPromise = writable<Promise<WeeklyPickDoc[]>>();
export const currentPicks = writable<WeeklyPickDoc[]>([]);
export const tiebreakerPromise = writable<Promise<WeeklyTiebreaker>>();
export const changeableTiebreakerScoreGuess = writable<number>(0);
export const showATSwinner = writable(false);
export const overrideDisabled = writable(false);
export const godMode = writable(false);
export const godSequence = writable<string[]>([]);
export const firebase_user = writable<User>(firebaseAuth.currentUser);
export const player_data = writable<Player>(new Player({}));
export const allTeams = writable<Team[]>([]);
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
): Writable<unknown[]> =>
	writable<Array<unknown>>([], (set) => {
		onSnapshot(query.withConverter(converter), async (snap) => {
			set(snap.docs.map((doc) => doc.data()));
		});
	});

/**
 * Returns user documents as a dynamic store via a {@link userConverter}
 * @param {Query} query - A Firebase {@link Query} to use
 * @returns A Writable store of {@link WebUser} (the data returned from a {@link usersCollection} document)
 * @example 
 * const q : Query = query(usersCollection, where('id', '==', $currentUser.uid));
	let $userDataSnapshot : Writable<WebUser> = get(userQueryAsStore(q));
 */
export const playerQueryAsStore = (query: Query): Writable<Player> =>
	writable<Player>(new Player({}), (set) => {
		onSnapshot(query.withConverter(playerConverter), async (snap) => {
			set(snap.docs[0].data());
		});
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
		if (player.uid === get(firebase_user).uid) {
			const doc = await getDoc(docRef.withConverter(playerConverter));
			player_data.set(doc.data());
		}
	} catch (error) {
		console.error('Error updating Player document', error);
	}
};
export const allPlayers = writableQueryAsStore(query(playersCollection), playerConverter);

console.log('store done');