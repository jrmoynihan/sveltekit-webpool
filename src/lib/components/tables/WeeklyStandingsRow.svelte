<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { Game } from '$scripts/classes/game';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import type { WebUser } from '$scripts/classes/webUser';
	import Tooltip from '../containers/Tooltip.svelte';

	export let player: WebUser;
	export let i: number;
	export let selectedWeek: number;
	export let tiebreaker: WeeklyTiebreaker;
	export let lastGame: Game;
	export let showNetTiebreakers: boolean = false;
	export let showUID: boolean = false;

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
		({player.id})
	{/if}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].wins}
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
		{#if tiebreaker.tiebreaker === null}
			-
		{:else}
			{tiebreaker.tiebreaker}
		{/if}
		{#if showNetTiebreakers}
			({player.weeklyPickRecord[`week_${selectedWeek}`].netTiebreaker})
		{/if}
	</RowData>
</Tooltip>
<RowData {evenRow} {inTheMoney}>
	${player.weeklyWinnings[`week_${selectedWeek}`]}
</RowData>
