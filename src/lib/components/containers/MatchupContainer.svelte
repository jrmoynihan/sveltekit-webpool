<script lang="ts">
	import type { WeeklyPickDoc } from '$lib/scripts/classes/picks';
	import type { Team } from '$lib/scripts/classes/team';
	import { isBeforeGameTime } from '$lib/scripts/utilities/functions';
	import type { ESPNScore, ESPNSituation, ESPNStatus, Game } from '$scripts/classes/game';
	import { getScoreData, getSituation, getStatus } from '$scripts/dataFetching';
	import { override_locked_picks, window_width } from '$scripts/store';
	import { onDestroy, onMount, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import GameInfo from './micro/GameInfo.svelte';
	import TeamSelectRadioInput from './micro/TeamSelectRadioInput.svelte';

	export let index: number;
	export let game: Game;
	export let home_team: Team;
	export let away_team: Team;
	export let pickDoc: WeeklyPickDoc;
	export let grid_columns = 1;
	let { id, competitions, spread, timestamp, ATS_winner } = game;

	let layout_breakpoint = 620;
	let show_team_name_images = false;
	let element: HTMLElement;
	let show_game_container = false;

	const checkGameTime = async () => {
		if (await isBeforeGameTime(timestamp)) {
			game.is_before_game_time = true;
		} else {
			game.is_before_game_time = false;
			clearInterval(recheckGameTimeInterval);
		}
	};
	const checkIfPickIsATSWinner = (pickDoc: WeeklyPickDoc, game: Game): boolean => {
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

	const is_ATS_winner: Writable<null | boolean> = writable(null);
	const game_is_over: Writable<boolean> = writable(false);
	let disabled: Writable<boolean> = writable(false);
	const promise_status: Writable<Promise<ESPNStatus>> = writable(getStatus(competitions));
	const promise_scores: Writable<
		Promise<{ home_score_data: ESPNScore; away_score_data: ESPNScore }>
	> = writable(getScoreData(competitions));
	const promise_situation: Writable<Promise<ESPNSituation>> = writable(getSituation(competitions));
	let statusInterval: NodeJS.Timer;
	let recheckGameTimeInterval: NodeJS.Timer;

	// Show additional images in larger layout sizes
	$: show_team_name_images = $window_width > layout_breakpoint * grid_columns;

	// Disable the radio input if the game has started or the admin has not toggled the override button
	$: $disabled = !(game.is_before_game_time || $override_locked_picks);

	$: $is_ATS_winner = checkIfPickIsATSWinner(pickDoc, game);

	// ******************
	// Periodically re-check if the game is over
	$: $promise_status.then(async (status) => {
		if (status?.type?.description === 'Final') {
			$game_is_over = true;
			game.is_before_game_time = false;
		} else if (status?.type?.description === 'Scheduled') {
			$game_is_over = false;
			game.is_before_game_time = true;
		}
	});
	// If the game isn't active, stop calling for status data, preventing unncessary API calls
	$: if (game_is_over || game.is_before_game_time) {
		clearInterval(statusInterval);
	}
	// *****************
	setContext('home_team', home_team);
	setContext('away_team', away_team);
	setContext('promise_status', promise_status);
	setContext('promise_scores', promise_scores);
	setContext('promise_situation', promise_situation);
	setContext('spread', spread);
	setContext('timestamp', timestamp);
	setContext('disabled', disabled);
	setContext('game_is_over', game_is_over);
	setContext('is_ATS_winner', is_ATS_winner);
	setContext('ATS_winner', ATS_winner);

	onMount(async () => {
		checkGameTime();
		if (competitions) {
			getScoreData(competitions);
			getStatus(competitions);
			getSituation(competitions);
		}
		recheckGameTimeInterval = setInterval(async () => {
			checkGameTime();
		}, 60000);

		// Every 60 seconds, update the game status if the game has started, but hasn't ended
		statusInterval = setInterval(() => {
			if (competitions) {
				$promise_scores = getScoreData(competitions);
				$promise_status = getStatus(competitions);
				$promise_situation = getSituation(competitions);
			}
		}, 60_000);
	});

	// Prevent memory leak
	onDestroy(() => {
		clearInterval(statusInterval);
		clearInterval(recheckGameTimeInterval);
	});
</script>

<div bind:this={element} id="game-{index}">
	<TeamSelectRadioInput
		team={away_team}
		bind:pick={pickDoc.pick}
		bind:id
		bind:element
		bind:show_game_container
		bind:show_team_name_images
		bind:disabled={$disabled}
	/>
	<GameInfo bind:id bind:pick={pickDoc.pick} bind:ATS_winner />
	<TeamSelectRadioInput
		team={home_team}
		bind:pick={pickDoc.pick}
		bind:id
		bind:element
		bind:show_game_container
		bind:show_team_name_images
		bind:disabled={$disabled}
	/>
</div>

<style lang="scss">
	div {
		@include gridAndGap($gap: 1.6rem);
		@include rounded;
		justify-items: center;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		height: 100%;
	}
</style>
