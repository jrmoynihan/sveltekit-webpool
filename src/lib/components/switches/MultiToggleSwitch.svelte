<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { nanoid } from 'nanoid';
	import { faCheckCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let items: { label: string; value: any }[] = [];
	export let selectedItem = items[0].label;
	export let gridArea = '';
	export let id = nanoid();
	export let labelText = '';
	// Add override styles
	export let faIcon: IconDefinition = faCheckCircle;
	export let showIcon: boolean = true;
	export let labelStyles = '';
	export let customButtonStyles = '';
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
	function toggled() {
		dispatch('toggle');
	}
	function changeSelection(
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLLabelElement },
		i: number
	) {
		// Accessible selection with Spacebar or Enter key
		if (e.key === ' ' || e.key === 'Enter') {
			selectedItem = items[i].label;
		}
	}

	$: if (document) {
		selectedLabel = document.getElementById(`${id}-${selectedItem}-label`) as HTMLLabelElement;
	}
	$: if (selectedLabel && toggleContainer) {
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
	onMount(() => {
		if (document) {
			selectedLabel = document.getElementById(`${id}-${selectedItem}-label`) as HTMLLabelElement;
		}
	});
</script>

<label class="label-text" class:adminOnly for={id} style={labelStyles}>
	{#if labelText} {labelText}{/if}

	<div
		bind:this={toggleContainer}
		class:adminOnly
		class="switch"
		style="--divLeft:{divLeft} --count:{items.length}; grid-area: {gridArea};--toggleBgColorActive:{toggleBgColorActive}; --toggleBgColorActiveHovered:{toggleBgColorActiveHovered}; {customButtonStyles}"
	>
		{#each items as { label, value }, i}
			<label
				for="{id}-{label}"
				id="{id}-{label}-label"
				class:selected={selectedItem === label}
				class:adminOnly
				tabindex="0"
				on:keydown={(e) => {
					changeSelection(e, i);
					toggled;
				}}
				>{label}
				<!-- NOTE: Subtle fix made by changing this to on:change event instead of on:click -->
				<input
					type="radio"
					name="toggleGroup-{id}"
					bind:group={selectedItem}
					on:change|stopPropagation={toggled}
					id="{id}-{label}"
					value={label}
				/>
			</label>
		{/each}
		{#if selectedLabel && showIcon}
			<span style="--option:{selectedItem};--spanWidth:{spanWidth}px;--spanLeft:{spanLeft}px;">
				<Fa icon={faIcon} />
			</span>
		{/if}
	</div>
</label>

<style lang="scss">
	$slider-width: var(--spanWidth);
	$slider-height: 80%;
	$slider-transform: var(--spanLeft); //min(1.3em, 6vmin)
	$toggle-background-color-active: var(--toggleBgColorActive, hsl(207, 90%, 54%));
	$toggle-background-color-active-hovered: var(--toggleBgColorActiveHovered, hsl(207, 90%, 34%));
	$toggle-background-color-inactive: #aaa;
	$slider-color: white;

	div {
		@include rounded;
		padding: 1rem;
		position: relative;
		max-width: max-content;
		min-width: calc(1rem * var(--count));
		display: flex;
		justify-items: center;
		justify-self: center;
		gap: 1rem;
	}
	input {
		// @include hiddenInput;
		visibility: hidden;
		display: flex;
	}
	label {
		@include defaultContainerStyles;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		&:not(.label-text).adminOnly:hover {
			@include dayShadow;
		}
	}
	span {
		@include defaultTransition;
		position: absolute;
		top: 50%;
		bottom: 0%;
		height: $slider-height;
		width: $slider-width;
		transform: translateX($slider-transform);
		border-radius: 50%;
	}

	.label-text {
		max-width: none;
		width: auto;
		&:hover {
			@include glassShadow;
		}
	}
	.selected {
		@include accentedContainer(50%);
		font-weight: bold;
	}
	.adminOnly {
		@include admin;
		border: none;
	}
</style>
