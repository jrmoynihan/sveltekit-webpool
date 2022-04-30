<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';

	import { resetWeeklyUserRecords } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import Tooltip from '../Tooltip.svelte';
	import AdminExpandSection from './adminExpandSection.svelte';

	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="User Records" bind:minColumns>
	<Tooltip tooltipTop="-150%" customStyleTooltipParent="color:var(--text);">
		<p slot="text">User pick records are created when games are <i>scored</i>.</p>
		<DeletionButton slot="content" on:click={() => resetWeeklyUserRecords()}
			>Reset User Records</DeletionButton
		>
	</Tooltip>
</AdminExpandSection>
