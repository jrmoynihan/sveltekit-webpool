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
	import { useDarkTheme, windowWidth } from '$scripts/store';
	import { getDocs, orderBy, query, updateDoc, where, writeBatch } from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Fa from 'svelte-fa';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import { isBeforeGameTime } from '$scripts/functions';
	import { fade, fly } from 'svelte/transition';
	import {
		airplaneDeparture,
		checkmark,
		defaultConsoleLogStyle,
		dog,
		dogFace,
		football,
		home,
		myError,
		myLog,
		okHand,
		pick,
		policeCarLight
	} from '$scripts/classes/constants';

	let showIDs = false;
	let showTimestamps = false;
	let selectedWeek = 1;
	let gamesList: Game[] = [];
	let currentPicks: WeeklyPickDoc[] = [];
	let currentPickCount = 0;
	let tiebreaker: number;
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const getGames = async (selectedWeek: number) => {
		try {
			const games: Game[] = [];
			const q = query(scheduleCollection, where('week', '==', selectedWeek), orderBy('timestamp'));
			const querySnapshot = await getDocs(q.withConverter(gameConverter));
			querySnapshot.forEach((doc) => {
				games.push(doc.data());
			});
			myLog('got games!', '', football, games);
			gamesList = games;
			return games;
		} catch (error) {
			myError('getGames', error);
		}
	};

	const getPicks = async (selectedWeek: number) => {
		try {
			const picks: WeeklyPickDoc[] = [];
			const q = query(
				weeklyPicksCollection,
				where('week', '==', selectedWeek),
				where('uid', '==', $currentUser.uid),
				orderBy('timestamp')
			);
			const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
			querySnapshot.forEach((doc) => {
				picks.push(doc.data());
			});

			myLog('got picks!', '', pick, picks);
			currentPicks = picks;
			return picks;
		} catch (error) {
			myError('getPicks', error);
		}
	};

	const submitPicks = async () => {
		try {
			currentPicks.forEach(async (currentPick) => {
				const docRef = currentPick.docRef;
				const pick = currentPick.pick;
				// console.log('docRef:', docRef);
				// console.log('pick:', pick);
				try {
					await updateDoc(docRef.withConverter(weeklyPickConverter), { pick: pick });
				} catch (error) {
					myError(
						'submitPicks->updateDoc',
						error,
						`unable to update game pick ${currentPick.docRef} for user ${currentPick.uid}`
					);
				}
			});
			myLog('submitted picks!', '', okHand, currentPicks);
			picksPromise = getPicks(selectedWeek);
			alert(
				`${checkmark} Picks submitted! \n You can return to change any game's pick up until gametime.`
			);
		} catch (error) {
			myError('submitPicks', error);
		}
	};

	const pickAllHome = async () => {
		try {
			currentPicks.forEach(async (pick) => {
				const ableToPick = await isBeforeGameTime(pick.timestamp);
				if (ableToPick) {
					const homeTeam = gamesList.find((game) => game.id === pick.id).homeTeam;
					pick.pick = homeTeam.abbreviation;
				}
			});
			myLog('picked all home teams!', '', home);
			currentPicks = currentPicks;
		} catch (error) {
			myError('pickAllHome', error);
		}
	};
	const pickAllAway = async () => {
		try {
			currentPicks.forEach(async (pick) => {
				const ableToPick = await isBeforeGameTime(pick.timestamp);
				if (ableToPick) {
					const awayTeam = gamesList.find((game) => game.id === pick.id).awayTeam;
					pick.pick = awayTeam.abbreviation;
				}
			});
			myLog('picks all away teams!', '', airplaneDeparture);
			currentPicks = currentPicks;
		} catch (error) {
			myError('pickAllAway', error);
		}
	};
	const pickAllFavored = async () => {
		try {
			let spreadsMissing = false;
			const favored = gamesList.map((game) => {
				if (game.spread < 0) {
					return game.homeTeam;
				} else if (game.spread > 0) {
					return game.awayTeam;
				} else if (game.spread === 0) {
					return null;
				} else {
					spreadsMissing = true;
				}
			});
			if (spreadsMissing) {
				alert(`Spreads not yet available for all games!`);
				return;
			}
			gamesList.forEach(async (game, i) => {
				const pickToChange = currentPicks.find((pick) => pick.id === game.id);
				const ableToPick = await isBeforeGameTime(pickToChange.timestamp);
				if (ableToPick) {
					if (favored[i] !== null && favored[i] !== undefined) {
						pickToChange.pick = favored[i].abbreviation;
					} else {
						pickToChange.pick = '';
					}
				}
			});
			myLog('picked favored teams!', '', okHand);
			currentPicks = currentPicks;
		} catch (error) {
			myError('pickAllFavored', error);
		}
	};
	const pickAllDogs = async () => {
		try {
			let spreadsMissing = false;
			const underdogs = gamesList.map((game) => {
				if (game.spread < 0) {
					return game.awayTeam;
				} else if (game.spread > 0) {
					return game.homeTeam;
				} else if (game.spread === 0) {
					return null;
				} else {
					spreadsMissing = true;
				}
			});
			if (spreadsMissing) {
				alert(`Spreads not yet available for all games!`);
				return;
			}
			gamesList.forEach(async (game, i) => {
				const pickToChange = currentPicks.find((pick) => pick.id === game.id);
				const ableToPick = await isBeforeGameTime(pickToChange.timestamp);
				if (ableToPick) {
					if (underdogs[i] !== null && underdogs[i] !== undefined) {
						pickToChange.pick = underdogs[i].abbreviation;
					} else {
						pickToChange.pick = '';
					}
				}
			});
			myLog('picked all underdogs!', '', dogFace);
			currentPicks = currentPicks;
		} catch (error) {
			myError('pickAllFavored', error);
		}
	};

	let gamesPromise = getGames(selectedWeek);
	let picksPromise = getPicks(selectedWeek);

	const changedWeek = async () => {
		gamesPromise = getGames(selectedWeek);
		picksPromise = getPicks(selectedWeek);
	};

	$: {
		if (currentPicks !== undefined && gamesList !== undefined) {
			if (currentPicks.length > 0 && gamesList.length > 0) {
				currentPickCount = currentPicks.filter((pick) => pick.pick !== '').length;
				$progress = currentPickCount / gamesList.length;
			}
		}
	}
	$: console.log(currentPicks);
	let time = new Date();
	$: now = time.getTime();
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<DevNotes>
	<div style="display:grid">
		Show Game IDs
		<ToggleSwitch bind:checked={showIDs} />
		Show Timestamps
		<ToggleSwitch bind:checked={showTimestamps} />
		<p>{$currentUser.uid}</p>
		<p>{now}</p>
	</div>
</DevNotes>

<div class="grid positioning">
	<div class="first-row grid">
		<WeekSelect bind:selectedWeek on:weekChanged={changedWeek} />
	</div>

	<div class="second-row flex">
		<button on:click={pickAllFavored} class={$useDarkTheme ? 'dark-mode' : 'light-mode'}
			>All Favored</button
		>
		<button on:click={pickAllDogs} class={$useDarkTheme ? 'dark-mode' : 'light-mode'}
			>All Underdogs</button
		>
		<button on:click={pickAllAway} class={$useDarkTheme ? 'dark-mode' : 'light-mode'}
			>All Away</button
		>
		<button on:click={pickAllHome} class={$useDarkTheme ? 'dark-mode' : 'light-mode'}
			>All Home</button
		>
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
									bind:showTimestamps
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

<div
	class="fixed padded {$windowWidth > mobileBreakpoint ? 'bottom-left grid' : 'bottom-right flex'}"
	style="{$windowWidth > mobileBreakpoint || tiebreaker === undefined || tiebreaker === null
		? 'grid-template-columns: 1fr 1fr;'
		: 'grid-template-columns: 0 1fr;'} {tiebreaker === undefined || tiebreaker === null
		? 'padding-left: 0;'
		: 'padding-left:14%'}"
>
	{#if $windowWidth > mobileBreakpoint}
		<Clock />
	{/if}
	{#if currentPicks !== undefined && gamesList !== undefined}
		{#if currentPicks.length >= 0 && gamesList.length > 0}
			<div
				class="pick-count"
				in:fade={{ delay: 250, duration: 200 }}
				out:fly={{ duration: 200 }}
				style={$windowWidth > mobileBreakpoint || tiebreaker === undefined || tiebreaker === null
					? ''
					: 'transform: translateX(-100%); opacity:0'}
			>
				{currentPickCount} / {gamesList.length} Picks Made
			</div>
			{#if currentPickCount === gamesList.length}
				<input
					class="tiebreaker flex"
					type="number"
					bind:value={tiebreaker}
					placeholder="tiebreaker"
					in:fade={{ delay: 250, duration: 200 }}
				/>
				{#if tiebreaker > 0}
					<button
						on:click={submitPicks}
						class="submit flex {$useDarkTheme ? 'dark-mode' : 'light-mode'}"
						in:fly={{ delay: 250, duration: 200, x: 100 }}
						out:fly={{ x: 100, duration: 200 }}
					>
						Submit Picks <Fa icon={faCheckCircle} size="lg" />
					</button>
				{/if}
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
		align-items: center;
		justify-items: center;
	}
	.flex {
		display: flex;
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
		gap: 0.5em;
		justify-content: space-evenly;
		width: 100%;
		max-width: min(100%, 35em);
	}
	button {
		@include defaultButtonStyles;
		@include accentedContainer(80%);
		color: white;
		text-shadow: none;
		&.submit {
			gap: 0.5rem;
			align-items: center;
			max-height: 90%;
			font-weight: bold;
			margin: unset;
			grid-area: submit;
		}
	}
	.fixed {
		background-color: var(--alternate-color);
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
		grid-template-rows: 1fr 1fr 1fr;
		max-width: max-content;
		grid-template-areas: 'clock clock' 'pickCount pickCount' 'tiebreaker submit';
		justify-items: center;
	}
	.bottom-right {
		bottom: 0;
		right: 0;
		border-top: var(--accent-color) 2px inset;
		width: 100%;
		grid-template-rows: minmax(23px, 1.4rem);
	}
	.tiebreaker {
		grid-area: tiebreaker;
		height: 3.5rem;
	}
	input {
		@include rounded;
		@include editableInput;
		text-align: center;
		padding: 1rem;
		width: 100%;
		max-height: 90%;
	}
	.pick-count {
		@include defaultTransition;
		grid-area: pickCount;
	}
</style>
