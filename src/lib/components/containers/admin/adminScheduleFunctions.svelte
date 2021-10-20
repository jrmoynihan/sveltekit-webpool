<script lang="ts">
	import AdminButton from '$lib/components/buttons/StyledButton.svelte';
	import { findWeekDateTimeBounds } from '$scripts/schedule';

	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Schedule" bind:min>
	<AdminButton text="Find Bounds for Each Week" on:click={findWeekDateTimeBounds} />
</AdminExpandSection>
