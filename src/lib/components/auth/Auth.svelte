<script lang="ts">
	import { fade } from 'svelte/transition';
	import { startSignOut, startSignIn } from '$lib/scripts/auth/login';
	import Fa from 'svelte-fa';
	import { faUserCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import ModalWithButton from '$lib/components/modals/ModalWithButton.svelte';
	import GoogleLoginButton from '$lib/components/buttons/GoogleLoginButton.svelte';
	import FacebookLoginButton from '$lib/components/buttons/FacebookLoginButton.svelte';
	import { dev } from '$app/env';
	import OnlineStatusIndicator from '$lib/components/containers/micro/OnlineStatusIndicator.svelte';
	import { current_player, firebase_user, show_new_player_form } from '$scripts/store';

	export let useRedirect = true;
	let closeLoginModal: () => Promise<void>;

	const login = async (provider_name: string) => {
		await startSignIn(provider_name, useRedirect);
		if ($firebase_user) {
			closeLoginModal();
		}
	};
	const signUp = async () => {
		$show_new_player_form = true;
		closeLoginModal();
	};
</script>

<ModalWithButton
	bind:close={closeLoginModal}
	button_text={$firebase_user ? '' : 'Login'}
	modal_button_styles={$firebase_user
		? 'padding:0;border-radius:50%;'
		: 'height: 100%; background:none; display:grid; align-content:center;'}
>
	<svelte:fragment slot="modal-content">
		{#if $firebase_user !== undefined && $firebase_user !== null}
			<button class="sign-out-button" on:click={startSignOut}>Sign Out</button>
			{#if !$current_player}
				<button on:click={signUp}>Sign Up</button>
			{/if}
		{:else}
			<GoogleLoginButton on:click={() => login('Google')} />
			<FacebookLoginButton on:click={() => login('Facebook')} />
			{#if dev}
				<ToggleSwitch
					bind:checked={useRedirect}
					labelText={`Use ${useRedirect ? 'redirect' : 'popup'} login method`}
				/>
			{/if}
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="button-icon">
		{#if $firebase_user !== undefined && $firebase_user !== null}
			<picture transition:fade>
				{#if $firebase_user.photoURL !== undefined && $firebase_user.photoURL !== null}
					<img
						loading="lazy"
						alt={`${$firebase_user?.displayName}`}
						src={$firebase_user?.photoURL}
						width="50px"
						height="50px"
					/>
					<OnlineStatusIndicator />
				{:else}
					<Fa icon={faUserCircle} size="2x" class="fa-UserCircle" />
				{/if}
			</picture>
		{/if}
	</svelte:fragment>
</ModalWithButton>

<style lang="scss">
	button {
		@include styledButtonDark;
		// @include frostedGlassHighContrast;
		// text-shadow: 1px 1px 5px var(--background, hsl(120, 16%, 17%));
		// background-color: white;
		color: var(--text);
		font-size: 1.4rem;
		font-weight: 500;
		font-family: inherit;
	}
	img {
		border-radius: 50%;
		font-size: 0.5rem;
		text-align: center;
		overflow: hidden;

		&::after {
			content: attr(alt);
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			border-radius: inherit;
			background: white;
			color: black;
			display: grid;
			align-content: center;
		}
	}
	picture {
		display: grid;
		position: relative;
	}
</style>
