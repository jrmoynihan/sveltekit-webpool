<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';

	import { resetScoredPicksForWeek, scorePicksForWeek } from '$scripts/scorePicks';
	import {
		createWeeklyPicksForAllUsers,
		createWeeklyPicksForUser,
		deleteWeeklyPicksForAllUsers,
		deleteWeeklyPicksForUser
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { selectedWeek } from '$scripts/store';

	export let selectedYear: number;
	export let selectedUser: WebUser;

	// Min and Max for a minmax grid column function
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Picks" bind:minColumns>
	<StyledButton on:click={() => scorePicksForWeek($selectedWeek, selectedYear)}>
		<span>Score Picks For <b>Week {$selectedWeek}, {selectedYear}</b></span>
	</StyledButton>
	{#if selectedUser}
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual user instead.'
				);
				if (proceed) createWeeklyPicksForUser(selectedUser, false, true);
			}}
		>
			<span>Create All Picks for <b>{selectedUser.name}</b></span>
		</StyledButton>
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual user instead.'
				);
				if (proceed)
					createWeeklyPicksForUser(
						selectedUser,
						false,
						true,
						undefined,
						$selectedWeek,
						selectedYear
					);
			}}
		>
			<span
				>Create Picks for <b>{selectedUser.name} for Week {$selectedWeek}, {selectedYear}</b></span
			>
		</StyledButton>
		<StyledButton on:click={createWeeklyPicksForAllUsers} text="Create Picks for All Users" />
		<DeletionButton
			on:click={() => deleteWeeklyPicksForUser(selectedUser, $selectedWeek, selectedYear)}
		>
			<span
				>Delete All Picks for <b>{selectedUser.name} for Week {$selectedWeek}, {selectedYear}</b
				></span
			>
		</DeletionButton>
	{/if}
	<DeletionButton on:click={deleteWeeklyPicksForAllUsers} text="Delete All Picks for All Users" />
	<DeletionButton on:click={() => resetScoredPicksForWeek($selectedWeek, selectedYear)}>
		<span>Reset Scored Picks For <b>Week {$selectedWeek}, {selectedYear}</b></span>
	</DeletionButton>
</AdminExpandSection>
