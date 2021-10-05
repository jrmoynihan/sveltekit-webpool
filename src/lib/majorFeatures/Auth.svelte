<script lang="ts">
	import { fade } from 'svelte/transition';
	import { currentUser, startSignOut, startSignIn } from '$scripts/auth/auth';
	import Fa from 'svelte-fa';
	import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import ModalButtonAndSlot from '$lib/components/modals/ModalButtonAndSlot.svelte';
	import GoogleLoginButton from '$lib/components/buttons/GoogleLoginButton.svelte';
	import FacebookLoginButton from '$lib/components/buttons/FacebookLoginButton.svelte';
	import { dev } from '$app/env';
	import ModalOnly from '$lib/components/modals/ModalOnly.svelte';
	import { userNotFound } from '$scripts/auth/signInRedirectResult';
	import OnlineStatusIndicator from '$lib/components/containers/micro/OnlineStatusIndicator.svelte';
	import { displayModal } from '$scripts/modals/modalFunctions';
	import LoginForm from '$lib/components/forms/LoginForm.svelte';

	export let useRedirect = true;
	let loginModalID: string;
	let newUserModalID: string;
	let newUserModalOpen = false;

	const googleLogin = async () => {
		await startSignIn('Google', useRedirect, loginModalID);
		console.log(`User ${$userNotFound ? 'not' : ''} found.`);
		if ($userNotFound) {
			showNewUserForm();
		}
	};
	const facebookLogin = async () => {
		await startSignIn('Facebook', useRedirect, loginModalID);
		if ($userNotFound) {
			showNewUserForm();
		}
	};
	const showNewUserForm = () => {
		displayModal(newUserModalID);
		newUserModalOpen = true;
	};
	$: {
		if ($userNotFound) {
			showNewUserForm();
		}
	}
</script>

<ModalButtonAndSlot
	displayModalButtonText={$currentUser ? '' : 'Login'}
	modalButtonStyles={$currentUser
		? 'padding:0;border-radius:50%;'
		: 'height: 100%; background:none; display:grid; align-content:center;'}
	bind:modalID={loginModalID}
>
	<svelte:fragment slot="modal-content">
		{#if $currentUser !== undefined && $currentUser !== null}
			<button id="sign-out-button" on:click={startSignOut}>Sign Out</button>
		{:else}
			<GoogleLoginButton on:click={googleLogin} />
			<FacebookLoginButton on:click={facebookLogin} />
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
					<OnlineStatusIndicator />
				{:else}
					<Fa icon={faUserCircle} size="2x" class="fa-UserCircle" />
				{/if}
			</picture>
		{/if}
	</svelte:fragment>
</ModalButtonAndSlot>
<LoginForm bind:modalID={newUserModalID} bind:dialogOpen={newUserModalOpen} />

<style lang="scss">
	button {
		@include defaultButtonStyles;
		text-shadow: 1px 1px 5px var(--alternate-color, rgb(36, 50, 36));
		font-size: inherit;
	}
	img {
		border-radius: 50%;
	}
	picture {
		display: grid;
		position: relative;
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
