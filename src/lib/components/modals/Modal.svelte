<script context="module" lang="ts">
	// let dialogPolyfill: DialogPolyfillType;

	// async function getPolyfill() {
	// 	dialogPolyfill = (await import('dialog-polyfill')).default;
	// 	await import('dialog-polyfill/dialog-polyfill.css');
	// }

	// function isDialogSupported() {
	// 	if (browser && window.HTMLDialogElement === undefined) {
	// 		return false;
	// 	} else if (browser) {
	// 		console.log('dialogs supported', window.HTMLDialogElement);
	// 		return true;
	// 	}
	// }
	// isDialogSupported() ? getPolyfill() : null;
</script>

<script lang="ts">
	// import dialogPolyfill from 'dialog-polyfill';
	import {
		checkForEscape,
		displayModal,
		hideThisModalDelayed
	} from '$scripts/modals/modalFunctions';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';
	export let modalForegroundStyles = '';
	export let dialogStyles = '';
	// Apply a random Universally Unique ID to allow more than one modal component to be present in the same window, but be targeted separately for opening/closing
	export let modalID = nanoid();
	export let dialogOpen = false;
	export let isError = false;
	let modal: HTMLDialogElement;
	export const close = async (): Promise<void> => {
		dialogOpen = false;
		hideThisModalDelayed(modal);
	};
	export const open = async (): Promise<void> => {
		dialogOpen = true;
		displayModal(modal);
	};
	onMount(() => {
		// dialogPolyfill.registerDialog(modal);
		dialogOpen ? open() : null;

		// if (dialogPolyfill === undefined) {
		// 	console.log('getting polyfill...');
		// 	getPolyfill();
		// } else {
		// 	console.log('registering dialog...', modal.id);
		// 	dialogPolyfill.registerDialog(modal);
		// }
	});
</script>

<dialog
	class="fixed"
	class:isError
	id={`modal-${modalID}`}
	style="{dialogOpen ? 'opacity:1' : 'opacity:0'}; {dialogStyles}"
	on:click|capture|self={close}
	bind:this={modal}
>
	<div class="modal-foreground" style={modalForegroundStyles}>
		<slot name="modal-content">slotted modal content goes here</slot>
	</div>
</dialog>

<svelte:window on:keydown|self={(e) => checkForEscape(e, modal)} />

<style lang="scss">
	dialog {
		@include frostedGlass;
		scrollbar-width: thin;
		position: fixed;
		// top: 50%;
		// transform: translate(-50vw, -50%);
		transition: all 300ms ease-in-out;
		border: none;
		border-radius: 25px;
		box-shadow: 0 0 10px var(--text, white);
		background-color: var(--background, hsl(120, 16%, 17%));
		color: var(--text, white);
		font-size: initial;
		margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left
		width: max-content;

		&::backdrop {
			background-color: hsla(0, 0%, 0%, 0.4);
			padding: 10rem;
			&.isError {
				background-color: hsla(0, 41%, 58%, 0.4);
			}
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
		padding: 1rem;
	}
	.isError {
		background-color: pink;
		color: darkred;
	}
</style>
