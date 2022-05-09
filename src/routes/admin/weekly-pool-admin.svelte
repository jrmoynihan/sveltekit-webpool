<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import AdminSelectors from '$lib/components/containers/admin/adminSelectors.svelte';
	import AdminSpreadFunctions from '$lib/components/containers/admin/adminSpreadFunctions.svelte';
	import AdminPicksFunctions from '$lib/components/containers/admin/adminPicksFunctions.svelte';
	import AdminTiebreakerFunctions from '$lib/components/containers/admin/adminTiebreakerFunctions.svelte';
	import AdminGamesFunctions from '$lib/components/containers/admin/adminGamesFunctions.svelte';
	import AdminTeamRecords from '$lib/components/containers/admin/adminTeamRecords.svelte';
	import AdminUserRecords from '$lib/components/containers/admin/adminUserRecords.svelte';
	import AdminScheduleFunctions from '$lib/components/containers/admin/adminScheduleFunctions.svelte';
	import {
		all_players,
		current_season,
		largerThanMobile,
		selected_season,
		selected_season_year,
		selected_year
	} from '$scripts/store';
	import Grid from '$lib/components/containers/Grid.svelte';
	import { onMount } from 'svelte';
	import { findCurrentSeason } from '$lib/scripts/schedule';

	onMount(async () => {
		$selected_season = $current_season || (await findCurrentSeason());
		$selected_year = $selected_season_year;
	});
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
<Grid minColumns={$largerThanMobile ? '40%' : '100%'} customStyles={'align-items:start;'}>
	<AdminSelectors player_pool={'weekly'} />
	<AdminSpreadFunctions />
	<AdminPicksFunctions />
	<AdminTiebreakerFunctions />
	<AdminGamesFunctions />
	<AdminTeamRecords />
	<AdminUserRecords />
	<AdminScheduleFunctions />
</Grid>

<AccordionDetails expandTitle="Weekly Users">
	<svelte:fragment slot="content">
		{#each $all_players.filter((player) => player.weekly === true) as player}
			<p>{player.name}</p>
		{/each}
	</svelte:fragment>
</AccordionDetails>
