<script lang="ts">
	import type { SeasonRecord } from '$lib/scripts/classes/playerRecord';
	import { getSeasonRecordsData } from '$lib/scripts/weekly/seasonRecord';
	import { mobile_breakpoint } from '$scripts/site';
	import { selected_year, weekly_players, window_width } from '$scripts/store';
	import { orderBy, where } from '@firebase/firestore';
	import SeasonStandingsRow from './SeasonStandingsRow.svelte';

	const season_record_constraints = [
		where('season_year', '==', $selected_year),
		orderBy('total_weekly_wins', 'desc')
	];

	let initial_season_headers = ['Rank', 'Player', 'Wins', 'Losses', '% Won', 'Prizes'];
	let abbreviated_season_headers = ['#', 'Name', 'W', 'L', '%', '$'];
	let season_record_promise = getSeasonRecordsData({ constraints: season_record_constraints });
	let season_headers = initial_season_headers;
	let header_count: number;
	let prizes_awarded = false;

	$: header_count = season_headers.length - (prizes_awarded ? 0 : 1);
	$: if ($window_width < mobile_breakpoint - 500) {
		season_headers = abbreviated_season_headers;
	} else {
		season_headers = initial_season_headers;
	}
	$: werePrizesAwarded(season_record_promise).then((result) => (prizes_awarded = result));

	async function werePrizesAwarded(season_record_promise: Promise<SeasonRecord[]>) {
		const season_records = await season_record_promise;
		const prizes_awarded = season_records.some(
			(season_record: SeasonRecord) => season_record.grand_prize_winnings > 0
		);
		return prizes_awarded;
	}
</script>

<div class="table grid" style="--columns:{header_count}">
	{#await season_record_promise}
		Loading data...
	{:then season_record_data}
		{#each season_headers as header}
			{#if header === 'Prizes' || header === '$'}
				{#if prizes_awarded}
					<div class="header">{header}</div>
				{/if}
			{:else}
				<div class="header">{header}</div>
			{/if}
		{/each}
		{#each $weekly_players as player, i}
			{@const player_season_data = season_record_data.find((data) => data.uid === player.uid)}
			<SeasonStandingsRow {player} {player_season_data} {i} bind:prizes_awarded />
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
