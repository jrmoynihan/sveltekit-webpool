<script context="module" lang="ts">
	export async function load({ url }: LoadEvent): Promise<LoadOutput> {
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
	import { dev } from '$app/env';
	import ReturnToTop from '$lib/components/buttons/ReturnToTop.svelte';
	import NewPlayerForm from '$lib/components/forms/NewPlayerForm.svelte';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import AppMenu from '$lib/majorFeatures/AppMenu.svelte';
	import { findCurrentSeason } from '$lib/scripts/schedule';
	import { getLocalStorageItem } from '$lib/scripts/utilities/localStorage';
	import { myLog } from '$lib/scripts/utilities/logging';
	import Navigator from '$navigation/Navigator.svelte';
	import SiteNavOptions from '$navigation/siteNavOptions.svelte';
	import { mobile_breakpoint } from '$scripts/site';
	import {
		all_players,
		all_seasons,
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
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import '../app.css';

	export let refresh: any;
	let openNewPlayerForm: () => Promise<void>;
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
			await updateCurrentPlayer();

			if ($current_player?.uid) {
				myLog({ msg: `Player found: ${$current_player.name} (${$current_player.nickname})` });
			} else {
				openNewPlayerForm();
				myLog({ msg: `Player NOT found for user: ${$firebase_user?.displayName}` });
			}
			$current_season = await findCurrentSeason();
			$selected_season = dev
				? $all_seasons.find(
						(season) =>
							season.year === new Date().getFullYear() && season.type_name === 'Regular Season'
				  )
				: $current_season;
		}
	};
	const updateCurrentPlayer = async () => {
		$current_player = $all_players.find((player) => player.uid === $firebase_user?.uid);
		$selected_player = $current_player;
	};

	// After the players are loaded in the onSnapshot listener, we can set the current/selected player
	$: if ($all_players.length > 0 && $firebase_user) setStores();

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
			bind:refresh
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
	:global(.__tooltip.custom-tooltip) {
		// background-color: hsla(var(--accent-hue), 16.3%, 16.9%);
		min-width: 150px;
		max-width: 25vw;
		font-weight: 500;
		font-size: 0.9rem;
		background: var(--background, hsl(120, 16%, 17%));
		box-shadow: 0 0 10px 0px var(--accent, hsl(37, 75%, 65%));
		border-radius: 0.75rem;
		padding: 1rem;
		pointer-events: none;
		&::after {
			// CSS triangle
			border-color: var(--background, hsl(120, 16%, 17%)) transparent transparent transparent;
		}
	}
	:global(.__tooltip.__tooltip-top) {
		transform: translate3d(-50%, -100%, 0);
		transform-origin: top left;
	}
	:global(.__tooltip.__tooltip-enter) {
		animation: scaleIn 0.2s linear forwards;
	}
	:global(.tooltip.__tooltip-leave) {
		animation: scaleOut 0.2s linear forwards;
	}
	@keyframes scaleIn {
		from {
			scale: 0;
			opacity: 0;
		}
		to {
			scale: 1;
			opacity: 1;
		}
	}
	@keyframes scaleOut {
		from {
			scale: 1;
			opacity: 1;
		}
		to {
			scale: 0;
			opacity: 0;
		}
	}
	// :global(.__tooltip.custom-tooltip.__tooltip-dark) {
	// 	background-color: hsla(var(--accent-hue), 35.3%, 43.1%);
	// }
	.app-wrapper {
		box-sizing: border-box;
		padding: 0 5px 5px;
		display: grid;
		background: var(--background, hsl(120, 16%, 17%));
		position: relative;
		opacity: 99%;
		min-height: 100dvh;
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
		height: 100%;
	}
</style>
