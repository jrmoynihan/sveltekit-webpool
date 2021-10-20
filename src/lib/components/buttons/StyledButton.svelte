<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text = '';
	export let disabled = false;
	const dispatch = createEventDispatcher();
	function buttonClicked(event: { detail: any }): void {
		dispatch('click', event.detail);
	}
</script>

<button on:click={buttonClicked} {disabled}>
	{text}
	<slot />
</button>

<style lang="scss">
	button {
		@include styledButton;
	}
</style>
