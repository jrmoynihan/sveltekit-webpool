<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type { Game } from '$scripts/classes/game';
	import type { Player } from '$classes/player';
	import AdminSelectors from '$lib/components/containers/admin/adminSelectors.svelte';
	import AdminSpreadFunctions from '$lib/components/containers/admin/adminSpreadFunctions.svelte';
	import AdminPicksFunctions from '$lib/components/containers/admin/adminPicksFunctions.svelte';
	import AdminTiebreakerFunctions from '$lib/components/containers/admin/adminTiebreakerFunctions.svelte';
	import AdminGamesFunctions from '$lib/components/containers/admin/adminGamesFunctions.svelte';
	import AdminTeamRecords from '$lib/components/containers/admin/adminTeamRecords.svelte';
	import AdminUserRecords from '$lib/components/containers/admin/adminUserRecords.svelte';
	import AdminScheduleFunctions from '$lib/components/containers/admin/adminScheduleFunctions.svelte';
	import { largerThanMobile } from '$scripts/store';
	import Grid from '$lib/components/containers/Grid.svelte';

	let selectedYear: number = new Date().getFullYear();
	let selectedPlayer: Player;
	let playersPromise: Promise<Player[]>;
	let gamePromise: Promise<Game[]>;
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
<Grid minColumns={$largerThanMobile ? '40%' : '100%'} customStyles={'align-items:start;'}>
	<AdminSelectors bind:selectedPlayer bind:selectedYear bind:playersPromise bind:gamePromise />
	<!-- <hr /> -->
	<AdminSpreadFunctions bind:selectedYear />
	<!-- <hr /> -->
	<AdminPicksFunctions bind:selectedPlayer bind:selectedYear />
	<!-- <hr /> -->
	<AdminTiebreakerFunctions bind:selectedPlayer bind:selectedYear />
	<!-- <hr /> -->
	<AdminGamesFunctions bind:selectedYear />
	<!-- <hr /> -->
	<AdminTeamRecords bind:selectedYear />
	<!-- <hr /> -->
	<AdminUserRecords />
	<!-- <hr /> -->
	<AdminScheduleFunctions />
</Grid>

{#if playersPromise}
	{#await playersPromise}
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
