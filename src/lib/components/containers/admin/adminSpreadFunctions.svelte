<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';

	import { selectedWeek } from '$scripts/store';
	import { updateGameSpreads } from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedYear: number;

	// Min column size for grid-template-columns: minmax(--minColumns, -maxColumns)
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Spreads" bind:minColumns>
	<StyledButton on:click={() => updateGameSpreads($selectedWeek, selectedYear)}>
		<span>Update Spreads for <b> Week {$selectedWeek}, {selectedYear}</b></span>
	</StyledButton>
</AdminExpandSection>
