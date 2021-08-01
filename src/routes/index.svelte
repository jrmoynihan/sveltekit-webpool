<script context="module" lang="ts">
	// Use server prerendering if the page doesn't have active elements/JS
	// https://kit.svelte.dev/docs#ssr-and-javascript-prerender
	// export const prerender = true;

	// Dynamically import the teams, allowing image references to load asyncronously
	// const teamsPromise = async () => {
	// 	return await import('../scripts/teams').then((module) => module.default);
	// };
</script>

<script lang="ts">
	import AmericanFootball from '../../static/American_football.svelte';
	import NflLogo from '../../static/nfl-logo.svelte';
	import { getWindowSize } from '$scripts/functions';
	import { browser } from '$app/env';
	import { windowWidth } from '$scripts/store';

	let drawing = true;
	const widthContainment = '100%';
	let width: number | string; // allow width to be a number for window resizing or a string for passing fixed CSS properties

	if (browser) {
		if ($windowWidth) {
			width = $windowWidth.toString();
			width = widthContainment;
		}
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>
	Welcome!
	<!-- <div class="welcome">
		<picture>
			<source srcset="svelte-welcome.webp" type="image/webp" />
			<img src="svelte-welcome.png" alt="Welcome" />
		</picture>
	</div>-->
</h1>
<section>
	<div class="football-wrapper">
		<AmericanFootball bind:drawing bind:width />
	</div>
	<div class="nfl-logo-wrapper">
		<NflLogo bind:drawing />
	</div>
</section>
<svelte:window
	on:resize={() => {
		width = getWindowSize();
		width = widthContainment;
	}}
/>

<style lang="scss">
	* {
		box-sizing: border-box;
	}
	section {
		@include frostedGlass;
		@include rounded;
		backdrop-filter: initial;
		display: grid;
		// display: contents;
		position: relative;
		gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		// grid-auto-columns: 1fr;
		justify-items: center;
		justify-content: center;
		align-items: center;
		max-height: 100%;
		overflow: auto;
		scrollbar-width: thin;
	}

	h1 {
		width: 100%;
	}
	.football-wrapper,
	.nfl-logo-wrapper {
		// position: absolute;
		// max-height: min-content;
		// min-height: max-content;
		// width: 100%;
		// top: 0;
		// bottom: 0;
		display: grid;
		align-items: center;
		justify-items: center;
		// z-index: -1;
		width: 90%;
	}
	.football-wrapper {
		// opacity: 0.5;
		filter: saturate(0.6);
		z-index: 0;
	}
</style>
