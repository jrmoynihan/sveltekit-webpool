<script lang="ts">
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
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
	names = [...names, ...names];
	names = [...names, ...names];
	names = [...names, ...names];
	names = [...names, ...names];

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

	var possibleWins: { wins: number; count: number }[] = [];

	for (let i = 1; i < 17; i++) {
		possibleWins.push({ wins: i, count: 0 });
	}

	for (const possibleWinCount of possibleWins) {
		for (const player of playerData) {
			if (player.wins === possibleWinCount.wins) {
				possibleWinCount.count++;
			}
		}
	}
	let maxCount;

	$: maxCount = Math.max.apply(
		Math,
		possibleWins.map((obj) => {
			return obj.count;
		})
	);

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			weekHeaders = abbreviatedWeekHeaders;
		} else {
			weekHeaders = initialWeekHeaders;
		}
	}
</script>

<div class="week grid">
	<div class="histogram" style="height:20rem; width:{possibleWins.length * 4}rem;">
		{#each possibleWins as outcome}
			<div class="outcome" style="width:3.5rem;height:100%;">
				<div class="bar" style="height:{(outcome.count / maxCount) * 100}%;">
					<div class="count">{outcome.count}</div>
				</div>
				<div>{outcome.wins}</div>
			</div>
		{/each}
		<span style="grid-column: span 16;">Wins (max:{maxCount})</span>
	</div>
	<WeekSelect gridArea="selector" />
	<div class="table grid">
		{#each weekHeaders as header}
			<div class="header">{header}</div>
		{/each}
		<WeeklyStandingsTable {playerData} />
	</div>
</div>
<ReturnToTop />

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
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgba(var(--accentValue-color), 50%);
	}
	.histogram {
		position: sticky;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--accent-color);
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		grid-template-rows: 1fr auto;
		color: white;
		align-items: flex-end;
		padding: 0.5rem 1rem;
	}
	.outcome {
		display: grid;
		align-items: flex-end;
		grid-template-rows: 1fr auto;
	}
	.bar {
		display: grid;
		align-content: flex-start;
		color: black;
		background-color: white;
		border: 1px black solid;
	}
	.count {
		align-self: flex-end;
	}
</style>
