<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { currentUser } from '$scripts/auth';
	import type { Game } from '$scripts/classes/game';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, weeklyPickConverter } from '$scripts/converters';
	import { scheduleCollection } from '$scripts/collections';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import {
		doc,
		DocumentReference,
		getDocs,
		onSnapshot,
		orderBy,
		query,
		setDoc,
		updateDoc,
		where
	} from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Fa from 'svelte-fa';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

	let showIDs = false;
	let selectedWeek = 1;
	let gamesList: Game[] = [];
	let currentPicks: WeeklyPickDoc[] = [];
	let currentPickCount = 0;
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const getGames = async (selectedWeek: number) => {
		try {
			const games: Game[] = [];
			const q = query(scheduleCollection, where('week', '==', selectedWeek));
			const querySnapshot = await getDocs(q.withConverter(gameConverter));
			querySnapshot.forEach((doc) => {
				games.push(doc.data());
			});

			console.log('got games!', games);
			gamesList = games;
			return games;
		} catch (error) {
			console.log('getGames had an error: ', error);
		}
	};

	const getPicks = async (selectedWeek: number) => {
		try {
			const picks: WeeklyPickDoc[] = [];
			const q = query(
				weeklyPicksCollection,
				where('week', '==', selectedWeek),
				where('uid', '==', $currentUser.uid),
				orderBy('id', 'asc')
			);
			const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
			querySnapshot.forEach((doc) => {
				picks.push(doc.data());
			});

			console.log('got picks!', picks);
			currentPicks = picks;
			return picks;
		} catch (error) {
			console.log('getPicks had an error: ', error);
		}
	};

	const submitPicks = async () => {
		try {
			currentPicks.forEach(async (pick) => {
				const docRef = pick.docRef;
				await updateDoc(docRef.withConverter(weeklyPickConverter), pick);
			});
			console.log('submitted picks!', currentPicks);
		} catch (error) {
			console.error('submitPicks had an error:', error);
		}
	};

	const pickAllHome = async () => {
		try {
			const homeTeams = gamesList.map((game) => {
				return game.homeTeam;
			});
			currentPicks.forEach((pick, i) => {
				pick.pick = homeTeams[i].abbreviation;
			});
			currentPicks = currentPicks;
		} catch (error) {
			console.error('pickAllHome had an error:', error);
		}
	};
	const pickAllAway = async () => {
		try {
			const awayTeams = gamesList.map((game) => {
				return game.awayTeam;
			});
			currentPicks.forEach((pick, i) => {
				pick.pick = awayTeams[i].abbreviation;
			});
			currentPicks = currentPicks;
		} catch (error) {
			console.error('pickAllAway had an error:', error);
		}
	};
	const pickAllFavored = async () => {
		try {
			const favored = gamesList.map((game) => {
				if (game.spread < 0) {
					return game.homeTeam;
				} else if (game.spread > 0) {
					return game.awayTeam;
				} else {
					return null;
				}
			});

			currentPicks.forEach((pick, i) => {
				if (favored[i] !== null) {
					pick.pick = favored[i].abbreviation;
				} else {
					pick.pick = '';
				}
			});
			currentPicks = currentPicks;
		} catch (error) {
			console.error('pickAllFavored had an error:', error);
		}
	};
	const pickAllDogs = async () => {
		try {
			const underdogs = gamesList.map((game) => {
				if (game.spread < 0) {
					return game.awayTeam;
				} else if (game.spread > 0) {
					return game.homeTeam;
				} else {
					return null;
				}
			});

			currentPicks.forEach((pick, i) => {
				if (underdogs[i] !== null) {
					pick.pick = underdogs[i].abbreviation;
				} else {
					pick.pick = '';
				}
			});
			currentPicks = currentPicks;
		} catch (error) {
			console.error('pickAllFavored had an error:', error);
		}
	};

	const changedWeek = async () => {
		gamesPromise = getGames(selectedWeek);
		picksPromise = getPicks(selectedWeek);
	};

	let gamesPromise = getGames(selectedWeek);
	let picksPromise = getPicks(selectedWeek);

	$: {
		if (currentPicks !== undefined && gamesList !== undefined) {
			if (currentPicks.length > 0 && gamesList.length > 0) {
				currentPickCount = currentPicks.filter((pick) => pick.pick !== '').length;
				$progress = currentPickCount / gamesList.length;
			}
		}
	}
	$: console.log('currentPicks:', currentPicks);
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<DevNotes>
	<div style="display:grid">
		Show Game IDs (not visible in production)
		<ToggleSwitch bind:checked={showIDs} />
		{$currentUser.uid}
	</div>
</DevNotes>

<div class="grid positioning">
	{#if $windowWidth > mobileBreakpoint}
		<Clock />
	{/if}
	<div class="first-row grid">
		<WeekSelect bind:selectedWeek on:weekChanged={changedWeek} />
		<button class="submit" on:click={submitPicks}>Submit Picks</button>
	</div>

	<div class="second-row flex">
		<button on:click={pickAllFavored}>All Favored</button>
		<button on:click={pickAllDogs}>All Underdogs</button>
		<button on:click={pickAllAway}>All Away</button>
		<button on:click={pickAllHome}>All Home</button>
	</div>

	<div class="grid weekGames" style={$windowWidth > mobileBreakpoint ? 'max-width:60%;' : ''}>
		{#await gamesPromise}
			Loading games...
		{:then games}
			{#await picksPromise}
				Loading picks...
			{:then picks}
				{#each games as game}
					{#each currentPicks as pick}
						{#if pick.id === game.id}
							<div class="game-container">
								<MatchupContainer
									bind:showIDs
									id={game.id}
									spread={game.spread}
									homeTeam={game.homeTeam}
									awayTeam={game.awayTeam}
									timestamp={game.timestamp}
									competitions={game.competitions}
									bind:selectedTeam={pick.pick}
								/>
							</div>
						{/if}
					{/each}
				{/each}
			{/await}
		{/await}
	</div>
</div>

<div class="fixed padded {$windowWidth > mobileBreakpoint ? 'bottom-left' : 'bottom-right'}">
	{#if currentPicks !== undefined && gamesList !== undefined}
		{#if currentPicks.length >= 0 && gamesList.length > 0}
			<div class="icon-padded">
				{currentPickCount} / {gamesList.length} Picks Made
			</div>
			{#if currentPickCount === gamesList.length}
				<Fa icon={faCheckCircle} size="lg" />
			{:else}
				<progress value={$progress} />
			{/if}
		{/if}
	{/if}
</div>

<style lang="scss">
	.grid {
		@include gridAndGap;
		justify-items: center;
	}
	.positioning {
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
	}
	.game-container {
		@include defaultContainerStyles;
		cursor: initial;
		width: 100%;
	}
	.weekGames {
		justify-content: center;
		padding: 1rem;
		grid-template-columns: repeat(
			auto-fit,
			minmax(min(100%, 30em), 1fr)
		); // min function prevents grid blowout
	}
	.first-row,
	.second-row {
		// grid-template-columns: repeat(auto-fit,1fr);
		display: flex;
		gap: 0.5em;
		justify-content: space-evenly;
		width: 100%;
		max-width: min(100%, 35em);
	}
	button {
		@include defaultButtonStyles;
		&.submit {
			font-weight: bold;
			margin: unset;
		}
	}
	.fixed {
		background-color: var(--alternate-color);
		// @include frostedGlass;
		position: fixed;
		z-index: 20;
		font-weight: bold;
	}
	.padded {
		padding: 1rem;
	}
	.bottom-left {
		bottom: 0;
		left: 0;
		border-radius: 0 1rem 1rem 0;
	}
	.bottom-right {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px;
		align-items: center;
		justify-items: center;
		bottom: 0;
		right: 0;
		// border-radius: 1rem 0 0 1rem;
		border-top: var(--accent-color) 2px inset;
		border-left: var(--accent-color) 2px inset;
		width: 100%;
		padding-left: 14%;
	}
	// .icon-padded {
	// 	padding-left: 10%;
	// }
</style>
