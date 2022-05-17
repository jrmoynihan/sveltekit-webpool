<script lang="ts">
	import { use_dark_theme } from '$scripts/store';
	import { fly } from 'svelte/transition';

	export let even_row = false;
	export let in_the_money = false;
	export let delay = 0;
	export let x_even_row = 250;
	export let x_odd_row = -250;
	export let duration = 600;
	let dark = $use_dark_theme;
</script>

{#if even_row}
	<div
		in:fly={{ x: x_even_row, duration, delay }}
		class:even_row
		class:dark
		class:redZone={in_the_money}
	>
		<slot />
	</div>
{:else}
	<div
		in:fly={{ x: x_odd_row, duration, delay }}
		class:even_row
		class:dark
		class:red-zone={in_the_money}
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	div {
		@include defaultTransition;
		box-sizing: border-box;
		padding: 0.2em;
		min-height: 2rem;
		height: 100%;
		align-content: center;
		display: grid;
	}
	.even_row {
		// opacity: 0.1;
		background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
		color: var(--background, hsl(120, 16%, 17%));
		&.dark {
			color: var(--text, hsl(0, 0%, 100%));
		}
	}
	.red-zone {
		background-color: hsla(0, 100%, 27%, 0.8);
		color: white;
		&.even_row {
			background-color: hsla(0, 68%, 42%, 0.8);
			color: white;
		}
	}
</style>
