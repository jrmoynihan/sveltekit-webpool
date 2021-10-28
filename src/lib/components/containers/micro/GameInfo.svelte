<script lang="ts">
	import type { ESPNScore, ESPNSituation, ESPNStatus, Game } from '$scripts/classes/game';

	import type { Team } from '$scripts/classes/team';
	import { showIDs, showSpreads } from '$scripts/store';
	import type { Timestamp } from 'firebase/firestore';
	import DateTimeOrDownDistance from './DateTimeOrDownDistance.svelte';
	import SpreadOrPossession from './SpreadOrPossession.svelte';
	import StatusInfo from './StatusInfo.svelte';
	import WinLossAt from './WinLossAt.svelte';

	export let promiseStatus: Promise<ESPNStatus>;
	export let promiseScores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }>;
	export let promiseSituation: Promise<ESPNSituation>;
	export let selectedTeam = '';
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let spread: number;
	export let disabled = false;
	export let id = '';
	export let timestamp: Timestamp;
	export let isATSwinner: boolean;
	export let ATSwinner: string;
	export let gameIsOver: boolean = false;
</script>

<label class="game-info rounded" for="{id}-none">
	<!-- <WinLossAt {promiseScores} {promiseStatus} {homeTeam} {awayTeam} {selectedTeam} {spread} {isATSwinner} /> -->
	<WinLossAt {isATSwinner} {gameIsOver} />
	<StatusInfo {promiseStatus} {promiseScores} {spread} {ATSwinner} {homeTeam} {awayTeam} />
	<SpreadOrPossession {spread} {disabled} {awayTeam} {homeTeam} {promiseSituation} />
	<DateTimeOrDownDistance {timestamp} {promiseStatus} {promiseSituation} />
	<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
	{#if $showIDs}
		<div style="grid-area:IDs">{id}</div>
	{/if}
	{#if $showSpreads}
		<div style="grid-area:spreads">{spread > 0 ? `+${spread}` : spread}</div>
	{/if}
</label>

<style lang="scss">
	.game-info {
		display: grid;
		align-items: end;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(0, auto));
		grid-template-areas:
			'WinLossAt'
			'statusInfo'
			'spreadOrPossession'
			'dateTimeOrDownDistance'
			'spreads'
			'IDs';
	}
	input {
		@include hiddenInput;
	}
</style>
