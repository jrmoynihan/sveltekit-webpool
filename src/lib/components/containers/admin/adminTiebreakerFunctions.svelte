<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { largerThanMobile } from '$scripts/store';
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
	<button on:click={() => createTiebreakersForAllUsers()}>
		Create Tiebreakers for All Users
	</button>
	{#if selectedUser}
		<button on:click={() => createTiebreakersForUser(selectedUser, undefined, undefined, true)}>
			Create All Tiebreakers for {selectedUser.name}
		</button>
		<button
			on:click={() => createTiebreakersForUser(selectedUser, selectedWeek, selectedYear, true)}
		>
			Create Tiebreakers for {selectedUser.name} for Week {selectedWeek}, {selectedYear}
		</button>
		<button class="deletion" on:click={() => deleteTiebreakersForUser(selectedUser)}>
			Delete All Tiebreakers for {selectedUser.name}
		</button>
		<button
			class="deletion"
			on:click={() => deleteTiebreakersForUser(selectedUser, selectedWeek, selectedYear)}
		>
			Delete Tiebreakers for {selectedUser.name} for Week {selectedWeek}, {selectedYear}
		</button>
	{/if}
	<button class="deletion" on:click={() => deleteTiebreakersForAllUsers()}>
		Delete Tiebreakers for All Users
	</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
