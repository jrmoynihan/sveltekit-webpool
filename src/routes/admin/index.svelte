<script lang="ts">
	import Grid from '$lib/components/containers/Grid.svelte';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { toastIt } from '$scripts/toasts';

	let openNewPlayerForm: () => Promise<void>;
</script>

<PageTitle>Admin</PageTitle>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<NewPlayerForm bind:openNewPlayerForm />
<Grid>
	<button on:click={openNewPlayerForm}>Open New Player Form</button>
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
