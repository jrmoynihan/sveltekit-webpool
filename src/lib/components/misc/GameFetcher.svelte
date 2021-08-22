<script lang="ts">
	import type { Game } from '$scripts/classes/game';
	import { gameConverter } from '$scripts/converters';
	import { firestoreDB } from '$scripts/firebaseInit';
	import { scheduleCollection } from '$scripts/collections';
	import allTeams from '$scripts/teams';
	import { deleteDoc, doc, getDocs, query, setDoc, Timestamp } from '@firebase/firestore';
	import AccordionDetails from '../containers/AccordionDetails.svelte';
	import WeekSelect from '../selects/WeekSelect.svelte';
	import PageTitle from './PageTitle.svelte';
	import { myLog, seasonTypes, stopSign } from '$scripts/classes/constants';
	import SeasonTypeSelect from '../selects/SeasonTypeSelect.svelte';
	import type { SeasonType } from '$scripts/classes/seasonType';
	import YearSelect from '../selects/YearSelect.svelte';
	import { onMount } from 'svelte';
	import { defaultToast } from '$scripts/toasts';
	import { setPreSeasonWeeks, setRegularSeasonWeeks } from '$scripts/functions';

	let message = '';
	let submessage = '';
	let promise: Promise<any[]>;
	let weeks: number[] = [];
	let selectedYear: number = 2021;
	let selectedSeasonType: SeasonType = seasonTypes[1];
	let selectedWeek: number;
	let games = [];

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
			const gameData = [];

			for await (const url of referenceURLs) {
				const httpUrl = url;
				const httpsUrl = httpUrl.replace('http', 'https');
				const response = await fetch(httpsUrl);
				const data = await response.json();
				gameData.push(data);
			}
			return gameData;
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async (
		selectedYear: number,
		selectedSeasonType: SeasonType,
		selectedWeek: number
	) => {
		const weekReferences = await fetchWeek(selectedYear, selectedSeasonType, selectedWeek);
		const gameUrls = await unpackReferenceURLs(weekReferences);
		const gameDataObjects = await fetchGameData(gameUrls);
		games = gameDataObjects;
		console.log('fetched games:', games);
		return gameDataObjects;
	};

	// selectedYear:number,selectedSeasonType:number,selectedWeek: number
	const queryChanged = () => {
		message = '';
		games = [];
		promise = getData(selectedYear, selectedSeasonType, selectedWeek);
	};
	const changeWeeksAvailable = () => {
		if (selectedSeasonType.text === 'Regular Season') {
			weeks = setRegularSeasonWeeks();
		} else if (selectedSeasonType.text === 'Pre-Season') {
			weeks = setPreSeasonWeeks();
		}
	};

	const getConsensusSpread = async (gameID: string) => {
		try {
			submessage = 'getting spread';
			const response = await fetch(
				`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${gameID}/competitions/${gameID}/odds`
			);
			const data = await response.json();
			const spreads = data.items;
			let consensus;
			submessage = 'finding consensus spread';
			for (const spread of spreads) {
				if (spread.provider.name === 'consensus') {
					consensus = spread.spread;
				}
			}
			submessage = '';
			if (consensus === undefined) {
				consensus = '--';
			}
			return consensus;
		} catch (error) {
			console.error(error);
		}
	};

	const setGames = async () => {
		if (games && selectedWeek) {
			console.log('setting games...');
			games.forEach((game, i) => {
				setGame(game, i);
			});
			console.log('all done!');
		}
		message = 'Games Set!';
	};
	const setGame = async (game: Game, i) => {
		message = `setting Week ${selectedWeek}, Game #${i}`;
		const gameDocRef = doc(firestoreDB, scheduleCollection.path, game.id);

		// Load the game to a new object that will gain Firebase-friendly formatting changes
		const gameFormatted = game;

		// Start by adding the numeric year/week, instead of using ESPN's nested reference object
		gameFormatted.week = selectedWeek;
		gameFormatted.year = selectedYear;
		gameFormatted.type = selectedSeasonType.text;

		// Get the spread by querying the game id on the spread API
		const consensus = await getConsensusSpread(game.id);
		gameFormatted.spread = consensus;

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
			defaultToast(
				`${stopSign} All games deleted!`,
				`Please remember to re-create the game documents.`,
				5000
			);
		}
	};
	onMount(() => {
		weeks = setRegularSeasonWeeks();
	});
</script>

<div>
	<PageTitle>Fetch ESPN Game Data</PageTitle>
	<SeasonTypeSelect
		bind:selectedSeasonType
		on:seasonTypeChanged={() => {
			queryChanged();
			changeWeeksAvailable();
		}}
	/>
	<YearSelect bind:selectedYear on:yearChanged={queryChanged} />
	<WeekSelect bind:selectedWeek bind:weeks on:weekChanged={queryChanged} />
	<button on:click={deleteAllGames}>Delete All Games</button>
	{#if games}
		{#if games.length > 0}
			<span class="padded">
				<button on:click={setGames}>Set Games</button>
				<span class:padded={message}>{message}</span>
				<span class:padded={submessage}>{submessage}</span>
			</span>
		{/if}
	{/if}
	{#await promise}
		<div class="padded">Loading...</div>
	{:then gameData}
		<div class="padded">
			{#if gameData}
				{#each gameData as { name, date }, i}
					<AccordionDetails
						showArrow={false}
						expandTitle={`Game ${i + 1} -- ${date.substring(0, 10)}`}
					>
						<p slot="summary">{name}</p>
					</AccordionDetails>
				{/each}
			{/if}
		</div>
	{:catch}
		An error occurred
	{/await}
</div>

<style lang="scss">
	button {
		@include defaultButtonStyles;
	}
	.padded {
		padding: 1rem;
	}
</style>
