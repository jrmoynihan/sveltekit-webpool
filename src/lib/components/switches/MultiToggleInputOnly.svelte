<script lang="ts">
	import type { toggleItem } from '$scripts/types/toggleItem';
	import { createEventDispatcher } from 'svelte';

	export let item: toggleItem;
	export let id: string;
	export let selectedItem: toggleItem;

	// Create an event dispatcher object
	const dispatch = createEventDispatcher();
	// A function when the input is changed; dispatches/triggers the event named "toggle" to the parent component
	function toggled(
		e:
			| (KeyboardEvent & { currentTarget: EventTarget & HTMLLabelElement })
			| (Event & { currentTarget: EventTarget & HTMLInputElement })
	): void {
		dispatch('toggle', e);
	}
</script>

<input
	type="radio"
	name="toggleGroup-{id}"
	bind:group={selectedItem}
	on:change|stopPropagation={(e) => toggled(e)}
	on:keydown={(e) => toggled(e)}
	id="{id}-{item.value}"
	value={item}
/>

<style lang="scss">
	input {
		display: flex;
		width: 1rem;
	}
</style>
