<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { removeWinnersFromGames, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedWeek: number;
	export let selectedYear: number;

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Games" bind:min>
	<StyledButton on:click={() => updateGamesAndATSWinners(selectedWeek)}
		><span>Find Winners of <b>Week {selectedWeek}</b> NFL Games</span></StyledButton
	>
	<DeletionButton on:click={() => removeWinnersFromGames(selectedWeek, selectedYear)}>
		<span>Remove Game Winners For <b>Week {selectedWeek}, {selectedYear}</b></span></DeletionButton
	>
</AdminExpandSection>
