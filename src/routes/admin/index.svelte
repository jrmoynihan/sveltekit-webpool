<script lang="ts">
	import Grid from '$lib/components/containers/Grid.svelte';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type ModalOnly from '$lib/components/modals/Modal.svelte';
	import { toastIt } from '$scripts/toasts';

	let modalOnlyComponent: ModalOnly;
</script>

<PageTitle>Admin</PageTitle>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<NewPlayerForm bind:modalOnlyComponent />
<Grid>
	<button on:click={() => modalOnlyComponent.open()}>Open New Player Form</button>
	<button on:click={() => toastIt('Test Toast!', `Here's to you, bold adventurer!`)}
		>Toast It!</button
	>
</Grid>

<style lang="scss">
	button {
		@include styledButton;
		width: max-content;
	}
</style>
