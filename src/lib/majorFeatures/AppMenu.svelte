<script lang="ts">
	import { navChecked, windowWidth } from '$scripts/store';
	import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Auth from '$lib/majorFeatures/Auth.svelte';
	import ModalButtonAndSlot from '$lib/components/ModalButtonAndSlot.svelte';
	import LightDarkToggle from '$lib/components/switches/LightDarkToggle.svelte';
	import ThemeSelector from '$lib/components/switches/ThemeSelector.svelte';
	import { mobileBreakpoint } from '$scripts/site';

	function toggleNav(): void {
		$navChecked = !$navChecked;
	}
</script>

<menu />
<aside id="app-menu">
	<button
		id="nav-label"
		on:click={toggleNav}
		class="nav-label {$navChecked && $windowWidth < mobileBreakpoint ? 'mobile-nav-open' : ''}"
	>
		<Fa icon={faBars} class="fa-bars" size="lg" />
		<input type="checkbox" id="nav-toggle" on:click={toggleNav} />
	</button>

	<Auth />

	<div id="settings-wrapper">
		<LightDarkToggle />

		<ModalButtonAndSlot
			displayModalButtonStyles={'background:transparent'}
			useDiscreetButtonStyles={true}
		>
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
	#app-menu {
		@include frostedGlass;
		border-radius: 1em 0 0 1em;
		background: linear-gradient(
			transparent,
			rgba(var(--menu-background-gradient), 10%),
			transparent
		);
		font-size: x-small;
		text-rendering: optimizespeed;
		box-sizing: border-box;
		display: grid;
		gap: 0.75em;
		right: 0;
		z-index: 999;
		transition: all 200ms ease-in-out;
		color: var(--alternate-color);
		text-align: center;
		justify-items: center;
		justify-content: center;
		grid-area: menu;
		// grid-template-columns: repeat(3, min-content) 1fr;
		// grid-template-rows: 1fr auto;
		max-width: 100%;
		position: sticky;
		top: 0;
		max-height: 100vh;
		@include responsive_mobile_only {
			padding: 0.5rem;
			font-size: inherit;
			grid-template-columns: repeat(2, min-content) 1fr;
			background: rgba(var(--alternateValue-color), 70%);
		}
		@include responsive_desktop_only {
			grid-template-columns: min-content !important;
			grid-template-rows: repeat(2, min-content) 1fr; //** getting set above depending on user being logged in
			padding: 0.5rem;
		}
	}
	#nav-toggle {
		display: none;
		opacity: 0;
	}

	.nav-label {
		@include defaultButtonStyles;
		@include discreetButtonStyles;
		width: 100%;
		color: var(--main-color);
		&:hover,
		&:focus {
			// color: white;
			// background-color: rgba(0, 0, 0, 0.5);
			background-color: rgba(var(--mainValue-color), 10%);
		}
	}
	.mobile-nav-open {
		box-shadow: 0 0 0 rgba(var(--accentValue-color), 50%);
		@include pulse;
	}
	#settings-wrapper {
		display: grid;
		gap: 0.5em;
		align-items: center;
		justify-items: center;
		// width: auto;
		@include responsive_mobile_only {
			// grid-template-columns: repeat(auto-fit,minmax(0px,min-content));
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
