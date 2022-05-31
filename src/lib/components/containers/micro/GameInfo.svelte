<script lang="ts">
	import { scorePicksForWeek, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import {
		selected_week,
		selected_season_year,
		show_ATS_winner,
		show_IDs,
		show_spreads,
		current_player
	} from '$scripts/store';
	import { getContext } from 'svelte';
	import DateTimeOrDownDistance from './DateTimeOrDownDistance.svelte';
	import SpreadOrPossession from './SpreadOrPossession.svelte';
	import StatusInfo from './StatusInfo.svelte';
	import WinLossAt from './WinLossAt.svelte';
	import type { Writable } from 'svelte/store';

	export let pick = '';
	export let id = '';
	export let ATS_winner: string;
	let spread: number = getContext('spread');
	let disabled: Writable<boolean> = getContext('disabled');
	let game_is_over: Writable<boolean> = getContext('game_is_over');
</script>

<label class="game-info rounded" for="{id}-none">
	<WinLossAt />
	<StatusInfo />
	<SpreadOrPossession />
	<DateTimeOrDownDistance />
	<input id="{id}-none" type="radio" bind:group={pick} value="" disabled={$disabled} />
	{#if $show_IDs}
		<div style="grid-area:IDs">{id}</div>
	{/if}
	{#if $show_spreads}
		<div style="grid-area:spreads">{spread > 0 ? `+${spread}` : spread}</div>
	{/if}
	<!-- @NOTE: Shows the ATS winner to admins if it hasn't been set AND the game is already over. i.e. the admin is able to score it now -->
	{#if $show_ATS_winner || ($current_player.admin && $game_is_over && !ATS_winner)}
		<button
			class="admin"
			on:click={async () => {
				await updateGamesAndATSWinners($selected_week, $selected_season_year);
				await scorePicksForWeek($selected_week, $selected_season_year);
			}}
		>
			{ATS_winner ? ATS_winner : 'Score Games!'}
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
