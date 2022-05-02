<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import type { Player } from '$classes/player';
	import { selectedWeek } from '$scripts/store';
	import {
		createTiebreakersForAllPlayers,
		createTiebreakersForPlayer,
		deleteTiebreakersForAllPlayers,
		deleteTiebreakersForPlayer
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedPlayer: Player;
	export let selectedYear: number;

	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Tiebreakers" bind:minColumns>
	<StyledButton on:click={() => createTiebreakersForAllPlayers()}>
		Create Tiebreakers for All Players
	</StyledButton>
	{#if selectedPlayer}
		<StyledButton
			on:click={() => createTiebreakersForPlayer(selectedPlayer, undefined, undefined, true)}
		>
			Create All Tiebreakers for {selectedPlayer.name}
		</StyledButton>
		<StyledButton
			on:click={() => createTiebreakersForPlayer(selectedPlayer, $selectedWeek, selectedYear, true)}
		>
			Create Tiebreakers for {selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}
		</StyledButton>
		<DeletionButton on:click={() => deleteTiebreakersForPlayer(selectedPlayer)}>
			Delete All Tiebreakers for {selectedPlayer.name}
		</DeletionButton>
		<DeletionButton
			on:click={() => deleteTiebreakersForPlayer(selectedPlayer, $selectedWeek, selectedYear)}
		>
			Delete Tiebreakers for {selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}
		</DeletionButton>
	{/if}
	<DeletionButton on:click={() => deleteTiebreakersForAllPlayers()}>
		Delete Tiebreakers for All Players
	</DeletionButton>
</AdminExpandSection>
