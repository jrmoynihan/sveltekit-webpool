<script lang="ts">
	import Grid from '$lib/components/containers/Grid.svelte';
	import NewUserForm from '$lib/components/forms/NewUserForm.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type ModalOnly from '$lib/components/modals/Modal.svelte';
	import { toastIt } from '$scripts/toasts';

	let modalOnlyComponent: ModalOnly;
</script>

<PageTitle>Admin</PageTitle>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<NewUserForm bind:modalOnlyComponent />
<Grid>
	<button on:click={() => modalOnlyComponent.open()}>Open New User Form</button>
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
