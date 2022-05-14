<script lang="ts">
	import { weekly_players, selected_year, window_width } from '$scripts/store';
	import SeasonStandingsRow from './SeasonStandingsRow.svelte';
	import { orderBy, where } from '@firebase/firestore';
	import { mobile_breakpoint } from '$scripts/site';
	import { getSeasonRecordsData } from '$lib/scripts/scorePicks';

	const season_record_constraints = [
		where('weekly', '==', true),
		where('year', '==', $selected_year),
		orderBy('total_weekly_wins', 'desc')
	];

	let initial_season_headers = ['Rank', 'Player', 'Wins', 'Losses', '% Won', 'Prizes'];
	let abbreviated_season_headers = ['#', 'Name', 'W', 'L', '%', '$'];
	let season_record_promise = getSeasonRecordsData({ constraints: season_record_constraints });
	let season_headers = initial_season_headers;
	let header_count: number;

	$: header_count = season_headers.length;
	$: if ($window_width < mobile_breakpoint - 500) {
		season_headers = abbreviated_season_headers;
	} else {
		season_headers = initial_season_headers;
	}
</script>

<div class="table grid" style="--columns:{header_count}">
	{#each season_headers as header}
		<div class="header">{header}</div>
	{/each}
	{#await season_record_promise}
		Loading data...
	{:then season_record_data}
		{#each $weekly_players as player, i}
			{@const player_season_data = season_record_data.find((data) => data.uid === player.uid)}
			<SeasonStandingsRow {player} {player_season_data} {i} />
		{/each}
	{/await}
</div>

<style lang="scss">
	.grid {
		display: grid;
		width: 100%;
	}
	.table {
		grid-template-columns: repeat(var(--columns), minmax(max-content, 1fr));
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid hslaa(var(--accent-value, hsl(37, 75%, 65%)), 50%);
	}
</style>
