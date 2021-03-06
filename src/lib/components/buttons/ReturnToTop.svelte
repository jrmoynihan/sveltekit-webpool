<script lang="ts">
	import { browser } from '$app/env';
	import { larger_than_mobile } from '$scripts/store';
	import { faArrowUp } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	export let customStyles = '';
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
	export const scrollProgress = spring<number>(0, { damping: 0.5, stiffness: 0.1 });
</script>

{#if !$larger_than_mobile && $scrollProgress > 0.1}
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
		@include flexCenter;
		@include fixed($bottom: 5px, $left: 0);
		width: 10.4%;
		aspect-ratio: 1/1.35;
		background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 80%);
		color: var(--background, hsl(120, 16%, 17%));
		border: 2px inset hsla(219, 79%, 66%, 0.295);
		z-index: var(--zFixed);
		opacity: 50%;
		max-height: 3.1rem;
	}
	custom-progress {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 5px;
		z-index: var(--zFixed);
		background-color: var(--accent, hsl(37, 75%, 65%));
	}
	custom-progress-radial {
		position: fixed;
		top: 50vh;
		left: 1rem;
		width: 10rem;
		aspect-ratio: 1/1;
		z-index: var(--zFixed);
		border-radius: 50%;
		background: conic-gradient(var(--accent, hsl(37, 75%, 65%)) $radii, transparent $radii);
	}
</style>
