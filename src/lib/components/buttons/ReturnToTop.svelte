<script lang="ts">
	import { browser } from '$app/env';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let customStyles: string = '';
	export let showProgressRadial = false;
	export let showProgressBar = true;
	export let showButton = true;

	const returnToTop = () => {
		if (browser) {
			window.scrollTo(0, 0);
		}
	};
	const getScrollProgress = () => {
		if (browser) {
			const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			$scrollProgress = windowScroll / height;
		}
	};
	export const scrollProgress = writable<number>();
</script>

{#if $windowWidth < mobileBreakpoint && $scrollProgress > 0.15}
	{#if showButton}
		<button on:click={returnToTop} style={customStyles} transition:fade>
			<Fa icon={faArrowUp} class="fa-icon" size="lg" />
		</button>
	{/if}
{/if}
{#if showProgressBar}
	<custom-progress style="width:{($scrollProgress * 100).toString()}%;" />
{/if}
{#if showProgressRadial}
	<custom-progress-radial style="--radii:{($scrollProgress * 100).toString()}%" />
{/if}
<svelte:window on:scroll={getScrollProgress} />

<style lang="scss">
	$radii: var(--radii);

	button {
		@include pulse;
		position: fixed;
		bottom: 5px;
		left: 0;
		// border-radius: 0 25% 0 0;
		width: 10.4%;
		aspect-ratio: 1/1.35;
		background-color: rgba(var(--accentValue-color), 80%);
		color: var(--alternate-color);
		border: 2px inset rgba(100, 148, 237, 0.295);
		z-index: 30;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 50%;
		max-height: 3.1rem;
		&:hover,
		&:focus {
		}
	}
	custom-progress {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		z-index: 30;
		background-color: var(--accent-color);
	}
	custom-progress-radial {
		position: fixed;
		top: 50vh;
		left: 1rem;
		width: 10rem;
		aspect-ratio: 1/1;
		z-index: 300;
		border-radius: 50%;
		background: conic-gradient(var(--accent-color) $radii, transparent $radii);
	}
</style>
