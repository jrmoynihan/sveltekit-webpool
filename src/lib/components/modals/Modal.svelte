<script lang="ts">
	import {
		checkForEscape,
		displayModal,
		hideThisModalDelayed
	} from '$scripts/modals/modalFunctions';

	// import dialogPolyfill from 'dialog-polyfill';
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
		dialogOpen ? open() : null;
	});
</script>

<!-- <svelte:head>
	<link rel="stylesheet" type="text/css" href="dist/dialog-polyfill.css" />
</svelte:head> -->

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
		position: fixed;
		transition: all 300ms ease-in-out;
		border: 0;
		border-radius: 25px;
		box-shadow: 0 0 10px var(--main-color, rgb(255, 255, 255));
		background-color: var(--alternate-color, rgb(36, 50, 36));
		color: var(--main-color, rgb(255, 255, 255));
		font-size: initial;
		margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left

		&::backdrop {
			background-color: rgba(0, 0, 0, 0.4);
			&.isError {
				background-color: rgba(192, 106, 106, 0.4);
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
