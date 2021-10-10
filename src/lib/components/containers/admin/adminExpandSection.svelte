<script lang="ts">
	import AccordionDetails from '../AccordionDetails.svelte';
	import Grid from '../Grid.svelte';

	export let summaryText = '';
	export let min: string | number = 0;
	export let max: string | number = 'max-content';
	export let startOpen = false;
	export let customDetailsStyles: string = undefined;
</script>

<AccordionDetails bind:open={startOpen} {customDetailsStyles}>
	<h3 slot="summary">{summaryText}</h3>
	<Grid slot="content" bind:min bind:max>
		<slot />
	</Grid>
</AccordionDetails>

<style lang="scss">
	h3 {
		display: inline-block;
	}
</style>
