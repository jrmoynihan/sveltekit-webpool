<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$lib/components/tables/WeeklyStandingsRow.svelte';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { onMount } from 'svelte';
	import { query, where, orderBy, DocumentData, Query, getDocs, getDoc } from '@firebase/firestore';
	import {
		scheduleCollection,
		usersCollection,
		weeklyTiebreakersCollection
	} from '$scripts/collections';
	import { getWeeklyUsers } from '$scripts/weeklyUsers';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import { gameConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import { errorToast } from '$scripts/toasts';
	import { myError } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import DevNotes from '../misc/DevNotes.svelte';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T'];
	let weekHeaders: string[] = initialWeekHeaders;
	let selectedWeek: number;
	let tiebreakerPromise: Promise<WeeklyTiebreaker[]>;
	let weeklyUserPromise: Promise<WebUser[]>;
	let lastGamePromise: Promise<Game>;
	let weeklyUserQuery: Query<DocumentData>;
	let showNetTiebreakers: boolean = false;

	export const getAllTiebreakers = async (selectedWeek: number) => {
		try {
			const tiebreakers: WeeklyTiebreaker[] = [];
			const selectedYear = new Date().getFullYear();
			const q = query(
				weeklyTiebreakersCollection,
				where('year', '==', selectedYear),
				where('week', '==', selectedWeek)
			);
			const querySnapshot = await getDocs(q.withConverter(weeklyTiebreakerConverter));
			querySnapshot.forEach((doc) => {
				if (doc.exists()) {
					const data = doc.data();
					tiebreakers.push(data);
				}
			});
			return tiebreakers;
		} catch (error) {
			errorToast('Error encountered while getting tiebreakers. See console log.');
			myError('getAllTiebreakers', error);
		}
	};
	const getLastGame = async (selectedWeek: number) => {
		const lastGameQuery = query(
			scheduleCollection,
			where('week', '==', selectedWeek),
			where('isLastGame', '==', true)
		);
		const lastGameDoc = await getDocs(lastGameQuery.withConverter(gameConverter));
		const lastGame = lastGameDoc.docs[0].data();
		return lastGame;
	};

	$: {
		if ($windowWidth < mobileBreakpoint - 500) {
			weekHeaders = abbreviatedWeekHeaders;
		} else {
			weekHeaders = initialWeekHeaders;
		}
	}
	const getData = async (selectedWeek: number) => {
		weeklyUserQuery = query(
			usersCollection,
			where('weekly', '==', true),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.wins`, 'desc'),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.netTiebreaker`)
		);
		weeklyUserPromise = getWeeklyUsers({ showToast: false, q: weeklyUserQuery });
		tiebreakerPromise = getAllTiebreakers(selectedWeek);
	};

	onMount(async () => {
		//TODO: could just query docs on parent component and use client to sort by wins; compare performance vs. reads tradeoff
		selectedWeek = await findCurrentWeekOfSchedule();
		getData(selectedWeek);
	});
</script>

<DevNotes>
	<p>
		<span>Show Net Tiebreakers:</span>
		<ToggleSwitch bind:checked={showNetTiebreakers} />
	</p>
</DevNotes>
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
	<WeekSelect gridArea="selector" bind:selectedWeek on:weekChanged={() => getData(selectedWeek)} />
	<div class="table grid">
		{#each weekHeaders as header}
			<div class="header">{header}</div>
		{/each}
		{#if weeklyUserPromise}
			{#await weeklyUserPromise}
				Loading data...
			{:then weeklyPlayerData}
				{#await tiebreakerPromise}
					Loading data...
				{:then tiebreakers}
					{#each weeklyPlayerData as player, i}
						{#each tiebreakers as tiebreaker}
							{#if tiebreaker.uid === player.id}
								<WeeklyStandingsRow {player} {selectedWeek} {i} {tiebreaker} {showNetTiebreakers} />
							{/if}
						{/each}
					{/each}
				{/await}
			{/await}
		{/if}
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
		border-bottom: 2px solid rgba(var(--accentValue-color, rgb(233, 181, 99)), 50%);
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
