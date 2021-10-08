<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { currentUser, userData } from '$scripts/auth/auth';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import {
		scheduleCollection,
		toastsCollection,
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
		showIDs,
		showSpreads,
		showTimestamps,
		useDarkTheme
	} from '$scripts/store';
	import {
		DocumentReference,
		getDocs,
		getDocsFromServer,
		orderBy,
		query,
		updateDoc,
		where
	} from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { focusTiebreaker, getUserId, isBeforeGameTime } from '$scripts/functions';
	import {
		airplaneDeparture,
		bomb,
		bread,
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
	import { defaultToast, errorToast, errorToastIt, toastIt } from '$scripts/toasts';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import TiebreakerInput from '$lib/components/inputs/TiebreakerInput.svelte';
	import PickCounter from '$lib/components/containers/micro/PickCounter.svelte';
	import SubmitPicks from '$lib/components/buttons/SubmitPicks.svelte';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import { doc, setDoc } from '@firebase/firestore';
	import { fly } from 'svelte/transition';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import type { Game } from '$scripts/classes/game';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import UserSelect from '$lib/components/selects/UserSelect.svelte';
	import type { WebUser } from '$scripts/classes/webUser';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import Fa from 'svelte-fa';
	import { faLock, faLockOpen, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import Tooltip from '$lib/components/containers/Tooltip.svelte';

	let uid: string;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	let gamesPromise: Promise<Game[]>;
	let userPromise: Promise<WebUser[]>;
	let editingToast = false;
	let selectedUser: WebUser;
	let selectedWeek = 3;
	let selectedYear = new Date().getFullYear();
	let selectedSeasonType = seasonTypes[1];
	let currentPicks: WeeklyPickDoc[] = [];
	let selectedGames: Game[] = [];
	let currentPickCount = 0;
	let upcomingGamesCount: number = 0;
	let isCorrectCount = 0;
	let totalGameCount = 16;
	let tiebreakerDocRef: DocumentReference;
	let tiebreaker: number = 0;
	let toastMsg = ``;
	let toastTitle = '';
	let gridColumns = 1;
	let widthMeasure = 85;
	let offsetRightPercentage = 15;
	let toastSeenKey = 'toast_makeWeeklyPicks_NewTiebreakerAndSubmit';
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	const checkWidth = async () => {
		if ($largerThanMobile) {
			gridColumns = 2;
		} else {
			gridColumns = 1;
		}
	};

	$: $largerThanMobile, checkWidth();

	onMount(async () => {
		await getData();
		const toastSeen = await getLocalStorageItem(toastSeenKey);
		if (toastSeen !== 'true') {
			const promisedToast = await getToast('Make Picks');
			toastMsg = promisedToast.msg;
			toastTitle = promisedToast.title;
			defaultToast({
				title: toastTitle,
				msg: toastMsg,
				duration: 15_000,
				useSeenToastComponent: true,
				localStorageKey: toastSeenKey
			});
		}
	});
	const getData = async () => {
		uid = await getUserId();
		selectedWeek = await findCurrentWeekOfSchedule();
		userPromise = getWeeklyUsers(false);
		await changedQuery();
	};
	const changeUser = () => {
		uid = selectedUser.id;
	};
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

	const getPicks = async (selectedWeek: number, uid: string) => {
		try {
			isCorrectCount = 0;
			const picks: WeeklyPickDoc[] = [];
			const q = query(
				weeklyPicksCollection,
				where('year', '==', selectedYear),
				where('type', '==', selectedSeasonType.text),
				where('week', '==', selectedWeek),
				where('uid', '==', uid),
				orderBy('timestamp'),
				orderBy('id')
			);
			const querySnapshot = await getDocsFromServer(q.withConverter(weeklyPickConverter));
			querySnapshot.forEach((doc) => {
				picks.push(doc.data());
			});

			myLog('got picks!', '', pick, picks);
			currentPicks = picks;
			totalGameCount = picks.length;
			picks.forEach(async (pick) => {
				// const now = new Date().getTime();
				// const ableToPick = await isBeforeGameTime(pick.timestamp, now);
				// if (ableToPick) {
				// 	upcomingGamesCount++;
				// }
				if (pick.isCorrect) {
					isCorrectCount++;
				}
			});
			return picks;
		} catch (error) {
			errorToast(
				'Unable to get picks. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
			);
			myError('getPicks', error);
		}
	};

	const getGames = async (selectedWeek: number) => {
		try {
			const games: Game[] = [];
			const q = query(
				scheduleCollection,
				where('year', '==', selectedYear),
				where('type', '==', selectedSeasonType.text),
				where('week', '==', selectedWeek),
				orderBy('timestamp')
			);
			const querySnapshot = await getDocsFromServer(q.withConverter(gameConverter));
			querySnapshot.forEach((doc) => {
				games.push(doc.data());
			});

			myLog('got games!', '', checkmark);
			selectedGames = games;
			upcomingGamesCount = await countUpcomingGames(games);
			return games;
		} catch (error) {
			errorToast(
				'Unable to get games. Contact the admin.  You can find more information about the error by pressing Ctrl+Shift+I and then inspecting the error in the Console tab.'
			);
			myError('getGames', error);
		}
	};
	const countUpcomingGames = async (games: Game[]) => {
		try {
			let upcomingGamesCount: number = 0;
			for await (const game of games) {
				const ableToPick = await isBeforeGameTime(game.timestamp);
				if (ableToPick) {
					upcomingGamesCount++;
				}
			}
			myLog(`${upcomingGamesCount} upcoming games`);
			return upcomingGamesCount;
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
			const querySnapshot = await getDocsFromServer(q.withConverter(weeklyTiebreakerConverter));
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
		selectedWeek,
		selectedYear
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
				if (ableToPick) {
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
			await updatePicks(selectedGames, currentPicks, HomeOrAway.Home);
			currentPicks = currentPicks;
			myLog('picked all home teams!', '', home);
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking home teams... see console log.');
			myError('pickAllHome', error);
		}
	};
	const pickAllAway = async () => {
		try {
			await updatePicks(selectedGames, currentPicks, HomeOrAway.Away);
			currentPicks = currentPicks;
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
			focusTiebreaker();
		} catch (error) {
			errorToast('Error in picking underdog teams... see console log.');
			myError('pickAllDogs', error);
		}
	};

	const changedQuery = async (changedUser = false) => {
		try {
			if (changedUser) {
				changeUser();
			}
			gamesPromise = getGames(selectedWeek);
			picksPromise = getPicks(selectedWeek, uid);
			tiebreakerPromise = getTiebreaker(selectedWeek, uid);
		} catch (error) {
			errorToast('Error in picking changing query... see console log.');
			myError('changedQuery', error);
		}
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
</script>

<PageTitle>Make Weekly Picks</PageTitle>

<section class="grid positioning">
	<div class="dev-notes">
		<DevNotes>
			<div style="display:grid; grid-template-columns: repeat(auto-fit,minmax(20rem, 1fr));">
				Show Game IDs
				<ToggleSwitch bind:checked={$showIDs} />
				Show Timestamps
				<ToggleSwitch bind:checked={$showTimestamps} />
				Show Spreads
				<ToggleSwitch bind:checked={$showSpreads} />
				Override Disabled Picks: {$overrideDisabled}
				<ToggleSwitch bind:checked={$overrideDisabled} />
				Edit Toast
				<ToggleSwitch bind:checked={editingToast} />
				{#if selectedUser}
					<p>Selected User ID: {selectedUser.id}</p>
					<p>UID for queries and submission: {uid}</p>
				{/if}
				Select Season Type
				<SeasonTypeSelect bind:selectedSeasonType on:seasonTypeChanged={() => changedQuery()} />
				Select Year
				<YearSelect bind:selectedYear on:yearChanged={() => changedQuery()} />
				<p>
					<span>Game Columns</span>
					<input
						type="range"
						bind:value={gridColumns}
						min="1"
						max="4"
						step="1"
						style="max-width:100%;"
					/>{gridColumns}
				</p>
				<p>
					<span>Container Max-Width</span>
					<input
						type="range"
						bind:value={widthMeasure}
						min="1"
						max="100"
						step="1"
						style="max-width:100%;"
					/>{widthMeasure}
				</p>
				<button style="color:black;" on:click={() => toastIt(toastTitle, toastMsg)}
					>Toast It!</button
				>
				{#if editingToast}
					<textarea style="resize:both;min-height:5rem;" contenteditable bind:value={toastMsg} />
				{:else}
					<code>{@html toastMsg}</code>
				{/if}
				Upcoming Games Count
				<p>{upcomingGamesCount}</p>
				Total Games/Picks Count
				<p>{totalGameCount}</p>
				Current Pick Count
				<p>{currentPickCount}</p>
				<!-- svelte-ignore missing-declaration -->
				<button on:click={errorToastIt}>Error Toast!</button>
			</div>
			{#if gamesPromise}
				{#await gamesPromise}
					Loading games...
				{:then games}
					{#each games as game (game.id)}
						<p>
							{game.awayTeam.abbreviation}: {game.awayTeam.wins}-{game.awayTeam.losses}-{game
								.awayTeam.ties}
						</p>
						<p>
							{game.homeTeam.abbreviation}: {game.homeTeam.wins}-{game.homeTeam.losses}-{game
								.homeTeam.ties}
						</p>
					{/each}
				{/await}
			{/if}
		</DevNotes>
	</div>
	<div class="pick-status fixed grid {$largerThanMobile ? 'bottom-left' : 'bottom-right'}">
		{#if $largerThanMobile}
			<Clock />
		{/if}
		{#if currentPickCount >= 0 && totalGameCount > 0}
			{#key currentPickCount}
				<PickCounter
					invisible={tiebreaker >= 10 && currentPickCount >= upcomingGamesCount}
					bind:currentPicks
					bind:currentPickCount
					bind:totalGameCount
					bind:upcomingGamesCount
				/>
			{/key}
			{#if (currentPickCount >= upcomingGamesCount && upcomingGamesCount !== 0) || $overrideDisabled}
				<SubmitPicks
					on:click={() => submitPicks(uid)}
					ableToTab={tiebreaker >= 10 ? 0 : -1}
					pulse={tiebreaker >= 10}
					invisible={tiebreaker < 10 || tiebreaker === undefined}
				/>
				{#if upcomingGamesCount > 0 || $overrideDisabled}
					<TiebreakerInput bind:tiebreaker />
				{/if}
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
		<WeekSelect bind:selectedWeek bind:selectedSeasonType on:weekChanged={() => changedQuery()} />
		{#if $userData?.admin}
			<UserSelect
				customStyles="border:darkred solid 2px;"
				bind:selectedUser
				bind:userPromise
				on:userChanged={() => changedQuery(true)}
			/>
			<Tooltip tooltipWidth="200%" tooltipTop="-350%">
				<span slot="text">{$overrideDisabled ? `Games Unlocked` : `Unlock Games`}</span>
				<ToggleSwitch
					customButtonStyles="border:darkred solid 2px;"
					slot="content"
					bind:checked={$overrideDisabled}
				/>
			</Tooltip>
			<Fa icon={$overrideDisabled ? faLock : faUnlock} />
		{/if}
		<button on:click={resetPicks} class:dark-mode={$useDarkTheme} class="hotkeys"
			>Reset Picks</button
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
		{:then picks}
			{#each currentPicks as pick, i (pick.gameId)}
				{#await gamesPromise}
					<LoadingSpinner msg="Loading games..." width="100%" />
				{:then games}
					{#each games as game (game.id)}
						{#if pick.gameId === game.id}
							<div
								class="game-container"
								in:fly={{ x: -100, duration: 300, delay: 0 }}
								out:fly={{ x: 100, duration: 300 }}
							>
								<MatchupContainer
									bind:selectedTeam={pick.pick}
									bind:currentPicks
									{gridColumns}
									id={game.id}
									index={i}
									spread={game.spread}
									homeTeam={game.homeTeam}
									awayTeam={game.awayTeam}
									timestamp={game.timestamp}
									competitions={game.competitions}
								/>
							</div>
						{/if}
					{/each}
				{/await}
			{/each}
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
			'devNotes'
			'firstRow'
			'secondRow'
			'main';
		@include responsive_desktop_only {
			grid-template-columns: 15% 1fr;
			grid-template-rows: min-content min-content 1fr;
			grid-template-areas:
				'devNotes firstRow'
				'devNotes secondRow'
				'devNotes main';
		}
	}
	.dev-notes {
		@include defaultTransition;
		position: fixed;
		left: 0;
		top: 20%;
		grid-area: devNotes;
		align-self: start;
		justify-self: left;
		z-index: 50;
		border-radius: 5vh;
		min-width: min-content;
		max-width: 35%;
	}
	.game-container {
		@include defaultContainerStyles;
		// background-color: black(30%); // for use with background images
		box-shadow: 0px 0px 15px 0px rgba(var(--mainValue-color, rgb(255, 255, 255)), 0.5);
		cursor: initial;
		width: 100%;
		height: 100%;
	}
	.weekGames {
		padding: 1rem;
		padding-bottom: 3rem;
		grid-area: main;
		// grid-template-columns: repeat(
		// 	auto-fit,
		// 	minmax(min(100%, 30em), 1fr));
		// min function prevents grid blowout
	}
	.first-row {
		grid-area: firstRow;
		grid-template-columns: repeat(auto-fit, minmax(0, max-content));
	}
	.second-row {
		grid-area: secondRow;
		grid-template-columns: 1fr 1fr;
		@include responsive_desktop_only {
			grid-template-columns: repeat(4, minmax(0, max-content));
		}
	}
	.first-row,
	.second-row {
		gap: 0.5em;
		justify-content: space-evenly;
		width: 100%;
		max-width: min(100%, 35em);
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
	}
	input[type='range'] {
		display: inline-block;
	}
</style>
