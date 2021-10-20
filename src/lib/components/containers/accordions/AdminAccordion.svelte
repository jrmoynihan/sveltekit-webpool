<script lang="ts">
	import AdminOnlyControl from '$lib/components/misc/AdminOnlyControl.svelte';
	import AccordionDetails from './AccordionDetails.svelte';
</script>

<AdminOnlyControl>
	<AccordionDetails adminOnly={true} customDetailsStyles={'margin-bottom:1rem;'}>
		<p slot="summary">Admin Only Controls</p>
		<slot slot="content" name="content" />
	</AccordionDetails>
</AdminOnlyControl>
