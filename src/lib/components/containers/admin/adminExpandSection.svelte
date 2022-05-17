<script lang="ts">
	import AccordionDetails from '../accordions/AccordionDetails.svelte';
	import Grid from '../Grid.svelte';

	export let summaryText = '';
	export let minColumns: string | number = 0;
	export let maxColumns: string | number = 'max-content';
	export let startOpen = false;
	export let customContentStyles: string = null;
	export let customSummaryStyles: string = null;
</script>

<AccordionDetails
	open={startOpen}
	{customContentStyles}
	{customSummaryStyles}
	expanderIconSide={'right'}
>
	<h3 slot="summary">{summaryText}</h3>
	<Grid slot="content" bind:minColumns bind:maxColumns>
		<slot />
	</Grid>
</AccordionDetails>

<style lang="scss">
	h3 {
		display: inline-block;
	}
</style>
