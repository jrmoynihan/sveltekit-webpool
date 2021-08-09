<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { currentUser } from '$scripts/auth';
	import type { Game } from '$scripts/classes/game';
	import { WeeklyGamePick, WeeklyPickDoc } from '$scripts/classes/picks';
	import { weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, weeklyPickConverter } from '$scripts/converters';
	import { scheduleCollection } from '$scripts/schedule';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { DocumentReference, onSnapshot, query, setDoc, where } from '@firebase/firestore';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let showIDs = false;
	let selectedWeek = 1;
	let weekOfGames: Game[] = [];
	let quickButtons = ['All Favored', 'All Underdogs', 'All Home', 'All Away'];
	let selectedTeams: WeeklyGamePick[] = [];
	let pickDocRef: DocumentReference = null;
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const getGames = async () => {
		try {
			const q = query(scheduleCollection, where('week', '==', selectedWeek));
			const games: Game[] = [];
			// weekOfGames = [];

			const unsubscribe = onSnapshot(q.withConverter(gameConverter), (snapshot) => {
				snapshot.docs.forEach((doc) => {
					games.push(doc.data());
				});
				unsubscribe();
			});
			console.log('got games!', games);
			return games;
		} catch (error) {
			console.log('getGames had an error: ', error);
		}
	};
	const getPicks = async () => {
		try {
			const q = query(
				weeklyPicksCollection,
				where('week', '==', selectedWeek),
				where('uid', '==', $currentUser.uid)
			);
			const picks: WeeklyGamePick[] = [];
			const unsubscribe = onSnapshot(q.withConverter(weeklyPickConverter), (snapshot) => {
				snapshot.docs.forEach((doc) => {
					console.log(doc.data());
					picks.push(...doc.data().picks);
					// const docRef = doc.ref;
					// pickDocRef = docRef;
					// selectedTeams = picks;
				});
				unsubscribe();
			});
			console.log('got picks!', picks);
			return picks;
		} catch (error) {
			console.log('getPicks had an error: ', error);
		}
	};
	const fillNonExistentPicks = async (selectedTeams: WeeklyGamePick[], weekOfGames: Game[]) => {
		try {
			console.log('selectedTeams length: ', selectedTeams.length);
			console.log('weekOfGames length: ', weekOfGames.length);
			for (let i = 0; i < weekOfGames.length; i++) {
				console.log('before: ', selectedTeams[i]);
				if (selectedTeams[i].id === undefined) {
					selectedTeams.push({ pick: '', id: weekOfGames[i].id });
					console.log('after: ', selectedTeams[i]);
				}
			}
			console.log(selectedTeams);
			console.log('filled non-existent picks!');
		} catch (error) {
			console.log('fillNonExistentPicks had an error: ', error);
		}
	};

	const submitPicks = async () => {
		const weeklyPickDoc = new WeeklyPickDoc(
			pickDocRef,
			selectedTeams,
			$currentUser.uid,
			selectedWeek
		);
		setDoc(pickDocRef, weeklyPickDoc);
	};

	const changedWeek = async () => {
		const games = await getGames();
		const picks = await getPicks();
		weekOfGames = games;
		selectedTeams = picks;
		const promise = await fillNonExistentPicks(selectedTeams, weekOfGames);
		return promise;
	};

	$: {
		if (selectedTeams !== undefined && weekOfGames !== undefined) {
			if (selectedTeams.length >= 0 && weekOfGames.length > 0) {
				$progress = selectedTeams.length / weekOfGames.length;
			}
		}
	}

	onMount(() => {
		changedWeek();
		// TODO make a query to get active player's picks for this week
		// selectedTeams = [
		// 	{id: '401326308', pick: 'BUF'},
		// 	{id: '401326309', pick: 'CAR'}
		// ]
	});
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<DevNotes>
	<div style="display:grid">
		Show Game IDs (not visible in production)
		<ToggleSwitch bind:checked={showIDs} />
	</div>
</DevNotes>

<div class="grid positioning">
	{#if $windowWidth > mobileBreakpoint}
		<Clock />
	{/if}
	<div class="first-row grid">
		<WeekSelect bind:selectedWeek on:weekChanged={changedWeek} />
		<button class="submit">Submit Picks</button>
	</div>

	<div class="second-row flex">
		{#each quickButtons as button}
			<button>{button}</button>
		{/each}
	</div>

	{#if weekOfGames}
		<div class="grid weekGames" style={$windowWidth > mobileBreakpoint ? 'max-width:60%;' : ''}>
			{#each weekOfGames as { id, spread, timestamp, homeTeam, awayTeam, competitions }, i}
				<div class="game-container">
					{#if selectedTeams[i]}
						<MatchupContainer
							{id}
							{spread}
							{homeTeam}
							{awayTeam}
							bind:showIDs
							{timestamp}
							{competitions}
							bind:selectedTeam={selectedTeams[i]}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if $windowWidth > mobileBreakpoint}
	<div class="fixed bottom-left padded">
		<p>{selectedTeams.length}/{weekOfGames.length} Picks Made</p>
		{#if selectedTeams.length >= 0 && weekOfGames.length > 0}
			<progress value={$progress} />
		{/if}
	</div>
{:else}
	<div class="fixed bottom-right padded">
		<p>{selectedTeams.length}/{weekOfGames.length} Picks Made</p>
		{#if selectedTeams.length >= 0 && weekOfGames.length > 0}
			<progress value={$progress} />
		{/if}
	</div>
{/if}

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
		position: fixed;
	}
	.bottom-left {
		bottom: 0;
		left: 0;
	}
	.bottom-right {
		bottom: 0;
		right: 0;
	}
	.padded {
		padding: 1rem;
	}
</style>
