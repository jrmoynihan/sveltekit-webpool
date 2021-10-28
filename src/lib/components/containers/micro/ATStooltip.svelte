<script lang="ts">
	import Tooltip from '../Tooltip.svelte';

	export let gridArea = 'ATS';
</script>

<Tooltip
	tooltipWidth="300%"
	tooltipTop="-650%"
	customStyleTooltipParent="grid-area:{gridArea};align-self:center;"
>
	<svelte:fragment slot="text">Scores adjusted Against the Spread.</svelte:fragment>
	<div slot="content" class="ATS-text">ATS</div>
</Tooltip>

<style lang="scss">
	.ATS-text {
		align-self: center;
	}
</style>
