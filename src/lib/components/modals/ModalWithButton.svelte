<script lang="ts">
	// import dialogPolyfill from 'dialog-polyfill';
	import Modal from './Modal.svelte';
	export let displayModalButtonText = '';
	export let defaultButton = true;
	export let discreetButton = false;
	export let styledButton = false;
	export let adminButton = false;
	export let modalButtonStyles = '';
	export let modalForegroundStyles = '';
	export let dialogStyles = '';
	export let dialogOpen = false;
	let modal: { close: () => void; open: () => void };
	export const close = async (): Promise<void> => {
		modal.close();
	};
	export const open = async () => {
		modal.open();
	};
</script>

<Modal bind:this={modal} {dialogOpen} {dialogStyles} {modalForegroundStyles}>
	<svelte:fragment slot="modal-content">
		<slot name="modal-content" />
	</svelte:fragment>
</Modal>
<button
	on:click={() => open()}
	class:discreetButton
	class:defaultButton
	class:styledButton
	class:adminButton
	style={modalButtonStyles}
>
	{displayModalButtonText}
	<slot name="button-icon" />
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		gap: 10px;
		&.defaultButton {
			@include defaultButtonStyles;
		}
		&.discreetButton {
			@include discreetButtonStyles;
		}
		&.styledButton {
			@include styledButton;
		}
		&.adminButton {
			@include admin;
		}
	}
</style>
