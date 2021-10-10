<script lang="ts">
	import { largerThanMobile } from '$scripts/store';
	import { updateGameSpreads } from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedWeek: number;
	export let selectedYear: number;

	// Min and Max for a minmax grid column function
	let min: string | number;

	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Spreads" bind:min>
	<button on:click={() => updateGameSpreads(selectedWeek, selectedYear)}>
		<span>Update Spreads for <b> Week {selectedWeek}, {selectedYear}</b></span>
	</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton(false);
</style>
