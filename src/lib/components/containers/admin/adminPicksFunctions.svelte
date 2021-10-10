<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { resetScoredPicksForWeek, scorePicksForWeek } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import {
		createWeeklyPicksForAllUsers,
		createWeeklyPicksForUser,
		deleteWeeklyPicksForAllUsers,
		deleteWeeklyPicksForUser
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedWeek: number;
	export let selectedYear: number;
	export let selectedUser: WebUser;

	// Min and Max for a minmax grid column function
	let min: string | number = '40%';
</script>

<AdminExpandSection summaryText="Picks" bind:min>
	<button on:click={() => scorePicksForWeek(selectedWeek, selectedYear)}>
		<span>Score Picks For <b>Week {selectedWeek}, {selectedYear}</b></span>
	</button>
	{#if selectedUser}
		<button
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual user instead.'
				);
				if (proceed) {
					createWeeklyPicksForUser(selectedUser, false, true);
				}
			}}
		>
			<span>Create All Picks for <b>{selectedUser.name}</b></span>
		</button>
		<button
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual user instead.'
				);
				if (proceed) {
					createWeeklyPicksForUser(
						selectedUser,
						false,
						true,
						undefined,
						selectedWeek,
						selectedYear
					);
				}
			}}
		>
			<span
				>Create Picks for <b>{selectedUser.name} for Week {selectedWeek}, {selectedYear}</b></span
			>
		</button>
		<button on:click={createWeeklyPicksForAllUsers}>Create Picks for All Users</button>
		<button
			class="deletion"
			on:click={() => deleteWeeklyPicksForUser(selectedUser, selectedWeek, selectedYear)}
		>
			<span
				>Delete All Picks for <b>{selectedUser.name} for Week {selectedWeek}, {selectedYear}</b
				></span
			>
		</button>
	{/if}
	<button class="deletion" on:click={deleteWeeklyPicksForAllUsers}>
		<span />Delete All Picks for All Users
	</button>
	<button class="deletion" on:click={() => resetScoredPicksForWeek(selectedWeek, selectedYear)}>
		<span>Reset Scored Picks For <b>Week {selectedWeek}, {selectedYear}</b></span>
	</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
