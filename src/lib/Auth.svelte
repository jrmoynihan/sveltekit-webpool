<script lang="ts">
	import { currentUser, startSignOut, startSignIn } from '../scripts/auth';
	import Fa from 'svelte-fa';
	import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import ModalButtonAndSlot from '$lib/components/ModalButtonAndSlot.svelte';
	import GoogleLoginButton from '$lib/components/buttons/GoogleLoginButton.svelte';
	import FacebookLoginButton from '$lib/components/buttons/FacebookLoginButton.svelte';

	export let useRedirect = true;
	export let debug = true;
</script>

<!-- If there is a current user, show a Sign Out button & modal -->
{#if $currentUser !== undefined && $currentUser !== null}
	<!-- {$currentUser.providerData[0].providerId} -->
	<ModalButtonAndSlot
		useDefaultButtonStyles={true}
		displayModalButtonText=""
		displayModalButtonStyles="padding:0;"
		dialogStyles="align-items:center; justify-content:center; background-color:#00000078;"
	>
		<svelte:fragment slot="modal-content">
			<button id="sign-out-button" on:click={startSignOut}>Sign Out</button>
		</svelte:fragment>

		<svelte:fragment slot="button-icon">
			{#if $currentUser.photoURL !== undefined && $currentUser.photoURL !== null}
				<img lazy-loading alt="user-profile-avatar" src={$currentUser.photoURL} width="50px" />
			{:else}
				<Fa icon={faUserCircle} size="2x" class="fa-UserCircle" />
			{/if}
		</svelte:fragment>
	</ModalButtonAndSlot>
	<label for="sign-out-button">{$currentUser.displayName}</label>
{:else}
	<ModalButtonAndSlot
		useDefaultButtonStyles={true}
		displayModalButtonStyles="height: 100%, width:100%, background:none"
		displayModalButtonText="Login"
		dialogStyles="align-items:center; justify-content:center;"
	>
		<svelte:fragment slot="modal-content">
			{#if $currentUser !== null}
				<FacebookLoginButton on:click={() => startSignIn('Facebook', useRedirect)} />
			{:else}
				<GoogleLoginButton on:click={() => startSignIn('Google', useRedirect)} />
				<FacebookLoginButton on:click={() => startSignIn('Facebook', useRedirect)} />
			{/if}

			{#if debug}
				<ToggleSwitch
					bind:checked={useRedirect}
					labelText={`Use ${useRedirect ? 'redirect' : 'popup'} login method`}
				/>
			{/if}
		</svelte:fragment>
	</ModalButtonAndSlot>
{/if}

<style lang="scss">
	button {
		@include defaultButtonStyles;
		text-shadow: 1px 1px 5px var(--alternate-color);
		font-size: inherit;
	}
	img {
		border-radius: 50%;
	}
	label {
		align-self: center;
	}
	#sign-out-button {
		@include frostedGlassHighContrast;
		background-color: rgba(white, 80%);
		font-size: 1.4rem;
		font-weight: 500;
		font-family: inherit;
		text-shadow: none;
	}
</style>
