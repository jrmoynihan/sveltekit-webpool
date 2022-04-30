<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { removeWinnersFromGames, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import { largerThanMobile, selectedWeek } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedYear: number;

	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Games" bind:minColumns>
	<StyledButton on:click={() => updateGamesAndATSWinners($selectedWeek)}
		><span>Find Winners of <b>Week {$selectedWeek}</b> NFL Games</span></StyledButton
	>
	<DeletionButton on:click={() => removeWinnersFromGames($selectedWeek, selectedYear)}>
		<span>Remove Game Winners For <b>Week {$selectedWeek}, {selectedYear}</b></span></DeletionButton
	>
</AdminExpandSection>
