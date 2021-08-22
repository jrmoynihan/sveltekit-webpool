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
	import { getDocs, orderBy, query, updateDoc, where } from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import Fa from 'svelte-fa';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
	import { isBeforeGameTime } from '$scripts/functions';
	import { fade, fly } from 'svelte/transition';
	import {
		airplaneDeparture,
		checkmark,
		dogFace,
		football,
		home,
		myError,
		myLog,
		okHand,
		pick,
		policeCarLight,
		seasonTypes
	} from '$scripts/classes/constants';
	import { onMount } from 'svelte';
	import { defaultToast } from '$scripts/toasts';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';

	let showIDs = false;
	let showTimestamps = false;
	let editingToast = false;
	let selectedWeek = 1;
	let selectedYear = new Date().getFullYear();
	let selectedSeasonType = seasonTypes[1];
	let gamesList: Game[] = [];
	let currentPicks: WeeklyPickDoc[] = [];
	let currentPickCount = 0;
	let tiebreaker: number;
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const getUserInfo = async () => {
		return localStorage.getItem('id');
	};

	const getGames = async (selectedWeek: number) => {
		try {
			myLog(`getting ${selectedSeasonType.text} games for Week ${selectedWeek}, ${selectedYear}`);
			const games: Game[] = [];
			const q = query(
				scheduleCollection,
				where('year', '==', selectedYear),
				where('type', '==', selectedSeasonType.text),
				where('week', '==', selectedWeek),
				orderBy('timestamp')
			);
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
			const uid = await getUserInfo();
			const picks: WeeklyPickDoc[] = [];
			const q = query(
				weeklyPicksCollection,
				where('year', '==', selectedYear),
				where('type', '==', selectedSeasonType.text),
				where('week', '==', selectedWeek),
				where('uid', '==', uid),
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
			defaultToast(
				`${checkmark} Picks submitted!`,
				`You can change any game's pick prior to that game's start time.`,
				10000
			);
			// alert(
			// 	`${checkmark} Picks submitted! \n You can change any game's pick prior to that game's start time.`
			// );
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
				defaultToast(
					`${policeCarLight} Spreads not yet available!`,
					`You can use this button when spreads are updated.`,
					10000
				);
				// alert(`Spreads not yet available for all games!`);
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
				defaultToast(
					`${policeCarLight} Spreads not yet available!`,
					`You can use this button when spreads are updated.`,
					10000
				);
				// alert(`Spreads not yet available for all games!`);
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

	let gamesPromise: Promise<Game[]> = getGames(selectedWeek);
	let picksPromise: Promise<WeeklyPickDoc[]> = getPicks(selectedWeek);
	let toastTitle = 'New!';
	let toastMsg = `<br>Looking for the Submit Picks button?<br> <br> Make sure you make <em>all</em> of your picks!  The tiebreaker score and button to submit picks will only appear after you've selected a pick for every game. <br><br>  You can always come back to change them later!`;

	const changedQuery = async () => {
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

	onMount(() => {
		defaultToast(toastTitle, toastMsg, 15_000);
	});
	const toasted = () => defaultToast(toastTitle, toastMsg, 200_000);
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<DevNotes>
	<div style="display:grid; grid-template-columns: repeat(auto-fit,minmax(20rem, 1fr));">
		Show Game IDs
		<ToggleSwitch bind:checked={showIDs} />
		Show Timestamps
		<ToggleSwitch bind:checked={showTimestamps} />
		Edit Toast
		<ToggleSwitch bind:checked={editingToast} />
		{#if $currentUser}
			Current User ID
			<p>{$currentUser.uid}</p>
		{/if}
		Select Season Type
		<SeasonTypeSelect bind:selectedSeasonType on:seasonTypeChanged={changedQuery} />
		Select Year
		<YearSelect bind:selectedYear on:yearChanged={changedQuery} />
		<button on:click={toasted}>Toast It!</button>
		{#if editingToast}
			<textarea style="resize:both;" contenteditable bind:value={toastMsg} />
		{:else}
			<code>{@html toastMsg}</code>
		{/if}
	</div>
</DevNotes>

<div class="grid positioning">
	<div class="first-row grid">
		<WeekSelect bind:selectedWeek bind:selectedSeasonType on:weekChanged={changedQuery} />
	</div>

	<div class="second-row flex">
		<button on:click={pickAllAway} class="{$useDarkTheme ? 'dark-mode' : 'light-mode'} hotkeys"
			>All Away</button
		>
		<button on:click={pickAllFavored} class="{$useDarkTheme ? 'dark-mode' : 'light-mode'} hotkeys"
			>All Favored</button
		>
		<button on:click={pickAllDogs} class="{$useDarkTheme ? 'dark-mode' : 'light-mode'} hotkeys"
			>All Underdogs</button
		>
		<button on:click={pickAllHome} class="{$useDarkTheme ? 'dark-mode' : 'light-mode'} hotkeys"
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
				{#each games as game, i}
					{#each currentPicks as pick}
						{#if pick.id === game.id}
							<div class="game-container">
								<MatchupContainer
									bind:showIDs
									bind:showTimestamps
									id={game.id}
									index={i}
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

<div class="fixed grid {$windowWidth > mobileBreakpoint ? 'bottom-left' : 'bottom-right'}">
	{#if $windowWidth > mobileBreakpoint}
		<Clock />
	{/if}
	{#if currentPicks !== undefined && gamesList !== undefined}
		{#if currentPicks.length >= 0 && gamesList.length > 0}
			{#key currentPickCount}
				<div
					class="pick-count {tiebreaker >= 10 ? 'invisible' : ''}"
					in:fly={{ delay: 250, duration: 200, x: 150 }}
					out:fly={{ duration: 200, x: -150 }}
					style={tiebreaker >= 10 ? 'transform: translateX(-100%); opacity:0' : ''}
				>
					{currentPickCount} / {gamesList.length} Picks Made
				</div>
			{/key}
			{#if currentPickCount === gamesList.length}
				<button
					on:click={submitPicks}
					class="submit flex {$useDarkTheme ? 'dark-mode' : 'light-mode'}"
					class:invisible={tiebreaker < 10}
					class:pulse={tiebreaker >= 10}
					tabindex={tiebreaker >= 10 ? 0 : -1}
					in:fly={{ delay: 250, duration: 200, x: 100 }}
					out:fly={{ x: 100, duration: 200 }}
				>
					Submit Picks <Fa icon={faCheckCircle} size="lg" />
				</button>
				<span style="position:relative" class="tiebreaker-container" class:pulse={tiebreaker < 10}>
					<input
						class="tiebreaker flex"
						type="number"
						bind:value={tiebreaker}
						placeholder="tiebreaker"
						min="0"
						in:fade={{ delay: 250, duration: 200 }}
					/>
					<span class="invalid" />
				</span>
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
		padding-bottom: 3rem;
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
		@include defaultTransition;
		@include accentedContainer(80%);
		color: white;
		text-shadow: none;
		&.submit {
			gap: 0.5rem;
			align-items: center;
			padding: max(2%, 1rem);
			font-weight: bold;
			margin: unset;
			grid-area: pickCount;
			max-height: 5rem;
			align-self: center;
		}
	}
	.fixed {
		background-color: var(--alternate-color);
		position: fixed;
		z-index: 20;
		font-weight: bold;
	}
	.bottom-left {
		bottom: 0;
		left: 0;
		border-radius: 0 1rem 1rem 0;
		grid-template-rows: repeat(3, auto);
		max-width: max-content;
		grid-template-areas: 'clock ' 'pickCount' 'tiebreaker';
		justify-items: center;
		padding: 1rem 0.5rem;
	}
	.bottom-right {
		bottom: 0;
		right: 0;
		gap: 1rem;
		border-top: var(--accent-color) 2px inset;
		width: 100%;
		grid-template-areas: 'pickCount tiebreaker';
		grid-template-columns: 1fr 1fr;
		padding: 0.5rem;
	}
	.tiebreaker {
		grid-area: tiebreaker;
		background-color: white;
	}
	.tiebreaker-container {
		@include rounded;
		box-shadow: 0 0 4px 2px var(--accent-color);
	}
	.pulse {
		@include pulse($pulseDistance: 20px, $opacity: 80%);
		&:hover,
		&:focus-within {
			animation: none;
		}
	}
	input {
		@include rounded;
		@include editableInput;
		padding: 2%;
		text-align: center;
		align-self: center;
		width: unset;
		&:invalid {
			box-shadow: 0 0 20px -2px red;
			color: red;
			& ~ span.invalid::after {
				@include rounded;
				@include defaultTransition;
				content: 'Please enter a number.';
				color: red;
				background-color: white;
				top: -100%;
				opacity: 1;
			}
		}
		& ~ span.invalid::after {
			opacity: 0;
			width: 100%;
			height: 100%;
			top: 0%;
			left: 0;
			right: 0;
			position: absolute;
		}
	}
	.pick-count {
		@include defaultTransition;
		grid-area: pickCount;
		align-self: center;
	}
	progress {
		grid-area: tiebreaker;
		min-height: 2.6rem;
	}
	.invisible {
		opacity: 0;
		pointer-events: none;
		transform: translateX(50%);
		transition: all 300ms ease-in-out;
	}
	.hotkeys {
		box-shadow: 4px 4px 15px 5px rgba(0, 0, 0, 0.5);
		border: 4px solid rgba(var(--accentValue-color), 80%);
		background: radial-gradient(
			rgba(var(--accentValue-color), 90%),
			rgba(var(--accentValue-color), 70%)
		);
		&.dark-mode {
			border: 4px solid rgba(var(--accentValue-color), 40%);
			background: radial-gradient(
				rgba(var(--accentValue-color), 10%),
				rgba(var(--accentValue-color), 50%)
			);
		}
	}
</style>
