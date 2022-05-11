<script lang="ts">
	import { selected_week, show_IDs, show_net_tiebreakers, window_width } from '$scripts/store';
	import { query, where, orderBy, getDocs } from '@firebase/firestore';
	import { scheduleCollection, weeklyTiebreakersCollection } from '$scripts/collections';
	import { getPlayers } from '$scripts/weekly/weeklyPlayers';
	import { ErrorAndToast } from '$scripts/logging';
	import type { Game } from '$classes/game';
	import ErrorModal from '../modals/ErrorModal.svelte';
	import type { WeeklyTiebreaker } from '$classes/tiebreaker';
	import type { Player } from '$classes/player';
	import { gameConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import { mobileBreakpoint } from '$scripts/site';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$components/tables/WeeklyStandingsRow.svelte';
	import ReturnToTop from '$components/buttons/ReturnToTop.svelte';
	import type { PoolsToQuery } from '$lib/scripts/types/types';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker', 'Prize'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T', '$'];
	let weekHeaders: string[] = initialWeekHeaders;
	let headerCount: number;

	export const getAllTiebreakers = async (
		selectedWeek: number,
		selectedYear = new Date().getFullYear()
	) => {
		try {
			const tiebreakers: WeeklyTiebreaker[] = [];
			const q = query(
				weeklyTiebreakersCollection,
				where('year', '==', selectedYear),
				where('week', '==', selectedWeek)
			);
			const tiebreaker_docs = await getDocs(q.withConverter(weeklyTiebreakerConverter));
			if (tiebreaker_docs.size > 0) {
				tiebreaker_docs.forEach((doc) => {
					const data = doc.data();
					tiebreakers.push(data);
				});
			}
			return tiebreakers;
		} catch (error) {
			ErrorAndToast({ msg: 'Error encountered while getting tiebreakers.', error });
		}
	};
	const getLastGame = async (selectedWeek: number) => {
		try {
			const lastGameQuery = query(
				scheduleCollection,
				where('week', '==', selectedWeek),
				where('isLastGameOfWeek', '==', true)
			);
			const lastGameDoc = await getDocs(lastGameQuery.withConverter(gameConverter));
			const lastGame = lastGameDoc.docs[0].data();
			return lastGame;
		} catch (error) {
			ErrorAndToast({ msg: 'Error encountered while getting last game.', error });
		}
	};

	const getData = async (
		selectedWeek: number
	): Promise<{ weeklyPlayers: Player[]; tiebreakers: WeeklyTiebreaker[]; lastGame: Game }> => {
		const roles: PoolsToQuery[] = ['weekly'];
		const constraints = [
			orderBy(`weeklyPickRecord.week_${selectedWeek}.wins`, 'desc'),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.netTiebreaker`)
		];

		// Get the data asynchronously for each collection
		const weeklyPlayerPromise: Promise<Player[]> = getPlayers({ roles, constraints });
		const tiebreakerPromise: Promise<WeeklyTiebreaker[]> = getAllTiebreakers(selectedWeek);
		const lastGamePromise: Promise<Game> = getLastGame(selectedWeek);

		// Wait for all the data to come in before resolving the getData() promise with the results
		const data: [Player[], WeeklyTiebreaker[], Game] = await Promise.all([
			weeklyPlayerPromise,
			tiebreakerPromise,
			lastGamePromise
		]);
		const weeklyPlayers: Player[] = data[0];
		const tiebreakers: WeeklyTiebreaker[] = data[1];
		const lastGame: Game = data[2];

		return { weeklyPlayers, tiebreakers, lastGame };
	};

	// Update the data promise if the week changes
	let data_promise = getData($selected_week);
	$: data_promise = getData($selected_week);

	// Reactive statements allow headers to update when the screen resizes
	$: headerCount = weekHeaders.length;
	$: weekHeaders =
		$window_width < mobileBreakpoint - 500 ? abbreviatedWeekHeaders : initialWeekHeaders;
</script>

<div class="week grid" style="--columns:{headerCount}">
	<WeekSelect customStyles="grid-area:selector;" />
	<!-- on:weekChanged={() => getData($selectedWeek)}
		on:incrementWeek={() => getData($selectedWeek)}
		on:decrementWeek={() => getData($selectedWeek)} -->
	<div class="table grid">
		{#each weekHeaders as header}
			<div class="header">{header}</div>
		{/each}
		{#await data_promise then { weeklyPlayers, tiebreakers, lastGame }}
			{#each weeklyPlayers as player, i}
				{#each tiebreakers as tiebreaker}
					{#if tiebreaker.uid === player.uid}
						<WeeklyStandingsRow
							{player}
							{i}
							{tiebreaker}
							showNetTiebreakers={$show_net_tiebreakers}
							{lastGame}
							showUID={$show_IDs}
						/>
					{/if}
				{/each}
			{/each}
		{:catch error}
			<ErrorModal>
				Unable to load data: {error}
			</ErrorModal>
		{/await}
	</div>
</div>
<ReturnToTop />

<style lang="scss">
	.grid {
		display: grid;
		width: 100%;
	}
	.week {
		justify-items: center;
		grid-template-areas: 'selector' 'table';
	}
	.table {
		grid-template-columns: repeat(var(--columns), minmax(max-content, 1fr));
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
	}
</style>
