<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';

	import { resetWeeklyPlayerRecords } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import Tooltip from '../Tooltip.svelte';
	import AdminExpandSection from './adminExpandSection.svelte';

	let minColumns: string | number;
	$: minColumns = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Player Records" bind:minColumns>
	<Tooltip tooltipTop="-150%" customStyleTooltipParent="color:var(--text);">
		<p slot="text">Player pick records are created when games are <i>scored</i>.</p>
		<DeletionButton slot="content" on:click={() => resetWeeklyPlayerRecords()}
			>Reset Player Records</DeletionButton
		>
	</Tooltip>
</AdminExpandSection>
