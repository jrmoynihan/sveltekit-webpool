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
import { getGameData, getPicksData, getWeeklyPlayers, getWeeklyRecords } from './weeklyPlayers';
import {
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	where,
	type QueryConstraint,
	Timestamp,
	QuerySnapshot
} from '@firebase/firestore';
import { getConsensusSpread } from '$lib/scripts/dataFetching';
import { toast } from '@zerodevx/svelte-toast';
import type { SeasonBoundDoc } from '../classes/seasonBound';
import { makeNumericArrayOfDesiredLength } from '../functions';
import { WeeklyTiebreaker } from '../classes/tiebreaker';
import { PlayerRecord, SeasonRecord } from '../classes/playerRecord';
import { weekly_players } from '../store';
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

interface getSpecificGameOptions {
	constraints: QueryConstraint[];
	showToast?: boolean;
}

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
		const games = await getFutureGames();
		for await (const player of weeklyPlayers) {
			await createWeeklyPicksForPlayer({ player, games });
		}
		const title = 'Created Weekly Picks!';
		const msg = 'Pick documents were created for every future game, for every Weekly pool player.';
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
interface createWeeklyPicksForPlayerOptions {
	player: Player;
	games: Game[];
	showToast?: boolean;
	logAll?: boolean;
}
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
				const existing_doc = await getPicksData({
					constraints: existing_doc_constraints,
					show_log: false
				});
				if (existing_doc.length === 0) {
					myLog({ msg: `${name} does not have a pick doc for game id ${game_id}` });
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
					myLog({ msg: `Created a pick doc for ${name} for game id ${game_id}` });
				} else if (existing_doc.length > 0) {
					myLog({ msg: `${name} already has a pick doc for game id ${game_id}` });
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
		const all_weekly_pick_docs = await getDocs(q);
		all_weekly_pick_docs.forEach((doc) => {
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
interface deleteWeeklyPicksForPlayerOptions {
	player: Player;
	constraints?: QueryConstraint[];
}
export const deleteWeeklyPicksForPlayer = async (input: deleteWeeklyPicksForPlayerOptions) => {
	const { player, constraints = [] } = input;
	const { uid } = player;
	try {
		const weekly_pick_constraints = [where('uid', '==', uid), ...constraints];
		const q = query(weeklyPicksCollection, ...weekly_pick_constraints);
		const matching_pick_docs_for_player = await getDocs(q);
		matching_pick_docs_for_player.forEach((doc) => {
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
interface createWeeklyTiebreakersForPlayerOptions {
	player: Player;
	season: SeasonBoundDoc;
	show_toast?: boolean;
}
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
interface deleteTiebreakersForPlayerOptions {
	player: Player;
	constraints?: QueryConstraint[];
}
export const deleteTiebreakersForPlayer = async (input: deleteTiebreakersForPlayerOptions) => {
	const { player, constraints } = input;
	try {
		const tiebreaker_constraints: QueryConstraint[] = [
			where('uid', '==', player.uid),
			...constraints
		];
		const q = query(weeklyTiebreakersCollection, ...tiebreaker_constraints);
		const player_tiebreaker_docs = await getDocs(q.withConverter(weeklyPickConverter));

		player_tiebreaker_docs.forEach((doc) => deleteDoc(doc.ref));

		const title = `Deleted Weekly Tiebreakers for ${player.name}!`;
		const msg = `All tiebreaker documents were deleted for ${player.name} (${player.nickname})`;

		LogAndToast({
			title,
			msg,
			traceLocation: true
		});
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
		const constraints = [where('week', '==', week), where('season_year', '==', year)];
		const games = await getGameData({ constraints });
		for await (const game of games) {
			if (game.spread === null || game.spread === undefined || isNaN(game.spread)) {
				myLog({ msg: `no spread found on game doc (game id: ${game.id})` });
				const updatedSpread = await getConsensusSpread(game.id);
				myLog({ msg: `updated spread: ${updatedSpread}` });
				updateDoc(game.doc_ref, { spread: updatedSpread });
			} else {
				myLog({ msg: `existing spread found for game (${game.id}) was: ${game.spread}` });
				const updatedSpread = await getConsensusSpread(game.id);
				myLog({ msg: `updated spread: ${updatedSpread}` });
				updateDoc(game.doc_ref, { spread: updatedSpread });
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
interface createSeasonRecordForPlayerOptions {
	player: Player;
	season_year: number;
}
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
interface createWeeklyRecordsForPlayerOptions {
	player: Player;
	season: SeasonBoundDoc;
}
export const createWeeklyRecordsForPlayer = async (input: createWeeklyRecordsForPlayerOptions) => {
	const { player, season } = input;
	try {
		const { year, type_name, number_of_weeks } = season;
		const weeks = makeNumericArrayOfDesiredLength(number_of_weeks);
		for (const week of weeks) {
			createWeeklyRecordForPlayer({ player, season_year: year, week, season_type: type_name });
		}
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set weekly record doc for player: ${player.name} for ${season.year} season`,
			error,
			additional_params: `unable to update weekly record for player ${player.name}`
		});
	}
};
interface createWeeklyRecordForPlayerOptions {
	player: Player;
	season_year: number;
	week: number;
	season_type: string;
	net_tiebreaker?: number;
	net_tiebreaker_absolute?: number;
	perform_prexisting_doc_check?: boolean;
}
export const createWeeklyRecordForPlayer = async (input: createWeeklyRecordForPlayerOptions) => {
	const {
		player,
		season_year,
		week,
		season_type,
		net_tiebreaker = null,
		net_tiebreaker_absolute = null,
		perform_prexisting_doc_check = true
	} = input;
	try {
		let snapshot: QuerySnapshot<PlayerRecord>;
		if (perform_prexisting_doc_check) {
			const constraints = [
				where('uid', '==', player.uid),
				where('season_year', '==', season_year),
				where('week', '==', week)
			];
			snapshot = await getWeeklyRecords({ constraints });
		}
		if (!perform_prexisting_doc_check || snapshot?.empty) {
			const msg = perform_prexisting_doc_check
				? `no weekly records found for player: ${player.name} for ${season_year} season, week ${week}`
				: `Skipping check for existing weekly record doc...`;
			myLog({ msg });
			const doc_ref = doc(weeklyRecordsCollection.withConverter(recordConverter));
			const record: PlayerRecord = new PlayerRecord({
				doc_ref,
				uid: player.uid,
				season_year,
				season_type,
				week,
				net_tiebreaker,
				net_tiebreaker_absolute
			});
			await setDoc(doc_ref, record);
			myLog({
				msg: `set weekly record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season, week ${week}`
			});
			return record;
		} else {
			myLog({
				msg: `weekly records found for player: ${player.name} for ${season_year} season, week ${week}`,
				additional_params: snapshot.docs
			});
			return snapshot.docs[0].data();
		}
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set weekly record doc for player: ${player.name} for ${season_year} season, week ${week}`,
			error,
			additional_params: `unable to update weekly record for player ${player.name}`
		});
	}
};
interface deleteWeeklyRecordsForPlayerOptions {
	player: Player;
	constraints?: QueryConstraint[];
}
export const deleteWeeklyRecordsForPlayer = async (input: deleteWeeklyRecordsForPlayerOptions) => {
	const { player, constraints } = input;
	const player_record_constraints = [where('uid', '==', player.uid), ...constraints];
	const confirmed = confirm(
		'Are you sure you want to delete all weekly records for this player? This cannot be undone.'
	);
	if (confirmed) {
		try {
			const q = query(weeklyRecordsCollection, ...player_record_constraints);
			const player_records = await getDocs(q.withConverter(recordConverter));
			if (!player_records.empty) {
				myLog({
					msg: `Weekly records found for player: ${player.name}`
				});
				for await (const doc of player_records.docs) {
					deleteDoc(doc.ref);
				}
				LogAndToast({
					title: 'Deleted Weekly Records',
					msg: `Deleted weekly records for ${player.name}`
				});
			} else {
				myLog({
					msg: `No weekly records found for ${player.name} matching the provided constraints`,
					additional_params: constraints
				});
			}
		} catch (error) {
			ErrorAndToast({
				msg: `Encountered an error while trying to delete weekly records for ${player.name}`,
				error,
				additional_params: constraints
			});
		}
	}
};

export const joinWeeklyPool = async (player: Player, season: SeasonBoundDoc) => {
	const now = Timestamp.now();
	if (now.valueOf() > season.start_date.valueOf()) {
		LogAndToast({ msg: 'Regular Season has already started.  Cannot join weekly pool.' });
		return;
	} else {
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
	}
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
