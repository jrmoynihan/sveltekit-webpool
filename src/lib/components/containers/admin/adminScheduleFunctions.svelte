<script lang="ts">
	import { findWeekDateTimeBounds } from '$scripts/schedule';

	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Schedule" bind:min>
	<button on:click={() => findWeekDateTimeBounds()}>Find Bounds for Each Week</button>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
