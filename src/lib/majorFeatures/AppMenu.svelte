<script lang="ts">
	import { largerThanMobile, navChecked } from '$scripts/store';
	import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Auth from '$lib/majorFeatures/Auth.svelte';
	import ModalButtonAndSlot from '$lib/components/modals/ModalWithButton.svelte';
	import LightDarkToggle from '$lib/components/switches/LightDarkToggle.svelte';
	import ThemeSelector from '$lib/components/switches/ThemeSelector.svelte';
	import Navigator from '$lib/components/navigation/Navigator.svelte';
	import SiteNavOptions from '$lib/components/navigation/siteNavOptions.svelte';

	function toggleNav(): void {
		$navChecked = !$navChecked;
	}
</script>

<menu />
<aside id="app-menu">
	{#if $largerThanMobile}
		<button
			id="nav-label"
			on:click={toggleNav}
			class="nav-label {$navChecked && !$largerThanMobile ? 'mobile-nav-open' : ''}"
		>
			<Fa icon={faBars} class="fa-bars" size="lg" />
			<!-- <input type="checkbox" id="nav-toggle" on:click={toggleNav} />  button makes this redundant -->
		</button>
	{:else}
		<ModalButtonAndSlot modalButtonStyles={'background:transparent'} discreetButton={true}>
			<Fa slot="button-icon" icon={faBars} class="fa-bars" size="lg" />
			<Navigator
				slot="modal-content"
				useModal={true}
				customStyles="background:var(--alternate-color)"
			>
				<SiteNavOptions />
			</Navigator>
		</ModalButtonAndSlot>
	{/if}

	<Auth />

	<div class="settings-wrapper">
		<LightDarkToggle />

		<ModalButtonAndSlot discreetButton={true} modalButtonStyles={'background:transparent;'}>
			<svelte:fragment slot="button-icon">
				<Fa icon={faCog} class="fa-Cog" size="lg" />
			</svelte:fragment>

			<svelte:fragment slot="modal-content">
				<ThemeSelector />
			</svelte:fragment>
		</ModalButtonAndSlot>
	</div>
</aside>

<style lang="scss">
	aside {
		@include frostedGlass;
		border-radius: 0;
		padding: 0.5rem;
		font-size: inherit;
		text-rendering: optimizeSpeed;
		box-sizing: border-box;
		display: grid;
		gap: 0.75em;
		right: 0;
		z-index: var(--zSticky);
		transition: all 200ms ease-in-out;
		color: var(--alternate-color, rgb(36, 50, 36));
		text-align: center;
		justify-items: center;
		justify-content: center;
		grid-area: menu;
		max-width: 100%;
		position: sticky;
		top: 0;
		max-height: 100vh;
		grid-template-columns: repeat(2, min-content) 1fr;
		background: linear-gradient(
			rgba(var(--alternateValue-color, rgb(36, 50, 36)), 90%) 90%,
			rgba(var(--alternateValue-color, rgb(36, 50, 36)), 50%) 95%,
			transparent 99%
		);
		@include responsive_mobile_only {
			backdrop-filter: blur(5px);
			border-radius: 0 0 1em 1em;
		}

		@include responsive_desktop_only {
			grid-template-columns: min-content;
			grid-template-rows: repeat(2, min-content) 1fr; //** getting set above depending on user being logged in
			padding: 0.5rem;
			border-radius: 1em 0 0 1em;
			font-size: 0.75rem;
		}
	}
	// #nav-toggle {
	// 	display: none;
	// 	opacity: 0;
	// }

	button {
		@include defaultButtonStyles;
		@include discreetButtonStyles;
		width: 100%;
		color: var(--main-color);
		&:hover,
		&:focus {
			background-color: rgba(var(--mainValue-color, rgb(255, 255, 255)), 10%);
		}
	}
	.mobile-nav-open {
		box-shadow: 0 0 0 rgba(var(--accentValue-color, rgb(233, 181, 99)), 50%);
		@include pulse;
	}
	.settings-wrapper {
		display: grid;
		gap: 0.5em;
		place-items: center;
		@include responsive_mobile_only {
			grid-template-columns: 1fr 1fr;
			justify-self: end;
		}
		@include responsive_desktop_only {
			grid-auto-columns: max-content;
			position: absolute;
			bottom: 0;
			margin-bottom: 1em;
		}
	}
</style>
