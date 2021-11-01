<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
	import { faCheckCircle, faCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let values: number[] = [1, 2, 3];
	export let selectedValue: number = values[0];
	export let labels: string[] = ['One', 'Two', 'Three'];
	// A property to target a grid-area
	export let area = '';
	// An id property for a label to target
	export let id = nanoid();
	export let labelText = '';
	// Add override styles
	export let sliderStyles = '';
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

	// Create an event dispatcher object
	const dispatch = createEventDispatcher();
	// A function when the input is changed; dispatches/triggers the event named "toggle" to the parent component
	function toggled() {
		dispatch('toggle');
	}
</script>

{#if labelText !== ''}
	<label class="label-text" for={id} style={labelStyles}>
		{labelText}
	</label>
{/if}
<div
	class:adminOnly
	class="switch"
	style="--count:{values.length}; grid-area: {area};--toggleBgColorActive:{toggleBgColorActive}; --toggleBgColorActiveHovered:{toggleBgColorActiveHovered}; {customButtonStyles}"
>
	{#each values as value, i}
		<label for="{id}-{value}"
			>{labels[i]}
			<!-- NOTE: Subtle fix made by changing this to on:change event instead of on:click -->
			<input
				type="radio"
				name="toggleGroup-{id}"
				bind:group={selectedValue}
				on:change|stopPropagation={toggled}
				id="{id}-{value}"
				{value}
			/>
		</label>
		<!-- <span class="slider round" style={sliderStyles} /> -->
	{/each}
	<span style="--option:{selectedValue}">
		<Fa icon={faCheckCircle} />
	</span>
</div>

<style lang="scss">
	$toggle-height: min(1.7em, 10vmin);
	$toggle-width: min(3em, 15vmin);
	$slider-width: calc(100% / var(--count));
	$slider-height: 80%;
	$slider-left: calc($slider-width * var(--option) - $slider-width);
	$slider-transform: 130%; //min(1.3em, 6vmin)
	$toggle-background-color-active: var(--toggleBgColorActive, hsl(207, 90%, 54%));
	$toggle-background-color-active-hovered: var(--toggleBgColorActiveHovered, hsl(207, 90%, 34%));
	$toggle-background-color-inactive: #aaa;
	$slider-color: white;

	div {
		position: relative;
		max-width: max-content;
		min-width: calc(1rem * var(--count));
		display: flex;
		gap: 1rem;
	}
	input {
		// @include hiddenInput;
		visibility: hidden;
		display: flex;
	}
	label {
		display: flex;
		flex-direction: column;
	}
	span {
		@include defaultTransition;
		position: absolute;
		top: 50%;
		bottom: 0%;
		left: $slider-left;
		height: $slider-height;
		width: $slider-width;
		border-radius: 50%;
		// background: $toggle-background-color-active;
	}

	/* The switch - the box around the slider */
	.switch,
	.label-text {
		// position: relative;
		// display: flex;
		// align-self: center;
		// justify-self: center;
		// width: $toggle-width; /* or 60px **/
		// height: $toggle-height; /* or 34px */
	}
	/* The slider */
	.slider {
		// position: absolute;
		// cursor: pointer;
		// top: 0;
		// left: 0;
		// right: 0;
		// bottom: 0;
		// background-color: $toggle-background-color-inactive;
		// -webkit-transition: all 0.4s ease-in-out;
		// transition: all 0.4s ease-in-out;
		// border-radius: $toggle-height; /* or 34px */
		// padding: 1px;
		// &:before {
		// 	position: absolute;
		// 	content: ''; /* a blank span element */
		// 	/* These new responsive sizes allow for asymmetrical toggle sliders when resizing the window*/
		// 	height: $slider-height; /* or 26px */
		// 	width: $slider-width; /* or 26px */
		// 	left: 10%; //5px or max(3px, 0.5vmin)
		// 	top: 15%; /* or 4px */
		// 	border-radius: 50%;
		// 	background-color: $slider-color;
		// 	-webkit-transition: all 300ms ease-in-out;
		// 	transition: all 300ms ease-in-out;
		// }
		// &:hover {
		// 	background-color: darken($toggle-background-color-inactive, 20%);
		// }
	}

	// input:checked + .slider {
	// 	background-color: $toggle-background-color-active;
	// 	&:before {
	// 		@include accelerate;
	// 		-webkit-transform: translateX($slider-transform);
	// 		-ms-transform: translateX($slider-transform);
	// 		transform: translateX($slider-transform); /* or 26px */
	// 	}
	// 	&:hover {
	// 		background-color: $toggle-background-color-active-hovered;
	// 	}
	// }
	// input:focus + .slider {
	// 	box-shadow: 0 0 2px 3px $toggle-background-color-active-hovered;
	// 	transition: all 100ms ease-in-out;
	// }
	.label-text {
		max-width: none;
		width: auto;
	}
	// button {
	// 	@include discreetButtonStyles;
	// 	&.adminOnly {
	// 		@include admin;
	// 	}
	// }
</style>
