<script lang="ts">
	import type { toggleItem } from '$scripts/types/toggleItem';
	import { createEventDispatcher } from 'svelte';

	export let item: toggleItem;
	export let id: string;
	export let selectedItem: toggleItem;
	export let adminOnly: boolean;
	export let optionLabelStyles: string;
	export let showLabelText: boolean;

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

<label
	for="{id}-{item.value}"
	id="{id}-{item.value}-label"
	class:selected={selectedItem.value === item.value}
	class:adminOnly
	style={optionLabelStyles}
	tabindex="0"
	on:keydown={(e) => toggled(e)}
>
	{#if showLabelText}
		<div>{item.label}</div>
	{/if}
	<!-- NOTE: Subtle fix made by changing this to on:change event instead of on:click -->
	<input
		type="radio"
		name="toggleGroup-{id}"
		bind:group={selectedItem}
		on:change|stopPropagation={(e) => toggled(e)}
		id="{id}-{item.value}"
		value={item}
	/>
</label>

<style lang="scss">
	input {
		visibility: hidden;
		display: flex;
	}
	label {
		@include defaultContainerStyles;
		display: grid;
		place-items: center;
		cursor: pointer;
		aspect-ratio: 1 / 1;
		background: rgba(var(--alternateValue-color, transparent));
		&:not(.label-text).adminOnly:hover {
			@include dayShadow;
		}
	}
	div {
		display: flex;
		flex-direction: column;
		word-wrap: break-word;
		max-width: 8ch;
	}
	.selected {
		@include accentedContainer(100%);
		color: var(--alternate-color);
	}
	.adminOnly {
		@include admin;
		border: none;
	}
</style>
