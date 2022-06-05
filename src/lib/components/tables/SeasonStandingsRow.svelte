<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';
	import type { Player } from '$lib/scripts/classes/player';
	import type { SeasonRecord } from '$lib/scripts/classes/playerRecord';
	import { larger_than_mobile } from '$lib/scripts/store';

	export let player: Player;
	export let player_season_data: SeasonRecord;
	export let i: number;
	export let prizes_awarded: boolean;
	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const even_row = isEvenRow(i);
	const in_the_money = i < 3;
	const { total_weekly_wins, total_weekly_losses } = player_season_data;
</script>

<RowData {even_row} {in_the_money}>
	{i + 1}
</RowData>
<RowData {even_row} {in_the_money}>
	{#if player.nickname}
		{player.nickname}
	{:else}
		{player.name}
	{/if}
</RowData>
<RowData {even_row} {in_the_money}>
	{total_weekly_wins}
</RowData>
<RowData {even_row} {in_the_money}>
	{total_weekly_losses}
</RowData>
<RowData {even_row} {in_the_money}>
	<div class="percentage">
		{#if total_weekly_wins > 0 || total_weekly_losses > 0}
			{((total_weekly_wins / (total_weekly_wins + total_weekly_losses)) * 100).toFixed(2)}%
			{#if $larger_than_mobile}
				<span
					style="--win-radii:{(
						(total_weekly_wins / (total_weekly_wins + total_weekly_losses)) *
						100
					).toString()}%"
				/>
			{/if}
		{:else}
			-
		{/if}
	</div>
</RowData>
{#if prizes_awarded}
	<RowData {even_row} {in_the_money}>
		${player.weekly_pool_season_winnings}
	</RowData>
{/if}

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
