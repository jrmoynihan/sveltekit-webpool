<script lang="ts">
	import { ESPNGame, ESPNGamePruned, Game } from '$scripts/classes/game';
	import { gameConverter } from '$scripts/converters';
	import { firestoreDB } from '$scripts/firebaseInit';
	import { scheduleCollection } from '$scripts/collections';
	import { allTeams } from '$scripts/teams';
	import { deleteDoc, doc, getDocs, query, setDoc, Timestamp, where } from '@firebase/firestore';
	import AccordionDetails from '../containers/accordions/AccordionDetails.svelte';
	import WeekSelect from '../selects/WeekSelect.svelte';
	import PageTitle from './PageTitle.svelte';
	import { key, myError, myLog, seasonTypes, stopSign } from '$scripts/classes/constants';
	import SeasonTypeSelect from '../selects/SeasonTypeSelect.svelte';
	import type { SeasonType } from '$scripts/classes/seasonType';
	import YearSelect from '../selects/YearSelect.svelte';
	import { onMount } from 'svelte';
	import { defaultToast } from '$scripts/toasts';
	import {
		convertToHttps,
		getConsensusSpread,
		getPreSeasonWeeks,
		getRegularSeasonWeeks
	} from '$scripts/functions';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import AccordionJson from '../containers/accordions/AccordionJSON.svelte';
	import { aggregateObjectSizes, formatByteSize } from '$scripts/memorySizeOf';
	import Grid from '../containers/Grid.svelte';
	import DeletionButton from '../buttons/DeletionButton.svelte';
	import StyledButton from '../buttons/StyledButton.svelte';
	import ErrorModal from '../modals/ErrorModal.svelte';
	import EspnGameData from './ESPNGameData.svelte';

	let currentlySetting = false;
	let promise: Promise<{ originalGames: ESPNGame[]; prunedGames: ESPNGamePruned[] }>;
	let weeks: number[] = [];
	let selectedYear: number = 2021;
	let selectedSeasonType: SeasonType = seasonTypes[1];
	let selectedWeek: number;
	let selectedGames: string = 'pruned';

	const fetchWeek = async (
		selectedYear: number,
		selectedSeasonType: SeasonType,
		selectedWeek: number
	) => {
		try {
			// types/1 = preseason;
			// types/2 = regular season
			const response = await fetch(
				`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${selectedYear}/types/${selectedSeasonType.id}/weeks/${selectedWeek}/events?lang=en&region=us`
			);
			const data = await response.json();

			return data.items;
		} catch (error) {
			console.error(error);
		}
	};
	const unpackReferenceURLs = async (items: [{ $ref: string }]): Promise<string[]> => {
		try {
			const references: string[] = items.map((item): string => {
				return item.$ref;
			});
			return references;
		} catch (error) {
			console.error(error);
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
			console.error(error);
		}
	};

	export const getData = async (
		selectedYear: number,
		selectedSeasonType: SeasonType,
		selectedWeek: number
	) => {
		const weekReferences = await fetchWeek(selectedYear, selectedSeasonType, selectedWeek);
		const gameUrls = await unpackReferenceURLs(weekReferences);

		const originalGames = await fetchGameData(gameUrls);
		const originalSize = originalGames.reduce(aggregateObjectSizes, 0);
		console.log('fetched games:', originalGames, `memory: ${formatByteSize(originalSize)}`);

		const prunedGames = await pruneESPNGames(originalGames);
		const reducedSize = prunedGames.reduce(aggregateObjectSizes, 0);
		console.log('pruned games:', prunedGames, `memory: ${formatByteSize(reducedSize)}`);

		return { originalGames, prunedGames };
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
		promise = getData(selectedYear, selectedSeasonType, selectedWeek);
	};
	const changeWeeksAvailable = async () => {
		if (selectedSeasonType.text === 'Regular Season') {
			weeks = await getRegularSeasonWeeks();
		} else if (selectedSeasonType.text === 'Pre-Season') {
			weeks = await getPreSeasonWeeks();
		}
	};

	const setGames = async (
		selectedWeek: number,
		selectedYear: number,
		selectedSeasonType: SeasonType
	) => {
		try {
			if (promise) {
				const allGames = await promise;
				const gamesToSet = allGames.prunedGames;
				currentlySetting = true;
				myLog('setting games...');
				defaultToast({
					title: 'Setting Games',
					msg: `Creating/overriting game documents for ${selectedWeek}.`
				});

				gamesToSet.forEach((game) => {
					setGame(game, selectedWeek, selectedYear, selectedSeasonType);
				});

				myLog('games set!');
			}
			currentlySetting = false;
			defaultToast({ title: 'Games Set', msg: `Created game documents for ${selectedWeek}!` });
		} catch (error) {
			myError('GameFetcher => setGames', error);
		}
	};
	const setGame = async (
		game: ESPNGamePruned,
		selectedWeek: number,
		selectedYear: number,
		selectedSeasonType: SeasonType
	) => {
		const gameDocRef = doc(firestoreDB, scheduleCollection.path, game.id);

		// Load the game to a new object that will gain Firebase-friendly formatting changes
		const gameFormatted = new Game({ ...game });

		// Start with adding that docRef to the document itself
		gameFormatted.docRef = gameDocRef;

		// Add the numeric year/week, instead of using ESPN's nested reference object
		gameFormatted.week = selectedWeek;
		gameFormatted.year = selectedYear;
		gameFormatted.type = selectedSeasonType.text;

		// Get the spread by querying the game id on the spread API
		const consensus = await getConsensusSpread(game.id);
		gameFormatted.spread = consensus as number;

		// Convert the date to the server format
		const date = new Date(gameFormatted.date);
		const timestamp = Timestamp.fromDate(date);
		gameFormatted.timestamp = timestamp;

		// Get the home and away teams for easier access
		const shortName = gameFormatted.shortName;
		const homeAndAwayTeams = shortName.split('@');
		const trimmedTeams = homeAndAwayTeams.map((team) => team.trim());
		console.log(trimmedTeams);
		const awayTeam = trimmedTeams[0];
		const homeTeam = trimmedTeams[1];

		// Set their records on the game document
		for (const team of $allTeams) {
			myLog('adding team...');
			if (team.abbreviation === homeTeam) {
				myLog('home team:', '', '', team.abbreviation);
				gameFormatted.homeTeam = { ...team };
			}
			if (team.abbreviation === awayTeam) {
				myLog('away team:', '', '', team.abbreviation);
				gameFormatted.awayTeam = { ...team };
			}
		}

		// Set/update the game document with the formatted data
		setDoc(gameDocRef.withConverter(gameConverter), gameFormatted);
	};
	const deleteAllGames = async () => {
		const continueDelete = confirm(
			'Are you sure you want to delete all games from the Schedule collection?'
		);
		if (continueDelete) {
			const q = query(scheduleCollection);
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
	const deleteGameWeek = async (week: number, year: number, seasonType: SeasonType) => {
		const continueDelete = confirm(
			`Are you sure you want to delete all games from week ${week} of the ${seasonType.text}, ${year}`
		);
		if (continueDelete) {
			const q = query(
				scheduleCollection,
				where('year', '==', year),
				where('week', '==', week),
				where('type', '==', seasonType.text)
			);
			const matchingDocs = await getDocs(q);
			matchingDocs.forEach((game) => {
				deleteDoc(game.ref);
			});
			defaultToast({
				title: `${stopSign} Week of Games Deleted!`,
				msg: `${week} (${seasonType.text}, ${year}) games deleted!`,
				duration: 5000
			});
		}
	};
	onMount(async () => {
		weeks = await getRegularSeasonWeeks();
	});
</script>

<section>
	<PageTitle>Fetch ESPN Game Data</PageTitle>
	<Grid>
		<DeletionButton on:click={deleteAllGames}>Delete All Games</DeletionButton>
		<DeletionButton on:click={() => deleteGameWeek(selectedWeek, selectedYear, selectedSeasonType)}
			>Delete Selected Week</DeletionButton
		>
	</Grid>
	<div class="flex">
		<SeasonTypeSelect
			bind:selectedSeasonType
			on:seasonTypeChanged={() => {
				queryChanged();
				changeWeeksAvailable();
			}}
		/>
		<YearSelect bind:selectedYear on:yearChanged={queryChanged} />
		<WeekSelect bind:selectedWeek bind:weeks on:weekChanged={queryChanged} />
		<select bind:value={selectedGames}>
			<option value="pruned">Pruned Games (DB)</option>
			<option value="full">Full Games (ESPN API)</option>
			<option value="both">Both</option>
		</select>
		{#await promise then games}
			<StyledButton
				on:click={() => setGames(selectedWeek, selectedYear, selectedSeasonType)}
				disabled={currentlySetting}>Set Games</StyledButton
			>
		{:catch error}
			<ErrorModal>
				Unable to load games: {error}
			</ErrorModal>
		{/await}
		<div />
	</div>
</section>

<Grid max={'100%'} repeat={selectedGames === 'both' ? 2 : undefined}>
	{#await promise}
		<div class="padded">
			<LoadingSpinner />
		</div>
	{:then gameData}
		{#if gameData}
			{#if selectedGames === 'pruned'}
				<EspnGameData gameData={gameData.prunedGames} />
			{:else if selectedGames === 'full'}
				<EspnGameData gameData={gameData.originalGames} />
			{:else if selectedGames === 'both'}
				<EspnGameData gameData={gameData.prunedGames} title="Pruned Games for DB" />
				<EspnGameData gameData={gameData.originalGames} title="Original ESPN Games" />
			{/if}
		{/if}
	{:catch error}
		<ErrorModal>
			Error displaying game data: {error}
		</ErrorModal>
	{/await}
</Grid>

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
</style>
