<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';

	// Expose a property to the bind:checked event and disabled states of the toggle
	export let checked = false;
	export let disabled = false;
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
	// A function when the input is clicked; dispatches/triggers the event named "toggle" to the parent component
	function toggleClicked() {
		dispatch('toggle');
	}
</script>

{#if labelText !== ''}
	<label class="label-text" for={id} style={labelStyles}>
		{labelText}
	</label>
{/if}
<button
	{disabled}
	on:click|stopPropagation={() => {
		checked = !checked;
		toggleClicked();
	}}
	class:adminOnly
	class="switch"
	style="grid-area: {area};--toggleBgColorActive:{toggleBgColorActive}; --toggleBgColorActiveHovered:{toggleBgColorActiveHovered}; {customButtonStyles}"
>
	<!-- NOTE: Subtle fix made by changing this to on:change event instead of on:click -->
	<input type="checkbox" bind:checked on:change|stopPropagation={toggleClicked} {id} />
	<span class="slider round" style={sliderStyles} />
</button>

<style lang="scss">
	$toggle-height: min(1.7em, 10vmin);
	$toggle-width: min(3em, 15vmin);
	$slider-height: min(1em, 10vmin); //3.5
	$slider-width: min(1em, 10vmin); //3.5
	$slider-transform: 130%; //min(1.3em, 6vmin)
	$toggle-background-color-active: var(--toggleBgColorActive, hsl(207, 90%, 54%));
	$toggle-background-color-active-hovered: var(--toggleBgColorActiveHovered, hsl(207, 90%, 34%));
	$toggle-background-color-inactive: #aaa;
	$slider-color: white;
	/* The switch - the box around the slider */
	.switch,
	.label-text {
		position: relative;
		display: flex;
		align-self: center;
		justify-self: center;
		// align-items: center;
		// max-width: 6vmin;
		width: $toggle-width; /* or 60px **/
		height: $toggle-height; /* or 34px */
		// /* Hide default HTML checkbox */
		// & input {
		//   opacity: 0;
		//   width: 0;
		//   height: 0;
		// display: none;
		// }
	}
	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: $toggle-background-color-inactive;
		-webkit-transition: all 0.4s ease-in-out;
		transition: all 0.4s ease-in-out;
		&:before {
			position: absolute;
			content: ''; /* a blank span element */
			/* These new responsive sizes allow for asymmetrical toggle sliders when resizing the window*/
			height: $slider-height; /* or 26px */
			width: $slider-width; /* or 26px */
			left: 10%; //5px or max(3px, 0.5vmin)
			top: 15%; /* or 4px */
			background-color: $slider-color;
			-webkit-transition: all 300ms ease-in-out;
			transition: all 300ms ease-in-out;
		}
		&:hover {
			background-color: darken($toggle-background-color-inactive, 20%);
		}
	}
	input {
		@include hiddenInput;
	}
	input:checked + .slider {
		background-color: $toggle-background-color-active;
		&:before {
			@include accelerate;
			-webkit-transform: translateX($slider-transform);
			-ms-transform: translateX($slider-transform);
			transform: translateX($slider-transform); /* or 26px */
		}
		&:hover {
			background-color: $toggle-background-color-active-hovered;
		}
	}
	input:focus + .slider {
		box-shadow: 0 0 2px 3px $toggle-background-color-active-hovered;
		transition: all 100ms ease-in-out;
	}
	/* Rounded sliders */
	.slider.round {
		border-radius: $toggle-height; /* or 34px */
		padding: 1px;
		&:before {
			border-radius: 50%;
		}
	}
	.label-text {
		max-width: none;
		width: auto;
	}
	button {
		@include discreetButtonStyles;
		&.adminOnly {
			@include admin;
		}
	}
</style>
