<script lang="ts">
	// import dialogPolyfill from 'dialog-polyfill';
	import { displayModal, hideModal } from '$scripts/functions';
	import { nanoid } from 'nanoid';
	export let displayModalButtonText = '';
	export let defaultButton = true;
	export let discreetButton = false;
	export let styledButton = false;
	export let modalButtonStyles = '';
	export let modalForegroundStyles = '';
	export let dialogStyles = '';
	// Apply a random Universally Unique ID to allow more than one modal component to be present in the same window, but be targeted separately for opening/closing
	export let modalID = nanoid();
	export let dialogOpen = false;

	// $: {
	// 	dialogOpen ? displayModal(modalID) : hideModal(modalID);
	// }

	const hideThisModal = async () => {
		hideModal(modalID);
		dialogOpen = false;
	};
</script>

<!-- <svelte:head>
	<link rel="stylesheet" type="text/css" href="dist/dialog-polyfill.css" />
</svelte:head> -->

<dialog
	class="fixed"
	class:dialogOpen
	id={`modal-${modalID}`}
	style={dialogStyles}
	on:click|self={hideThisModal}
>
	<div class="modal-foreground" style={modalForegroundStyles}>
		<slot name="modal-content">slotted modal content goes here</slot>
	</div>
</dialog>
<button
	on:click={() => {
		displayModal(modalID);
		dialogOpen = true;
	}}
	class:discreetButton
	class:defaultButton
	class:styledButton
	style={modalButtonStyles}
>
	{displayModalButtonText}
	<slot name="button-icon" />
</button>

<style lang="scss">
	// @import 'src/Styles/Mixins.scss';
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
	}
	dialog {
		@include frostedGlass;
		@include gridCenter;
		position: fixed;
		border: 0;
		border-radius: 25px;
		box-shadow: 0 0 10px var(--main-color, rgb(255, 255, 255));
		background-color: var(--alternate-color, rgb(36, 50, 36));
		color: var(--main-color, rgb(255, 255, 255));
		font-size: initial;
		margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left
		padding: revert;
		opacity: 0;
		pointer-events: none;
		transition: all 500ms ease-out;

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(5px);
		}
	}
	.dialogOpen {
		opacity: 1;
		pointer-events: all;
	}
	.modal-foreground {
		@include defaultTransition;
		display: grid;
		grid-auto-rows: max-content;
		grid-auto-columns: 1fr;
		gap: 15px;
		z-index: 10;
		align-items: center;
		justify-items: center;
	}
</style>
