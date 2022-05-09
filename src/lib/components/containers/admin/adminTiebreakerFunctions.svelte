<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { selected_week, selected_year, selected_player } from '$scripts/store';
	import {
		createTiebreakersForAllPlayers,
		createTiebreakersForPlayer,
		deleteTiebreakersForAllPlayers,
		deleteTiebreakersForPlayer
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection
	summaryText="Tiebreakers"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<StyledButton on:click={() => createTiebreakersForAllPlayers()}>
		Create Tiebreakers for All Players
	</StyledButton>
	<StyledButton
		on:click={() => createTiebreakersForPlayer($selected_player, undefined, undefined, true)}
	>
		Create All Tiebreakers for {$selected_player.name}
	</StyledButton>
	<StyledButton
		on:click={() =>
			createTiebreakersForPlayer($selected_player, $selected_week, $selected_year, true)}
	>
		Create Tiebreakers for {$selected_player.name} for Week {$selected_week}, {$selected_year}
	</StyledButton>
	<DeletionButton on:click={() => deleteTiebreakersForPlayer($selected_player)}>
		Delete All Tiebreakers for {$selected_player.name}
	</DeletionButton>
	<DeletionButton
		on:click={() => deleteTiebreakersForPlayer($selected_player, $selected_week, $selected_year)}
	>
		Delete Tiebreakers for {$selected_player.name} for Week {$selected_week}, {$selected_year}
	</DeletionButton>
	<DeletionButton on:click={() => deleteTiebreakersForAllPlayers()}>
		Delete Tiebreakers for All Players
	</DeletionButton>
</AdminExpandSection>
