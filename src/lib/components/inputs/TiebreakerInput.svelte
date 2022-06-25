<script lang="ts">
	import { larger_than_mobile } from '$scripts/store';
	import { fade, slide } from 'svelte/transition';
	import Tooltip from '../containers/Tooltip.svelte';

	export let score_guess: number;
	export let tooltip_msg: string = `Enter a tiebreaker score -- the sum of both teams' scores in the last game of the week.`;
	export let use_box_shadow = false;
	export let grid_area = 'tiebreaker';
</script>

<span
	style={`grid-area:${grid_area}`}
	class="tiebreaker-container"
	class:pulse={score_guess < 10 || score_guess === undefined}
	class:box-shadowed={use_box_shadow}
>
	<Tooltip
		arrowhorizontalPosition={$larger_than_mobile ? '23%' : '50%'}
		tooltipHorizontalPosition={$larger_than_mobile ? '-25%' : '-55%'}
		tooltipWidth={$larger_than_mobile ? '200%' : 'clamp(10rem,50ch,100%)'}
		tooltipTop={$larger_than_mobile ? '-300%' : '-410%'}
	>
		<svelte:fragment slot="content">
			<input
				id="tiebreaker-input"
				type="number"
				bind:value={score_guess}
				placeholder="tiebreaker"
				min="0"
				in:fade={{ delay: 250, duration: 200 }}
			/>
			<span class="invalid" />
		</svelte:fragment>
		<span slot="text" transition:slide class="tooltip">{tooltip_msg}</span>
	</Tooltip>
</span>

<style lang="scss">
	span {
		@include rounded;
		max-width: max-content;
	}
	.tiebreaker-container {
		position: relative;
		display: grid;
	}
	.box-shadowed {
		box-shadow: 0 0 4px 2px var(--accent, hsl(37, 75%, 65%));
	}
	input {
		@include defaultInput;
		font-size: 1.1em;
		font-weight: 500;
		box-sizing: border-box;
		display: flex;
		background-color: white;
		padding: 2%;
		text-align: center;
		align-self: center;
		width: unset;
		&:invalid {
			box-shadow: 0 0 20px -2px red;
			color: red;
			& ~ span.invalid::after {
				@include rounded;
				@include defaultTransition;
				content: 'Please enter a number.';
				color: red;
				background-color: white;
				top: -100%;
				opacity: 1;
			}
		}
		& ~ span.invalid::after {
			opacity: 0;
			width: 100%;
			height: 100%;
			top: 0%;
			left: 0;
			right: 0;
			position: absolute;
		}
	}
	.pulse {
		@include pulse($pulseDistance: 20px, $opacity: 80%);
	}
</style>
