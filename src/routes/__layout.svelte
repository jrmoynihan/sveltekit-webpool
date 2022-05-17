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
		all_players,
		current_player,
		current_season,
		firebase_user,
		larger_than_mobile,
		nav_toggled,
		selected_player,
		selected_season,
		use_dark_theme,
		window_width
	} from '$scripts/store';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import Navigator from '$navigation/Navigator.svelte';
	import AppMenu from '$lib/majorFeatures/AppMenu.svelte';
	import SiteNavOptions from '$navigation/siteNavOptions.svelte';
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { mobile_breakpoint } from '$scripts/site';
	import { onMount } from 'svelte';
	import { getLocalStorageItem } from '$scripts/localStorage';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { get } from 'svelte/store';
	import { findCurrentSeason } from '$lib/scripts/schedule';
	import { myLog } from '$lib/scripts/logging';

	export let refresh: any;
	let openNewPlayerForm: () => Promise<void> = async () => {};
	const checkWindowWidth = () => {
		if ($window_width > mobile_breakpoint) {
			$larger_than_mobile = true;
		} else {
			$larger_than_mobile = false;
		}
	};
	const lookupUserThemePreference = async () => {
		const foundTheme: boolean = await getLocalStorageItem('useDarkTheme');
		if (foundTheme) {
			$use_dark_theme = foundTheme;
		}
	};
	const setStores = async () => {
		if ($firebase_user) {
			$current_player = $all_players.find((player) => player.uid === $firebase_user.uid);
			$selected_player = $current_player;

			if ($current_player) {
				myLog({ msg: `Player found: ${$current_player.name} (${$current_player.nickname})` });
			} else {
				openNewPlayerForm();
				myLog({ msg: `Player NOT found for user: ${$firebase_user?.displayName}` });
			}
			$current_season = await findCurrentSeason();
			$selected_season = $current_season;
		}
	};
	// Update the current player whenever their document has changes
	$: $current_player = $all_players.find((player) => player.uid === $firebase_user.uid);

	// After the players are loaded in the onSnapshot listener, we can set the current/selected player
	$: if ($all_players) setStores();

	onMount(async () => {
		checkWindowWidth();
		lookupUserThemePreference();
	});
</script>

<div
	id="app-background"
	class="app-wrapper pseudo {$nav_toggled ? 'expanded' : 'collapsed'}"
	class:invert={!$use_dark_theme}
>
	<AppMenu />
	{#if $larger_than_mobile}
		<Navigator offsetTop={true} customStyles="padding-bottom: 0.5rem;">
			<SiteNavOptions />
		</Navigator>
	{/if}

	<main>
		<TransitionWrapper
			{refresh}
			customStyles={$nav_toggled ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}
		>
			<slot />
		</TransitionWrapper>
		<NewPlayerForm bind:openNewPlayerForm />
	</main>

	<ReturnToTop showButton={false} />
</div>

<SvelteToast />

<svelte:window
	on:resize={() => {
		$window_width = window.innerWidth;
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
