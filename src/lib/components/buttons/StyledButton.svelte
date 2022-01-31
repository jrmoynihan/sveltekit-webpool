<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text = '';
	export let disabled = false;
	export let customStyles = '';
	const dispatch = createEventDispatcher();
	function buttonClicked(event: MouseEvent): void {
		dispatch('click', event.detail);
	}
</script>

<button on:click={buttonClicked} {disabled} style={customStyles}>
	{text}
	<slot />
</button>

<style lang="scss">
	button {
		@include styledButton;
	}
</style>
