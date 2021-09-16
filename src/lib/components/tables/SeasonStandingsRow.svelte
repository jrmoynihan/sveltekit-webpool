<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import { largerThanMobile } from '$scripts/store';

	export let player: { nickname: any; wins: number; losses: any };
	export let i: number;
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
	{player.nickname}
</RowData>
<RowData {evenRow}>
	{player.wins}
</RowData>
<RowData {evenRow}>
	{player.losses}
</RowData>
<RowData {evenRow}>
	<div class="percentage">
		{((player.wins / (player.wins + player.losses)) * 100).toFixed(2)}%
		{#if $largerThanMobile}
			<span
				style="--win-radii:{((player.wins / (player.wins + player.losses)) * 100).toString()}%"
			/>
		{/if}
	</div>
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
		background: conic-gradient(var(--main-color) $radii, transparent $radii);
		border-radius: 50%;
		display: inline-block;
		height: 100%;
		width: 2em;
	}
</style>
