<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$lib/components/tables/WeeklyStandingsRow.svelte';
	import { mobileBreakpoint } from '$scripts/site';
	import { showIDs, windowWidth } from '$scripts/store';
	import { onMount } from 'svelte';
	import { query, where, orderBy, DocumentData, Query, getDocs } from 'firebase/firestore';
	import {
		scheduleCollection,
		usersCollection,
		weeklyTiebreakersCollection
	} from '$scripts/collections';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import type { WeeklyTiebreaker } from '$scripts/classes/tiebreaker';
	import { gameConverter, weeklyTiebreakerConverter } from '$scripts/converters';
	import { errorToast } from '$scripts/toasts';
	import { myError } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import ToggleSwitch from '../switches/ToggleSwitch.svelte';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import ErrorModal from '../modals/ErrorModal.svelte';
	import Grid from '../containers/Grid.svelte';
	import AdminControlsModal from '../modals/AdminControlsModal.svelte';

	let initialWeekHeaders: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker', 'Prize'];
	let abbreviatedWeekHeaders: string[] = ['#', 'Name', 'W', 'L', 'T', '$'];
	let weekHeaders: string[] = initialWeekHeaders;
	let selectedWeek: number;
	let tiebreakerPromise: Promise<WeeklyTiebreaker[]>;
	let weeklyUserPromise: Promise<WebUser[]>;
	let lastGamePromise: Promise<Game>;
	let weeklyUserQuery: Query<DocumentData>;
	let showNetTiebreakers = false;
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
			usersCollection,
			where('weekly', '==', true),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.wins`, 'desc'),
			orderBy(`weeklyPickRecord.week_${selectedWeek}.netTiebreaker`)
		);
		weeklyUserPromise = getWeeklyUsers(false, weeklyUserQuery);
		tiebreakerPromise = getAllTiebreakers(selectedWeek);
		lastGamePromise = getLastGame(selectedWeek);
	};

	onMount(async () => {
		selectedWeek = await findCurrentWeekOfSchedule();
		getData(selectedWeek);
	});

	// Reactive statements allow headers to update when the screen resizes
	$: headerCount = weekHeaders.length;
	$: weekHeaders =
		$windowWidth < mobileBreakpoint - 500 ? abbreviatedWeekHeaders : initialWeekHeaders;
</script>

<AdminControlsModal>
	<Grid slot="modal-content" repeat={2}>
		<span>Show Net Tiebreakers</span>
		<ToggleSwitch adminOnly={true} bind:checked={showNetTiebreakers} />
		<span>Show UIDs</span>
		<ToggleSwitch adminOnly={true} bind:checked={$showIDs} />
	</Grid>
</AdminControlsModal>
<div class="week grid" style="--columns:{headerCount}">
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
					{#await lastGamePromise}
						Loading data...
					{:then lastGame}
						{#each weeklyPlayerData as player, i}
							{#each tiebreakers as tiebreaker}
								{#if tiebreaker.uid === player.id}
									<WeeklyStandingsRow
										{player}
										{selectedWeek}
										{i}
										{tiebreaker}
										{showNetTiebreakers}
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
		border-bottom: 2px solid rgba(var(--accentValue-color, rgb(233, 181, 99)), 50%);
	}
	.admin {
		@include admin;
		padding: 0.25rem 1rem;
		border-radius: 3rem;
		width: max-content;
	}
</style>
