<script lang="ts">
	export let modal_foreground_styles = '';
	export let dialog_styles = '';
	// Should the dialog initialize open by default?
	export let dialog_starts_open = false;
	// Is it an error modal?
	export let is_error = false;
	export let transition_style: 'scale' | 'fly' = 'scale';
	let modal: HTMLDialogElement;
	let is_open = false;
	export const close = async (): Promise<void> => {
		is_open = false;
		// Delay the actual close long enough for the class-based transition to play
		setTimeout(() => modal?.close(), 300);
	};
	export const open = async (): Promise<void> => {
		modal?.showModal();
		is_open = true;
	};
	$: dialog_starts_open && modal ? open() : close();
</script>

<dialog
	bind:this={modal}
	class="fixed"
	class:is_open
	class:is_error
	class:scale={transition_style === 'scale'}
	class:fly={transition_style === 'fly'}
	style={dialog_styles}
	on:click|capture|self={close}
>
	<div class="modal-foreground" style={modal_foreground_styles}>
		<slot name="modal-content">slotted modal content goes here</slot>
	</div>
</dialog>

<style lang="scss">
	dialog {
		@include frostedGlass;
		scrollbar-width: thin;
		position: fixed;
		transition: all 300ms ease-in-out;
		border: none;
		border-radius: 25px;
		box-shadow: 0 0 10px var(--text, white);
		background-color: var(--background, hsl(120, 16%, 17%));
		color: var(--text, white);
		font-size: initial;
		margin: auto; // centers the dialog for bad browser user-agent stylesheets that default to top-left
		width: max-content;
		opacity: 0;
		&.scale {
			transform: scale3d(0, 0, 0);
		}
		&.fly {
			transform: translate3d(0, 5rem, 0);
		}

		&.is_open,
		&.is_open > .modal-foreground {
			opacity: 1;
			pointer-events: all;
		}
		&.is_open {
			&.scale {
				transform: scale3d(1, 1, 1);
			}
			&.fly {
				transform: translate3d(0, 0, 0);
			}
		}

		&::backdrop {
			background-color: hsla(0, 0%, 0%, 0.4);
			padding: 10rem;
			&.is_error {
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
		transition: all 200ms ease-in-out;
		opacity: 0;
		pointer-events: none;
	}
	.is_error {
		background-color: pink;
		color: darkred;
	}
</style>
