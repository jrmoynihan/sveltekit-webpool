<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';

	// Expose a property to the bind:checked event of the toggle
	export let checked: boolean = false;
	// A property to target a grid-area
	export let area = '';
	// An id property for a label to target
	export let id = nanoid();
	export let labelText = '';
	// Add override styles
	export let sliderStyles = '';

	// Create an event dispatcher object
	const dispatch = createEventDispatcher();
	// A function when the input is clicked; dispatches/triggers the event named "toggle" to the parent component
	function toggleClicked() {
		dispatch('toggle');
	}
</script>

{#if labelText !== ''}
	<label class="label-text" for={id}>
		{labelText}
	</label>
{/if}
<label class="switch" style="grid-area: {area};">
	<!-- NOTE: Subtle fix made by changing this to on:change event instead of on:click -->
	<input type="checkbox" bind:checked on:change|stopPropagation={toggleClicked} {id} />
	<span class="slider round" style={sliderStyles} />
</label>

<style lang="scss">
	$toggle-height: min(1.7em, 10vmin);
	$toggle-width: min(3em, 15vmin);
	$slider-height: min(1.2em, 10vmin); //3.5
	$slider-width: min(1.2em, 10vmin); //3.5
	$slider-transform: min(1.3em, 6vmin);
	$toggle-background-color-active: #2196f3;
	$toggle-background-color-inactive: #ccc;
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
			left: max(3px, 0.5vmin); //5px
			top: 0.2em; /* or 4px */
			background-color: $slider-color;
			-webkit-transition: all 300ms ease-in-out;
			transition: all 300ms ease-in-out;
		}
		&:hover {
			background-color: darken($toggle-background-color-inactive, 20%);
		}
	}
	input:checked + .slider {
		background-color: $toggle-background-color-active;
		&:before {
			-webkit-transform: translateX($slider-transform);
			-ms-transform: translateX($slider-transform);
			transform: translateX($slider-transform); /* or 26px */
		}
		&:hover {
			background-color: darken($toggle-background-color-active, 20%);
		}
	}
	input:focus + .slider {
		box-shadow: 0 0 2px 3px darken($toggle-background-color-active, 20%);
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
</style>
