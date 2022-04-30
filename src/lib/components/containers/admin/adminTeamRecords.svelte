<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';

	import StyledButton from '$lib/components/buttons/StyledButton.svelte';

	import { updateTeamRecordsFromESPN } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import { resetTeamRecords } from '$scripts/teams';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedYear: number = new Date().getFullYear();

	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="NFL Teams" bind:minColumns>
	<StyledButton
		on:click={() => {
			// const proceed = confirm('Have you already updated the game winners?  If so, click OK.');
			// if (proceed) {
			updateTeamRecordsFromESPN(selectedYear);
			// }
		}}>Update Team Records</StyledButton
	>
	<DeletionButton on:click={() => resetTeamRecords()}>Reset Team Records</DeletionButton>
</AdminExpandSection>
