<script context="module">
	export const load = async ({ page }) => ({
		props: {
			refresh: page.path.split('/')[1]
		}
	});
</script>

<script lang="ts">
	import '../app.css';
	import { userConverter } from '$scripts/converters';
	import { currentUser, userData } from '$scripts/auth';
	import {
		chosenMixBlendMode,
		navChecked,
		useDarkTheme,
		usersCollection,
		windowWidth
	} from '$scripts/store';
	import { doc, onSnapshot } from '@firebase/firestore';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import Navigator from '$navigation/Navigator.svelte';
	import AppMenu from '$lib/majorFeatures/AppMenu.svelte';
	import SiteNavOptions from '$navigation/siteNavOptions.svelte';

	export let refresh;

	$: {
		if ($currentUser && userConverter) {
			const userDocRef = doc(usersCollection, $currentUser.uid);
			const unsubscribe = onSnapshot(userDocRef.withConverter(userConverter), async (querySnap) => {
				$userData = { ...querySnap.data() };
				unsubscribe(); // stop listening for user data; prevents memmory leaking
			});
		}
	}
</script>

<div
	id="app-background"
	class="app-wrapper pseudo {$navChecked ? 'expanded' : 'collapsed'} {$useDarkTheme
		? ''
		: 'invert'}"
	style="--mix-blend-mode:{$chosenMixBlendMode};"
>
	<AppMenu />
	<Navigator>
		<SiteNavOptions />
	</Navigator>

	<main>
		<TransitionWrapper {refresh}>
			<slot />
		</TransitionWrapper>
	</main>

	<!-- <footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p> 
	</footer>-->
</div>

<svelte:window on:resize={() => ($windowWidth = window.innerWidth)} />

<style lang="scss">
	:root {
		font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue',
			sans-serif;
		box-sizing: border-box;
		font-display: swap;
		color: var(--main-color);
	}
	* {
		box-sizing: border-box;
	}
	.app-wrapper {
		padding: 0 5px;
		display: grid;
		background: var(--alternate-color);
		position: relative;
		opacity: 0.99;
		height: 100vh;
		width: 100%;
		grid-template-areas:
			'menu'
			'nav'
			'main';
		grid-template-columns: 100%;
		grid-template-rows: repeat(3, minmax(0, max-content));

		@include responsive_desktop_only {
			grid-template-areas: 'nav menu' 'main menu';
			grid-template-columns: auto max-content;
			grid-template-rows: minmax(0, max-content) minmax(0, auto);
		}
		&.pseudo:before {
			content: '';
			position: absolute;
			background-size: cover;
			background-position: center;
			background-attachment: fixed;
			height: 100%;
			width: 100%;
			z-index: -2;
			mix-blend-mode: var(--mix-blend-mode);
			// background-image: url('/static/friday-night-lights-high-res.jpg');
		}
	}
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;

		// my styles
		@include gridAndGap(15px);
		color: var(--main-color);
		grid-template-rows: repeat(auto-fit, minmax(0, auto));
		text-align: center;
		position: relative;
		grid-area: main;
		transition: all 300ms ease-in-out;
		padding-bottom: 5%;
		padding-top: 0.5em;
	}
</style>
