<script lang="ts">
	import { useDarkTheme } from '$scripts/store';
	import SvelteIntersectionObserver from 'svelte-intersection-observer';
	import { fade, fly, slide } from 'svelte/transition';

	export let i: number;
	let element: any;
	let intersected = false;
	let once = true;
	let dark = $useDarkTheme;

	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const evenRow = isEvenRow(i);
</script>

<SvelteIntersectionObserver {element} {once} on:observe={() => (intersected = true)}>
	{#if intersected}
		<div class:evenRow class:dark>
			<slot />
		</div>
	{:else}
		<div bind:this={element} class:evenRow class:dark />
	{/if}
</SvelteIntersectionObserver>

<style lang="scss">
	div {
		@include defaultTransition;
		padding: 0.2em;
		min-height: 2rem;
		height: 100%;
		align-content: center;
		display: grid;
	}
	.evenRow {
		// opacity: 0.1;
		background-color: rgba(var(--accentValue-color), 50%);
		color: var(--alternate-color);
		&.dark {
			color: var(--main-color);
		}
	}
</style>
