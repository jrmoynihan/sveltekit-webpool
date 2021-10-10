<script lang="ts">
	import { removeWinnersFromGames, updateGamesAndATSWinners } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let selectedWeek: number;
	export let selectedYear: number;

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Games" bind:min>
	<button on:click={() => updateGamesAndATSWinners(selectedWeek)}>
		<span>Find Winners of <b>Week {selectedWeek}</b> NFL Games</span>
	</button>
	<button class="deletion" on:click={() => removeWinnersFromGames(selectedWeek, selectedYear)}>
		<span>Remove Game Winners For <b>Week {selectedWeek}, {selectedYear}</b></span>
	</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
