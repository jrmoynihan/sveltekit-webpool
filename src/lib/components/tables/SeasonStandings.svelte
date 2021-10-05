<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import SeasonStandingsRow from './SeasonStandingsRow.svelte';
	import { query, where, orderBy } from '@firebase/firestore';
	import { usersCollection } from '$scripts/collections';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import { onMount } from 'svelte';

	let initialSeasonHeaders = ['Rank', 'Player', 'Wins', 'Losses', '% Won', 'Prizes'];
	let abbreviatedSeasonHeaders = ['#', 'Name', 'W', 'L', '%', '$'];
	let seasonHeaders = initialSeasonHeaders;
	let weeklyUserPromise: Promise<WebUser[]>;
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
			usersCollection,
			where('weekly', '==', true),
			orderBy(`weeklyPickRecord.total.wins`, 'desc')
		);
		weeklyUserPromise = getWeeklyUsers({ showToast: false, customizedQuery: weeklyUserQuery });
	};

	onMount(async () => {
		getData();
	});
</script>

<div class="table grid" style="--columns:{headerCount}">
	{#each seasonHeaders as header}
		<div class="header">{header}</div>
	{/each}
	{#if weeklyUserPromise}
		{#await weeklyUserPromise}
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
		// gap: 0.5em;
		width: 100%;
	}
	.table {
		grid-template-columns: repeat(var(--columns), minmax(max-content, 1fr));
		overflow: auto;
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid rgba(var(--accentValue-color, rgb(233, 181, 99)), 50%);
	}
</style>
