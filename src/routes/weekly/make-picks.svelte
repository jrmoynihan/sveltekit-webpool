<script lang="ts" context="module">
	export const load = async ({ params, url }) => {
		return {
			props: {
				query_year: (params.year as number) || url.searchParams.get('year') || '',
				query_week: params.week || url.searchParams.get('week') || ''
			}
		};
	};
</script>

<script lang="ts">
	import SubmitPicks from '$components/buttons/SubmitPicks.svelte';
	import PickCounter from '$components/containers/micro/PickCounter.svelte';
	import TiebreakerInput from '$components/inputs/TiebreakerInput.svelte';
	import LoadingSpinner from '$components/misc/LoadingSpinner.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import { focusTiebreaker } from '$lib/scripts/animations/scrollAndFocus';
	import type { Player } from '$lib/scripts/classes/player';
	import type { WeeklyTiebreaker } from '$lib/scripts/classes/tiebreaker';
	import { isBeforeGameTime } from '$lib/scripts/utilities/functions';
	import {
		getLocalScoreViewPreference,
		getLocalStorageItem
	} from '$lib/scripts/utilities/localStorage';
	import { ErrorAndToast, myError, myLog } from '$lib/scripts/utilities/logging';
	import { createTiebreaker, createWeeklyPicksForPlayer } from '$lib/scripts/weekly/weeklyAdmin';
	import { getGameData, getPicksData, getTiebreakerData } from '$lib/scripts/weekly/weeklyPlayers';
	import {
		airplaneDeparture,
		all_icons,
		bomb,
		home,
		policeCarLight
	} from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import {
		all_teams,
		current_picks,
		games_promise,
		larger_than_mobile,
		override_locked_picks,
		picks_promise,
		preferred_score_view,
		selected_player,
		selected_season_type,
		selected_week,
		selected_year,
		tiebreaker_promise,
		tiebreaker_score_guess,
		use_dark_theme
	} from '$scripts/store';
	import { defaultToast, getToast } from '$scripts/toasts';
	import { orderBy, where } from '@firebase/firestore';
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fly } from 'svelte/transition';

	export let query_year: string = null;
	export let query_week: string = null;
	let show_tiebreaker_input: boolean = false;
	let counted_game_times: { upcomingGamesCount: any; playedGamesCount: any };
	let current_pick_count: number;
	let upcoming_games_count: number;
	let number_of_played_games: number;
	let number_of_correct_picks: number;
	let already_made_picks_for_upcoming_games: boolean;
	let number_of_games: number;
	let toastSeenKey = 'toast_makeWeeklyPicks_NewTiebreakerAndSubmit';
	let games: Game[];
	let picks: WeeklyPickDoc[];
	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	onMount(async () => {
		$preferred_score_view = await getLocalScoreViewPreference();
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
		$selected_week = query_week ? parseInt(query_week) : $selected_week;
		$selected_year = query_year ? parseInt(query_year) : $selected_year;
	});

	const getData = async (
		player: Player = $selected_player,
		week: number = $selected_week,
		year: number = $selected_year,
		season_type: string = $selected_season_type
	) => {
		try {
			const game_constraints = [
				where('season_year', '==', year),
				where('week', '==', week),
				where('season_type', '==', season_type),
				orderBy('timestamp'),
				orderBy('id')
			];
			const tiebreaker_constraints = [
				where('season_year', '==', year),
				where('week', '==', week),
				where('season_type', '==', season_type),
				where('uid', '==', player.uid)
			];
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

			// If tiebreaker doc isn't found, create one and return it
			if (!tiebreakers || tiebreakers?.length === 0) {
				$tiebreaker_promise = createTiebreaker({
					player,
					week,
					season_year: year,
					season_type
				});
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
			already_made_picks_for_upcoming_games =
				picks.filter((p) => p.pick !== '').length >= counted_game_times.upcomingGamesCount;
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

	const updatePicks = async (
		games: Game[],
		picks: WeeklyPickDoc[],
		showToast: boolean = false,
		logIcon: string = '',
		logAndToastMsg: string = '',
		focusTiebreakerAfterwards: boolean = false,
		homeOrAway?: 'Home' | 'Away'
	): Promise<WeeklyPickDoc[]> => {
		try {
			const games_already_started = games
				.filter((game) => !game.is_before_game_time)
				.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
			picks.forEach(async (pickDoc) => {
				const game_that_matches_pick = games.find((game) => game.id === pickDoc.game_id);
				const is_able_to_pick = game_that_matches_pick.is_before_game_time;
				if (is_able_to_pick || $override_locked_picks) {
					if (homeOrAway === 'Home') {
						pickDoc.pick = game_that_matches_pick.home_team_abbreviation;
					} else if (homeOrAway === 'Away') {
						pickDoc.pick = game_that_matches_pick.away_team_abbreviation;
					} else {
						pickDoc.pick = '';
					}
				}
			});
			if (games_already_started.length > 0 && !$override_locked_picks) {
				defaultToast({
					title: 'Some Games Already Started!',
					msg: `Unable to update the following picks: <br> ${games_already_started
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
		picks = await updatePicks(games, picks, false, home, 'Picked all home teams!', true, 'Home');
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
			'Away'
		);
		return picks;
	};

	const pickAllFavored = async (games: Game[], picks: WeeklyPickDoc[]) => {
		try {
			let spreadsMissing = false;
			const favored = games.map((game) => {
				const { home_team_abbreviation, away_team_abbreviation } = game;
				if (game.spread < 0) {
					return home_team_abbreviation;
				} else if (game.spread > 0) {
					return away_team_abbreviation;
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
						pickDoc.pick = favored[i];
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
				const { home_team_abbreviation, away_team_abbreviation } = game;
				if (game.spread < 0) {
					return away_team_abbreviation;
				} else if (game.spread > 0) {
					return home_team_abbreviation;
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
						pickDoc.pick = underdogs[i];
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

	const getYardLine = (index: number) => {
		return Math.floor((index + 2) / 2) * 10;
	};

	$: if (current_pick_count >= 0 && number_of_games > 0) {
		if (upcoming_games_count + number_of_played_games === number_of_games) {
			$progress = current_pick_count / number_of_games;
		} else if (upcoming_games_count > 0) {
			$progress = current_pick_count / upcoming_games_count;
		}
	}

	$: if ($selected_player.uid && $selected_year && $selected_week && $selected_season_type)
		getData();
	$: number_of_games = $current_picks?.length;
	$: current_pick_count = $current_picks?.filter((pick) => pick.pick !== '').length;
	$: number_of_correct_picks = $current_picks?.filter((pick) => pick.is_correct === true).length;
	$: upcoming_games_count = counted_game_times?.upcomingGamesCount;
	$: number_of_played_games = counted_game_times?.playedGamesCount;
	$: show_submit_picks = $tiebreaker_score_guess && current_pick_count >= upcoming_games_count;
	$: show_tiebreaker_input =
		current_pick_count >= number_of_played_games + upcoming_games_count &&
		upcoming_games_count !== 0;
	// $: console.log('show_tiebreaker_input', show_tiebreaker_input);
	// $: console.log('current_pick_count', current_pick_count);
	// $: console.log('number_of_played_games', number_of_played_games);
	// $: console.log('upcoming_games_count', upcoming_games_count);
</script>

<PageTitle>Make Weekly Picks</PageTitle>
<section class="grid positioning">
	<div class="pick-status fixed grid {$larger_than_mobile ? 'bottom-left' : 'bottom-right'}">
		{#if current_pick_count >= 0 && number_of_games > 0}
			{#key current_pick_count}
				<PickCounter
					invisible={$tiebreaker_score_guess >= 10 && show_submit_picks}
					bind:currentPickCount={current_pick_count}
					bind:totalGameCount={number_of_games}
					bind:upcomingGamesCount={upcoming_games_count}
				/>
			{/key}
			{#if show_tiebreaker_input || $override_locked_picks}
				<TiebreakerInput bind:score_guess={$tiebreaker_score_guess} />
			{:else if upcoming_games_count !== 0}
				<progress value={$progress || 0} />
			{/if}
			{#if number_of_played_games > 0}
				<div class="correct-count">{number_of_correct_picks} of {number_of_games} correct</div>
			{/if}
			{#await $tiebreaker_promise then tiebreakers}
				{#if show_submit_picks}
					{@const tiebreaker = tiebreakers[0]}
					<SubmitPicks
						{tiebreaker}
						bind:upcoming_games_count
						bind:already_made_picks_for_upcoming_games
					/>
				{/if}
			{:catch error}
				<ErrorModal {error} />
			{/await}
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

	<div class="week-games grid">
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
									{@const home_team = $all_teams.find(
										(team) => team.abbreviation === game.home_team_abbreviation
									)}
									{@const away_team = $all_teams.find(
										(team) => team.abbreviation === game.away_team_abbreviation
									)}
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
										<MatchupContainer bind:game bind:pickDoc index={i} {home_team} {away_team} />
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
	.week-games {
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
		max-width: 100%;
		&.dark-mode {
			@include styledButtonDark;
			max-width: 100%;
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
