<script lang="ts">
	import { isBeforeGameTime } from '$scripts/functions';
	import { overrideDisabled, window_width } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import type { Team } from '$scripts/classes/team';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { onDestroy, onMount } from 'svelte';
	import GameInfo from './micro/GameInfo.svelte';
	import TeamSelectRadioInput from './micro/TeamSelectRadioInput.svelte';
	import type { ESPNScore, ESPNSituation, ESPNStatus } from '$scripts/classes/game';
	import { getScores, getSituation, getStatus } from '$scripts/dataFetching';

	export let id = 'id';
	export let index: number;
	export let spread = 0;
	export let home_team: Team;
	export let away_team: Team;
	export let timestamp: Timestamp;
	export let selected_team_abbreviation = '';
	export let competitions = [];
	export let current_picks: WeeklyPickDoc[] = [];
	export let grid_columns = 1;
	export let is_ATS_winner: null | boolean = null;
	export let ATS_winner: string;
	export let is_before_game_time = false;
	let layout_breakpoint = 620;
	let show_team_name_images = false;
	let disabled: boolean;
	let game_is_over = false;
	let element: HTMLElement;
	let show_game_container = false;

	$: disabled = $overrideDisabled || !is_before_game_time;

	const checkGameTime = async () => {
		if (await isBeforeGameTime(timestamp)) {
			is_before_game_time = true;
		} else {
			is_before_game_time = false;
			clearInterval(recheckGameTimeInterval);
		}
	};

	let promise_status: Promise<ESPNStatus> = getStatus(competitions);
	let promise_scores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }> =
		getScores(competitions);
	let promise_situation: Promise<ESPNSituation> = getSituation(competitions);
	let statusInterval: NodeJS.Timer;
	let recheckGameTimeInterval: NodeJS.Timer;

	// Show additional images in larger layout sizes
	$: show_team_name_images = $window_width > layout_breakpoint * grid_columns;

	// ******************
	// Periodically re-check if the game is over
	$: promise_status.then(async (status) => {
		if (status?.type?.description === 'Final') {
			game_is_over = true;
			is_before_game_time = false;
		} else if (status?.type?.description === 'Scheduled') {
			game_is_over = false;
			is_before_game_time = true;
		}
	});
	// If the game isn't active, stop calling for status data, preventing unncessary API calls
	$: if (game_is_over || is_before_game_time) {
		clearInterval(statusInterval);
	}
	// *****************

	onMount(async () => {
		checkGameTime();
		if (competitions) {
			getScores(competitions);
			getStatus(competitions);
			getSituation(competitions);
		}
		recheckGameTimeInterval = setInterval(async () => {
			checkGameTime();
		}, 60000);

		// Every 60 seconds, update the game status if the game has started, but hasn't ended
		statusInterval = setInterval(() => {
			if (competitions) {
				promise_scores = getScores(competitions);
				promise_status = getStatus(competitions);
				promise_situation = getSituation(competitions);
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
		bind:team={away_team}
		bind:id
		bind:selected_team_abbreviation
		bind:current_picks
		bind:element
		bind:show_game_container
		bind:show_team_name_images
		bind:disabled
	/>
	<GameInfo
		bind:id
		bind:selected_team_abbreviation
		bind:timestamp
		bind:home_team
		bind:away_team
		bind:spread
		bind:disabled
		bind:promise_scores
		bind:promise_status
		bind:promise_situation
		bind:is_ATS_winner
		bind:ATS_winner
		bind:game_is_over
	/>
	<TeamSelectRadioInput
		bind:team={home_team}
		bind:id
		bind:selected_team_abbreviation
		bind:current_picks
		bind:element
		bind:show_game_container
		bind:show_team_name_images
		bind:disabled
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
