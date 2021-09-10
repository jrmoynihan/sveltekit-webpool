<script lang="ts">
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$lib/components/tables/WeeklyStandingsRow.svelte';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { onMount } from 'svelte';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T'];
	let weekHeaders: string[] = initialWeekHeaders;
	// let playerData = [];
	// let possibleWins: { wins: number; count: number }[] = [];
	// let maxCount: number = 1;

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

	const getRandomWins = async () => {
		let data = [];
		for await (const name of names) {
			const wins = await getRandomInt(16);
			const losses = 16 - wins;
			const tiebreaker = await getRandomInt(63, 10);
			const playerDatum = { nickname: name, wins: wins, losses: losses, tiebreaker: tiebreaker };
			data = [...data, playerDatum];
		}
		return data;
	};
	const getRandomInt = async (max: number, min = 0) => {
		return Math.max(Math.floor(Math.random() * max), min);
	};

	const sortPlayersByWins = (playerData: any[]) => {
		const tempArr = playerData;
		tempArr.sort((firstPlayer, secondPlayer) => secondPlayer.wins - firstPlayer.wins);
		return tempArr;
	};

	const setPossibleWins = async () => {
		let arr: { wins: number; count: number }[] = [];
		for (let i = 1; i < 17; i++) {
			arr.push({ wins: i, count: 0 });
		}
		return arr;
	};

	const countWins = async (possibleWins: { wins: number; count: number }[], playerData: any[]) => {
		let countedWins = possibleWins;

		for await (const possibleWinCount of countedWins) {
			for await (const player of playerData) {
				if (player.wins === possibleWinCount.wins) {
					possibleWinCount.count++;
				}
			}
		}
		return countedWins;
	};
	const updateMaxCount = async (countedWins: any[]) => {
		const counts = countedWins.map((obj) => obj.count);
		const maxCount = Math.max.apply(Math, counts);
		return maxCount;
	};

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			weekHeaders = abbreviatedWeekHeaders;
		} else {
			weekHeaders = initialWeekHeaders;
		}
	}
</script>

<div class="week grid">
	<!-- <AccordionDetails>
		<svelte:fragment slot="summary">Histogram</svelte:fragment>
		<svelte:fragment slot="content">
			{#await setPossibleWins()}
				getting possible wins...
			{:then possibleWins}
				{#await getRandomWins() then playerData}
					{#await countWins(possibleWins, playerData)}
						counting wins...
					{:then countedWins}
						{#await updateMaxCount(countedWins) then maxCount}
							<div class="histogram" style="height:20rem; width:100%">
								{#each countedWins as outcome}
									<div class="outcome" style="max-width:3rem;height:100%;">
										<div class="bar" style="height:{(outcome.count / maxCount) * 100}%;">
											<div class="count">{outcome.count}</div>
										</div>
										<div>{outcome.wins}</div>
									</div>
								{/each}

								<span style="grid-column: span 16;">Wins (max:{maxCount})</span>
							</div>
						{/await}
					{/await}
				{/await}
			{/await}
		</svelte:fragment>
	</AccordionDetails> -->
	<WeekSelect gridArea="selector" />
	<div class="table grid">
		{#each weekHeaders as header}
			<div class="header">{header}</div>
		{/each}
		{#await getRandomWins()}
			Loading data...
		{:then playerData}
			{#await sortPlayersByWins(playerData)}
				Sorting by wins...
			{:then sortedData}
				{#each sortedData as player, i}
					<WeeklyStandingsRow {player} {i} />
				{/each}
			{/await}
		{/await}
	</div>
</div>
<ReturnToTop />

<style lang="scss">
	.grid {
		display: grid;
		// gap: 0.5em;
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
	// .histogram {
	// 	position: sticky;
	// 	left: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	background-color: var(--accent-color);
	// 	display: grid;
	// 	grid-template-columns: repeat(16, 1fr);
	// 	grid-template-rows: 1fr auto;
	// 	color: white;
	// 	align-items: flex-end;
	// 	padding: 0.5rem 1rem;
	// }
	// .outcome {
	// 	display: grid;
	// 	align-items: flex-end;
	// 	grid-template-rows: 1fr auto;
	// }
	// .bar {
	// 	display: grid;
	// 	align-content: flex-start;
	// 	color: black;
	// 	background-color: white;
	// 	border: 1px black solid;
	// }
	// .count {
	// 	align-self: flex-end;
	// }
</style>
