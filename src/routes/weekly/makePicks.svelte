<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { currentUser, userData } from '$scripts/auth/auth';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import {
		scheduleCollection,
		weeklyPicksCollection,
		weeklyTiebreakersCollection
	} from '$scripts/collections';
	import {
		gameConverter,
		weeklyPickConverter,
		weeklyTiebreakerConverter
	} from '$scripts/converters';
	import {
		largerThanMobile,
		overrideDisabled,
		showATSwinner,
		showIDs,
		showSpreads,
		showTimestamps,
		useDarkTheme
	} from '$scripts/store';
	import { DocumentReference, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { getUserId, isBeforeGameTime } from '$scripts/functions';
	import {
		airplaneDeparture,
		bomb,
		checkmark,
		dogFace,
		home,
		HomeOrAway,
		myError,
		myLog,
		okHand,
		pick,
		policeCarLight,
		seasonTypes
	} from '$scripts/classes/constants';
	import { onMount } from 'svelte';
	import { defaultToast, errorToast, getToast } from '$scripts/toasts';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import TiebreakerInput from '$lib/components/inputs/TiebreakerInput.svelte';
	import PickCounter from '$lib/components/containers/micro/PickCounter.svelte';
	import SubmitPicks from '$lib/components/buttons/SubmitPicks.svelte';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import { fly } from 'svelte/transition';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import type { Game } from '$scripts/classes/game';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import UserSelect from '$lib/components/selects/UserSelect.svelte';
	import type { WebUser } from '$scripts/classes/webUser';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import Fa from 'svelte-fa';
	import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import AdminControlsModal from '$lib/components/modals/AdminControlsModal.svelte';
	import { focusTiebreaker } from '$scripts/scrollAndFocus';
	import type { SeasonType } from '$scripts/classes/seasonType';

	let picksPromise: Promise<WeeklyPickDoc[]>;
	let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	let gamesPromise: Promise<Game[]>;
	let userPromise: Promise<WebUser[]>;
	// let editingToast = false;
	let showSubmitPicks = false;
	let selectedUser: WebUser;
	let selectedWeek = 3;
	let selectedYear = new Date().getFullYear();
	let selectedSeasonType = seasonTypes[1];
	let currentPicks: WeeklyPickDoc[] = [];
	let selectedGames: Game[] = [];
	let currentPickCount = 0;
	let upcomingGamesCount = 0;
	let playedGamesCount = 0;
	let isCorrectCount = 0;
	let totalGameCount = 16;
	let tiebreakerDocRef: DocumentReference;
	let tiebreaker = 0;
	// let toastMsg = ``;
	// let toastTitle = '';
	let gridColumns = 1;
	let widthMeasure = 85;
	let offsetRightPercentage = 15;
	let toastSeenKey = 'toast_makeWeeklyPicks_NewTiebreakerAndSubmit';
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$: gridColumns = $largerThanMobile ? 2 : 1;

	onMount(async () => {
		getData();
		const toastSeen = await getLocalStorageItem(toastSeenKey);
		if (toastSeen !== 'true') {
			const promisedToast = await getToast('Make Picks');
			defaultToast({
				title: promisedToast.title,
				msg: promisedToast.msg,
				duration: 15_000,
				useSeenToastComponent: true,
				localStorageKey: toastSeenKey
			});
		}
	});
	const getData = async () => {
		selectedWeek = await findCurrentWeekOfSchedule();
		if ($userData.admin) {
			userPromise = getWeeklyUsers(false);
			selectedUser = await userPromise.then((users) => users[0]);
		}

		await changedQuery(selectedYear, selectedSeasonType, selectedWeek, $currentUser.uid);
	};

	const getPicks = async (selectedWeek: number, uid: string) => {
		try {
			const picks: WeeklyPickDoc[] = [];
			myLog(
				`querying picks for week ${selectedWeek}, ${selectedYear}, ${selectedSeasonType.text}, ${uid}`
			);
			const q = query(
				weeklyPicksCollection,
				where('year', '==', selectedYear),
				where('type', '==', selectedSeasonType.text),
				where('week', '==', selectedWeek),
				where('uid', '==', uid),
				orderBy('timestamp'),
				orderBy('gameId')
			);
			const querySnapshot = await getDocs(q.withConverter(weeklyPickConverter));
			querySnapshot.forEach((doc) => {
				picks.push(doc.data());
			});
			myLog('got picks!', '', pick, picks);
			return picks;
		} catch (error) {
			errorToast(
				'Unable to get picks. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
			);
			myError('getPicks', error);
		}
	};

	const getGames = async (
		selectedYear: number,
		selectedSeasonType: SeasonType,
		selectedWeek: number
	) => {
		try {
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

			myLog('got games!', '', checkmark);
			selectedGames = games;
			const countedGameTimes = await countPlayedOrUpcomingGames(games);
			upcomingGamesCount = countedGameTimes.upcomingGamesCount;
			playedGamesCount = countedGameTimes.playedGamesCount;
			return games;
		} catch (error) {
			errorToast(
				'Unable to get games. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
			);
			myError('getGames', error);
		}
	};
	const countPlayedOrUpcomingGames = async (games: Game[]) => {
		try {
			// Reset the internal counters
			let upcomingGamesCount = 0;
			let playedGamesCount = 0;

			// Check each game to see if it has already started
			for await (const game of games) {
				const ableToPick = await isBeforeGameTime(game.timestamp);
				if (ableToPick) {
					// Increment upcoming games if the game is before its gametime
					upcomingGamesCount++;
				} else {
					// Increment [already] played games if the game is after its gametime
					playedGamesCount++;
				}
			}
			upcomingGamesCount > 0 ? myLog(`${upcomingGamesCount} upcoming games`) : null;
			playedGamesCount > 0 ? myLog(`${upcomingGamesCount} already played games`) : null;
			return { upcomingGamesCount, playedGamesCount };
		} catch (error) {
			errorToast('Unable to check game times.');
			myError('checkGameTimes', error);
		}
	};

	export const getTiebreaker = async (selectedWeek: number, uid: string) => {
		try {
			let tiebreakerData: WeeklyTiebreaker;
			if (!uid) {
				uid = await getUserId();
			}
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
			errorToast('Error encountered while getting tiebreaker. See console log.');
			myError('getTiebreaker', error);
		}
	};

	const submitPicks = async (uid: string) => {
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
					errorToast(
						`We encountered an error while trying to submit your picks.  Please contact the site admin with the following information: <br> ${error}`
					);
				}
			});
			myLog('updated/submitted picks!', '', okHand, currentPicks);
			picksPromise = getPicks(selectedWeek, uid);

			await updateTiebreakerDoc(tiebreakerDocRef, uid, tiebreaker, selectedWeek, selectedYear);

			defaultToast({
				title: `${checkmark} Picks submitted!`,
				msg: `You can change any game's pick prior to that game's start time.`,
				duration: 10000
			});
		} catch (error) {
			errorToast('We encountered an error while submitting picks.  See the console log.');
			myError('submitPicks', error);
		}
	};
	const updateTiebreakerDoc = async (
		tiebreakerDocRef: DocumentReference,
		uid: string,
		tiebreaker: number,
		selectedWeek: number,
		selectedYear: number
	): Promise<void> => {
		try {
			await updateDoc(tiebreakerDocRef.withConverter(weeklyTiebreakerConverter), {
				docRef: tiebreakerDocRef,
				tiebreaker: tiebreaker,
				uid: uid,
				type: 'Regular Season',
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
			errorToast(
				`We encountered an error while trying to submit your tiebreaker.  Please contact your admin with the following information: <br> ${error}`
			);
		}
	};
	const updatePicks = async (
		games: Game[],
		currentPicks: WeeklyPickDoc[],
		homeOrAway?: HomeOrAway
	): Promise<WeeklyPickDoc[]> => {
		try {
			currentPicks.forEach(async (pickDoc) => {
				const matchingGame = games.find((game) => game.id === pickDoc.gameId);
				const ableToPick = await isBeforeGameTime(matchingGame.timestamp);
				if (ableToPick || $overrideDisabled) {
					if (homeOrAway === 'Home') {
						const homeTeam = matchingGame.homeTeam;
						pickDoc.pick = homeTeam.abbreviation;
					} else if (homeOrAway === 'Away') {
						const awayTeam = matchingGame.awayTeam;
						pickDoc.pick = awayTeam.abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			return currentPicks;
		} catch (error) {
			myError('updatePicks', error);
		}
	};
	const resetPicks = async () => {
		try {
			await updatePicks(selectedGames, currentPicks);
			currentPicks = currentPicks;
			myLog('reset all picks!', null, bomb);
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in resetting picks... see console log.');
			myError('resetPicks', error);
		}
	};

	const pickAllHome = async () => {
		try {
			currentPicks = await updatePicks(selectedGames, currentPicks, HomeOrAway.Home);
			// currentPicks = currentPicks;
			myLog('picked all home teams!', '', home);
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking home teams... see console log.');
			myError('pickAllHome', error);
		}
	};
	const pickAllAway = async () => {
		try {
			currentPicks = await updatePicks(selectedGames, currentPicks, HomeOrAway.Away);
			// currentPicks = currentPicks;
			myLog('picks all away teams!', '', airplaneDeparture);
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking away teams... see console log.');
			myError('pickAllAway', error);
		}
	};
	const pickAllFavored = async () => {
		try {
			let spreadsMissing = false;
			const favored = selectedGames.map((game) => {
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
				defaultToast({
					title: `${policeCarLight} Spreads not yet available!`,
					msg: `You can use this button when spreads are updated.`,
					duration: 10000
				});
				return;
			}
			currentPicks.forEach(async (pickDoc, i) => {
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp);
				if (ableToPick || $overrideDisabled) {
					if (favored[i] !== null && favored[i] !== undefined) {
						pickDoc.pick = favored[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog('picked favored teams!', '', okHand);
			currentPicks = currentPicks;
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking favored teams... see console log.');
			myError('pickAllFavored', error);
		}
	};
	const pickAllDogs = async () => {
		try {
			let spreadsMissing = false;
			const underdogs = selectedGames.map((game) => {
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
				defaultToast({
					title: `${policeCarLight} Spreads not yet available!`,
					msg: `You can use this button when spreads are updated.`,
					duration: 10000
				});
				return;
			}
			currentPicks.forEach(async (pickDoc, i) => {
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp);
				if (ableToPick || $overrideDisabled) {
					if (underdogs[i] !== null && underdogs[i] !== undefined) {
						pickDoc.pick = underdogs[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog('picked all underdogs!', '', dogFace);
			currentPicks = currentPicks;
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking underdog teams... see console log.');
			myError('pickAllDogs', error);
		}
	};

	const changedQuery = async (
		selectedYear: number,
		selectedSeasonType: SeasonType,
		selectedWeek: number,
		uid: string
	) => {
		try {
			gamesPromise = getGames(selectedYear, selectedSeasonType, selectedWeek);
			picksPromise = getPicks(selectedWeek, uid);
			tiebreakerPromise = getTiebreaker(selectedWeek, uid);
		} catch (error) {
			errorToast(`Error in changing query... ${error}`);
			myError('changedQuery', error);
		}
	};
	const isATSwinner = (pickDoc: WeeklyPickDoc, game: Game): boolean => {
		// console.log(`game: ${game.name} (${game.id})`);
		if (pickDoc.pick === '') {
			// console.log(`pick is empty`);
			return false;
		} else if (game.ATSwinner === 'push') {
			// console.log(`game is a push`);
			return true;
		} else if (game.ATSwinner === pickDoc.pick) {
			// console.log(`pick is correct`);
			return true;
		} else {
			// console.log(`Game is either unscored/incomplete or pick is incorrect`, pickDoc.pick, game.ATSwinner);
			return false;
		}
	};

	$: {
		if (currentPickCount >= 0 && totalGameCount > 0) {
			currentPickCount = currentPicks.filter((pick) => pick.pick !== '').length;
			if (upcomingGamesCount + playedGamesCount === totalGameCount) {
				$progress = currentPickCount / totalGameCount;
			} else if (upcomingGamesCount > 0) {
				$progress = currentPickCount / upcomingGamesCount;
			}
		}
	}
	const updateCurrentPicks = async (picksPromise: Promise<WeeklyPickDoc[]>) => {
		if (picksPromise) {
			currentPicks = await picksPromise;
		}
	};
	$: updateCurrentPicks(picksPromise);
	$: totalGameCount = currentPicks ? currentPicks.length : 0;
	$: isCorrectCount = currentPicks
		? currentPicks.filter((pick) => pick.isCorrect === true).length
		: 0;
	$: showSubmitPicks = currentPickCount >= upcomingGamesCount;
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<!-- <DevNotes>
	current: {currentPickCount}
	played: {playedGamesCount}
	upcoming: {upcomingGamesCount}
	showSubmitPicks: {showSubmitPicks}
</DevNotes> -->
<span class="flyout">
	<AdminControlsModal
		modalButtonStyles={`border-radius: 0 1rem 1rem 0; padding-left:3rem;`}
		modalButtonHoverStyles={[
			{ property: 'padding-left', value: '1.5rem' },
			{ property: 'padding-right', value: '1.5rem' }
		]}
	>
		<Grid slot="modal-content" repeat={2}>
			<p>Show Game IDs</p>
			<ToggleSwitch bind:checked={$showIDs} />
			<p>Show Timestamps</p>
			<ToggleSwitch bind:checked={$showTimestamps} />
			<p>Show Spreads</p>
			<ToggleSwitch bind:checked={$showSpreads} />
			<p>Show ATS Winner</p>
			<ToggleSwitch bind:checked={$showATSwinner} />

			<p>Override Locked Games <Fa icon={$overrideDisabled ? faUnlock : faLock} /></p>
			<ToggleSwitch bind:checked={$overrideDisabled} />
			<p>Select Season Type</p>
			<SeasonTypeSelect
				bind:selectedSeasonType
				on:seasonTypeChanged={() =>
					changedQuery(selectedYear, selectedSeasonType, selectedWeek, selectedUser.uid)}
			/>
			<p>Select Year</p>
			<YearSelect
				bind:selectedYear
				on:yearChanged={() =>
					changedQuery(selectedYear, selectedSeasonType, selectedWeek, selectedUser.uid)}
			/>
			{#await userPromise}
				Loading Users...
			{:then}
				<p>Select User</p>
				<UserSelect
					bind:selectedUser
					bind:userPromise
					on:userChanged={() =>
						changedQuery(selectedYear, selectedSeasonType, selectedWeek, selectedUser.uid)}
				/>
			{/await}
		</Grid>
	</AdminControlsModal>
</span>
<section class="grid positioning">
	<div class="pick-status fixed grid {$largerThanMobile ? 'bottom-left' : 'bottom-right'}">
		{#if $largerThanMobile}
			<Clock />
		{/if}
		{#if currentPickCount >= 0 && totalGameCount > 0}
			{#key currentPickCount}
				<PickCounter
					invisible={tiebreaker >= 10 && showSubmitPicks}
					bind:currentPicks
					bind:currentPickCount
					bind:totalGameCount
					bind:upcomingGamesCount
				/>
			{/key}
			{#if (showSubmitPicks && upcomingGamesCount !== 0) || $overrideDisabled}
				<SubmitPicks
					on:click={() => submitPicks(selectedUser.uid)}
					ableToTab={tiebreaker >= 10 ? 0 : -1}
					pulse={tiebreaker >= 10}
					invisible={tiebreaker < 10 || tiebreaker === undefined}
				/>
				{#await tiebreakerPromise}
					<span>Loading tiebreaker...</span>
				{:then}
					{#if upcomingGamesCount > 0 || $overrideDisabled}
						<TiebreakerInput bind:tiebreaker />
					{/if}
				{/await}
			{:else if upcomingGamesCount !== 0}
				<progress value={$progress || 0} />
			{:else}
				<div>{isCorrectCount} of {totalGameCount} correct</div>
			{/if}
		{/if}
	</div>
	<div
		class="first-row grid"
		style={$largerThanMobile ? `margin-right:${offsetRightPercentage}%;` : ''}
	>
		<WeekSelect
			customStyles="grid-area: week;"
			bind:selectedWeek
			bind:selectedSeasonType
			on:weekChanged={() =>
				changedQuery(selectedYear, selectedSeasonType, selectedWeek, selectedUser.uid)}
		/>
		<button
			style="grid-area:reset;"
			on:click={resetPicks}
			class:dark-mode={$useDarkTheme}
			class="hotkeys">Reset Picks</button
		>
	</div>

	<!-- prettier-ignore -->
	<div class="second-row grid" style="{$largerThanMobile ? `margin-right:${offsetRightPercentage}%;`:''}">
		<button on:click={pickAllAway} class:dark-mode={$useDarkTheme} class="hotkeys">All Away</button>
		<button on:click={pickAllFavored} class:dark-mode={$useDarkTheme} class="hotkeys">All Favored</button>
		<button on:click={pickAllDogs} class:dark-mode={$useDarkTheme} class="hotkeys">All Underdogs</button>
		<button on:click={pickAllHome} class:dark-mode={$useDarkTheme} class="hotkeys">All Home</button>
	</div>

	<div
		class="grid weekGames"
		style="{$largerThanMobile
			? `width:${widthMeasure}%; margin-right:${offsetRightPercentage}%;`
			: ''} grid-template-columns:repeat({gridColumns},1fr)"
	>
		{#await picksPromise}
			<LoadingSpinner msg="Loading picks..." width="100%" />
		{:then}
			{#each currentPicks as pickDoc, i (pickDoc.gameId)}
				{#await gamesPromise}
					<LoadingSpinner msg="Loading games..." width="100%" />
				{:then games}
					{#each games as game (game.id)}
						{#if pickDoc.gameId === game.id}
							<div
								class="game-container"
								in:fly={{ x: -100, duration: 300, delay: 0 }}
								out:fly={{ x: 100, duration: 300 }}
								class:winner={game.ATSwinner === pickDoc.pick && game.ATSwinner !== ''}
								class:loser={game.ATSwinner ? game.ATSwinner !== pickDoc.pick : null}
								class:dark={$useDarkTheme}
							>
								<MatchupContainer
									bind:selectedTeam={pickDoc.pick}
									bind:currentPicks
									{gridColumns}
									id={game.id}
									index={i}
									spread={game.spread}
									homeTeam={game.homeTeam}
									awayTeam={game.awayTeam}
									timestamp={game.timestamp}
									competitions={game.competitions}
									isATSwinner={isATSwinner(pickDoc, game)}
									ATSwinner={game.ATSwinner}
								/>
							</div>
						{/if}
					{/each}
				{:catch}
					<ErrorModal>
						<svelte:fragment slot="modal-content">
							Error in loading games documents.
						</svelte:fragment>
					</ErrorModal>
				{/await}
			{/each}
		{:catch}
			<ErrorModal>
				<svelte:fragment slot="modal-content">Error in loading picks documents.</svelte:fragment>
			</ErrorModal>
		{/await}
	</div>
</section>

<style lang="scss">
	.grid {
		@include gridAndGap;
		place-items: center;
	}
	.positioning {
		grid-template-columns: minmax(100%, 1fr);
		grid-template-areas:
			'devOrAdmin'
			'firstRow'
			'secondRow'
			'main';
		@include responsive_desktop_only {
			grid-template-columns: 15% 1fr;
			grid-template-rows: min-content min-content 1fr;
			grid-template-areas:
				'devOrAdmin firstRow'
				'devOrAdmin secondRow'
				'devOrAdmin main';
		}
	}
	.game-container {
		@include defaultContainerStyles;
		/* background-color: black(30%); // for use with background images */
		box-shadow: 0px 0px 15px 0px rgba(var(--mainValue-color, rgb(255, 255, 255)), 0.5);
		cursor: initial;
		width: 100%;
		height: 100%;
		outline: 1px solid;
		&.dark {
			background-color: hsla(120, 20%, 25%, 80%);
		}
	}
	.weekGames {
		padding: 1rem;
		padding-bottom: 3rem;
		grid-area: main;
	}
	.first-row,
	.second-row {
		justify-content: space-evenly;
		width: 100%;
		max-width: min(100%, 35em);
	}
	.first-row {
		gap: 1rem;
		grid-area: firstRow;
		grid-template-rows: auto;
		grid-template-columns: repeat(auto-fit, minmax(1fr, max-content));
		grid-template-areas: 'scoreView scoreView' 'week reset';
		// @include responsive_desktop_only {
		// 	grid-template-areas: 'week reset' 'admin scoreView';
		// }
	}
	.second-row {
		gap: 0.5em;
		grid-area: secondRow;
		grid-template-columns: 1fr 1fr;
		@include responsive_desktop_only {
			grid-template-columns: repeat(4, minmax(0, max-content));
		}
	}
	button {
		@include styledButton;
		@include defaultTransition;
		text-shadow: none;
	}
	.fixed {
		background-color: var(--alternate-color, rgb(36, 50, 36));
		position: fixed;
		z-index: 20;
		font-weight: bold;
	}
	.bottom-left {
		bottom: 0;
		left: 0;
		border-radius: 0 1rem 1rem 0;
		grid-template-rows: repeat(3, auto);
		max-width: 15%;
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
	progress {
		grid-area: tiebreaker;
		min-height: 2.6rem;
		accent-color: var(--accent-color, rgb(233, 181, 99));
	}

	.hotkeys {
		@include styledButton;
		&.dark-mode {
			@include styledButtonDark;
		}
	}
	.winner {
		background-color: rgba(darkgreen, 20%);
		&.dark {
			background-color: rgba(darkgreen, 10%);
		}
	}
	.loser {
		background-color: rgba(darkred, 10%);
		&.dark {
			background-color: rgba(darkred, 20%);
		}
	}
	.flyout {
		@include defaultTransition;
		border-radius: 0 1rem 1rem 0;
		position: fixed;
		left: 0%;
		transform: translateX(-55%);
		&:hover {
			transform: translateX(-1%);
		}
	}
</style>
