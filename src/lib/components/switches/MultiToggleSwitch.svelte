<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import { faCheckCircle, type IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { toggleItem } from '$scripts/types/types';
	import { browser } from '$app/env';

	export let id = nanoid();
	export let items: toggleItem[] = [];
	export let selected_item = items[0];
	export let selected_value = selected_item.value;
	export let grid_area = '';
	export let title_text = '';
	let defaultIcon: IconDefinition = faCheckCircle;
	// Add override styles
	export let faIcon: IconDefinition = defaultIcon;
	export let show_icon: boolean = true;
	export let show_label: boolean = true;
	export let show_tooltip: boolean = false;
	export let show_selected_value: boolean = true;
	export let icon_top_percentage: number = show_icon ? 55 : 43;
	export let title_label_styles = '';
	export let option_label_styles = '';
	export let custom_container_styles = '';
	export let is_admin_only = false;
	export let background_color_hue = 207;
	export let background_color_saturation = 90;
	export let background_color_luminosity = 54;
	export let darken_hover_percentage = 20;
	export let active_background_color = `hsl(${background_color_hue},${background_color_saturation}%,${background_color_luminosity}%)`;
	export let active_background_color_hovered = `hsl(${background_color_hue},${background_color_saturation}%,${
		background_color_luminosity - darken_hover_percentage
	}%)`;
	let selected_label: HTMLLabelElement;
	let span_width: number;
	let span_left: number;
	let toggle_container: HTMLDivElement;
	let div_left: number;

	// Create an event dispatcher object
	const dispatch = createEventDispatcher();
	// A function when the input is changed; dispatches/triggers the event named "toggle" to the parent component
	function toggled(e, i) {
		changeSelectionWithKeys(e, i);
		dispatch('toggle');
	}
	function changeSelectionWithKeys(
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLLabelElement },
		i: number
	) {
		// Accessible selection with Spacebar or Enter key
		if (e.key === ' ' || e.key === 'Enter') {
			selected_item = items[i];
		}
	}

	const checkSelectedItemIcon = (selectedItem: toggleItem) => {
		if (selectedItem.icon) {
			// console.log(`selected item has icon: ${selectedItem.icon}`);
			faIcon = selectedItem.icon;
		} else {
			// console.log('no icon on selected item', selectedItem);
			faIcon = defaultIcon;
		}
	};

	const updateSelectedValue = (selectedItem: toggleItem) => (selected_value = selectedItem.value);

	$: if (browser && document && selected_item) {
		selected_label = document.getElementById(
			`${id}-${selected_item.label}-label`
		) as HTMLLabelElement;
	}
	$: if (browser && selected_label && toggle_container) {
		const labelBounds = selected_label.getBoundingClientRect();
		const divBounds = toggle_container.getBoundingClientRect();
		const divStyles = window.getComputedStyle(toggle_container);
		div_left = divBounds.left + parseInt(divStyles.paddingLeft.replace('px', ''));
		span_width = labelBounds.width;
		span_left = labelBounds.left - div_left;
	}
	$: checkSelectedItemIcon(selected_item);
	$: updateSelectedValue(selected_item);

	onMount(() => {
		if (browser && document) {
			selected_label = document.getElementById(
				`${id}-${selected_item.label}-label`
			) as HTMLLabelElement;
		}
		checkSelectedItemIcon(selected_item);
	});
	// @FIXME if two of these components are on the screen with the same item source, only the first is updated?
</script>

<div
	bind:this={toggle_container}
	class:is_admin_only
	class="switch"
	style="--divLeft:{div_left}; --count:{items.length}; grid-area: {grid_area};--toggleBgColorActive:{active_background_color}; --toggleBgColorActiveHovered:{active_background_color_hovered}; {custom_container_styles}"
>
	{#if title_text}
		<p style="font-weight: bold; {title_label_styles}">{title_text}</p>
	{/if}
	<span class="connector" />
	{#each items as item, i}
		<label
			id="{id}-{item.label}-label"
			for={item.label}
			class:selected={selected_item.value === item.value}
			class:is_admin_only
			style={option_label_styles}>{item.label}</label
		>
		<input
			type="radio"
			id={item.label}
			name="toggleGroup-{id}"
			bind:group={selected_item}
			on:change|stopPropagation={(e) => toggled(e, i)}
			value={item}
		/>
	{/each}
	{#if selected_label}
		<span
			id="{id}-icon"
			class="icon background"
			class:is_admin_only
			class:show_label
			class:show_tooltip
			style="--option:{selected_item};--spanWidth:{span_width}px;--spanLeft:{span_left}px;
			--spanHeight:{show_icon ? null : '8%'};--spanBorderRadius:{show_icon
				? '0 0 1.5rem 1.5rem'
				: '1.5rem'};--spanZ:{show_icon
				? 'var(--base)'
				: 'var(--below)'};--iconTop:{icon_top_percentage}%;"
		>
			{#if show_icon}
				<!-- {#key faIcon} -->
				<Fa icon={faIcon} />
				<!-- {/key} -->
			{/if}
		</span>
	{/if}
	{#if show_selected_value}
		<!-- <p>{selectedValue}</p> -->
		<p style="font-weight:600;">{selected_item.value}</p>
	{/if}
</div>

<style lang="scss">
	$slider-width: var(--spanWidth, min-content);
	$slider-height: 80%;
	$slider-transform: var(--spanLeft); //min(1.3em, 6vmin)
	$toggle-background-color-active: var(--toggleBgColorActive, hsl(207, 90%, 54%));
	$toggle-background-color-active-hovered: var(--toggleBgColorActiveHovered, hsl(207, 90%, 34%));
	$toggle-background-color-inactive: #aaa;
	$slider-color: white;
	$row-gap: 0.25rem;

	div {
		@include rounded;
		position: relative;
		display: grid;
		grid-template-rows: auto 2fr 1fr auto;
		grid-template-columns: repeat(var(--count), 1fr);
		column-gap: 0.5rem;
		row-gap: $row-gap;
		z-index: var(--base);
	}
	.connector {
		@include defaultPseudoElement;
		background: hsla(0, 0%, 0%, 0.2);
		z-index: var(--below);
		height: 10%;
		width: 80%;
		left: 7.5%;
		right: 7.5%;
		// grid-row: 2;
		grid-column: 1 / span var(--count);
		transform: translateY(425%);
	}
	label {
		@include defaultContainerStyles;
		transition: all 1000ms;
		transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
		box-shadow: none;
		border-radius: 1rem;
		padding: 0.5rem;
		background: hsla(var(--background-value, transparent));
		&:not(.selected) {
			box-shadow: 0 0 1px 2px hsla(var(--text-value), 40%);
		}
	}

	input {
		@include hiddenInput;
	}
	.icon {
		@include defaultTransition;
		position: absolute;
		top: var(--iconTop);
		width: $slider-width;
		height: var(--spanHeight, auto);
		transform: translateX($slider-transform);
		border-radius: var(--spanBorderRadius);
		z-index: var(--spanZ);
		color: white;
		background: var(--accent);
		pointer-events: none;
	}
	p {
		grid-column: span var(--count);
		width: 100%;
	}
	.selected {
		@include accentedContainer(100%);
		color: var(--background);
	}
	.is_admin_only {
		@include admin;
		border: none;
	}
</style>
