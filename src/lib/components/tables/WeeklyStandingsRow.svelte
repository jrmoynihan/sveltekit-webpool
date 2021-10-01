<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import type { WebUser } from '$scripts/classes/webUser';

	export let player: WebUser;
	export let i: number;
	export let selectedWeek: number;
	export let tiebreaker: WeeklyTiebreaker;
	export let showNetTiebreakers: boolean = false;

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
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].wins}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].losses}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{tiebreaker.tiebreaker}
	{#if showNetTiebreakers}
		({player.weeklyPickRecord[`week_${selectedWeek}`].netTiebreaker})
	{/if}
</RowData>
<RowData {evenRow} {inTheMoney}>
	${player.weeklyWinnings[`week_${selectedWeek}`]}
</RowData>
