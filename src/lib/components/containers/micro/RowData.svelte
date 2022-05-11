<script lang="ts">
	import { use_dark_theme } from '$scripts/store';
	import { fly } from 'svelte/transition';

	export let evenRow = false;
	export let inTheMoney = false;
	export let delay = 0;
	export let xEvenRow = 250;
	export let xOddRow = -250;
	export let duration = 600;
	let dark = $use_dark_theme;
</script>

{#if evenRow}
	<div
		in:fly={{ x: xEvenRow, duration, delay }}
		class:evenRow
		class:dark
		class:redZone={inTheMoney}
	>
		<slot />
	</div>
{:else}
	<div in:fly={{ x: xOddRow, duration, delay }} class:evenRow class:dark class:redZone={inTheMoney}>
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
	.evenRow {
		// opacity: 0.1;
		background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
		color: var(--background, hsl(120, 16%, 17%));
		&.dark {
			color: var(--text, hsl(0, 0%, 100%));
		}
	}
	.redZone {
		background-color: hsla(0, 100%, 27%, 0.8);
		color: white;
		&.evenRow {
			background-color: hsla(0, 68%, 42%, 0.8);
			color: white;
		}
	}
</style>
