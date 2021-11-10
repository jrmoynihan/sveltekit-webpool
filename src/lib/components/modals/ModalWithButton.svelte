<script lang="ts">
	// import dialogPolyfill from 'dialog-polyfill';
	import Modal from './Modal.svelte';
	export let displayModalButtonText = '';
	export let defaultButton = true;
	export let discreetButton = false;
	export let styledButton = false;
	export let adminButton = false;
	export let modalButtonStyles = '';
	export let modalButtonHoverStyles: { property: string; value: string }[] = [];
	export let modalForegroundStyles = '';
	export let dialogStyles = '';
	export let dialogOpen = false;
	let modal: { close: () => void; open: () => void };
	let button: HTMLButtonElement;
	export const close = async (): Promise<void> => {
		modal.close();
	};
	export const open = async () => {
		modal.open();
	};
	function hovered() {
		modalButtonHoverStyles.forEach((style) => {
			button.style.setProperty(style.property, style.value);
		});
	}
	function unhovered() {
		modalButtonHoverStyles.forEach((style) => {
			button.style.removeProperty(style.property);
		});
	}
</script>

<Modal bind:this={modal} {dialogOpen} {dialogStyles} {modalForegroundStyles}>
	<svelte:fragment slot="modal-content">
		<slot name="modal-content" />
	</svelte:fragment>
</Modal>
<button
	bind:this={button}
	on:click={() => open()}
	on:mouseover={hovered}
	on:mouseleave={unhovered}
	on:focus={hovered}
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
