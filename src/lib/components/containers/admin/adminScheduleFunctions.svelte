<script lang="ts">
	import AdminButton from '$lib/components/buttons/StyledButton.svelte';
	import { defaultToast } from '$lib/scripts/toasts';

	import { largerThanMobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';

	function findWeekDateTimeBounds() {
		defaultToast({ title: 'Not Yet Implemented', msg: 'Find Week Bounds is not yet implemented.' });
	}
</script>

<AdminExpandSection
	summaryText="Schedule"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<AdminButton text="Find Bounds for Each Week" on:click={findWeekDateTimeBounds} />
</AdminExpandSection>
