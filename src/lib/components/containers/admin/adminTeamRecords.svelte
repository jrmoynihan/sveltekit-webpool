<script lang="ts">
	import { updateTeamRecords } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import { resetTeamRecords } from '$scripts/teams';
	import AdminExpandSection from './adminExpandSection.svelte';

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="NFL Teams" bind:min>
	<button
		on:click={() => {
			const proceed = confirm('Have you already updated the game winners?  If so, click OK.');
			if (proceed) {
				updateTeamRecords();
			}
		}}>Update Team Records</button
	>
	<button class="deletion" on:click={() => resetTeamRecords()}>Reset Team Records</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
