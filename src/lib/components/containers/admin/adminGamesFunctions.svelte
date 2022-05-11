<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { removeWinnersFromGames, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import { larger_than_mobile, selected_week, selected_year } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number;
	$: minColumns = $larger_than_mobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Games" bind:minColumns {customContentStyles} {customSummaryStyles}>
	<StyledButton on:click={() => updateGamesAndATSWinners($selected_week)}
		><span>Find Winners of <b>Week {$selected_week}</b> NFL Games</span></StyledButton
	>
	<DeletionButton on:click={() => removeWinnersFromGames($selected_week, $selected_year)}>
		<span>Remove Game Winners For <b>Week {$selected_week}, {$selected_year}</b></span
		></DeletionButton
	>
</AdminExpandSection>
