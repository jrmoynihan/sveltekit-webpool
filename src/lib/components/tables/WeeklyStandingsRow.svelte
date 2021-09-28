<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import type { WebUser } from '$scripts/classes/webUser';

	export let player: WebUser;
	export let i: number;
	export let selectedWeek: number;
	export let tiebreaker: WeeklyTiebreaker;

	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const evenRow = isEvenRow(i);
</script>

<RowData {evenRow}>
	{i + 1}
</RowData>
<RowData {evenRow}>
	{#if player.nickname}
		{player.nickname}
	{:else}
		{player.name}
	{/if}
</RowData>
<RowData {evenRow}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].wins}
</RowData>
<RowData {evenRow}>
	{player.weeklyPickRecord[`week_${selectedWeek}`].losses}
</RowData>
<RowData {evenRow}>
	{tiebreaker.tiebreaker}
</RowData>
