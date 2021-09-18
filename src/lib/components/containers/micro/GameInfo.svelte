<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { showIDs, showSpreads } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import DateTimeOrDownDistance from './DateTimeOrDownDistance.svelte';
	import ScoresAts from './ScoresATS.svelte';
	import SpreadOrPossession from './SpreadOrPossession.svelte';
	import StatusInfo from './StatusInfo.svelte';
	import WinLossAt from './WinLossAt.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let promiseSituation: Promise<any>;
	export let selectedTeam: string = '';
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let spread: number;
	export let disabled: boolean = false;
	export let id: string = '';
	export let timestamp: Timestamp;
</script>

<label class="game-info rounded" for="{id}-none">
	<WinLossAt {promiseScores} {promiseStatus} {homeTeam} {awayTeam} {selectedTeam} {spread} />
	<StatusInfo {promiseStatus} {promiseScores} />
	<ScoresAts {promiseStatus} {promiseScores} {spread} />
	<SpreadOrPossession {spread} {disabled} {awayTeam} {homeTeam} {promiseSituation} />
	<DateTimeOrDownDistance {timestamp} {promiseStatus} {promiseSituation} />
	<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
	{#if $showIDs}
		<div style="grid-area:IDs">{id}</div>
	{/if}
	{#if $showSpreads}
		<div style="grid-area:spreads">{spread}</div>
	{/if}
</label>

<style lang="scss">
	.game-info {
		display: grid;
		align-items: end;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
		grid-template-areas:
			'WinLossAt'
			'statusInfo'
			'scoresATS'
			'spreadOrPossession'
			'dateTimeOrDownDistance'
			'spreads'
			'IDs';
	}
	input {
		@include hiddenRadio;
	}
</style>
