<script lang="ts">
	import { browser } from '$app/env';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';

	export let customStyles: string = '';

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
	export const scrollProgress = writable();
</script>

{#if $windowWidth < mobileBreakpoint && $scrollProgress > 0.1}
	<button class="fixed" on:click={returnToTop} style={customStyles} transition:fade>
		<Fa icon={faArrowUp} class="fa-icon" size="lg" />
	</button>
	{scrollProgress}
{/if}
<svelte:window on:scroll={getScrollProgress} />

<style lang="scss">
	button.fixed {
		@include pulse;
		position: fixed;
		bottom: 0;
		left: 0;
		border-radius: 0 25% 0 0;
		width: 2.6rem;
		aspect-ratio: 1/1;
		background-color: rgba(var(--accentValue-color), 80%);
		color: var(--alternate-color);
		border: 2px inset rgba(100, 148, 237, 0.295);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover,
		&:focus {
		}
	}
</style>
