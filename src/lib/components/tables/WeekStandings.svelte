<script lang="ts">
	import { selectedWeek, showIDs, showNetTiebreakers, windowWidth } from '$scripts/store';
	import { query, where, orderBy, type DocumentData, Query, getDocs } from 'firebase/firestore';
	import {
		scheduleCollection,
		playersCollection,
weeklyTiebreakersCollection
	} from '$scripts/collections';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';
	import { errorToast } from '$scripts/toasts';
	import { myError } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import ErrorModal from '../modals/ErrorModal.svelte';
import type { WeeklyTiebreaker } from '$classes/tiebreaker';
import type { Player } from '$classes/player';
import { gameConverter, weeklyTiebreakerConverter } from '$scripts/converters';
import { onMount } from 'svelte';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker', 'Prize'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T', '$'];
	let weekHeaders: string[] = initialWeekHeaders;
	let tiebreakerPromise: Promise<WeeklyTiebreaker[]>;
	let weeklyUserPromise: Promise<Player[]>;
	let lastGamePromise: Promise<Game>;
	let weeklyUserQuery: Query<DocumentData>;
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
			const errorLocation = 'WeekStandings => getLastGame';
			myError(errorLocation, error);
			errorToast(`errorLocation, ${error}`, 360_000);
		}
	};

	const getData = async (selectedWeek: number) => {
		weeklyUserQuery = query(
			playersCollection,
			where('weekly', '==', true),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.wins`, 'desc'),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.netTiebreaker`)
		);
		weeklyUserPromise = getWeeklyPlayers(false, weeklyUserQuery);
		tiebreakerPromise = getAllTiebreakers(selectedWeek);
		lastGamePromise = getLastGame(selectedWeek);
	};

	onMount(async () => {
		// $selectedWeek = await findCurrentWeekOfSchedule();
		getData($selectedWeek);
		const tiebreakers = await tiebreakerPromise;
		const users = await weeklyUserPromise;
		console.log(tiebreakers);
		console.log(users);
	});

	// Reactive statements allow headers to update when the screen resizes
	$: headerCount = weekHeaders.length;
	$: weekHeaders =
		$windowWidth < mobileBreakpoint - 500 ? abbreviatedWeekHeaders : initialWeekHeaders;
</script>

<div class="week grid" style="--columns:{headerCount}">
	<WeekSelect
		customStyles="grid-area:selector;"
		on:weekChanged={() => getData($selectedWeek)}
		on:incrementWeek={() => getData($selectedWeek)}
		on:decrementWeek={() => getData($selectedWeek)}
	/>
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
					{#await lastGamePromise}
						Loading data...
					{:then lastGame}
						{#each weeklyPlayerData as player, i}
							{#each tiebreakers as tiebreaker}
								{#if tiebreaker.uid === player.uid}
									<WeeklyStandingsRow
										{player}
										{i}
										{tiebreaker}
										showNetTiebreakers={$showNetTiebreakers}
										{lastGame}
										showUID={$showIDs}
									/>
								{/if}
							{/each}
						{/each}
					{:catch error}
						<ErrorModal>
							Unable to load last game: {error}
						</ErrorModal>
					{/await}
				{:catch error}
					<ErrorModal>
						Unable to load last tiebreakers: {error}
					</ErrorModal>
				{/await}
			{:catch error}
				<ErrorModal>
					Unable to load users: {error}
				</ErrorModal>
			{/await}
		{/if}
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
