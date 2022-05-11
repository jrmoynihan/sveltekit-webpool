<script context="module" lang="ts">
	export async function load({ url }: LoadInput): Promise<LoadOutput> {
		// Check if the user is logged in
		if (get(firebase_user)) {
			console.log('User is logged in');
		} else {
			console.log('User is NOT logged in');
		}

		return {
			props: {
				refresh: url.pathname.split('/')[1]
			}
		};
	}
</script>

<script lang="ts">
	import '../app.css';
	import {
		chosenMixBlendMode,
		current_season,
		firebase_user,
		largerThanMobile,
		navChecked,
		selected_season,
		selected_week,
		selected_year,
		useDarkTheme,
		windowWidth
	} from '$scripts/store';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import Navigator from '$navigation/Navigator.svelte';
	import AppMenu from '$lib/majorFeatures/AppMenu.svelte';
	import SiteNavOptions from '$navigation/siteNavOptions.svelte';
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { mobileBreakpoint } from '$scripts/site';
	import { onMount } from 'svelte';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import type ModalOnly from '$lib/components/modals/Modal.svelte';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	import { findCurrentSeason } from '$lib/scripts/schedule';

	export let refresh: any;
	let modalOnlyComponent: ModalOnly;
	const checkWindowWidth = () => {
		if ($windowWidth > mobileBreakpoint) {
			$largerThanMobile = true;
		} else {
			$largerThanMobile = false;
		}
	};
	const lookupUserThemePreference = async () => {
		const foundTheme: boolean = await getLocalStorageItem('useDarkTheme');
		if (foundTheme) {
			$useDarkTheme = foundTheme;
		}
	};
	const setSeasons = async () => {
		$current_season = await findCurrentSeason();
		$selected_season = $current_season;
	};
	$: if ($firebase_user) setSeasons();

	onMount(async () => {
		checkWindowWidth();
		lookupUserThemePreference();
	});
</script>

<!-- {#if $navChecked && $useDarkTheme && $chosenMixBlendMode} -->
<div
	id="app-background"
	class="app-wrapper pseudo {$navChecked ? 'expanded' : 'collapsed'} {$useDarkTheme
		? ''
		: 'invert'}"
	style="--mix-blend-mode:{$chosenMixBlendMode};"
>
	<AppMenu />
	{#if $largerThanMobile}
		<Navigator offsetTop={true} customStyles="padding-bottom: 0.5rem;">
			<SiteNavOptions />
		</Navigator>
	{/if}

	<main>
		<TransitionWrapper
			{refresh}
			customStyles={$navChecked ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}
		>
			<slot />
		</TransitionWrapper>
		<NewPlayerForm bind:modalOnlyComponent />
	</main>

	<ReturnToTop showButton={false} />
</div>
<!-- {/if} -->
<SvelteToast />
<svelte:window
	on:resize={() => {
		$windowWidth = window.innerWidth;
		checkWindowWidth();
	}}
/>

<style lang="scss">
	:root {
		@include responsive_desktop_only {
			--toastContainerLeft: math.max(5%, 2rem);
			--toastContainerRight: 70%;
			--toastWidth: clamp(45ch, 25%, 75ch);
		}
	}
	.app-wrapper {
		box-sizing: border-box;
		padding: 0 5px 5px;
		display: grid;
		background: var(--background, hsl(120, 16%, 17%));
		position: relative;
		opacity: 99%;
		min-height: 100vh;
		width: 100%;
		grid-template-areas:
			'menu'
			'main';
		grid-template-columns: 100%;
		grid-template-rows: repeat(auto-fit, minmax(min(0px, 100%), max-content));

		@include responsive_desktop_only {
			grid-template-areas: 'nav menu' 'main menu';
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content 1fr;
		}
		&.pseudo::before {
			content: '';
			position: absolute;
			background-size: cover;
			background-position: center;
			background-attachment: fixed;
			height: 100%;
			width: 100%;
			z-index: -2;
			mix-blend-mode: var(--mix-blend-mode);
			filter: blur(3px);
			/* background-image: url('/static/friday-night-lights-high-res.jpg'); */
		}
	}
	main {
		place-self: start;
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 2rem;

		/* my styles */
		@include gridAndGap(15px);
		color: var(--text, white);
		grid-template-rows: repeat(auto-fit, minmax(min(0px, 100%), 1fr));
		grid-template-columns: 100%;
		text-align: center;
		position: relative;
		grid-area: main;
	}
</style>
