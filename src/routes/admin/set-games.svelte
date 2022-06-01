<script lang="ts">
	import {
		type ESPNGame,
		type ESPNGamePruned,
		Game,
		type ESPNWeekEvent,
		type RefOnlyESPN
	} from '$scripts/classes/game';
	import { gameConverter } from '$scripts/converters';
	import { firestoreDB } from '$lib/scripts/firebase/firebase';
	import { gamesCollection } from '$scripts/collections';
	import { deleteDoc, doc, getDocs, query, setDoc, Timestamp, where } from '@firebase/firestore';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import { all_icons, stopSign } from '$scripts/classes/constants';
	import { ErrorAndToast, LogAndToast, myError, myLog } from '$scripts/logging';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$components/selects/YearSelect.svelte';
	import { defaultToast } from '$scripts/toasts';
	import LoadingSpinner from '$components/misc/LoadingSpinner.svelte';
	import Grid from '$components/containers/Grid.svelte';
	import DeletionButton from '$components/buttons/DeletionButton.svelte';
	import StyledButton from '$components/buttons/StyledButton.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import { convertToHttps, getConsensusSpread } from '$scripts/dataFetching';
	import {
		selected_week,
		selected_season_type,
		selected_season_type_number,
		selected_year
	} from '$scripts/store';
	import EspnGameData from '$components/misc/ESPNGameData.svelte';

	// Are games being currently set by the function?  If so, we'll disable the Set Games button.
	let currently_setting_games = false;
	let gamesPromise: Promise<{ originalGames: ESPNGame[]; prunedGames: ESPNGamePruned[] }>;
	let selectedGames = 'pruned';
	let maxGameHeight = 100;
	let minGameHeight = 10;
	let setGameHeight = 50;

	const fetchWeek = async () => {
		try {
			// types/1 = preseason;
			// types/2 = regular season
			console.log('fetching week...', $selected_year, $selected_season_type_number, $selected_week);
			const response = await fetch(
				`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${$selected_year}/types/${$selected_season_type_number}/weeks/${$selected_week}/events?lang=en&region=us`
			);
			const data = (await response.json()) as ESPNWeekEvent;
			if (data.items?.length > 0) {
				return data.items;
			} else {
				throw new Error(
					`No games found for week ${$selected_week} of ${$selected_year} ${$selected_season_type}.`
				);
			}
		} catch (error) {
			// Bubble the error up to the parent getData() function.
			throw error;
		}
	};
	const unpackReferenceURLs = async (items: RefOnlyESPN[]): Promise<string[]> => {
		try {
			if (items.length === 0)
				throw new Error(
					`No games listed for week ${$selected_week} of ${$selected_year} ${$selected_season_type}`
				);

			const references: string[] = items.map((item): string => {
				return item.$ref;
			});
			return references;
		} catch (error) {
			// Bubble the error up to the parent getData() function.
			throw new Error(`Error unpacking reference URLs. ${error}`);
		}
	};
	const fetchGameData = async (referenceURLs: string[]) => {
		try {
			const gameData: ESPNGame[] = [];

			for await (const url of referenceURLs) {
				const httpUrl = url;
				const httpsUrl = await convertToHttps(httpUrl);
				const response = await fetch(httpsUrl);
				const data = await response.json();
				gameData.push(data);
			}
			return gameData;
		} catch (error) {
			// Bubble the error up to the parent getData() function.
			throw new Error(`Error fetching game data: ${error}`);
		}
	};

	export const getData = async () => {
		try {
			const weekReferences = await fetchWeek();
			const gameUrls = await unpackReferenceURLs(weekReferences);

			const originalGames = await fetchGameData(gameUrls);
			// const originalSize = originalGames.reduce(aggregateObjectSizes, 0);
			// console.log('fetched games:', originalGames, `memory: ${formatByteSize(originalSize)}`);

			const prunedGames = await pruneESPNGames(originalGames);
			// const reducedSize = prunedGames.reduce(aggregateObjectSizes, 0);
			// console.log('pruned games:', prunedGames, `memory: ${formatByteSize(reducedSize)}`);

			return { originalGames, prunedGames };
		} catch (error) {
			const title = 'Unable to fetch game data. ';
			ErrorAndToast({ title, msg: error, error });
		}
	};

	/**
	 * Limit how much of the ESPN game object we store
	 */
	export const pruneESPNGames = async (gameDataObjects: ESPNGame[]) => {
		let prunedGames: ESPNGamePruned[] = JSON.parse(JSON.stringify(gameDataObjects));
		const propertiesToPrune: string[] = [
			'uid',
			'timeValid',
			'weather',
			'venues',
			'links',
			'league'
		];
		const competitionPropsToPrune: string[] = [
			'guid',
			'uid',
			'attendance',
			'type',
			'necessary',
			'timeValid',
			'neutralSite',
			'divisionCompetition',
			'conferenceCompetition',
			'previewAvailable',
			'recapAvailable',
			'boxscoreAvailable',
			'lineupAvailable',
			'gamecastAvailable',
			'playByPlayAvailable',
			'conversationAvailable',
			'commentaryAvailable',
			'pickcenterAvailable',
			'summaryAvailable',
			'liveAvailable',
			'ticketsAvailable',
			'shotChartAvailable',
			'timeoutsAvailable',
			'possessionArrowAvailable',
			'onWatchESPN',
			'recent',
			'bracketAvailable',
			'gameSource',
			'boxscoreSource',
			'playByPlaySource',
			'linescoreSource',
			'statsSource',
			'venue',
			'notes',
			'broadcasts',
			'officials',
			'links',
			'powerIndexes',
			'format',
			'drives',
			'tickets',
			'weather'
		];
		const teamCompetitorPropsToPrune = [
			'id',
			'nextCompetition',
			'previousCompetition',
			'order',
			'type',
			'uid'
		];
		for await (const game of prunedGames) {
			propertiesToPrune.forEach((property) => {
				delete game[property];
			});
			competitionPropsToPrune.forEach((property) => {
				delete game.competitions[0][property];
			});
			teamCompetitorPropsToPrune.forEach((property) => {
				delete game.competitions[0].competitors[0][property];
				delete game.competitions[0].competitors[1][property];
			});
		}
		return prunedGames;
	};

	const queryChanged = async () => {
		gamesPromise = getData();
	};

	const setGames = async () => {
		try {
			selected_week;
			if (gamesPromise) {
				const allGames = await gamesPromise;
				const gamesToSet = allGames.prunedGames;
				currently_setting_games = true;

				LogAndToast({
					title: 'Setting Games',
					msg: `Creating/overriting game documents for ${$selected_week}.`
				});

				for await (const game of gamesToSet) {
					setGame(game);
				}
				LogAndToast({ title: 'Games Set', msg: `Created game documents for ${$selected_week}!` });
			}
			currently_setting_games = false;
		} catch (error) {
			ErrorAndToast({ error });
		}
	};
	const setGame = async (game: ESPNGamePruned) => {
		try {
			const doc_ref = doc(firestoreDB, gamesCollection.path, game.id);

			// Get the spread by querying the game id on the ESPN spreads/betting API
			const spread = await getConsensusSpread(game.id);

			// Convert the game date to the server timestamp format
			const date = new Date(game.date);
			const timestamp = Timestamp.fromDate(date);

			// Split out the home and away team abbreviations from the shortName field
			const { shortName } = game;
			const [away_team_abbreviation, home_team_abbreviation] = shortName.split(' @ ');
			myLog({ msg: `home team: ${home_team_abbreviation}`, icon: all_icons.home });
			myLog({ msg: `away team: ${away_team_abbreviation}`, icon: all_icons.airplaneDeparture });

			// Add the season_type, year, and week, instead of using ESPN's nested reference object
			// Load the game to a new object that will gain Firebase-friendly formatting changes
			const formatted_game = new Game({
				...game,
				doc_ref,
				season_ref: game.season,
				season_type_ref: game.seasonType,
				short_name: game.shortName,
				week: $selected_week,
				season_year: $selected_year,
				season_type: $selected_season_type,
				timestamp,
				home_team_abbreviation,
				away_team_abbreviation,
				spread: spread
			});

			// Set/update the game document with the formatted data
			await setDoc(doc_ref.withConverter(gameConverter), formatted_game);
		} catch (error) {
			myError({ error });
			throw new Error(error);
		}
	};

	const deleteAllGames = async () => {
		const continueDelete = confirm(
			'Are you sure you want to delete all games from the Schedule collection?'
		);
		if (continueDelete) {
			const q = query(gamesCollection);
			const allScheduleDocs = await getDocs(q);
			allScheduleDocs.forEach((game) => {
				deleteDoc(game.ref);
			});
			defaultToast({
				title: `${stopSign} All games deleted!`,
				msg: `Please remember to re-create the game documents.`,
				duration: 5000
			});
		}
	};
	const deleteGameWeek = async () => {
		const continueDelete = confirm(
			`Are you sure you want to delete all games from week ${$selected_week} of the ${$selected_season_type}, ${$selected_year}`
		);
		if (continueDelete) {
			const q = query(
				gamesCollection,
				where('year', '==', $selected_year),
				where('week', '==', $selected_week),
				where('type', '==', $selected_season_type)
			);
			const matchingDocs = await getDocs(q);
			matchingDocs.forEach((game) => {
				deleteDoc(game.ref);
			});
			defaultToast({
				title: `${stopSign} Week of Games Deleted!`,
				msg: `${$selected_week} (${$selected_season_type}, ${$selected_year}) games deleted!`,
				duration: 5000
			});
		}
	};
</script>

<section>
	<PageTitle>Fetch ESPN Game Data</PageTitle>
	<Grid>
		<DeletionButton on:click={deleteAllGames}>Delete All Games</DeletionButton>
		<DeletionButton on:click={deleteGameWeek}>Delete Selected Week</DeletionButton>
		<!-- svelte-check ignore -->
		<input
			type="range"
			min={minGameHeight}
			max={maxGameHeight}
			bind:value={setGameHeight}
			step="5"
		/>
	</Grid>
	<div class="flex">
		<SeasonTypeSelect on:change={queryChanged} />
		<YearSelect on:change={queryChanged} />
		<WeekSelect
			on:change={queryChanged}
			on:decrementWeek={queryChanged}
			on:incrementWeek={queryChanged}
		/>
		<select bind:value={selectedGames}>
			<option value="pruned">Pruned Games (DB)</option>
			<option value="full">Full Games (ESPN API)</option>
			<option value="both">Both</option>
		</select>
		{#await gamesPromise then}
			<StyledButton on:click={setGames} disabled={currently_setting_games}>Set Games</StyledButton>
		{:catch error}
			<ErrorModal>
				Unable to load games: {error}
			</ErrorModal>
		{/await}
		<div />
	</div>
</section>

<section>
	{#await gamesPromise}
		<div class="padded">
			<LoadingSpinner />
		</div>
	{:then gameData}
		<Grid
			useInAndOutTransitions={true}
			inTransitionType="slide"
			inTransitionConfig={{ delay: 200 }}
			outTransitionType="fade"
			outTransitionConfig={{ x: 200 }}
			maxColumns={'100%'}
			repeatColumns={selectedGames === 'both' ? 2 : 'auto-fit'}
		>
			{#if gameData}
				{#key setGameHeight}
					{#if selectedGames === 'pruned'}
						<EspnGameData maxHeight={setGameHeight} gameData={gameData.prunedGames} />
					{:else if selectedGames === 'full'}
						<EspnGameData maxHeight={setGameHeight} gameData={gameData.originalGames} />
					{:else if selectedGames === 'both'}
						<EspnGameData
							maxHeight={setGameHeight}
							gameData={gameData.prunedGames}
							title="Pruned Games for DB"
						/>
						<EspnGameData
							maxHeight={setGameHeight}
							gameData={gameData.originalGames}
							title="Original ESPN Games"
						/>
					{/if}
				{/key}
			{/if}
		</Grid>
	{:catch error}
		<ErrorModal>
			Error displaying game data: {error}
		</ErrorModal>
	{/await}
</section>

<style lang="scss">
	.padded {
		padding: 1rem;
		max-width: 100%;
	}
	.flex {
		@include flexCenter($gap: 1rem);
		padding: 1rem;
		flex-wrap: wrap;
	}
	select {
		@include defaultSelect;
	}
	input[type='range'] {
		writing-mode: vertical-lr;
		appearance: slider-vertical;
	}
</style>
