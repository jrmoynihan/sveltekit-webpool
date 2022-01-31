<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import { faCheckCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { toggleItem } from '$scripts/types/types';
	import { browser } from '$app/env';
	import { fade } from 'svelte/transition';

	export let id = nanoid();
	export let items: toggleItem[] = [];
	export let selectedItem = items[0];
	export let selectedValue = selectedItem.value;
	export let gridArea = '';
	export let titleText = '';
	let defaultIcon: IconDefinition = faCheckCircle;
	// Add override styles
	export let faIcon: IconDefinition = defaultIcon;
	export let showIcon: boolean = true;
	export let showLabel: boolean = true;
	export let showTooltip: boolean = false;
	export let showSelectedValue: boolean = true;
	export let iconTopPercentage: number = showIcon ? 55 : 43;
	export let titleLabelStyles = '';
	export let optionLabelStyles = '';
	export let customContainerStyles = '';
	export let adminOnly = false;
	export let bgColorHue = 207;
	export let bgColorSaturation = 90;
	export let bgColorLuminosity = 54;
	export let darkenHoverPercentage = 20;
	export let toggleBgColorActive = `hsl(${bgColorHue},${bgColorSaturation}%,${bgColorLuminosity}%)`;
	export let toggleBgColorActiveHovered = `hsl(${bgColorHue},${bgColorSaturation}%,${
		bgColorLuminosity - darkenHoverPercentage
	}%)`;
	let selectedLabel: HTMLLabelElement;
	let spanWidth: number;
	let spanLeft: number;
	let toggleContainer: HTMLDivElement;
	let divLeft: number;

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
			selectedItem = items[i];
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

	const updateSelectedValue = (selectedItem: toggleItem) => (selectedValue = selectedItem.value);

	$: if (browser && document && selectedItem) {
		selectedLabel = document.getElementById(
			`${id}-${selectedItem.label}-label`
		) as HTMLLabelElement;
	}
	$: if (browser && selectedLabel && toggleContainer) {
		const labelBounds = selectedLabel.getBoundingClientRect();
		const divBounds = toggleContainer.getBoundingClientRect();
		const divStyles = window.getComputedStyle(toggleContainer);
		divLeft = divBounds.left + parseInt(divStyles.paddingLeft.replace('px', ''));
		spanWidth = labelBounds.width;
		spanLeft = labelBounds.left - divLeft;
		// console.log(divStyles);
		// console.log(divStyles.paddingLeft);
		// console.log(divBounds.left);
		// console.log(divLeft);
		// console.log(labelBounds.left);
	}
	$: checkSelectedItemIcon(selectedItem);
	$: updateSelectedValue(selectedItem);

	onMount(() => {
		if (browser && document) {
			selectedLabel = document.getElementById(
				`${id}-${selectedItem.label}-label`
			) as HTMLLabelElement;
		}
		checkSelectedItemIcon(selectedItem);
	});
	// @FIXME if two of these components are on the screen with the same item source, only the first is updated?
</script>

<div
	bind:this={toggleContainer}
	class:adminOnly
	class="switch"
	style="--divLeft:{divLeft}; --count:{items.length}; grid-area: {gridArea};--toggleBgColorActive:{toggleBgColorActive}; --toggleBgColorActiveHovered:{toggleBgColorActiveHovered}; {customContainerStyles}"
>
	{#if titleText}
		<p style="font-weight: bold; {titleLabelStyles}">{titleText}</p>
	{/if}
	<span class="connector" />
	{#each items as item, i}
		<label
			id="{id}-{item.label}-label"
			for={item.label}
			class:selected={selectedItem.value === item.value}
			class:adminOnly
			style={optionLabelStyles}>{item.label}</label
		>
		<input
			type="radio"
			id={item.label}
			name="toggleGroup-{id}"
			bind:group={selectedItem}
			on:change|stopPropagation={(e) => toggled(e, i)}
			value={item}
		/>
	{/each}
	{#if selectedLabel}
		<span
			id="{id}-icon"
			class="icon background"
			class:adminOnly
			class:showLabel
			class:showTooltip
			style="--option:{selectedItem};--spanWidth:{spanWidth}px;--spanLeft:{spanLeft}px;
			--spanHeight:{showIcon ? null : '8%'};--spanBorderRadius:{showIcon
				? '0 0 1.5rem 1.5rem'
				: '1.5rem'};--spanZ:{showIcon
				? 'var(--base)'
				: 'var(--below)'};--iconTop:{iconTopPercentage}%;"
		>
			{#if showIcon}
				<!-- {#key faIcon} -->
				<Fa icon={faIcon} />
				<!-- {/key} -->
			{/if}
		</span>
	{/if}
	{#if showSelectedValue}
		<!-- <p>{selectedValue}</p> -->
		<p style="font-weight:600;">{selectedItem.value}</p>
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
		background: hsla(var(--alternate-value, transparent));
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
	.adminOnly {
		@include admin;
		border: none;
	}
</style>
