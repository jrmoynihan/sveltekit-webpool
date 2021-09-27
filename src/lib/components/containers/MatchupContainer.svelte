<script lang="ts">
	import { getScores, getSituation, getStatus, isBeforeGameTime } from '$scripts/functions';
	import { overrideDisabled, windowWidth } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import type { Team } from '$scripts/classes/team';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { onDestroy, onMount } from 'svelte';
	import GameInfo from './micro/GameInfo.svelte';
	import TeamSelectRadioInput from './micro/TeamSelectRadioInput.svelte';

	export let id = 'id';
	export let index: number;
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam: string = '';
	export let competitions = [];
	export let currentPicks: WeeklyPickDoc[] = [];
	export let gridColumns = 1;
	let layoutBreakpoint = 620;
	let showTeamNameImages = false;
	let disabled: boolean = false;
	let gameIsOver = false;
	let beforeGameTime = false;
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
		beforeGameTime = await isBeforeGameTime(timestamp);
		if (beforeGameTime) {
			disabled = false;
			// myLog(`game ${id} hasn't started`);
		} else {
			disabled = true;
			// myLog(`game ${id} has started`);
			clearInterval(recheckGameTimeInterval);
		}
	};

	let promiseStatus = getStatus(competitions);
	let promiseScores = getScores(competitions);
	let promiseSituation = getSituation(competitions);
	let statusInterval: NodeJS.Timer;
	let recheckGameTimeInterval: NodeJS.Timer;

	// Show additional images in larger layout sizes
	$: {
		if ($windowWidth < layoutBreakpoint * gridColumns) {
			showTeamNameImages = false;
		} else {
			showTeamNameImages = true;
		}
	}
	// Re-check if the game is over periodically, preventing additional API calls for game statuses
	$: promiseStatus.then((status) => {
		if (status?.type?.description === 'Final') {
			gameIsOver = true;
		}
	});
	$: if (gameIsOver || beforeGameTime) {
		clearInterval(statusInterval);
	}
	// **************

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
		}, 30000);
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
		@include gridAndGap;
		@include rounded;
		justify-items: center;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		height: 100%;
	}
</style>
