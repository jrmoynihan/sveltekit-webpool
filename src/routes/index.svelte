<script context="module" lang="ts">
	// Use server prerendering if the page doesn't have active elements/JS
	// https://kit.svelte.dev/docs#ssr-and-javascript-prerender
	// export const prerender = true;

	// Dynamically import the teams, allowing image references to load asyncronously
	// const teamsPromise = async () => {
	// 	return await import('../scripts/teams').then((module) => module.default);
	// };
	export async function load() {
		// Cache assets for 1 year
		const output = { cache: { maxage: 31536000 } };
		return output;
	}
</script>

<script lang="ts">
	import AmericanFootball from '$images/American_football.svelte';
	import NflLogo from '$images/nfl-logo.svelte';
	import { getWindowSize } from '$scripts/functions';
	import { browser } from '$app/env';
	import { window_width } from '$scripts/store';

	let drawing = true;
	const widthContainment = '100%';
	let width: number | string; // allow width to be a number for window resizing or a string for passing fixed CSS properties

	if (browser) {
		if ($window_width) {
			width = $window_width.toString();
			width = widthContainment;
		}
	}
</script>

<svelte:head>
	<title>Tony's Football Pool</title>
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
<!-- <LoadingSpinner msg="" /> -->
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
	:global(body) {
		box-sizing: border-box;
	}
	section {
		@include frostedGlass;
		@include rounded;
		@include gridCenter($gap: 10px);
		backdrop-filter: initial;
		position: relative;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		justify-content: center;
		max-height: 100%;
		overflow: auto;
	}
	h1 {
		width: 100%;
	}
	.football-wrapper,
	.nfl-logo-wrapper {
		display: grid;
		place-items: center;
		width: 90%;
	}
	.football-wrapper {
		filter: saturate(60%);
		/* z-index: 0; */
	}
</style>
