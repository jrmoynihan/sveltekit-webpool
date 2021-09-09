<script lang="ts">
	// import dialogPolyfill from 'dialog-polyfill';
	import { hideModal } from '$scripts/functions';
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

	// $: {dialogOpen ? displayModal : hideModal}

	export const displayModal = () => {
		var modal: HTMLDialogElement = document.getElementById(`modal-${modalID}`) as HTMLDialogElement;
		var isDialogSupported = true;

		if (!window.HTMLDialogElement) {
			document.body.classList.add('no-dialog');
			isDialogSupported = false;
		}

		if (isDialogSupported) {
			dialogOpen = true;
			modal.showModal();
		} else {
			modal.setAttribute('open', '');
		}
		blurElement();
	};

	const hideThisModal = async () => {
		hideModal(modalID);
		dialogOpen = false;
	};

	const blurElement = () => {
		const modal = document.getElementById(`modal-${modalID}`);
		modal.blur();
	};
</script>

<!-- <svelte:head>
	<link rel="stylesheet" type="text/css" href="dist/dialog-polyfill.css" />
</svelte:head> -->

<dialog
	class="fixed"
	id={`modal-${modalID}`}
	style="{dialogOpen ? 'opacity:1' : 'opacity:0'}; {dialogStyles}"
	on:click|self={hideThisModal}
>
	<div class="modal-foreground" style={modalForegroundStyles}>
		<slot name="modal-content">slotted modal content goes here</slot>
	</div>
</dialog>
<button
	on:click={() => {
		displayModal();
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
		position: fixed;
		transition: all 300ms ease-in-out;
		border: 0;
		border-radius: 25px;
		box-shadow: 0 0 10px var(--main-color);
		background-color: var(--alternate-color);
		color: var(--main-color);
		font-size: initial;
		margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.4);
		}
	}
	.modal-foreground {
		display: grid;
		grid-auto-rows: max-content;
		grid-auto-columns: 1fr;
		gap: 15px;
		z-index: 10;
		align-items: center;
		justify-items: center;
	}
</style>
