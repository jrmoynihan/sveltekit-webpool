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
	import { currentUser, userDataSnapshot } from '$scripts/auth/auth';
	import {
		chosenMixBlendMode,
		largerThanMobile,
		navChecked,
		useDarkTheme,
		userQueryAsStore,
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
	import { getLocalStorageItem, saveUserData } from '$scripts/localStorage';
	import NewUserForm from '$lib/components/forms/NewUserForm.svelte';
	import type ModalOnly from '$lib/components/modals/ModalOnly.svelte';
	import { query, where } from '@firebase/firestore';
	import { usersCollection } from '$scripts/collections';
	import { get } from 'svelte/store';
	// import { WebUser } from '$scripts/classes/webUser';
	// import { usersCollection } from '$scripts/collections';
	// import { doc, getDoc } from '@firebase/firestore';

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

	$: if ($currentUser && userConverter) {
		saveUserData();
		const q = query(usersCollection, where('id', '==', $currentUser.uid));
		$userDataSnapshot = get(userQueryAsStore(q));
	}

	onMount(() => {
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
		<Navigator offsetTop={true}>
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
		<NewUserForm bind:modalOnlyComponent />
		<!-- <button on:click={() => modalOnlyComponent.open()}>Open New User Modal</button> -->
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
		font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue',
			sans-serif;
		box-sizing: border-box;
		font-display: swap;
		color: var(--main-color, rgb(255, 255, 255));
		scrollbar-width: thin;
		scrollbar-color: var(--accent-color, rgb(233, 181, 99)) var(--alternate-color, rgb(36, 50, 36));
		--toastContainerTop: 15%;
		--toastWidth: 100%;
		--toastContainerLeft: 2%;
		--toastContainerRight: 2%;
		@include responsive_desktop_only {
			--toastContainerLeft: max(5%, 2rem);
			--toastContainerRight: 5%;
			--toastWidth: clamp(45ch, 25%, 75ch);
		}
	}
	* {
		box-sizing: border-box;
	}
	.app-wrapper {
		padding: 0 5px 5px 5px;
		display: grid;
		background: var(--alternate-color, rgb(36, 50, 36));
		position: relative;
		opacity: 0.99;
		min-height: 100vh;
		width: 100%;
		grid-template-areas:
			'menu'
			// 'nav'
			'main';
		grid-template-columns: 100%;
		grid-template-rows: repeat(3, minmax(min(0px, 100%), max-content));

		@include responsive_desktop_only {
			grid-template-areas: 'nav menu' 'main menu';
			grid-template-columns: minmax(min(0px, 100%), 1fr) max-content;
			grid-template-rows: minmax(min(0px, 100%), max-content) 1fr;
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
			filter: blur(3px);
			// background-image: url('/static/friday-night-lights-high-res.jpg');
		}
	}
	main {
		place-self: start;
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 2rem;

		// my styles
		@include gridAndGap(15px);
		color: var(--main-color, rgb(255, 255, 255));
		grid-template-rows: repeat(auto-fit, minmax(min(0px, 100%), 1fr));
		grid-template-columns: 100%;
		text-align: center;
		position: relative;
		grid-area: main;
		transition: all 300ms ease-in-out;
	}
</style>
