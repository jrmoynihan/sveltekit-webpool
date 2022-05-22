<script lang="ts">
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { weeklyPickConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import {
		current_picks,
		games_promise,
		larger_than_mobile,
		override_locked_picks,
		picks_promise,
		preferred_score_view,
		tiebreaker_promise,
		use_dark_theme,
		selected_week,
		selected_player,
		selected_season_year,
		selected_season_type,
		tiebreaker_score_guess,
		selected_year
	} from '$scripts/store';
	import { DocumentReference, orderBy, updateDoc, where } from '@firebase/firestore';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { isBeforeGameTime } from '$scripts/functions';
	import {
		airplaneDeparture,
		all_icons,
		bomb,
		checkmark,
		home,
		HomeOrAway,
		policeCarLight
	} from '$scripts/classes/constants';
	import { onMount } from 'svelte';
	import { defaultToast, getToast } from '$scripts/toasts';
	import TiebreakerInput from '$components/inputs/TiebreakerInput.svelte';
	import PickCounter from '$components/containers/micro/PickCounter.svelte';
	import SubmitPicks from '$components/buttons/SubmitPicks.svelte';
	import { fly } from 'svelte/transition';
	import LoadingSpinner from '$components/misc/LoadingSpinner.svelte';
	import type { Game } from '$scripts/classes/game';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import { focusTiebreaker } from '$scripts/scrollAndFocus';
	import { ErrorAndToast, myError, myLog } from '$scripts/logging';
	import { getGameData, getPicksData, getTiebreakerData } from '$lib/scripts/weekly/weeklyPlayers';
	import { createTiebreaker, createWeeklyPicksForPlayer } from '$lib/scripts/weekly/weeklyAdmin';
	import type { Player } from '$lib/scripts/classes/player';
	import type { WeeklyTiebreaker } from '$lib/scripts/classes/tiebreaker';

	let show_tiebreaker_input: boolean = false;
	let counted_game_times: { upcomingGamesCount: any; playedGamesCount: any };
	let current_pick_count: number;
	let upcoming_games_count: number;
	let number_of_played_games: number;
	let number_of_correct_picks: number;
	let number_of_games: number;
	let toastSeenKey = 'toast_makeWeeklyPicks_NewTiebreakerAndSubmit';
	let games: Game[];
	let picks: WeeklyPickDoc[];
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	onMount(async () => {
		$preferred_score_view = await getLocalStorageItem('scoreViewPreference');
		const toastSeen = await getLocalStorageItem(toastSeenKey);
		if (toastSeen !== 'true') {
			const promisedToast = await getToast('Make Picks');
			setTimeout(() => {
				defaultToast({
					title: promisedToast.title,
					msg: promisedToast.msg,
					duration: 15_000,
					useSeenToastComponent: true,
					localStorageKey: toastSeenKey
				});
			}, 2000);
		}
	});

	const getData = async (
		player: Player = $selected_player,
		week: number = $selected_week,
		year: number = $selected_year,
		season_type: string = $selected_season_type
	) => {
		try {
			const game_constraints = [
				where('year', '==', year),
				where('week', '==', week),
				where('season_type', '==', season_type)
			];
			const tiebreaker_constraints = [...game_constraints, where('uid', '==', player.uid)];
			const picks_constraints = [
				...tiebreaker_constraints,
				orderBy('timestamp'),
				orderBy('game_id')
			];
			$games_promise = getGameData({ constraints: game_constraints });
			$picks_promise = getPicksData({ constraints: picks_constraints });
			$tiebreaker_promise = getTiebreakerData({ constraints: tiebreaker_constraints });
			games = await $games_promise;
			picks = await $picks_promise;
			$current_picks = await $picks_promise;
			let tiebreakers: WeeklyTiebreaker[] = await $tiebreaker_promise;

			// If tiebreaker doc found, create one and return it
			if (!tiebreakers || tiebreakers?.length === 0) {
				$tiebreaker_promise = createTiebreaker(player.uid, week, year, season_type);
				tiebreakers = await $tiebreaker_promise;
			}
			// Multiple tiebreaker docs found, throw an error. Can't determine which one to use if the query returned multiple.
			else if (tiebreakers.length > 1) {
				throw new Error('There should only be one tiebreaker');
			}

			$tiebreaker_score_guess = tiebreakers[0].score_guess;

			// Resiliently fall back to making the pick documents if they don't exist; then re-query the picks
			if (!picks || picks?.length === 0) {
				await createWeeklyPicksForPlayer({
					player,
					games
				});
				$picks_promise = getPicksData({ constraints: picks_constraints });
				$current_picks = await $picks_promise;
				picks = await $picks_promise;
			}

			await Promise.all([$games_promise, $picks_promise, $tiebreaker_promise]);
			counted_game_times = await countPlayedOrUpcomingGames(games);
		} catch (error) {
			myError({ error });
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
					game.is_before_game_time = true;
				} else {
					// Increment [already] played games if the game is after its gametime
					playedGamesCount++;
					game.is_before_game_time = false;
				}
			}
			upcomingGamesCount > 0 ? myLog({ msg: `${upcomingGamesCount} upcoming games` }) : null;
			playedGamesCount > 0 ? myLog({ msg: `${upcomingGamesCount} already played games` }) : null;
			return { upcomingGamesCount, playedGamesCount };
		} catch (error) {
			const msg = 'Unable to check game times. Please see the console for more details.';
			ErrorAndToast({ msg, error });
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
				const { doc_ref, pick } = currentPick;

				try {
					await updateDoc(doc_ref.withConverter(weeklyPickConverter), { pick });
				} catch (error) {
					const msg = 'Unable to update pick. Please see the console for more details.';
					ErrorAndToast({
						msg,
						error,
						additional_params: currentPick
					});
				}
			});
			myLog({
				msg: 'Updated/submitted picks!',
				icon: all_icons.okHand,
				additional_params: currentPicks
			});

			// Refresh the picks on page after submit -- NOTE: Is this needed? 5/12/2022
			// const picks_constraints = [where('uid', '==', uid), where('week', '==', $selected_week), where('year', '==', $selected_year), where('season_type', '==', $selected_season_type)];
			// $picks_promise = getPicksData({constraints: picks_constraints});

			await updateTiebreakerDoc(docRef, uid, scoreGuess, $selected_week, $selected_season_year);

			defaultToast({
				title: `${checkmark} Picks submitted!`,
				msg: `You can change any game's pick prior to that game's start time.`,
				duration: 10000
			});
		} catch (error) {
			const msg = 'Unable to submit picks. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: currentPicks
			});
		}
	};
	const updateTiebreakerDoc = async (
		doc_ref: DocumentReference,
		uid: string,
		score_guess: number,
		week: number,
		year: number
	): Promise<void> => {
		try {
			await updateDoc(doc_ref.withConverter(weeklyTiebreakerConverter), {
				doc_ref,
				score_guess,
				uid: uid,
				season_type: 'Regular Season',
				week,
				year
			});
			myLog({
				msg: 'Updated/submitted tiebreaker!',
				icon: all_icons.okHand,
				additional_params: score_guess
			});
		} catch (error) {
			const msg = 'Unable to update tiebreaker. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: { score_guess, uid, doc_ref }
			});
		}
	};
	const updatePicks = async (
		games: Game[],
		picks: WeeklyPickDoc[],
		showToast: boolean = false,
		logIcon: string = '',
		logAndToastMsg: string = '',
		focusTiebreakerAfterwards: boolean = false,
		homeOrAway?: HomeOrAway
	): Promise<WeeklyPickDoc[]> => {
		try {
			const games_past_gametime = games
				.filter((game) => !game.is_before_game_time)
				.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
			picks.forEach(async (pickDoc) => {
				const matchingGame = games.find((game) => game.id === pickDoc.game_id);
				const ableToPick = matchingGame.is_before_game_time;
				if (ableToPick || $override_locked_picks) {
					if (homeOrAway === 'Home') {
						const homeTeam = matchingGame.home_team;
						pickDoc.pick = homeTeam.abbreviation;
					} else if (homeOrAway === 'Away') {
						const awayTeam = matchingGame.away_team;
						pickDoc.pick = awayTeam.abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			if (games_past_gametime.length > 0 && !$override_locked_picks) {
				defaultToast({
					title: 'Some Games Already Started!',
					msg: `Unable to update the following picks: <br> ${games_past_gametime
						.map((g) => `<p>${g.short_name}</p>`)
						.join('')}`
				});
			}
			logAndToastMsg
				? myLog({
						msg: logAndToastMsg,
						icon: all_icons[logIcon],
						additional_params: picks,
						traceLocation: true
				  })
				: null;
			showToast ? defaultToast({ msg: logAndToastMsg }) : null;
			focusTiebreakerAfterwards ? focusTiebreaker() : null;
			return picks;
		} catch (error) {
			const msg = 'Unable to update picks. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: {
					games,
					picks,
					showToast,
					logIcon,
					logAndToastMsg,
					focusTiebreakerAfterwards,
					homeOrAway
				}
			});
		}
	};
	const resetPicks = async (games: Game[], picks: WeeklyPickDoc[]) => {
		picks = await updatePicks(games, picks, false, bomb, 'Reset all picks!', false);
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
			HomeOrAway.Away
		);
		return picks;
	};

	const pickAllFavored = async (games: Game[], picks: WeeklyPickDoc[]) => {
		try {
			let spreadsMissing = false;
			const favored = games.map((game) => {
				if (game.spread < 0) {
					return game.home_team;
				} else if (game.spread > 0) {
					return game.away_team;
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
				pickDoc.is_before_game_time = ableToPick;
				if (ableToPick || $override_locked_picks) {
					if (favored[i] !== null && favored[i] !== undefined) {
						pickDoc.pick = favored[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog({ msg: 'Picked favored teams!', icon: all_icons.okHand });
			focusTiebreaker();
			return picks;
		} catch (error) {
			const msg = 'Unable to pick favored teams. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: { games, picks }
			});
		}
	};
	const pickAllDogs = async (games: Game[], picks: WeeklyPickDoc[]) => {
		try {
			let spreadsMissing = false;
			const underdogs = games.map((game) => {
				if (game.spread < 0) {
					return game.away_team;
				} else if (game.spread > 0) {
					return game.home_team;
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
				pickDoc.is_before_game_time = ableToPick;
				if (ableToPick || $override_locked_picks) {
					if (underdogs[i] !== null && underdogs[i] !== undefined) {
						pickDoc.pick = underdogs[i].abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			myLog({ msg: 'Picked all underdogs!', icon: all_icons.dogFace });
			focusTiebreaker();
			return picks;
		} catch (error) {
			const msg = 'Unable to pick all underdogs. Please see the console for more details.';
			ErrorAndToast({
				msg,
				error,
				additional_params: { games, picks }
			});
		}
	};

	const isATSwinner = (pickDoc: WeeklyPickDoc, game: Game): boolean => {
		// console.log(`game: ${game.name} (${game.id})`);
		if (pickDoc.pick === '') {
			// console.log(`pick is empty`);
			return false;
		} else if (game.ATS_winner === 'push') {
			// console.log(`game is a push`);
			return true;
		} else if (game.ATS_winner === pickDoc.pick) {
			// console.log(`pick is correct`);
			return true;
		} else {
			// console.log(`Game is either unscored/incomplete or pick is incorrect`, pickDoc.pick, game.ATSwinner);
			return false;
		}
	};

	const getYardLine = (index: number) => {
		return Math.floor((index + 2) / 2) * 10;
	};

	$: {
		if (current_pick_count >= 0 && number_of_games > 0) {
			if (upcoming_games_count + number_of_played_games === number_of_games) {
				$progress = current_pick_count / number_of_games;
			} else if (upcoming_games_count > 0) {
				$progress = current_pick_count / upcoming_games_count;
			}
		}
	}

	$: if ($selected_player.uid && $selected_year && $selected_week && $selected_season_type)
		getData();
	$: number_of_games = $current_picks?.length;
	$: current_pick_count = $current_picks?.filter((pick) => pick.pick !== '').length;
	$: number_of_correct_picks = $current_picks?.filter((pick) => pick.is_correct === true).length;
	$: upcoming_games_count = counted_game_times?.upcomingGamesCount;
	$: number_of_played_games = counted_game_times?.playedGamesCount;
	$: show_tiebreaker_input =
		current_pick_count >= number_of_played_games + upcoming_games_count &&
		upcoming_games_count !== 0;
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<section class="grid positioning">
	<div class="pick-status fixed grid {$larger_than_mobile ? 'bottom-left' : 'bottom-right'}">
		{#if current_pick_count >= 0 && number_of_games > 0}
			{#key current_pick_count}
				<PickCounter
					invisible={$tiebreaker_score_guess >= 10 && show_tiebreaker_input}
					bind:currentPickCount={current_pick_count}
					bind:totalGameCount={number_of_games}
					bind:upcomingGamesCount={upcoming_games_count}
				/>
			{/key}
			{#await $tiebreaker_promise then tiebreakers}
				{#if tiebreakers}
					{@const tiebreaker = tiebreakers[0]}
					<SubmitPicks
						on:click={() =>
							submitPicksAndTiebreaker(
								$selected_player.uid,
								tiebreaker.doc_ref,
								$tiebreaker_score_guess,
								$current_picks
							)}
						disabled={!tiebreaker}
						ableToTab={$tiebreaker_score_guess >= 10 ? 0 : -1}
						pulse={$tiebreaker_score_guess >= 10}
						invisible={$tiebreaker_score_guess < 10 ||
							$tiebreaker_score_guess === undefined ||
							upcoming_games_count === 0}
					/>
				{/if}
			{:catch error}
				<ErrorModal {error} />
			{/await}
			{#if show_tiebreaker_input || $override_locked_picks}
				<TiebreakerInput
					scoreGuess={$tiebreaker_score_guess}
					on:change={(e) => {
						$tiebreaker_score_guess = parseInt(e.detail);
					}}
				/>
			{:else if upcoming_games_count !== 0}
				<progress value={$progress || 0} />
			{/if}
			{#if number_of_played_games > 0}
				<div class="correct-count">{number_of_correct_picks} of {number_of_games} correct</div>
			{/if}
		{/if}
	</div>
	<div class="first-row grid">
		<WeekSelect customStyles="grid-area: week;" />
		<button
			disabled={!$current_picks || !games}
			style="grid-area:reset;"
			on:click={async () => ($current_picks = await resetPicks(games, $current_picks))}
			class:dark-mode={$use_dark_theme}
			class="hotkeys"
		>
			Reset Picks
		</button>
	</div>

	<!-- prettier-ignore -->
	<div class="second-row grid">
		<button disabled={!games || !picks} on:click={async ()=> $current_picks = await pickAllAway(games,picks)} class:dark-mode={$use_dark_theme} class="hotkeys">All Away</button>
		<button disabled={!games || !picks} on:click={async ()=> $current_picks = await pickAllFavored(games,picks)} class:dark-mode={$use_dark_theme} class="hotkeys">All Favored</button>
		<button disabled={!games || !picks} on:click={async ()=> $current_picks = await pickAllDogs(games,picks)} class:dark-mode={$use_dark_theme} class="hotkeys">All Underdogs</button>
		<button disabled={!games || !picks} on:click={async ()=> $current_picks = await pickAllHome(games,picks)} class:dark-mode={$use_dark_theme} class="hotkeys">All Home</button>
	</div>

	<div class="grid weekGames">
		{#await $picks_promise}
			<LoadingSpinner msg="Loading picks..." width="100%" />
		{:then}
			{#if $current_picks?.length !== 0}
				{#each $current_picks as pickDoc (pickDoc.game_id)}
					{#await $games_promise}
						<LoadingSpinner msg="Loading games..." width="100%" />
					{:then games}
						{#if games.length !== 0}
							{#each games as game, i (game.id)}
								{#if pickDoc.game_id === game.id}
									<div
										class="game-container"
										class:unselected={!pickDoc.pick}
										class:showYard={$larger_than_mobile}
										class:rightYard={i % 2 !== 0 && $larger_than_mobile}
										class:leftYard={i % 2 === 0 && $larger_than_mobile}
										style="--yard:'{getYardLine(i) > 50
											? ((getYardLine(i) - 100) * -1).toString()
											: getYardLine(i).toString()}';"
										in:fly={{ x: -100, duration: 300, delay: 0 }}
										out:fly={{ x: 100, duration: 300 }}
										class:winner={game.ATS_winner === pickDoc.pick && game.ATS_winner !== ''}
										class:loser={game.ATS_winner ? game.ATS_winner !== pickDoc.pick : null}
										class:dark={$use_dark_theme}
									>
										<MatchupContainer
											bind:selected_team_abbreviation={pickDoc.pick}
											bind:is_before_game_time={game.is_before_game_time}
											id={game.id}
											index={i}
											spread={game.spread}
											home_team={game.home_team}
											away_team={game.away_team}
											timestamp={game.timestamp}
											competitions={game.competitions}
											is_ATS_winner={isATSwinner(pickDoc, game)}
											ATS_winner={game.ATS_winner}
										/>
									</div>
								{/if}
							{/each}
						{/if}
					{:catch}
						<ErrorModal error={'Error in loading games documents.'} />
					{/await}
				{/each}
			{/if}
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
		@include gridAndGap($gap: 2rem);
		place-items: center;
	}
	.positioning {
		grid-template-columns: minmax(100%, 1fr);
		grid-template-areas:
			'firstRow'
			'secondRow'
			'main';
		@include responsive_desktop_only {
			grid-template-columns: 1fr;
			grid-template-rows: min-content min-content 1fr;
			grid-template-areas:
				'firstRow'
				'secondRow'
				'main';
		}
	}
	.game-container {
		@include defaultContainerStyles;
		position: relative; // for the pseudo-element absolute positioning below
		cursor: initial;
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
				top: -24.5%;
				height: 0;
				font-size: 7em;
				font-weight: bold;
				font-family: 'Rozha One', 'Imbue', 'Open Sans', sans-serif;
				color: hsla(var(--text-value, white), 10%);
				align-content: start;
			}
			&::after {
				content: '';
				top: -5.5%;
				height: 2px;
				background: hsla(var(--text-value, white), 10%);
			}
			&.rightYard::after,
			&.leftYard::after {
				width: 109.6%;
			}
			&.rightYard::after {
				transform: translate3d(-48.7%, 0, 0);
			}
			&.leftYard::after {
				transform: translate3d(-51.7%, 0, 0);
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
		box-sizing: border-box;
		padding: 1rem;
		padding-bottom: 3rem;
		grid-area: main;
		grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
		width: clamp(60vw, 60rem, 100%);
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
