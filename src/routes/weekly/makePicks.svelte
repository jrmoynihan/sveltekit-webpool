<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { currentUser } from '$scripts/auth';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import {
		toastsCollection,
		weeklyPicksCollection,
		weeklyTiebreakersCollection
	} from '$scripts/collections';
	import { weeklyPickConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import { largerThanMobile, useDarkTheme } from '$scripts/store';
	import {
		DocumentReference,
		getDocs,
		orderBy,
		query,
		updateDoc,
		where
	} from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { isBeforeGameTime } from '$scripts/functions';
	import {
		airplaneDeparture,
		bread,
		checkmark,
		dogFace,
		home,
		myError,
		myLog,
		okHand,
		pick,
		policeCarLight,
		seasonTypes
	} from '$scripts/classes/constants';
	import { onMount } from 'svelte';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import TiebreakerInput from '$lib/components/inputs/TiebreakerInput.svelte';
	import PickCounter from '$lib/components/containers/micro/PickCounter.svelte';
	import SubmitPicks from '$lib/components/buttons/SubmitPicks.svelte';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import { flip } from 'svelte/animate';
	import { doc, setDoc } from 'firebase/firestore';
	import { fly } from 'svelte/transition';

	let showIDs = false;
	let showTimestamps = false;
	let editingToast = false;
	let selectedWeek = 1;
	let selectedYear = new Date().getFullYear();
	let selectedSeasonType = seasonTypes[1];
	let currentPicks: WeeklyPickDoc[] = [];
	let currentPickCount = 0;
	let upcomingGamesCount = 0;
	let totalGameCount = 16;
	let tiebreakerDocRef: DocumentReference;
	let tiebreaker: number = 0;
	let toastMsg = ``;
	let toastTitle = '';
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	onMount(async () => {
		const promisedToast = await getToast('Make Picks');
		toastMsg = promisedToast.msg;
		toastTitle = promisedToast.title;
		defaultToast(toastTitle, toastMsg, 15_000);
	});
	const getToast = async (page: string) => {
		try {
			let msg: string;
			let title: string;
			const q = query(toastsCollection, where('page', '==', page));
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				msg = doc.data().message;
				title = doc.data().title;
			});
			myLog('got toast', null, bread);
			return { msg: msg, title: title };
		} catch (error) {
			myError('getToast', error, null, bread);
		}
	};

	const getUserId = async () => {
		return localStorage.getItem('id');
	};

	const toastIt = () => defaultToast(toastTitle, toastMsg, 200_000);
	const errorToastIt = () =>
		errorToast(`${policeCarLight} This is a test error. Try to avoid the real thing.`);

	const getPicks = async (selectedWeek: number) => {
		try {
			const uid = await getUserId();
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
			totalGameCount = picks.length;
			upcomingGamesCount = 0;
			picks.forEach(async (pick) => {
				const now = new Date().getTime();
				const ableToPick = await isBeforeGameTime(pick.timestamp, now);
				if (ableToPick) {
					upcomingGamesCount++;
				}
			});
			return picks;
		} catch (error) {
			defaultToast(
				'Error!',
				'Unable to get picks. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
			);
			myError('getPicks', error);
		}
	};
	const getTiebreaker = async (selectedWeek: number) => {
		try {
			let tiebreakerData: WeeklyTiebreaker;
			const uid = await getUserId();
			const q = query(
				weeklyTiebreakersCollection,
				where('year', '==', selectedYear),
				where('week', '==', selectedWeek),
				where('uid', '==', uid)
			);
			const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
			querySnapshot.forEach((doc) => {
				if (doc.exists()) {
					const data = doc.data();
					tiebreakerData = data;
				}
			});
			if (tiebreakerData) {
				tiebreaker = tiebreakerData.tiebreaker;
				tiebreakerDocRef = tiebreakerData.docRef;
				return tiebreakerData;
			} else {
				tiebreaker = null;
				tiebreakerDocRef = null;
			}
		} catch (error) {
			myError('getTiebreaker', error);
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
						'submitPicks->updatePicks',
						error,
						`unable to update game pick ${currentPick.docRef} for user ${currentPick.uid}`
					);
					defaultToast(
						`${policeCarLight} Unable To Update Picks!`,
						`We encountered an error while trying to submit your picks.  Please contact your admin with the following information: <br> ${error}`
					);
				}
			});
			myLog('updated/submitted picks!', '', okHand, currentPicks);
			picksPromise = getPicks(selectedWeek);

			setTiebreakerDoc();

			defaultToast(
				`${checkmark} Picks submitted!`,
				`You can change any game's pick prior to that game's start time.`,
				10000
			);
		} catch (error) {
			myError('submitPicks', error);
		}
	};
	const setTiebreakerDoc = async () => {
		let docRef: DocumentReference;
		if (tiebreakerDocRef) {
			docRef = tiebreakerDocRef;
		} else {
			docRef = doc(weeklyTiebreakersCollection);
		}

		const uid = await getUserId();
		try {
			await setDoc(docRef.withConverter(weeklyTiebreakerConverter), {
				docRef: docRef,
				tiebreaker: tiebreaker,
				uid: uid,
				week: selectedWeek,
				year: selectedYear
			});
			myLog('updated/submitted tiebreaker!', '', okHand, tiebreaker);
		} catch (error) {
			myError(
				'setTiebreakerDoc',
				error,
				`unable to update tiebreaker ${tiebreakerDocRef.path} for user ${uid}`
			);
			defaultToast(
				`${policeCarLight} Unable To Update Tiebreaker!`,
				`We encountered an error while trying to submit your tiebreaker.  Please contact your admin with the following information: <br> ${error}`
			);
		}
	};

	const pickAllHome = async () => {
		try {
			currentPicks.forEach(async (pickDoc) => {
				const now = new Date().getTime();
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp, now);
				if (ableToPick) {
					const homeTeam = pickDoc.game.homeTeam;
					pickDoc.pick = homeTeam.abbreviation;
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
			currentPicks.forEach(async (pickDoc) => {
				const now = new Date().getTime();
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp, now);
				if (ableToPick) {
					const awayTeam = pickDoc.game.awayTeam;
					pickDoc.pick = awayTeam.abbreviation;
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
			const favored = currentPicks.map((pickDoc) => {
				const game = pickDoc.game;
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
			currentPicks.forEach(async (pickDoc, i) => {
				const now = new Date().getTime();
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp, now);
				if (ableToPick) {
					if (favored[i] !== null && favored[i] !== undefined) {
						pickDoc.pick = favored[i].abbreviation;
					} else {
						pickDoc.pick = '';
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
			const underdogs = currentPicks.map((pickDoc) => {
				const game = pickDoc.game;
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
			currentPicks.forEach(async (pickDoc, i) => {
				const now = new Date().getTime();
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp, now);
				if (ableToPick) {
					if (underdogs[i] !== null && underdogs[i] !== undefined) {
						pickDoc.pick = underdogs[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog('picked all underdogs!', '', dogFace);
			currentPicks = currentPicks;
		} catch (error) {
			myError('pickAllFavored', error);
		}
	};

	let picksPromise: Promise<WeeklyPickDoc[]> = getPicks(selectedWeek);
	let tiebreakerPromise: Promise<WeeklyTiebreaker> = getTiebreaker(selectedWeek);

	const changedQuery = async () => {
		picksPromise = getPicks(selectedWeek);
		tiebreakerPromise = getTiebreaker(selectedWeek);
	};

	$: {
		if (currentPicks !== undefined) {
			if (currentPickCount >= 0 && totalGameCount > 0) {
				currentPickCount = currentPicks.filter((pick) => pick.pick !== '').length;
				if (upcomingGamesCount === totalGameCount) {
					$progress = currentPickCount / totalGameCount;
				} else if (upcomingGamesCount > 0) {
					$progress = currentPickCount / upcomingGamesCount;
				}
			}
		}
	}

	let m = { x: 0, y: 0 };
	function handleMouseMove(event) {
		m.x = event.clientX;
		m.y = event.clientY;
	}
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
		<button on:click={toastIt}>Toast It!</button>
		{#if editingToast}
			<textarea style="resize:both;" contenteditable bind:value={toastMsg} />
		{:else}
			<code>{@html toastMsg}</code>
		{/if}
		Upcoming Games Count
		<p>{upcomingGamesCount}</p>
		Total Games/Picks Count
		<p>{totalGameCount}</p>
		Current Pick Count
		<p>{currentPickCount}</p>
		<button on:click={errorToastIt}>Error Toast!</button>
	</div>
</DevNotes>

<div
	class="mouseWatch"
	on:mousemove={(e) => (m = { x: e.clientX, y: e.clientY })}
	style="width:100%; height: 100%; position:fixed;opacity:1;text-align: left;"
>
	x:{m.x},y:{m.y}
</div>
<div class="grid positioning">
	<div class="first-row grid">
		<WeekSelect bind:selectedWeek bind:selectedSeasonType on:weekChanged={changedQuery} />
	</div>

	<!-- prettier-ignore -->
	<div class="second-row flex">
		<button on:click={pickAllAway} class:dark-mode={$useDarkTheme} class="hotkeys">All Away</button>
		<button on:click={pickAllFavored} class:dark-mode={$useDarkTheme} class="hotkeys">All Favored</button>
		<button on:click={pickAllDogs} class:dark-mode={$useDarkTheme} class="hotkeys">All Underdogs</button>
		<button on:click={pickAllHome} class:dark-mode={$useDarkTheme} class="hotkeys">All Home</button>
	</div>

	<div class="grid weekGames" style={$largerThanMobile ? 'max-width:60%;' : ''}>
		{#await picksPromise}
			Loading games and picks...
		{:then picks}
			{#each currentPicks as pick, i (pick.id)}
				<div
					class="game-container"
					animate:flip={{ duration: 200 }}
					in:fly={{ x: -100, duration: 300, delay: 0 }}
					out:fly={{ x: 100, duration: 300 }}
				>
					<MatchupContainer
						bind:totalGameCount
						bind:selectedTeam={pick.pick}
						bind:showIDs
						bind:showTimestamps
						bind:currentPickCount
						id={pick.game.id}
						index={i}
						spread={pick.game.spread}
						homeTeam={pick.game.homeTeam}
						awayTeam={pick.game.awayTeam}
						timestamp={pick.game.timestamp}
						competitions={pick.game.competitions}
					/>
				</div>
			{/each}
		{/await}
	</div>
</div>

<div class="fixed grid {$largerThanMobile ? 'bottom-left' : 'bottom-right'}">
	{#if $largerThanMobile}
		<Clock />
	{/if}
	{#if currentPickCount >= 0 && totalGameCount > 0}
		{#key currentPickCount}
			<PickCounter
				invisible={tiebreaker >= 10 && currentPickCount >= upcomingGamesCount}
				bind:currentPickCount
				bind:totalGameCount
				bind:upcomingGamesCount
			/>
		{/key}
		{#if currentPickCount >= upcomingGamesCount}
			<SubmitPicks
				on:click={submitPicks}
				ableToTab={tiebreaker >= 10 ? 0 : -1}
				pulse={tiebreaker >= 10}
				invisible={tiebreaker < 10 || tiebreaker === undefined}
			/>
			{#if upcomingGamesCount > 0}
				<TiebreakerInput bind:tiebreaker />
			{/if}
		{:else}
			<progress value={$progress} />
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
		// &.submit {
		// 	gap: 0.5rem;
		// 	align-items: center;
		// 	padding: max(2%, 1rem);
		// 	font-weight: bold;
		// 	margin: unset;
		// 	grid-area: pickCount;
		// 	max-height: 5rem;
		// 	align-self: center;
		// }
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

	// .pulse {
	// 	@include pulse($pulseDistance: 20px, $opacity: 80%);
	// 	&:hover,
	// 	&:focus-within {
	// 		animation: none;
	// 	}
	// }
	progress {
		grid-area: tiebreaker;
		min-height: 2.6rem;
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
