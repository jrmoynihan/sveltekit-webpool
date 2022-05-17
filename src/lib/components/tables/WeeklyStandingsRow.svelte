<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { Player } from '$classes/player';
	import { selected_week, show_net_tiebreakers } from '$scripts/store';
	import type { Game } from '$classes/game';
	import type { WeeklyTiebreaker } from '$classes/tiebreaker';
	import Tooltip from '../containers/Tooltip.svelte';
	import type { PlayerRecord } from '$lib/scripts/classes/playerRecord';

	export let player: Player;
	export let i: number;
	export let tiebreaker: WeeklyTiebreaker;
	export let record: PlayerRecord;
	export let last_game: Game;
	export let show_UID = false;

	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const even_row = isEvenRow(i);
	const in_the_money = i < 3;
</script>

<!-- The player's rank in the standings -->
<RowData {even_row} {in_the_money}>
	{i + 1}
</RowData>
<RowData {even_row} {in_the_money}>
	{#if player.nickname}
		{player.nickname}
	{:else}
		{player.name}
	{/if}
	{#if show_UID}
		({player.uid})
	{/if}
</RowData>
<RowData {even_row} {in_the_money}>
	{record.wins}
</RowData>
<RowData {even_row} {in_the_money}>
	{record.losses}
</RowData>
<Tooltip>
	<svelte:fragment slot="text">
		{#if last_game.total_score}
			The total score of the last game of week {selected_week} was {last_game.total_score}
		{:else}
			Last game of the week hasn't been played yet.
		{/if}
	</svelte:fragment>
	<RowData slot="content" {even_row} {in_the_money}>
		{#if tiebreaker.score_guess === null}
			-
		{:else}
			{tiebreaker.score_guess}
		{/if}
		{#if $show_net_tiebreakers}
			({record.net_tiebreaker})
		{/if}
	</RowData>
</Tooltip>
<RowData {even_row} {in_the_money}>
	${record.prize_amount}
</RowData>
