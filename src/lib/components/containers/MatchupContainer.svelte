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
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam = '';
	export let competitions = [];
	export let currentPicks: WeeklyPickDoc[] = [];
	export let gridColumns = 1;
	export let isATSwinner: null | boolean = null;
	export let ATSwinner: string;
	export let beforeGameTime = false;
	let layoutBreakpoint = 620;
	let showTeamNameImages = false;
	let disabled = !beforeGameTime;
	let gameIsOver = false;
	let element: HTMLElement;
	let showGameContainer = false;

	$: {
		if ($overrideDisabled) {
			disabled = false;
		} else {
			checkGameTime();
		}
	}

	const checkGameTime = async () => {
		if (await isBeforeGameTime(timestamp)) {
			disabled = false;
			beforeGameTime = true;
			// myLog(`game ${id} hasn't started`);
		} else {
			disabled = true;
			beforeGameTime = false;
			// myLog(`game ${id} has started`);
			clearInterval(recheckGameTimeInterval);
		}
	};

	let promiseStatus: Promise<ESPNStatus> = getStatus(competitions);
	let promiseScores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }> =
		getScores(competitions);
	let promiseSituation: Promise<ESPNSituation> = getSituation(competitions);
	let statusInterval: NodeJS.Timer;
	let recheckGameTimeInterval: NodeJS.Timer;

	// Show additional images in larger layout sizes
	$: {
		if ($window_width < layoutBreakpoint * gridColumns) {
			showTeamNameImages = false;
		} else {
			showTeamNameImages = true;
		}
	}
	// ******************
	// Periodically re-check if the game is over
	$: promiseStatus.then(async (status) => {
		if (status?.type?.description === 'Final') {
			gameIsOver = true;
			beforeGameTime = false;
		} else if (status?.type?.description === 'Scheduled') {
			gameIsOver = false;
			beforeGameTime = true;
		}
	});
	// If the game isn't active, stop calling for status data, preventing unncessary API calls
	$: if (gameIsOver || beforeGameTime) {
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
				promiseScores = getScores(competitions);
				promiseStatus = getStatus(competitions);
				promiseSituation = getSituation(competitions);
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
		bind:homeOrAwayTeam={awayTeam}
		bind:id
		bind:selectedTeam
		bind:currentPicks
		bind:element
		bind:showGameContainer
		bind:showTeamNameImages
		bind:disabled
	/>
	<GameInfo
		bind:id
		bind:selectedTeam
		bind:timestamp
		bind:homeTeam
		bind:awayTeam
		bind:spread
		bind:disabled
		bind:promiseScores
		bind:promiseStatus
		bind:promiseSituation
		bind:isATSwinner
		bind:ATSwinner
		bind:gameIsOver
	/>
	<TeamSelectRadioInput
		bind:homeOrAwayTeam={homeTeam}
		bind:id
		bind:selectedTeam
		bind:currentPicks
		bind:element
		bind:showGameContainer
		bind:showTeamNameImages
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
