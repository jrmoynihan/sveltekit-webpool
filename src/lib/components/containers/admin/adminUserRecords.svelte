<script lang="ts">
	import { resetWeeklyUserRecords } from '$scripts/scorePicks';
	import { largerThanMobile } from '$scripts/store';
	import Tooltip from '../Tooltip.svelte';
	import AdminExpandSection from './adminExpandSection.svelte';

	let min: string | number;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="User Records" bind:min>
	<Tooltip tooltipTop="-150%" customStyleTooltipParent="color:var(--main-color);">
		<p slot="text">User pick records are created when games are <i>scored</i>.</p>
		<button slot="content" class="deletion" on:click={() => resetWeeklyUserRecords()}
			>Reset User Records</button
		>
	</Tooltip>
</AdminExpandSection>

<style lang="scss">
	@include adminButton;
</style>
