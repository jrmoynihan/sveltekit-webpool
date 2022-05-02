<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { weeklyPickConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import {
		changeableTiebreakerScoreGuess,
		currentPicks,
		gamesPromise,
		largerThanMobile,
		overrideDisabled,
		picksPromise,
		preferredScoreView,
		selectedSeasonType,
		selectedSeasonYear,
		tiebreakerPromise,
		useDarkTheme,
		firebase_user,
		selectedWeek,
		selectedPlayer
	} from '$scripts/store';
	import { DocumentReference, updateDoc } from 'firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { isBeforeGameTime } from '$scripts/functions';
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
		policeCarLight
	} from '$scripts/classes/constants';
	import { onMount } from 'svelte';
	import { defaultToast, errorToast, getToast } from '$scripts/toasts';
	import TiebreakerInput from '$components/inputs/TiebreakerInput.svelte';
	import PickCounter from '$components/containers/micro/PickCounter.svelte';
	import SubmitPicks from '$components/buttons/SubmitPicks.svelte';
	import { fly } from 'svelte/transition';
	import LoadingSpinner from '$components/misc/LoadingSpinner.svelte';
	import type { Game } from '$scripts/classes/game';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import { focusTiebreaker } from '$scripts/scrollAndFocus';
	import { changedQuery, getPicksForPlayer } from '$scripts/weekly/weeklyPlayers';

	// let picksPromise: Promise<WeeklyPickDoc[]>;
	// let tiebreakerPromise: Promise<WeeklyTiebreaker>;
	// let gamesPromise: Promise<Game[]>;
	// let userPromise: Promise<WebUser[]>;
	// let selectedUser: WebUser;
	// let selectedWeek = 3;
	// let selectedYear = new Date().getFullYear();
	// let selectedSeasonType = seasonTypes[1];
	let showTiebreakerInput = false;
	let countedGameTimes: { upcomingGamesCount: any; playedGamesCount: any };
	let currentPickCount = 0;
	let upcomingGamesCount = 0;
	let playedGamesCount = 0;
	let isCorrectCount = 0;
	let totalGameCount = 16;
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
		$preferredScoreView = await getLocalStorageItem('scoreViewPreference');
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
		// $selectedWeek = await findCurrentWeekOfSchedule(); 	// TOOD: this is fine during the regular season, but not outside of it

		// NOTE: presumably I was preloading the list of users, but I may not need to do that
		// if ($userData?.admin) {
		// 	const userPromise = getWeeklyUsers(false);
		// 	// selectedUser = await userPromise.then((users) => users[0]);
		// } else {
		// 	await saveUserData();
		// 	await getData();
		// }

		const promises = await changedQuery(
			$selectedSeasonYear,
			$selectedSeasonType,
			$selectedWeek,
			$authorizedUser.uid
		);
		$gamesPromise = promises.gamesPromise;
		$picksPromise = promises.picksPromise;
		$tiebreakerPromise = promises.tiebreakerPromise;
		$currentPicks = await $picksPromise;
		const tiebreakerDoc = await $tiebreakerPromise;
		$changeableTiebreakerScoreGuess = tiebreakerDoc?.scoreGuess;
		const games = await $gamesPromise;
		countedGameTimes = await countPlayedOrUpcomingGames(games);
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
					game.isBeforeGameTime = true;
				} else {
					// Increment [already] played games if the game is after its gametime
					playedGamesCount++;
					game.isBeforeGameTime = false;
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

	const submitPicksAndTiebreaker = async (
		uid: string,
		docRef: DocumentReference,
		scoreGuess: number,
		currentPicks: WeeklyPickDoc[]
	): Promise<void> => {
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
			$picksPromise = getPicksForPlayer(
				$selectedWeek,
				uid,
				$selectedSeasonYear,
				$selectedSeasonType
			);
			await updateTiebreakerDoc(docRef, uid, scoreGuess, $selectedWeek, $selectedSeasonYear);

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
		scoreGuess: number,
		selectedWeek: number,
		selectedYear: number
	): Promise<void> => {
		try {
			await updateDoc(tiebreakerDocRef.withConverter(weeklyTiebreakerConverter), {
				docRef: tiebreakerDocRef,
				scoreGuess: scoreGuess,
				uid: uid,
				type: 'Regular Season',
				week: selectedWeek,
				year: selectedYear
			});
			myLog('updated/submitted tiebreaker!', '', okHand, scoreGuess);
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
		picks: WeeklyPickDoc[],
		showToast: boolean = false,
		logIcon: string = '',
		logAndToastMsg: string = '',
		focusTiebreakerAfterwards: boolean = false,
		callingFunctionName: string = 'updatePicks',
		homeOrAway?: HomeOrAway
	): Promise<WeeklyPickDoc[]> => {
		try {
			picks.forEach(async (pickDoc) => {
				const matchingGame = games.find((game) => game.id === pickDoc.gameId);
				const ableToPick = matchingGame.isBeforeGameTime;
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
			logAndToastMsg ? myLog(logAndToastMsg, callingFunctionName, logIcon, picks) : null;
			showToast ? defaultToast({ msg: logAndToastMsg }) : null;
			focusTiebreakerAfterwards ? focusTiebreaker() : null;
			return picks;
		} catch (error) {
			errorToast(
				'We encountered an error while trying to update your picks.  See the console log.'
			);
			myError(`Error in ${callingFunctionName}`, error);
		}
	};
	const resetPicks = async (games: Game[], picks: WeeklyPickDoc[]) => {
		picks = await updatePicks(games, picks, false, bomb, 'Reset all picks!', false, 'resetPicks');
		return picks;
	};

	const pickAllHome = async (games: Game[], picks: WeeklyPickDoc[]) => {
		picks = await updatePicks(
			games,
			picks,
			false,
			home,
			'Picked all home teams!',
			true,
			'pickAllHome',
			HomeOrAway.Home
		);
		return picks;
	};
	const pickAllAway = async (games: Game[], picks: WeeklyPickDoc[]) => {
		picks = await updatePicks(
			games,
			picks,
			false,
			airplaneDeparture,
			'Picked all away teams!',
			true,
			'pickAllAway',
			HomeOrAway.Away
		);
		return picks;
	};

	const pickAllFavored = async (games: Game[], picks: WeeklyPickDoc[]) => {
		try {
			let spreadsMissing = false;
			const favored = games.map((game) => {
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
			picks.forEach(async (pickDoc, i) => {
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp);
				pickDoc.isBeforeGameTime = ableToPick;
				if (ableToPick || $overrideDisabled) {
					if (favored[i] !== null && favored[i] !== undefined) {
						pickDoc.pick = favored[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog('picked favored teams!', '', okHand);
			focusTiebreaker();
			return picks;
		} catch (error) {
			errorToast('Error in picking favored teams... see console log.');
			myError('pickAllFavored', error);
		}
	};
	const pickAllDogs = async (games: Game[], picks: WeeklyPickDoc[]) => {
		try {
			let spreadsMissing = false;
			const underdogs = games.map((game) => {
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
			picks.forEach(async (pickDoc, i) => {
				const ableToPick = await isBeforeGameTime(pickDoc.timestamp);
				pickDoc.isBeforeGameTime = ableToPick;
				if (ableToPick || $overrideDisabled) {
					if (underdogs[i] !== null && underdogs[i] !== undefined) {
						pickDoc.pick = underdogs[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog('picked all underdogs!', '', dogFace);
			focusTiebreaker();
			return picks;
		} catch (error) {
			errorToast('Error in picking underdog teams... see console log.');
			myError('pickAllDogs', error);
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

	const selectorsUpdated = async () => {
		const promises = changedQuery(
			$selectedSeasonYear,
			$selectedSeasonType,
			$selectedWeek,
			$authorizedUser.uid
		);
		$gamesPromise = (await promises).gamesPromise;
		$picksPromise = (await promises).picksPromise;
		$tiebreakerPromise = (await promises).tiebreakerPromise;
		$currentPicks = await $picksPromise;
	};

	const getYardLine = (index: number) => {
		return Math.floor((index + 2) / 2) * 10;
	};

	$: {
		if (currentPickCount >= 0 && totalGameCount > 0) {
			if (upcomingGamesCount + playedGamesCount === totalGameCount) {
				$progress = currentPickCount / totalGameCount;
			} else if (upcomingGamesCount > 0) {
				$progress = currentPickCount / upcomingGamesCount;
			}
		}
	}

	$: totalGameCount = $currentPicks?.length;
	$: currentPickCount = $currentPicks?.filter((pick) => pick.pick !== '').length;
	$: isCorrectCount = $currentPicks?.filter((pick) => pick.isCorrect === true).length;
	$: upcomingGamesCount = countedGameTimes?.upcomingGamesCount;
	$: playedGamesCount = countedGameTimes?.playedGamesCount;
	$: showTiebreakerInput =
		currentPickCount >= playedGamesCount + upcomingGamesCount && upcomingGamesCount !== 0;
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<!-- played:{playedGamesCount} upcoming:{upcomingGamesCount} total:{totalGameCount} current:{currentPickCount} -->
<section class="grid positioning">
	<div class="pick-status fixed grid {$largerThanMobile ? 'bottom-left' : 'bottom-right'}">
		<!-- {#if $largerThanMobile}
			<Clock />
		{/if} -->
		{#if currentPickCount >= 0 && totalGameCount > 0}
			{#key currentPickCount}
				<PickCounter
					invisible={$changeableTiebreakerScoreGuess >= 10 && showTiebreakerInput}
					bind:currentPicks={$currentPicks}
					bind:currentPickCount
					bind:totalGameCount
					bind:upcomingGamesCount
				/>
			{/key}
			{#await $tiebreakerPromise then { docRef, scoreGuess }}
				<SubmitPicks
					on:click={() =>
						submitPicksAndTiebreaker(
							$selectedPlayer.uid,
							docRef,
							$changeableTiebreakerScoreGuess,
							$currentPicks
						)}
					on:click={() => console.log(scoreGuess)}
					ableToTab={$changeableTiebreakerScoreGuess >= 10 ? 0 : -1}
					pulse={$changeableTiebreakerScoreGuess >= 10}
					invisible={$changeableTiebreakerScoreGuess < 10 ||
						$changeableTiebreakerScoreGuess === undefined ||
						upcomingGamesCount === 0}
				/>
			{/await}
			{#if showTiebreakerInput}
				<TiebreakerInput
					scoreGuess={$changeableTiebreakerScoreGuess}
					on:change={(e) => {
						$changeableTiebreakerScoreGuess = parseInt(e.detail);
					}}
				/>
			{:else if upcomingGamesCount !== 0}
				<progress value={$progress || 0} />
			{/if}
			{#if playedGamesCount > 0}
				<div class="correct-count">{isCorrectCount} of {totalGameCount} correct</div>
			{/if}
		{/if}
	</div>
	<div
		class="first-row grid"
		style={$largerThanMobile ? `margin-right:${offsetRightPercentage}%;` : ''}
	>
		<WeekSelect
			customStyles="grid-area: week;"
			bind:selectedSeasonType={$selectedSeasonType}
			on:weekChanged={selectorsUpdated}
			on:incrementWeek={selectorsUpdated}
			on:decrementWeek={selectorsUpdated}
		/>
		{#await $gamesPromise then games}
			{#await $picksPromise then picks}
				<button
					style="grid-area:reset;"
					on:click={async () => ($currentPicks = await resetPicks(games, $currentPicks))}
					class:dark-mode={$useDarkTheme}
					class="hotkeys">Reset Picks</button
				>
			{/await}
		{/await}
	</div>

	<!-- prettier-ignore -->
	{#await $gamesPromise then games}
	{#await $picksPromise then picks}
	<div class="second-row grid" style="{$largerThanMobile ? `margin-right:${offsetRightPercentage}%;`:''}">
		<button on:click={async ()=> $currentPicks = await pickAllAway(games,picks)} class:dark-mode={$useDarkTheme} class="hotkeys">All Away</button>
		<button on:click={async ()=> $currentPicks = await pickAllFavored(games,picks)} class:dark-mode={$useDarkTheme} class="hotkeys">All Favored</button>
		<button on:click={async ()=> $currentPicks = await pickAllDogs(games,picks)} class:dark-mode={$useDarkTheme} class="hotkeys">All Underdogs</button>
		<button on:click={async ()=> $currentPicks = await pickAllHome(games,picks)} class:dark-mode={$useDarkTheme} class="hotkeys">All Home</button>
	</div>
	{/await}
	{/await}

	<div
		class="grid weekGames"
		style="{$largerThanMobile
			? `width:${widthMeasure}%; margin-right:${offsetRightPercentage}%;`
			: ''} grid-template-columns:repeat({gridColumns},1fr)"
	>
		{#await $picksPromise}
			<LoadingSpinner msg="Loading picks..." width="100%" />
		{:then picks}
			{#each $currentPicks as pickDoc, i (pickDoc.gameId)}
				{#await $gamesPromise}
					<LoadingSpinner msg="Loading games..." width="100%" />
				{:then games}
					{#each games as game, i (game.id)}
						{#if pickDoc.gameId === game.id}
							<div
								class="game-container"
								class:showYard={$largerThanMobile}
								class:rightYard={i % 2 !== 0 && $largerThanMobile}
								class:leftYard={i % 2 === 0 && $largerThanMobile}
								style="--yard:'{getYardLine(i) > 50
									? ((getYardLine(i) - 100) * -1).toString()
									: getYardLine(i).toString()}';"
								in:fly={{ x: -100, duration: 300, delay: 0 }}
								out:fly={{ x: 100, duration: 300 }}
								class:winner={game.ATSwinner === pickDoc.pick && game.ATSwinner !== ''}
								class:loser={game.ATSwinner ? game.ATSwinner !== pickDoc.pick : null}
								class:dark={$useDarkTheme}
							>
								<MatchupContainer
									bind:selectedTeam={pickDoc.pick}
									bind:currentPicks={$currentPicks}
									bind:beforeGameTime={game.isBeforeGameTime}
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
					<ErrorModal error={'Error in loading games documents.'} />
				{/await}
			{/each}
		{:catch}
			<ErrorModal error={'Error in loading picks documents.'} />
		{/await}
	</div>
</section>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
	<link
		href="https://fonts.googleapis.com/css2?family=Imbue:wght@900&family=Rozha+One&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

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
		position: relative; // for the pseudo-element absolute positioning below
		cursor: initial;
		width: 100%;
		height: 100%;
		background-color: hsla(120 20% 100% / 100%);
		&.dark {
			background-color: hsla(120 20% 25% / 100%);
		}
		&.showYard {
			&::before,
			&::after {
				display: inline-grid;
				position: absolute;
				z-index: var(--below);
			}
			&::before {
				content: var(--yard);
				top: -24.5%; // -19.7%;
				// width: 140%; // 127%;
				height: 0;
				// transform: translate3d(-50%, 0, 0);
				font-size: 7em; // 4.5em;
				font-weight: bold;
				font-family: 'Rozha One', 'Imbue', 'Open Sans', sans-serif;
				color: hsla(var(--text-value, white), 10%);
				align-content: start;
			}
			&::after {
				content: '';
				top: -2.6%;
				height: 2px;
				background: hsla(var(--text-value, white), 10%);
			}
			&.rightYard::after {
				transform: translate3d(-48.7%, 0, 0);
				width: 105%;
			}
			&.leftYard::after {
				transform: translate3d(-51.7%, 0, 0);
				width: 105%;
			}
			&.rightYard::before {
				text-align: left;
				writing-mode: vertical-lr;
				transform: translate3d(200%, 0, 0);
			}
			&.leftYard::before {
				text-align: right;
				writing-mode: vertical-rl;
				rotate: 180deg;
				transform: translate3d(300%, -7.5rem, 0);
			}
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
		background-color: hsla(var(--background-value, hsl(120, 16%, 17%)), 95%);
		position: fixed;
		z-index: 20;
		font-weight: bold;
		backdrop-filter: blur(10px);
	}
	.bottom-left {
		box-sizing: border-box;
		bottom: 0;
		left: 0;
		border-radius: 0 1rem 1rem 0;
		grid-template-rows: repeat(3, auto);
		max-width: 15%;
		grid-template-areas: 'clock ' 'pickCount' 'tiebreaker' 'correct';
		width: 15%;
		justify-items: center;
		padding: 1rem 0.5rem;
	}
	.bottom-right {
		box-sizing: border-box;
		bottom: 0;
		right: 0;
		gap: 1rem;
		border-top: var(--accent) 2px inset;
		width: 100%;
		grid-template-areas: 'pickCount correct tiebreaker';
		grid-template-columns: repeat(auto-fit, minmax(1fr, max-content));
		padding: 0.5rem;
	}
	progress {
		grid-area: tiebreaker;
		min-height: 2.6rem;
		accent-color: var(--accent, hsl(37, 75%, 65%));
	}

	.hotkeys {
		@include styledButton;
		&.dark-mode {
			@include styledButtonDark;
		}
	}
	.winner {
		background-color: hsl(120, 24%, 84%);
		&.dark {
			background-color: hsl(120, 26%, 17%);
		}
	}
	.loser {
		background-color: hsl(0, 37%, 85%);
		&.dark {
			background-color: hsl(24, 33%, 17%);
		}
	}
</style>
