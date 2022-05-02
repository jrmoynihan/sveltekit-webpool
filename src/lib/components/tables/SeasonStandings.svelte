<script lang="ts">
	import { windowWidth } from '$scripts/store';
	import SeasonStandingsRow from './SeasonStandingsRow.svelte';
	import { orderBy, query, where } from 'firebase/firestore';
	import type { Player } from '$classes/player';
	import { mobileBreakpoint } from '$scripts/site';
	import { playersCollection } from '$scripts/collections';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';
	import { onMount } from 'svelte';

	let initialSeasonHeaders = ['Rank', 'Player', 'Wins', 'Losses', '% Won', 'Prizes'];
	let abbreviatedSeasonHeaders = ['#', 'Name', 'W', 'L', '%', '$'];
	let seasonHeaders = initialSeasonHeaders;
	let weeklyPlayerPromise: Promise<Player[]>;
	// TODO query the collection by week, and sort by wins, then net tiebreaker
	// let playerData = [
	// 	{ nickname: 'jrmoynihan', wins: 10, losses: 6, tiebreaker: 42 },
	// 	{ nickname: 'moynihan', wins: 9, losses: 7, tiebreaker: 35 },
	// 	{ nickname: 'winston', wins: 7, losses: 9, tiebreaker: 38 },
	// 	{ nickname: 'daphne', wins: 4, losses: 12, tiebreaker: 49 }
	// ];
	let headerCount: number;
	$: headerCount = seasonHeaders.length;
	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			seasonHeaders = abbreviatedSeasonHeaders;
		} else {
			seasonHeaders = initialSeasonHeaders;
		}
	}
	const getData = async () => {
		const weeklyUserQuery = query(
			playersCollection,
			where('weekly', '==', true),
			orderBy('totalWeeklyWins', 'desc')
		);
		weeklyPlayerPromise = getWeeklyPlayers(false, weeklyUserQuery);
	};

	// TODO: Move to endpoint
	onMount(async () => {
		getData();
	});
</script>

<div class="table grid" style="--columns:{headerCount}">
	{#each seasonHeaders as header}
		<div class="header">{header}</div>
	{/each}
	{#if weeklyPlayerPromise}
		{#await weeklyPlayerPromise}
			Loading data...
		{:then weeklyPlayerData}
			{#each weeklyPlayerData as player, i}
				<SeasonStandingsRow {player} {i} />
			{/each}
		{/await}
	{/if}
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
