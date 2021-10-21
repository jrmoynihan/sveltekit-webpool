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
	let modal: any;
	export const close = async (): Promise<void> => {
		modal.close();
	};
	export const open = async () => {
		modal.open();
	};
</script>

<!-- <dialog
	class="fixed"
	class:dialogOpen
	id={`modal-${modalID}`}
	style={dialogStyles}
	on:click|capture|self={() => close()}
	bind:this={modal}
>
	<div class="modal-foreground" style={modalForegroundStyles}>
		<slot name="modal-content">slotted modal content goes here</slot>
	</div>
</dialog> -->
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
	// dialog {
	// 	@include frostedGlass;
	// 	@include gridCenter;
	// 	position: fixed;
	// 	border: 0;
	// 	border-radius: 25px;
	// 	box-shadow: 0 0 10px var(--main-color, rgb(255, 255, 255));
	// 	background-color: var(--alternate-color, rgb(36, 50, 36));
	// 	color: var(--main-color, rgb(255, 255, 255));
	// 	font-size: initial;
	// 	margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left
	// 	padding: revert;
	// 	opacity: 0;
	// 	pointer-events: none;
	// 	transition: all 300ms ease-out;

	// 	&::backdrop {
	// 		background-color: rgba(0, 0, 0, 0.4);
	// 		backdrop-filter: blur(5px);
	// 	}
	// }
	// .dialogOpen {
	// 	opacity: 1;
	// 	pointer-events: all;
	// }
	// .modal-foreground {
	// 	@include defaultTransition;
	// 	display: grid;
	// 	grid-auto-rows: max-content;
	// 	grid-auto-columns: minmax(0, 1fr);
	// 	gap: 15px;
	// 	z-index: 10;
	// 	align-items: center;
	// 	justify-items: center;
	// 	padding: 1rem;
	// }
</style>
