<script lang="ts">
	import { larger_than_mobile } from '$scripts/store';
	import { createEventDispatcher } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import Tooltip from '../containers/Tooltip.svelte';

	export let scoreGuess: number;
	const dispatch = createEventDispatcher();
	function changed(event: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
		dispatch('change', event.currentTarget.value);
	}
</script>

<span class="tiebreaker-container" class:pulse={scoreGuess < 10 || scoreGuess === undefined}>
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
				bind:value={scoreGuess}
				on:input={(e) => changed(e)}
				placeholder="tiebreaker"
				min="0"
				in:fade={{ delay: 250, duration: 200 }}
			/>
			<span class="invalid" />
		</svelte:fragment>
		<span slot="text" transition:slide class="tooltip"
			>Enter a tiebreaker score -- the sum of both teams' scores in the last game of the week.</span
		>
	</Tooltip>
</span>

<style lang="scss">
	span {
		@include rounded;
	}
	.tiebreaker-container {
		position: relative;
		grid-area: tiebreaker;
		box-shadow: 0 0 4px 2px var(--accent, hsl(37, 75%, 65%));
	}
	input {
		@include defaultInput;
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
