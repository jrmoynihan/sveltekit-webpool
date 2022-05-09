<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';

	import { selected_week, selected_year } from '$scripts/store';
	import { updateGameSpreads } from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	// Min column size for grid-template-columns: minmax(--minColumns, -maxColumns)
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Spreads" bind:minColumns>
	<StyledButton on:click={() => updateGameSpreads($selected_week, $selected_year)}>
		<span>Update Spreads for <b> Week {$selected_week}, {$selected_year}</b></span>
	</StyledButton>
</AdminExpandSection>
