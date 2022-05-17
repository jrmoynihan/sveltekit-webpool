<script lang="ts">
	import Modal from './Modal.svelte';
	export let button_text = '';
	export let use_default_button = true;
	export let use_discreet_button = false;
	export let use_styled_button = false;
	export let use_admin_button = false;
	export let modal_button_styles = '';
	export let modal_button_hover_styles: { property: string; value: string }[] = [];
	export let modal_foreground_styles = '';
	export let dialog_styles = '';
	export let dialog_starts_open = false;
	export let close: () => Promise<void> = null;
	export let open: () => Promise<void> = null;
	let button: HTMLButtonElement;

	function hovered() {
		modal_button_hover_styles.forEach((style) => {
			button.style.setProperty(style.property, style.value);
		});
	}
	function unhovered() {
		modal_button_hover_styles.forEach((style) => {
			button.style.removeProperty(style.property);
		});
	}
</script>

<Modal bind:open bind:close {dialog_starts_open} {dialog_styles} {modal_foreground_styles}>
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
	class:use_discreet_button
	class:use_default_button
	class:use_styled_button
	class:use_admin_button
	style={modal_button_styles}
>
	{button_text}
	<slot name="button-icon" />
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		gap: 10px;
		&.use_default_button {
			@include defaultButtonStyles;
		}
		&.use_discreet_button {
			@include discreetButtonStyles;
		}
		&.use_styled_button {
			@include styledButton;
		}
		&.use_admin_button {
			@include admin;
		}
	}
</style>
