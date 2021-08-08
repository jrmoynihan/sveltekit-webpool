<script lang="ts">
import type { Game } from '$scripts/classes/game';
import { gameConverter } from '$scripts/converters';

	import { firestoreDB } from '$scripts/firebaseInit';
	import { scheduleCollection } from '$scripts/schedule';
import allTeams from '$scripts/teams';

	import { doc, setDoc, Timestamp } from '@firebase/firestore';
	import AccordionDetails from '../containers/AccordionDetails.svelte';
	import WeekSelect from '../selects/WeekSelect.svelte';
	import PageTitle from './PageTitle.svelte';

	let message = '';
	let submessage = '';
	let promise: Promise<any[]>;
	let weeks: number[] = [];
	let selectedWeek: number;
	let games = [];

	for (let i = 1; i < 17; i++) {
		weeks.push(i);
	}

	const fetchWeek = async (selectedWeek: number) => {
		try {
			const response = await fetch(
				`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/types/2/weeks/${selectedWeek}/events?lang=en&region=us`
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
				const response = await fetch(url);
				const data = await response.json();
				gameData.push(data);
			}
			return gameData;
		} catch (error) {
			console.error(error);
		}
	};

	const getData = async (selectedWeek: number) => {
		const weekReferences = await fetchWeek(selectedWeek);
		const gameUrls = await unpackReferenceURLs(weekReferences);
		const gameDataObjects = await fetchGameData(gameUrls);
		games = gameDataObjects;
		console.log('fetched games:', games);
		return gameDataObjects;
	};

	function weekChanged(selectedWeek: number) {
		message = '';
		games = [];
		promise = getData(selectedWeek);
	}

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
	const setGame = async (game:Game, i) => {
		message = `setting Week ${selectedWeek}, Game #${i}`;
		const gameDocRef = doc(firestoreDB, scheduleCollection.path, game.id);

		// Load the game to a new object that will gain Firebase-friendly formatting changes
		const gameFormatted = game;

		// Start by adding the numeric week, instead of ESPN's week reference object
		gameFormatted.week = selectedWeek;

		// Get the spread by querying the game id on the spread API
		const consensus = await getConsensusSpread(game.id);
		gameFormatted.spread = consensus;

		// Convert the date to the server format
		const date = new Date(gameFormatted.date);
		const timestamp = Timestamp.fromDate(date);
		gameFormatted.timestamp = timestamp;

		// Get the home and away teams for easier access
		const shortName = gameFormatted.shortName
		const homeAndAwayTeams = shortName.split('@')
		const trimmedTeams = homeAndAwayTeams.map(team => team.trim())
		console.log(trimmedTeams)
		const awayTeam = trimmedTeams[0]
		const homeTeam = trimmedTeams[1]

		// Set their records on the game document
		for(const team of $allTeams){
			if(team.abbreviation === homeTeam){
				gameFormatted.homeTeam = {...team}
			}
			if(team.abbreviation === awayTeam){
				gameFormatted.awayTeam = {...team}
			}
		}

		// Set/update the game document with the formatted data
		setDoc(gameDocRef.withConverter(gameConverter), gameFormatted);
	};
</script>

<div>
	<PageTitle>Fetch Game Data</PageTitle>
	<WeekSelect bind:selectedWeek on:weekChanged={() => weekChanged(selectedWeek)} />
	{#if games.length > 0}
	<span class="padded">
		<button on:click={setGames}>Set Games</button>
		<span class:padded={message}>{message}</span>
		<span class:padded={submessage}>{submessage}</span>
	</span>
	{/if}
	{#await promise}
		<div class="padded">Loading...</div>
	{:then gameData}
		<div>
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
