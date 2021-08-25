<script lang="ts">
	import { mobileBreakpoint } from '$scripts/site';

	import { windowWidth } from '$scripts/store';

	import { createEventDispatcher } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import Tooltip from '../containers/Tooltip.svelte';

	export let tiebreaker: number;
	const dispatch = createEventDispatcher();
	function changed(event: { detail: any }): void {
		dispatch('change', event.detail);
	}
</script>

<span class="tiebreaker-container" class:pulse={tiebreaker < 10 || tiebreaker === undefined}>
	<Tooltip
		arrowhorizontalPosition={$windowWidth > mobileBreakpoint ? '23%' : '50%'}
		tooltipHorizontalPosition={$windowWidth > mobileBreakpoint ? '0' : '-7%'}
		tooltipWidth={$windowWidth > mobileBreakpoint ? '200%' : 'auto'}
		tooltipTop={$windowWidth > mobileBreakpoint ? '-300%' : '-350%'}
	>
		<svelte:fragment slot="content">
			<input
				type="number"
				bind:value={tiebreaker}
				on:input={() => changed}
				placeholder="tiebreaker"
				min="0"
				in:fade={{ delay: 250, duration: 200 }}
			/>
			<span class="invalid" />
		</svelte:fragment>
		<span slot="text" transition:slide class="tooltip"
			>Enter a tiebreaker score -- the total scores of both teams in the last game of the week.</span
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
		box-shadow: 0 0 4px 2px var(--accent-color);
	}
	input {
		@include editableInput;
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
