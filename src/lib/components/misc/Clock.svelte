<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	export let size = '2rem';
	let currentTime = new Date();
	const displayed_hour = spring();
	const displayed_minute = spring();
	const displayed_second = spring();
	$: displayed_hour.set(currentTime.getHours());
	$: displayed_minute.set(currentTime.getMinutes());
	$: displayed_second.set(currentTime.getSeconds());
	$: hour_offset = modulo($displayed_hour, 1);
	$: minute_offset = modulo($displayed_minute, 1);
	$: second_offset = modulo($displayed_second, 1);
	let interval: NodeJS.Timer;

	onMount(() => {
		// Make a clock timer that updates every 1000ms (1 second)
		interval = setInterval(() => {
			currentTime = new Date();
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval); // Prevent memory leak
	});

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
</script>

<!-- <div class="positioning"> -->
<div class="clock-grid" style="--size:{size}">
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0,{100 * hour_offset}%);">
			<strong style="top:-100%" aria-hidden="true"
				>{$displayed_hour < 9 ? '0' : ''}{Math.floor($displayed_hour + 1)}:</strong
			>
			<strong
				>{Math.floor($displayed_hour) > 12
					? Math.floor($displayed_hour) - 12 < 10
						? '0'
						: ''
					: Math.floor($displayed_hour) < 10
					? '0'
					: ''}{Math.floor($displayed_hour) > 12
					? Math.floor($displayed_hour) - 12
					: Math.floor($displayed_hour)}:</strong
			>
		</div>
	</div>
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0,{100 * minute_offset}%);">
			<strong style="top:-100%" aria-hidden="true"
				>{$displayed_minute < 9 ? '0' : ''}{Math.floor($displayed_minute + 1)}:</strong
			>
			<strong>{$displayed_minute < 10 ? '0' : ''}{Math.floor($displayed_minute)}:</strong>
		</div>
	</div>
	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0,{100 * second_offset}%);">
			<strong style="top:-100%" aria-hidden="true"
				>{Math.floor($displayed_second + 1) < 10 ? '0' : ''}{Math.floor(
					$displayed_second + 1
				)}</strong
			>
			<strong>{Math.floor($displayed_second) < 10 ? '0' : ''}{Math.floor($displayed_second)}</strong
			>
		</div>
	</div>
	<div class="AM-PM">
		{Math.floor($displayed_hour) >= 12 ? 'PM' : 'AM'}
	</div>
</div>

<!-- </div> -->
<style lang="scss">
	// .positioning {
	// 	@include rounded;
	// 	position: relative;
	// 	z-index: 10;
	// 	width: max-content;
	// 	align-items: center;
	// 	display: flex;
	// 	grid-area: clock;
	// }
	.clock-grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0px, 1fr));
		width: calc(6.5 * var(--size));
		grid-template-rows: 1fr;
		padding: 0 0 0 1.5rem;
	}
	.counter-digits {
		position: absolute;
		height: 100%;
		display: grid;
	}
	.counter-viewport {
		height: 3em;
		overflow: hidden;
		text-align: center;
		position: relative;
		& strong {
			position: absolute;
			display: block;
			height: 100%;
			font-weight: 400;
			font-size: var(--size);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.AM-PM {
		align-self: center;
		display: flex;
		align-content: center;
		align-items: center;
		height: 100%;
	}
</style>
