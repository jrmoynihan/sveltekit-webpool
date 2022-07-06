<script>
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';

	export let increments = 18;
	export let height = null;
	export let border_radius = null;
	export let increment_fill = null;
	export let increment_border_width = null;
	export let increment_border_color = null;
	export let speed = 250;
	export let tween_width = tweened(0, { duration: speed, easing: cubicInOut });
	export let initial_value = 6;
	export let value = 0;
	export let value_indicator_top = null;
	export let value_indicator_background = null;
	export let tiebreaker_wins;
	// 	let scaled_increments = increments > 15 ? Math.floor(increments / 5) : increments

	for (let i = 0; i < initial_value; i++) {
		setTimeout(() => {
			value = value + 1;
		}, i * speed + 25);
	}

	$: if (value) $tween_width = 1;
	$: if ($tween_width === 1) {
		tween_width.set(0, { duration: 0 });
		tween_width.set(0, { duration: 1000 });
	}
</script>

<div
	title={`${value}`}
	class="meter-container"
	style:--speed={`${speed}ms`}
	style:--height={height}
	style:--border-radius={border_radius}
	style:--increments={increments}
	style:--increment-border-width={increment_border_width}
	style:--top={value_indicator_top}
	style:--filled-increment-color={increment_fill}
>
	{#each [...Array(increments).keys()] as increment, i}
		{@const growing = i <= value - 1}
		{@const filled = value > 0 && growing}
		{@const grown = i < value - 1}
		{@const first = i === 0}
		{@const last = i === increments - 1}
		<div
			class="increment"
			class:first
			class:last
			class:filled
			style:--increment-border-color={increment_border_color}
			class:growing
			class:grown
			style:--width={$tween_width > 0 ? $tween_width : 1}
		/>
	{/each}
	<span
		title={`Tiebreaker: ${tiebreaker_wins} wins`}
		class="tiebreaker-wins-indicator"
		class:off-scale={tiebreaker_wins > increments}
		data-tiebreaker={tiebreaker_wins}
		style:--tiebreaker-color={'var(--accent)'}
		style:--top={`-75%`}
		style:--left={`${(Math.min(tiebreaker_wins, increments) / increments) * 98}%`}
	/>
	<span
		class="value-indicator"
		style:--value-indicator-background={value_indicator_background}
		style:--left={`${(value / increments) * 98}%`}>{value}</span
	>
</div>

<style lang="scss">
	.meter-container {
		position: relative;
		background-color: lightgrey;
		border-radius: var(--border-radius, 2rem);
		max-height: var(--height, 1rem);
		align-self: center;
		display: grid;
		height: var(--height, 1rem);
		grid-template-columns: repeat(var(--increments, 1), minmax(0, 1fr));
		column-gap: calc(var(--increment-border-width, 0px));
	}
	.tiebreaker-wins-indicator,
	.value-indicator {
		position: absolute;
		inset: 0;
		top: var(--top, -0.5rem);
		right: -3rem;
		display: grid;
		place-content: center;
		max-width: max-content;
		line-height: var(--height, 1rem);
		padding: 1rem 0.6rem;
		transition: left var(--speed) ease-in-out;
		font-weight: bold;
	}
	.tiebreaker-wins-indicator {
		background-color: var(--tiebreaker-color);
		height: 250%;
		width: 0.1rem;
		padding: 0 0.2rem;
		box-sizing: border-box;
		left: calc(var(--left, 0%) + 0.75rem);
		transition: all 200ms ease;
		border-radius: 25%;
		overflow: hidden;
		&.off-scale {
			overflow: visible;
			box-sizing: border-box;
			border-radius: unset;
			background-color: unset;
			border-top: 1.25rem solid transparent;
			border-bottom: 1.25rem solid transparent;
			border-left: 1.1rem solid var(--accent);
			&:hover {
				transform: scale(1.2);
				// border: none;
				border-radius: 25%;
				&::after {
					left: -150%;
					border-radius: 25%;
				}
			}
		}
		&:hover,
		:focus-within {
			transform: scale(1.1) translateX(-40%);
			width: 3ch;
			padding: 0 0.3rem;
			box-sizing: border-box;
			max-width: unset;
			z-index: 1;
			&::after {
				content: attr(data-tiebreaker);
				position: absolute;
				padding: 0.25rem;
				display: grid;
				place-self: center;
				border-radius: inherit;
				color: white;
				background-color: var(--accent);
				text-shadow: 0 0 4px hsla(0, 0%, 0%, 0.5);
			}
		}
	}
	.value-indicator {
		left: var(--left);
		color: var(--value-indicator-color, white);
		background-color: var(--value-indicator-background, #5b2318);
		border-radius: var(--border-radius, 80% 0.3rem);
		filter: drop-shadow(0 0 0.1rem var(--background));
		text-shadow: 0 0 4px hsla(0, 0%, 0%, 0.5);
	}
	.increment {
		border: var(--increment-border-width, 1px) solid
			var(--increment-border-color, hsla(0, 0%, 0%, 15%));
	}
	.increment.first {
		border-radius: var(--border-radius, 2rem) 0 0 var(--border-radius, 2rem);
	}
	.increment.last {
		border-radius: 0 var(--border-radius, 2rem) var(--border-radius, 2rem) 0;
	}
	.filled {
		background-color: var(--filled-increment-color, green);
		/* 		transition: transform 1000ms ease-out; */
		transform: scaleX(0);
		transform-origin: 0 0;
	}
	.growing {
		transform: scaleX(var(--width));
	}
	.grown {
		transform: scaleX(1);
	}
</style>
