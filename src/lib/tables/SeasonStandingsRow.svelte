<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import { largerThanMobile } from '$scripts/store';

	export let player: { nickname: any; wins: number; losses: any };
	export let i: number;
</script>

<RowData {i}>
	{i + 1}
</RowData>
<RowData {i}>
	{player.nickname}
</RowData>
<RowData {i}>
	{player.wins}
</RowData>
<RowData {i}>
	{player.losses}
</RowData>
<RowData {i}>
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
