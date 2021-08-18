<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currentUser, startSignOut, startSignIn } from '$scripts/auth';
	import Fa from 'svelte-fa';
	import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import ModalButtonAndSlot from '$lib/components/ModalButtonAndSlot.svelte';
	import GoogleLoginButton from '$lib/components/buttons/GoogleLoginButton.svelte';
	import FacebookLoginButton from '$lib/components/buttons/FacebookLoginButton.svelte';
	import { dev } from '$app/env';

	export let useRedirect = true;
	let modalID: string;
</script>

<ModalButtonAndSlot
	useDefaultButtonStyles={true}
	displayModalButtonText={$currentUser ? '' : 'Login'}
	displayModalButtonStyles={$currentUser
		? 'padding:0;border-radius:50%;'
		: 'height: 100%; background:none; display:grid; align-content:center;'}
	dialogStyles="align-items:center; justify-content:center; background-color:#00000078;margin: auto;
	padding: revert;"
	bind:modalID
>
	<svelte:fragment slot="modal-content">
		{#if $currentUser !== undefined && $currentUser !== null}
			<button id="sign-out-button" on:click={startSignOut}>Sign Out</button>
		{:else}
			<GoogleLoginButton on:click={() => startSignIn('Google', useRedirect, modalID)} />
			<FacebookLoginButton on:click={() => startSignIn('Facebook', useRedirect, modalID)} />
			{#if dev}
				<ToggleSwitch
					bind:checked={useRedirect}
					labelStyles={'color:white;'}
					labelText={`Use ${useRedirect ? 'redirect' : 'popup'} login method`}
				/>
			{/if}
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="button-icon">
		{#if $currentUser !== undefined && $currentUser !== null}
			<picture transition:fade>
				{#if $currentUser.photoURL !== undefined && $currentUser.photoURL !== null}
					<img lazy-loading alt="user-profile-avatar" src={$currentUser.photoURL} width="50px" />
				{:else}
					<Fa icon={faUserCircle} size="2x" class="fa-UserCircle" />
				{/if}
			</picture>
		{/if}
	</svelte:fragment>
</ModalButtonAndSlot>

<style lang="scss">
	button {
		@include defaultButtonStyles;
		text-shadow: 1px 1px 5px var(--alternate-color);
		font-size: inherit;
	}
	img {
		border-radius: 50%;
	}
	picture {
		display: grid;
	}
	#sign-out-button {
		@include frostedGlassHighContrast;
		background-color: white;
		font-size: 1.4rem;
		font-weight: 500;
		font-family: inherit;
		text-shadow: none;
	}
</style>
