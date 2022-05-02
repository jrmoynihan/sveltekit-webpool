<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import type { Player } from '$classes/player';
	import { selectedWeek } from '$scripts/store';
	import {
		createTiebreakersForAllUsers,
		createTiebreakersForUser,
		deleteTiebreakersForAllUsers,
		deleteTiebreakersForUser
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedPlayer: Player;
	export let selectedYear: number;

	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Tiebreakers" bind:minColumns>
	<StyledButton on:click={() => createTiebreakersForAllUsers()}>
		Create Tiebreakers for All Users
	</StyledButton>
	{#if selectedPlayer}
		<StyledButton
			on:click={() => createTiebreakersForUser(selectedPlayer, undefined, undefined, true)}
		>
			Create All Tiebreakers for {selectedPlayer.name}
		</StyledButton>
		<StyledButton
			on:click={() => createTiebreakersForUser(selectedPlayer, $selectedWeek, selectedYear, true)}
		>
			Create Tiebreakers for {selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}
		</StyledButton>
		<DeletionButton on:click={() => deleteTiebreakersForUser(selectedPlayer)}>
			Delete All Tiebreakers for {selectedPlayer.name}
		</DeletionButton>
		<DeletionButton
			on:click={() => deleteTiebreakersForUser(selectedPlayer, $selectedWeek, selectedYear)}
		>
			Delete Tiebreakers for {selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}
		</DeletionButton>
	{/if}
	<DeletionButton on:click={() => deleteTiebreakersForAllUsers()}>
		Delete Tiebreakers for All Users
	</DeletionButton>
</AdminExpandSection>
