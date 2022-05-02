<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { Player } from '$classes/player';
	import { selectedWeek } from '$scripts/store';
	import type { Game } from '$classes/game';
	import type { WeeklyTiebreaker } from '$classes/tiebreaker';
	import Tooltip from '../containers/Tooltip.svelte';

	export let player: Player;
	export let i: number;
	export let tiebreaker: WeeklyTiebreaker;
	export let lastGame: Game;
	export let showNetTiebreakers = false;
	export let showUID = false;

	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const evenRow = isEvenRow(i);
	const inTheMoney = i < 3;
</script>

<RowData {evenRow} {inTheMoney}>
	{i + 1}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{#if player.nickname}
		{player.nickname}
	{:else}
		{player.name}
	{/if}
	{#if showUID}
		({player.uid})
	{/if}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.weeklyPickRecord[`week_${$selectedWeek}`].wins}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].losses}
</RowData>
<Tooltip>
	<svelte:fragment slot="text">
		{#if lastGame.totalScore}
			The total score of the last game of week {selectedWeek} was {lastGame.totalScore}
		{:else}
			Last game of the week hasn't been played yet.
		{/if}
	</svelte:fragment>
	<RowData slot="content" {evenRow} {inTheMoney}>
		{#if tiebreaker.scoreGuess === null}
			-
		{:else}
			{tiebreaker.scoreGuess}
		{/if}
		{#if showNetTiebreakers}
			({player.weeklyPickRecord[`week_${selectedWeek}`].netTiebreaker})
		{/if}
	</RowData>
</Tooltip>
<RowData {evenRow} {inTheMoney}>
	${player.weeklyWinnings[`week_${selectedWeek}`]}
</RowData>
