import { myError, myLog, ErrorAndToast, LogAndToast } from '$scripts/logging';
import { Game } from '$lib/scripts/classes/game';
import { WeeklyPickDoc } from '$lib/scripts/classes/picks';
import type { Player } from '$lib/scripts/classes/player';
import {
	scheduleCollection,
	weeklyPicksCollection,
	weeklyTiebreakersCollection
} from '$lib/scripts/collections';
import {
	gameConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '$lib/scripts/converters';
import { defaultToast, errorToast } from '$lib/scripts/toasts';
import { getWeeklyPlayers } from './weeklyPlayers';
import { updateDoc, deleteDoc, doc, getDocs, query, setDoc, where, type QueryConstraint, Timestamp } from '@firebase/firestore';
import { findCurrentWeekOfSchedule } from '$lib/scripts/schedule';
import { getConsensusSpread } from '$lib/scripts/dataFetching';
import { toast } from '@zerodevx/svelte-toast';
import type { SeasonBoundDoc } from '../classes/seasonBound';
import { makeNumericArrayOfDesiredLength } from '../functions';

export const getAllGames = async (showToast = false): Promise<Game[]> => {
	try {
		const games: Game[] = [];
		const q = query(scheduleCollection);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		
		querySnapshot.forEach((doc) => {
			const docRef = doc.ref;
			const id = doc.id;
			const game = new Game({ id, docRef, ...doc.data() });
			games.push(game);
		});
		
		const title = 'Got All Games!';
		const msg = 'Retrieved all game documents from the Schedule collection.';
		showToast ? LogAndToast({ title, msg }) : myLog({ msg, traceLocation: true });
		
		return games;
	} catch (error) {
		const msg = `Encountered an error while trying to get all game documents.  Check the console for more info. ${error}`;
		errorToast({msg});
		myError({ error, msg });
	}
};
type getSpecificGameOptions = {
	queryConstraints: QueryConstraint[];
	showToast?: boolean;
}
export const getSpecificGames = async (input : getSpecificGameOptions) => {
	try {
		const { queryConstraints, showToast } = input;
		const games: Game[] = [];
		const q = query(scheduleCollection, ...queryConstraints);
		const querySnapshot = await getDocs(q.withConverter(gameConverter));
		
		querySnapshot.forEach((doc) => {
			const docRef = doc.ref;
			const id = doc.id;
			const game = new Game({ id, docRef, ...doc.data() });
			games.push(game);
		});
		
		const title = `Got Games!`;
		const msg = 'Retrieved all specified game documents from the Schedule collection.';
		showToast ? LogAndToast({ title, msg }) : myLog({ msg, traceLocation: true });

		return games;
	} catch (error) {
		const msg = `Encountered an error while trying to get a specific week/year of game documents.  Check the console for more info. ${error}`;
		ErrorAndToast({ msg, error});
	}
};

export const getFutureGames = async(): Promise<Game[]> => {
	const now_timestamp = Timestamp.now();
	// Get all games that will be played in the future
	const games = await getSpecificGames({
	queryConstraints: [where('timestamp', '>=', now_timestamp)]
			});
	return games;
}

export const createWeeklyPicksForAllPlayers = async () => {
	try {
		const weeklyPlayers = await getWeeklyPlayers();
		const games = await getAllGames();
		for await (const player of weeklyPlayers) {
			await createWeeklyPicksForPlayer({player, games});
		}
		const title = 'Created Weekly Picks!';
		const msg = 'Pick documents were created for every game, for every Weekly pool player.';
		LogAndToast({
			title,
			msg,
			traceLocation: true
		});
	} catch (error) {
		const msg = `Encountered an error while trying to create all players' picks.  Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
type createWeeklyPicksForPlayerOptions = {
	player: Player;
	games: Game[];
	showToast?: boolean;
	logAll?: boolean;
}
//TODO: Move to a triggered Cloud Function when a player joins the Weekly pool
export const createWeeklyPicksForPlayer = async (
	input: createWeeklyPicksForPlayerOptions
) => {
	const { player, games, showToast, logAll } = input;
	try {
		for await (const game of games) {
			const newWeeklyPickRef = doc(weeklyPicksCollection);  // auto-generates a new doc ref/id
			const pickDoc = new WeeklyPickDoc({
				docRef: newWeeklyPickRef,
				gameId: game.id,
				pick: '',
				uid: player.uid,
				week: game.week,
				year: game.timestamp.toDate().getFullYear(),
				timestamp: game.timestamp,
				name: player.name,
				nickname: player.nickname,
				type: game.type,
				isCorrect: null
			});
			setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
		}
		const title = 'Created Weekly Picks!';
		const msg = `Pick documents were created for every game for ${player.name} (${player.nickname})`;
		
		if (logAll) myLog({ msg, traceLocation: true });
		if (showToast)	defaultToast({ title, msg });

	} catch (error) {
		const msg = `Encountered an error while trying to create ${player.name}'s picks.  Check the console for more info. ${error}`;
			ErrorAndToast({
				msg,
				error
			});
	}
};

export const deleteWeeklyPicksForAllPlayers = async () => {
	try {
		const q = query(weeklyPicksCollection);
		const allWeeklyDocs = await getDocs(q);
		allWeeklyDocs.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = 'All pick documents were deleted.';
		LogAndToast({
			title,
			msg,
			traceLocation: true
		});
	} catch (error) {
		const msg = `Encountered an error while trying to delete all players's picks.  Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
export const deleteWeeklyPicksForPlayer = async (
	player: Player,
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		if (!selectedWeek) {
			selectedWeek = await findCurrentWeekOfSchedule();
		}
		if (!selectedYear) {
			selectedYear = new Date().getFullYear();
		}
		const wheres = [
			where('uid', '==', player.uid),
			where('week', '==', selectedWeek),
			where('year', '==', selectedYear)
		];
		const q = query(weeklyPicksCollection, ...wheres);
		const allWeeklyDocsForPlayer = await getDocs(q);
		allWeeklyDocsForPlayer.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		const title = 'Deleted Weekly Picks!';
		const msg = `All pick documents were deleted for ${player.name} (${player.nickname})`;

		LogAndToast({
			title,
			msg,
			traceLocation: true
		});
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${player.name}'s picks. Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
export const createWeeklyTiebreakersForAllPlayers = async (season : SeasonBoundDoc) => {
	try {
		const weeklyPlayers = await getWeeklyPlayers();
		weeklyPlayers.forEach((player) => {
			createWeeklyTiebreakersForPlayer({player, season});
		});
		const title = 'Created Tiebreakers!';
		const msg = 'Tiebreaker documents were created for every game, for every Weekly pool player.';
		LogAndToast({
			title,
			msg,
			traceLocation: true
		});
	} catch (error) {
		const msg = `Encountered an error while trying to create all players' tiebreaker documents.  Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
type createWeeklyTiebreakersForPlayerOptions = {
	player: Player;
	season: SeasonBoundDoc;
}
// TODO: Move to cloud function performed when player joins the pool
export const createWeeklyTiebreakersForPlayer = async (
	input: createWeeklyTiebreakersForPlayerOptions
) => {
	const { player, season } = input;
	try {
		const {uid} = player;
		const {year, number_of_weeks} = season;
		// Make an array from the number of weeks, starting with 1
		const weeks = makeNumericArrayOfDesiredLength(number_of_weeks);
		// Create a tiebreaker doc for each week
		weeks.forEach(async (week) => {
			await setNewTiebreakerDoc(uid, week, year);
		})
		myLog({ msg: `set tiebreakers for ${player.name} (${player.nickname})` });
	} catch (error) {
		const msg = `Encountered an error while trying to create tiebreaker documents for ${player.name} (${player.nickname})`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
export const setNewTiebreakerDoc = async (
	uid: string,
	selectedWeek: number,
	selectedYear: number,
	type = 'Regular Season',
	scoreGuess = null
) => {
	const docRef = doc(weeklyTiebreakersCollection);
	try {
		await setDoc(docRef.withConverter(weeklyTiebreakerConverter), {
			scoreGuess,
			docRef,
			uid,
			type,
			week: selectedWeek,
			year: selectedYear
		});
		myLog({
			msg: `set tiebreaker doc (${docRef}); uid: ${uid}, week ${selectedWeek}, ${selectedYear}`
		});
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set tiebreaker doc (${docRef})`,
			error,
			additional_params: `unable to update tiebreaker ${docRef.path} for player ${uid}`
		});
	}
};
export const deleteTiebreakersForAllPlayers = async () => {
	try {
		const proceed = confirm(
			'Are you sure you want to delete all picks for all players?  This is not reversible.'
		);
		if (proceed) {
			const q = query(weeklyTiebreakersCollection);
			const allWeeklyDocs = await getDocs(q);
			allWeeklyDocs.forEach((doc) => {
				deleteDoc(doc.ref);
			});
			const title = 'Deleted Weekly Tiebreakers!';
			const msg = 'All tiebreaker documents were deleted.';
			LogAndToast({
				title,
				msg,
				traceLocation: true
			});
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete all players's tiebreakers.  Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
export const deleteTiebreakersForPlayer = async (
	player: Player,
	selectedWeek?: number,
	selectedYear?: number
) => {
	try {
		const proceed = confirm(
			`Are you sure you want to delete tiebreakers for ${player.name} (${player.nickname})? ${
				selectedWeek ? `for ${selectedWeek},` : ''
			} ${selectedYear ? selectedYear : ''}`
		);
		if (proceed) {
			const wheres: QueryConstraint[] = [where('uid', '==', player.uid)];
			if (selectedWeek) {
				wheres.push(where('week', '==', selectedWeek));
			}
			if (selectedYear) {
				wheres.push(where('year', '==', selectedYear));
			}
			const q = query(weeklyTiebreakersCollection, ...wheres);
			const playerTiebreakerDocs = await getDocs(q.withConverter(weeklyPickConverter));

			playerTiebreakerDocs.forEach((doc) => deleteDoc(doc.ref));

			const title = `Deleted Weekly Tiebreakers for ${player.name}!`;
			const msg = `All tiebreaker documents were deleted ${
				selectedWeek && selectedYear ? `for Week ${selectedWeek}, ${selectedYear}` : null
			}.`;

			LogAndToast({
				title,
				msg,
				traceLocation: true
			});
		}
	} catch (error) {
		const msg = `Encountered an error while trying to delete ${player.name}'s tiebreakers.  Check the console for more info. ${error}`;
		ErrorAndToast({
			msg,
			error
		});
	}
};
export const updateGameSpreads = async (week: number, year: number) => {
	try {
		const startToast = defaultToast({
			title: 'Updating spreads...',
			msg: `Getting consensus spreads from ESPN...`
		});
		// Update the pick game objects on the pick documents?
		const q = query(scheduleCollection, where('week', '==', week), where('year', '==', year));
		const games = await getDocs(q.withConverter(gameConverter));
		for await (const gameDoc of games.docs) {
			const gameData = gameDoc.data();
			if (gameData.spread === null || gameData.spread === undefined) {
				myLog({ msg: `no spread found for game id:${gameData.id}` });
				const updatedSpread = await getConsensusSpread(gameData.id);
				updateDoc(gameDoc.ref, { spread: updatedSpread });
			} else {
				myLog({ msg: `existing spread found for game (${gameData.id}) was: ${gameData.spread}` });
			}
		}
		toast.pop(startToast);
		defaultToast({
			title: 'Updated Spreads!',
			msg: `Week ${week} spreads were successfully updated!`
		});
	} catch (error) {
		const msg = `Encountered an error while trying to update spreads for week ${week}.  Check the console for more info.`;
		ErrorAndToast({ msg, error});
	}
};
