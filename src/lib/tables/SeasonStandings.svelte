<script lang="ts">
	import { mobileBreakpoint } from '$scripts/site';
	import SeasonStandingsTable from '$tables/SeasonStandingsTable.svelte';
	import { windowWidth } from '$scripts/store';

	let initialSeasonHeaders = ['Rank', 'Player', 'Wins', 'Losses', '% Won'];
	let abbreviatedSeasonHeaders = ['#', 'Name', 'W', 'L', '%'];
	let seasonHeaders = initialSeasonHeaders;
	// TODO query the collection by week, and sort by wins, then net tiebreaker
	let playerData = [
		{ nickname: 'jrmoynihan', wins: 10, losses: 6, tiebreaker: 42 },
		{ nickname: 'moynihan', wins: 9, losses: 7, tiebreaker: 35 },
		{ nickname: 'winston', wins: 7, losses: 9, tiebreaker: 38 },
		{ nickname: 'daphne', wins: 4, losses: 12, tiebreaker: 49 }
	];

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			seasonHeaders = abbreviatedSeasonHeaders;
		} else {
			seasonHeaders = initialSeasonHeaders;
		}
	}
</script>

<div class="table grid">
	{#each seasonHeaders as header}
		<div class="header">{header}</div>
	{/each}
	<SeasonStandingsTable {playerData} />
</div>

<style lang="scss">
	.grid {
		display: grid;
		gap: 0.5em;
		width: 100%;
	}
	.table {
		grid-template-columns: repeat(5, minmax(max-content, 1fr));
		overflow: auto;
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgba(var(--accentValue-color), 50%);
	}
</style>
