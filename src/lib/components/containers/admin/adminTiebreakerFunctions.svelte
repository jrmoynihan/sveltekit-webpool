<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import type { WebUser } from '$scripts/classes/webUser';
	import {
		createTiebreakersForAllUsers,
		createTiebreakersForUser,
		deleteTiebreakersForAllUsers,
		deleteTiebreakersForUser
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedUser: WebUser;
	export let selectedWeek: number;
	export let selectedYear: number;

	let min: string | number = '40%';
</script>

<AdminExpandSection summaryText="Tiebreakers" bind:min>
	<StyledButton on:click={() => createTiebreakersForAllUsers()}>
		Create Tiebreakers for All Users
	</StyledButton>
	{#if selectedUser}
		<StyledButton
			on:click={() => createTiebreakersForUser(selectedUser, undefined, undefined, true)}
		>
			Create All Tiebreakers for {selectedUser.name}
		</StyledButton>
		<StyledButton
			on:click={() => createTiebreakersForUser(selectedUser, selectedWeek, selectedYear, true)}
		>
			Create Tiebreakers for {selectedUser.name} for Week {selectedWeek}, {selectedYear}
		</StyledButton>
		<DeletionButton on:click={() => deleteTiebreakersForUser(selectedUser)}>
			Delete All Tiebreakers for {selectedUser.name}
		</DeletionButton>
		<DeletionButton
			on:click={() => deleteTiebreakersForUser(selectedUser, selectedWeek, selectedYear)}
		>
			Delete Tiebreakers for {selectedUser.name} for Week {selectedWeek}, {selectedYear}
		</DeletionButton>
	{/if}
	<DeletionButton on:click={() => deleteTiebreakersForAllUsers()}>
		Delete Tiebreakers for All Users
	</DeletionButton>
</AdminExpandSection>
