<script lang="ts">
	import AdminButton from '$lib/components/buttons/StyledButton.svelte';
	import { findWeekDateTimeBounds } from '$scripts/schedule';

	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Schedule" bind:minColumns>
	<AdminButton text="Find Bounds for Each Week" on:click={findWeekDateTimeBounds} />
</AdminExpandSection>
