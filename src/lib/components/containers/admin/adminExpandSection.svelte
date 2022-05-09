<script lang="ts">
	import AccordionDetails3 from '../accordions/AccordionDetails.svelte';
	import Grid from '../Grid.svelte';

	export let summaryText = '';
	export let minColumns: string | number = 0;
	export let maxColumns: string | number = 'max-content';
	export let startOpen = false;
	export let customContentStyles: string = undefined;
</script>

<AccordionDetails3 open={startOpen} {customContentStyles}>
	<h3 slot="summary">{summaryText}</h3>
	<Grid slot="content" bind:minColumns bind:maxColumns>
		<slot />
	</Grid>
</AccordionDetails3>

<style lang="scss">
	h3 {
		display: inline-block;
	}
</style>
