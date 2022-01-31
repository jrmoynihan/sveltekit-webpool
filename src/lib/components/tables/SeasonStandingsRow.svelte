<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { WebUser } from '$scripts/classes/webUser';
	import { largerThanMobile } from '$scripts/store';

	export let player: WebUser;
	export let i: number;
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
	{player.totalWeeklyWins}
</RowData>
<RowData {evenRow} {inTheMoney}>
	{player.totalWeeklyLosses}
</RowData>
<RowData {evenRow} {inTheMoney}>
	<div class="percentage">
		{#if player.totalWeeklyWins > 0 || player.totalWeeklyLosses > 0}
			{(
				(player.totalWeeklyWins / (player.totalWeeklyWins + player.totalWeeklyLosses)) *
				100
			).toFixed(2)}%
			{#if $largerThanMobile}
				<span
					style="--win-radii:{(
						(player.totalWeeklyWins / (player.totalWeeklyWins + player.totalWeeklyLosses)) *
						100
					).toString()}%"
				/>
			{/if}
		{:else}
			-
		{/if}
	</div>
</RowData>
<RowData {evenRow} {inTheMoney}>
	${player.weeklyWinnings.total}
</RowData>

<style lang="scss">
	$radii: var(--win-radii);

	.percentage {
		@include gridCenter($grid: inline-grid, $gap: 10px);
		grid-template-columns: min-content min-content;
		padding-left: 1.2em; // helps align the percentage and radial pie chart
	}
	span {
		aspect-ratio: 1/1;
		background: conic-gradient(currentColor, white $radii, transparent $radii);
		border-radius: 50%;
		display: inline-block;
		height: 100%;
		width: 2em;
	}
</style>
