<script lang="ts">
	import type { SeasonRecord } from '$lib/scripts/classes/playerRecord';
	import {
		createSeasonRecordForPlayer,
		getSeasonRecordsData
	} from '$lib/scripts/weekly/seasonRecord';
	import { mobile_breakpoint } from '$scripts/site';
	import { selected_year, weekly_players, window_width } from '$scripts/store';
	import { orderBy, where } from '@firebase/firestore';
	import SeasonStandingsRow from './SeasonStandingsRow.svelte';

	let initial_season_headers = ['Rank', 'Player', 'Wins', 'Losses', '% Won', 'Prizes'];
	let abbreviated_season_headers = ['#', 'Name', 'W', 'L', '%', '$'];
	let season_headers = initial_season_headers;
	let header_count: number;
	let prizes_awarded: boolean;
	let season_record_promise: Promise<SeasonRecord[]>;

	const getData = async (year: number) => {
		let season_records: SeasonRecord[];
		const season_record_constraints = [
			where('season_year', '==', year),
			orderBy('total_weekly_wins', 'desc'),
			orderBy('nickname')
		];
		season_records = await getSeasonRecordsData({ constraints: season_record_constraints });
		const all_records_present = await confirmAllSeasonRecordsArePresent(season_records);
		if (!all_records_present) {
			season_records = await getSeasonRecordsData({ constraints: season_record_constraints });
		}
		return season_records;
	};

	const confirmAllSeasonRecordsArePresent = async (season_records: SeasonRecord[]) => {
		let all_records_found = true;
		for await (const player of $weekly_players) {
			const found_player_record = season_records.some((record) => record.uid === player.uid);
			if (!found_player_record) {
				await createSeasonRecordForPlayer({ player, season_year: $selected_year });
				all_records_found = false;
			}
		}
		return all_records_found;
	};

	const werePrizesAwarded = async (season_records: SeasonRecord[]) => {
		const prizes_awarded = season_records.some(
			(season_record: SeasonRecord) => season_record.grand_prize_winnings > 0
		);
		return prizes_awarded;
	};
	$: season_record_promise = getData($selected_year);
	$: header_count = season_headers.length - (prizes_awarded ? 0 : 1);
	$: if ($window_width < mobile_breakpoint - 500) {
		season_headers = abbreviated_season_headers;
	} else {
		season_headers = initial_season_headers;
	}
	$: async () => {
		const season_records = await season_record_promise;
		prizes_awarded = await werePrizesAwarded(season_records);
	};
</script>

<div class="table grid" style="--columns:{header_count}">
	{#await season_record_promise}
		Loading...
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
		{#each season_record_data as player_season_data, i}
			{@const player = $weekly_players?.find((player) => player_season_data.uid === player.uid)}
			{#if player_season_data}
				<SeasonStandingsRow {player} {player_season_data} {i} bind:prizes_awarded />
			{/if}
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
