<script lang="ts">
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import WeeklyStandingsTable from '$lib/tables/WeeklyStandingsTable.svelte';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T'];
	let weekHeaders: string[] = initialWeekHeaders;

	// TODO query the collection by week, and sort by wins, then net tiebreaker
	let names = [
		'Daphne',
		'Winston',
		'Jamie',
		'Emma',
		'Dad',
		'RidinWithBiden',
		'Luca',
		'TheCheese',
		'AllenDiggs2024',
		'WatsonTradeBlockchain'
	];
	let playerData = [];
	for (const name of names) {
		const getRandomInt = (max: number, min = 0) => {
			return Math.max(Math.floor(Math.random() * max), min);
		};
		const wins = getRandomInt(16);
		const losses = 16 - wins;
		const tiebreaker = getRandomInt(63, 10);
		const playerDatum = { nickname: name, wins: wins, losses: losses, tiebreaker: tiebreaker };
		playerData = [...playerData, playerDatum];
	}

	// Sort players in order of # of wins
	playerData.sort((firstPlayer, secondPlayer) => secondPlayer.wins - firstPlayer.wins);

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			weekHeaders = abbreviatedWeekHeaders;
		} else {
			weekHeaders = initialWeekHeaders;
		}
	}
</script>

<div class="week grid">
	<WeekSelect gridArea="selector" />
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
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgba(var(--accentValue-color), 50%);
		// position: sticky;
		// top: 0;
		// z-index: 20;
		// background-color: var(--alternate-color);
	}
</style>
