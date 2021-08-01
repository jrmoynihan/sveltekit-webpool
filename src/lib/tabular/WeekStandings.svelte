<script lang="ts">
	import WeeklyStandingsTable from '$lib/tabular/WeeklyStandingsTable.svelte';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';

	let currentWeek: number = 11; // @TODO find a function to determine the NFL week automatically
	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T'];
	let weekHeaders: string[] = initialWeekHeaders;
	let weeks: string[] = [];

	for (let i = 1; i < 18; i++) {
		weeks = [...weeks, i.toString()];
	}
	// TODO query the collection by week, and sort by wins, then net tiebreaker
	let playerData = [
		{ nickname: 'jrmoynihan', wins: 10, losses: 6, tiebreaker: 42 },
		{ nickname: 'moynihan', wins: 9, losses: 7, tiebreaker: 35 },
		{ nickname: 'winston', wins: 7, losses: 9, tiebreaker: 38 },
		{ nickname: 'daphne', wins: 4, losses: 12, tiebreaker: 49 }
	];

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			weekHeaders = abbreviatedWeekHeaders;
		} else {
			weekHeaders = initialWeekHeaders;
		}
	}
</script>

<div class="week grid">
	<select>
		{#each weeks as week}
			<option>Week {week}</option>
		{/each}
	</select>
	<div class="table grid">
		{#each weekHeaders as header}
			<div class="header">{header}</div>
		{/each}
		<WeeklyStandingsTable {playerData} />
	</div>
</div>

<style lang="scss">
	.grid {
		display: grid;
		gap: 0.5em;
		width: 100%;
	}
	.week {
		justify-items: center;
		grid-template-areas: 'selector' 'table';
	}
	.table {
		grid-template-columns: repeat(5, minmax(max-content, 1fr));
		overflow: auto;
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		// grid-template-rows: 1fr;
		font-weight: bold;
	}

	select {
		@include rounded;
		display: inline-flex;
		grid-area: selector;
		padding: 1rem;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>
