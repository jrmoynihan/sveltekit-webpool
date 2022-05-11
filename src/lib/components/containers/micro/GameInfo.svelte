<script lang="ts">
	import type { ESPNScore, ESPNSituation, ESPNStatus } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import { scorePicksForWeek, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import {
		selected_week,
		selected_season_year,
		show_ATS_winner,
		show_IDs,
		show_spreads,
		current_player
	} from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
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
	{#if $show_IDs}
		<div style="grid-area:IDs">{id}</div>
	{/if}
	{#if $show_spreads}
		<div style="grid-area:spreads">{spread > 0 ? `+${spread}` : spread}</div>
	{/if}
	<!-- @NOTE: Shows the ATS winner to admins if it hasn't been set AND the game is already over. i.e. the admin is able to score it now -->
	{#if $show_ATS_winner || ($current_player.admin && gameIsOver && !ATSwinner)}
		<button
			class="admin"
			on:click={async () => {
				await updateGamesAndATSWinners($selected_week, $selected_season_year);
				await scorePicksForWeek($selected_week, $selected_season_year);
			}}
		>
			{ATSwinner ? ATSwinner : 'Score Games!'}
		</button>
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
			'IDs'
			'ATSwinner';
	}
	input {
		@include hiddenInput;
	}
	.admin {
		@include defaultButtonStyles;
		@include admin;
		@include rounded;
		padding: var(--padding-normal);
		grid-area: ATSwinner;
	}
</style>
