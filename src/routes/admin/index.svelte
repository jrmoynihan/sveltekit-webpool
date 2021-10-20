<script lang="ts">
	import NewUserForm from '$lib/components/forms/NewUserForm.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type ModalOnly from '$lib/components/modals/Modal.svelte';

	let modalOnlyComponent: ModalOnly;
</script>

<PageTitle>Admin</PageTitle>
<svelte:head>
	<title>Admin</title>
</svelte:head>
<NewUserForm bind:modalOnlyComponent />
<button on:click={() => modalOnlyComponent.open()}>Open New User Form</button>

<style lang="scss">
	button {
		@include styledButton;
		width: max-content;
	}
</style>
