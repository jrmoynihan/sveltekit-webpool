<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { selected_week, selected_year, selected_player, selected_season } from '$scripts/store';
	import {
		createWeeklyTiebreakersForAllPlayers,
		createWeeklyTiebreakersForPlayer,
		deleteTiebreakersForAllPlayers,
		deleteTiebreakersForPlayer
	} from '$scripts/weekly/weeklyAdmin';
	import { where } from '@firebase/firestore';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number = '40%';

	function deleteAllTiebreakersForPlayer() {
		deleteTiebreakersForPlayer({ player: $selected_player });
	}
	function deleteSpecificTiebreakersForPlayer() {
		const constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year)
		];
		deleteTiebreakersForPlayer({ player: $selected_player, constraints });
	}
</script>

<AdminExpandSection
	summaryText="Tiebreakers"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<StyledButton on:click={() => createWeeklyTiebreakersForAllPlayers($selected_season)}>
		Create Tiebreakers for All Players
	</StyledButton>
	<StyledButton
		on:click={() =>
			createWeeklyTiebreakersForPlayer({ player: $selected_player, season: $selected_season })}
	>
		Create All Tiebreakers for {$selected_player.name}
	</StyledButton>
	<DeletionButton on:click={deleteAllTiebreakersForPlayer}>
		Delete Tiebreakers for {$selected_player.name}
	</DeletionButton>
	<DeletionButton on:click={deleteSpecificTiebreakersForPlayer}>
		Delete Tiebreakers for {$selected_player.name} for Week {$selected_week}, {$selected_year}
	</DeletionButton>
	<DeletionButton on:click={() => deleteTiebreakersForAllPlayers()}>
		Delete Tiebreakers for All Players
	</DeletionButton>
</AdminExpandSection>
