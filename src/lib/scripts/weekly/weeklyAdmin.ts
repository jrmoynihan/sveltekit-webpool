import { myError, myLog, ErrorAndToast, LogAndToast } from '$scripts/logging';
import { Game } from '$lib/scripts/classes/game';
import { WeeklyPickDoc } from '$lib/scripts/classes/picks';
import type { Player } from '$lib/scripts/classes/player';
import {
	gamesCollection,
	seasonRecordsCollection,
	weeklyPicksCollection,
	weeklyRecordsCollection,
	weeklyTiebreakersCollection
} from '$lib/scripts/collections';
import {
	gameConverter,
	recordConverter,
	seasonRecordConverter,
	weeklyPickConverter,
	weeklyTiebreakerConverter
} from '$lib/scripts/converters';
import { defaultToast, errorToast } from '$lib/scripts/toasts';
import { getPicksData, getWeeklyPlayers } from './weeklyPlayers';
import {
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	where,
	type QueryConstraint,
	Timestamp
} from '@firebase/firestore';
import { findCurrentWeekOfSchedule } from '$lib/scripts/schedule';
import { getConsensusSpread } from '$lib/scripts/dataFetching';
import { toast } from '@zerodevx/svelte-toast';
import type { SeasonBoundDoc } from '../classes/seasonBound';
import { makeNumericArrayOfDesiredLength } from '../functions';
import { WeeklyTiebreaker } from '../classes/tiebreaker';
import { PlayerRecord, SeasonRecord } from '../classes/playerRecord';
import { all_seasons, weekly_players } from '../store';
import { get } from 'svelte/store';

export const getAllGames = async (showToast = false): Promise<Game[]> => {
	try {
		const games: Game[] = [];
		const q = query(gamesCollection);
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
		errorToast({ msg });
		myError({ error, msg });
	}
};

type getSpecificGameOptions = {
	constraints: QueryConstraint[];
	showToast?: boolean;
};

export const getSpecificGames = async (input: getSpecificGameOptions) => {
	try {
		const { constraints, showToast } = input;
		const games: Game[] = [];
		const q = query(gamesCollection, ...constraints);
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
		ErrorAndToast({ msg, error });
	}
};

export const getFutureGames = async (): Promise<Game[]> => {
	const now_timestamp = Timestamp.now();
	const future_games_constraints = [where('timestamp', '>=', now_timestamp)];

	// Get all games that will be played in the future
	const games = await getSpecificGames({ constraints: future_games_constraints, showToast: false });
	return games;
};

export const createWeeklyPicksForAllPlayers = async () => {
	try {
		const weeklyPlayers = get(weekly_players) || (await getWeeklyPlayers());
		const games = await getAllGames();
		for await (const player of weeklyPlayers) {
			await createWeeklyPicksForPlayer({ player, games });
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
};
//TODO: Move to a triggered Cloud Function when a player joins the Weekly pool
export const createWeeklyPicksForPlayer = async (input: createWeeklyPicksForPlayerOptions) => {
	const { player, games, showToast, logAll } = input;
	const { uid, name, nickname } = player;
	try {
		if (player && games.length > 0) {
			for await (const game of games) {
				const { id: game_id, week, timestamp, season_type } = game;
				// FIXME: Should this take a function argument?
				const season_year = timestamp.toDate().getFullYear();
				// Check to make sure a doc doesn't already exist for this game, player, season, year, and week combination.
				const existing_doc_constraints = [
					where('game_id', '==', game_id),
					where('uid', '==', uid),
					where('season_type', '==', season_type),
					where('season_year', '==', season_year),
					where('week', '==', week)
				];
				const existing_doc = await getPicksData({ constraints: existing_doc_constraints });
				if (existing_doc.length === 0) {
					const newWeeklyPickRef = doc(weeklyPicksCollection); // auto-generates a new doc ref/id
					const pickDoc = new WeeklyPickDoc({
						doc_ref: newWeeklyPickRef,
						game_id,
						pick: '',
						uid,
						week,
						season_year,
						timestamp,
						name,
						nickname,
						season_type,
						is_correct: null
					});
					await setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
				}
			}
			const title = 'Created Weekly Picks!';
			const msg = `Pick documents were created for every game for ${player.name} (${player.nickname})`;

			if (logAll) myLog({ msg, traceLocation: true });
			if (showToast) defaultToast({ title, msg });
		} else {
			throw new Error('No games or player to create picks for');
		}
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
export const createWeeklyTiebreakersForAllPlayers = async (season: SeasonBoundDoc) => {
	try {
		const weeklyPlayers = await getWeeklyPlayers();
		weeklyPlayers.forEach((player) => {
			createWeeklyTiebreakersForPlayer({ player, season });
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
	show_toast?: boolean;
};
// TODO: Move to cloud function performed when player joins the pool
export const createWeeklyTiebreakersForPlayer = async (
	input: createWeeklyTiebreakersForPlayerOptions
) => {
	const { player, season, show_toast } = input;
	try {
		const { uid } = player;
		const { year, number_of_weeks, type_name } = season;
		// Make an array from the number of weeks, starting with 1
		const weeks = makeNumericArrayOfDesiredLength(number_of_weeks);
		// Create a tiebreaker doc for each week
		weeks.forEach(async (week) => {
			await createTiebreaker(uid, week, year, type_name);
		});
		myLog({ msg: `set tiebreakers for ${player.name} (${player.nickname})` });
	} catch (error) {
		const msg = `Encountered an error while trying to create tiebreaker documents for ${player.name} (${player.nickname})`;
		show_toast
			? ErrorAndToast({
					msg,
					error
			  })
			: myError({ msg, error });
	}
};
export const createTiebreaker = async (
	uid: string,
	week: number,
	season_year: number,
	season_type = 'Regular Season',
	score_guess = null
) => {
	const doc_ref = doc(weeklyTiebreakersCollection.withConverter(weeklyTiebreakerConverter));
	try {
		const data: WeeklyTiebreaker = new WeeklyTiebreaker({
			score_guess,
			uid,
			week,
			season_year,
			season_type,
			doc_ref
		});
		await setDoc(doc_ref, data);
		myLog({
			msg: `set tiebreaker doc (${doc_ref.path}); uid: ${uid}, week ${week}, ${season_year}`
		});
		// TODO: why does this need to return an array?
		return [data];
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set tiebreaker doc (${doc_ref.path})`,
			error,
			additional_params: `unable to update tiebreaker ${doc_ref.path} for player ${uid}`
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
		const q = query(gamesCollection, where('week', '==', week), where('season_year', '==', year));
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
		ErrorAndToast({ msg, error });
	}
};
type createSeasonRecordForPlayerOptions = {
	player: Player;
	season_year: number;
};
export const createSeasonRecordForPlayer = async (input: createSeasonRecordForPlayerOptions) => {
	const { player, season_year } = input;
	const doc_ref = doc(seasonRecordsCollection.withConverter(seasonRecordConverter));
	try {
		const data: SeasonRecord = new SeasonRecord({
			uid: player.uid,
			season_year,
			doc_ref,
			total_weekly_losses: 0,
			total_weekly_wins: 0
		});
		await setDoc(doc_ref, data);
		myLog({
			msg: `set season record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season`
		});
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set season record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season`,
			error,
			additional_params: `unable to update season record ${doc_ref.path} for player ${player.name}`
		});
	}
};
type createWeeklyRecordsForPlayerOptions = {
	player: Player;
	season: SeasonBoundDoc;
};
export const createWeeklyRecordsForPlayer = async (input: createWeeklyRecordsForPlayerOptions) => {
	const { player, season } = input;
	try {
		const { year, type_name } = season;
		const number_of_weeks = get(all_seasons).find(
			(s) => s.year === year && s.type_name === type_name
		).number_of_weeks;
		const weeks = makeNumericArrayOfDesiredLength(number_of_weeks);
		for (const week of weeks) {
			const q = query(
				weeklyRecordsCollection,
				where('uid', '==', player.uid),
				where('season_year', '==', year),
				where('week', '==', week)
			);
			const docs = await getDocs(q.withConverter(recordConverter));
			if (docs.empty) {
				myLog({
					msg: `no weekly records found for player: ${player.name} for ${year} season, week ${week}`
				});
				const doc_ref = doc(weeklyRecordsCollection.withConverter(recordConverter));
				const data: PlayerRecord = new PlayerRecord({
					doc_ref,
					uid: player.uid,
					season_year: year,
					season_type: type_name,
					week
				});
				await setDoc(doc_ref, data);
				myLog({
					msg: `set weekly record doc (${doc_ref.path}) for player: ${player.name} for ${year} season, week ${week}`
				});
			} else {
				myLog({
					msg: `weekly records found for player: ${player.name} for ${year} season, week ${week}`
				});
			}
		}
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set weekly record doc for player: ${player.name} for ${season.year} season`,
			error,
			additional_params: `unable to update weekly record for player ${player.name}`
		});
	}
};
export const joinWeeklyPool = async (player: Player, season: SeasonBoundDoc) => {
	// Get all games that will be played in the future and make picks for the player
	const games = await getFutureGames();
	if (games.length > 0) {
		createWeeklyPicksForPlayer({
			player,
			games,
			logAll: true
		});
	}
	createWeeklyTiebreakersForPlayer({ player, season });
	createWeeklyRecordsForPlayer({ player, season });
};
export const joinSurvivorPool = async (player: Player, season: SeasonBoundDoc) => {
	LogAndToast({ msg: `Joining Survivor pool is not yet implemented.` });
};
export const joinPick6Pool = async (player: Player, season: SeasonBoundDoc) => {
	LogAndToast({ msg: `Joining Pick6 pool is not yet implemented.` });
};
export const joinPlayoffsPool = async (player: Player, season: SeasonBoundDoc) => {
	LogAndToast({ msg: `Joining Playoffs pool is not yet implemented.` });
};
export const joinCollegePool = async (player: Player, season: SeasonBoundDoc) => {
	LogAndToast({ msg: `Joining College pool is not yet implemented.` });
};
export const joinAllPools = async (player: Player, season: SeasonBoundDoc) => {
	joinWeeklyPool(player, season);
	joinSurvivorPool(player, season);
	joinPick6Pool(player, season);
	joinPlayoffsPool(player, season);
	joinCollegePool(player, season);
};
