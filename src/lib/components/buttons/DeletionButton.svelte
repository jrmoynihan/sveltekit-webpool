<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text = '';
	const dispatch = createEventDispatcher();
	function buttonClicked(event: { detail: unknown }): void {
		dispatch('click', event.detail);
	}
</script>

<button on:click={buttonClicked}>
	{text}
	<slot />
</button>

<style lang="scss">
	button {
		@include deletionButton;
	}
</style>
