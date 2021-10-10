<script lang="ts">
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { myError, myLog } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import type { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection } from '$scripts/collections';
	import { gameConverter } from '$scripts/converters';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import { getDocs, query, where, updateDoc } from '@firebase/firestore';
	import Fa from 'svelte-fa';
	import { getConsensusSpread } from '$scripts/functions';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import {
		resetScoredPicksForWeek,
		removeWinnersFromGames,
		resetWeeklyUserRecords,
		scorePicksForWeek,
		updateGamesAndATSWinners,
		updateTeamRecords
	} from '$scripts/scorePicks';
	import { resetTeamRecords } from '$scripts/teams';
	import { findWeekDateTimeBounds } from '$scripts/schedule';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import {
		createTiebreakersForAllUsers,
		createTiebreakersForUser,
		createWeeklyPicksForAllUsers,
		createWeeklyPicksForUser,
		deleteTiebreakersForAllUsers,
		deleteTiebreakersForUser,
		deleteWeeklyPicksForAllUsers,
		deleteWeeklyPicksForUser,
		getAllGames
	} from '$scripts/weekly/weeklyAdmin';
	import UserSelect from '$lib/components/selects/UserSelect.svelte';
	import Tooltip from '$lib/components/containers/Tooltip.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import AdminSelectors from '$lib/components/containers/admin/adminSelectors.svelte';
	import AdminSpreadFunctions from '$lib/components/containers/admin/adminSpreadFunctions.svelte';
	import AdminPicksFunctions from '$lib/components/containers/admin/adminPicksFunctions.svelte';
	import AdminTiebreakerFunctions from '$lib/components/containers/admin/adminTiebreakerFunctions.svelte';
	import AdminGamesFunctions from '$lib/components/containers/admin/adminGamesFunctions.svelte';
	import AdminTeamRecords from '$lib/components/containers/admin/adminTeamRecords.svelte';
	import AdminUserRecords from '$lib/components/containers/admin/adminUserRecords.svelte';
	import AdminScheduleFunctions from '$lib/components/containers/admin/adminScheduleFunctions.svelte';
	import { largerThanMobile } from '$scripts/store';

	let selectedWeek: number = 1;
	let selectedYear: number = new Date().getFullYear();
	let selectedUser: WebUser;
	let userPromise: Promise<WebUser[]>;
	let gamePromise: Promise<Game[]>;
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
<Grid min={$largerThanMobile ? '40%' : '100%'}>
	<AdminSelectors
		bind:selectedUser
		bind:selectedWeek
		bind:selectedYear
		bind:userPromise
		bind:gamePromise
	/>
	<!-- <hr /> -->
	<AdminSpreadFunctions bind:selectedWeek bind:selectedYear />
	<!-- <hr /> -->
	<AdminPicksFunctions bind:selectedUser bind:selectedWeek bind:selectedYear />
	<!-- <hr /> -->
	<AdminTiebreakerFunctions bind:selectedUser bind:selectedWeek bind:selectedYear />
	<!-- <hr /> -->
	<AdminGamesFunctions bind:selectedWeek bind:selectedYear />
	<!-- <hr /> -->
	<AdminTeamRecords />
	<!-- <hr /> -->
	<AdminUserRecords />
	<!-- <hr /> -->
	<AdminScheduleFunctions />
</Grid>

{#if userPromise}
	{#await userPromise}
		<LoadingSpinner msg="Loading users..." />
	{:then weeklyUsers}
		<AccordionDetails expandTitle="Weekly Users">
			<svelte:fragment slot="content">
				{#each weeklyUsers as user}
					<p>{user.name} -- weekly: {user.weekly}</p>
				{/each}
			</svelte:fragment>
		</AccordionDetails>
	{/await}
{/if}

{#if gamePromise}
	{#await gamePromise}
		<LoadingSpinner msg="Loading games..." />
	{:then games}
		<AccordionDetails expandTitle="Weekly Games">
			<svelte:fragment slot="content">
				{#each games as game}
					<p>{game.name}</p>
				{/each}
			</svelte:fragment>
		</AccordionDetails>
	{/await}
{/if}
