<script lang="ts">
	import {
		larger_than_mobile,
		nav_toggled,
		override_locked_picks,
		preferred_score_view,
		show_ATS_winner,
		show_IDs,
		show_net_tiebreakers,
		show_spreads,
		show_timestamps
	} from '$scripts/store';
	import { faBars, faCog, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import Auth from '$lib/components/auth/Auth.svelte';
	import ModalButtonAndSlot from '$lib/components/modals/ModalWithButton.svelte';
	import LightDarkToggle from '$lib/components/switches/LightDarkToggle.svelte';
	import ThemeSelector from '$lib/components/switches/ThemeSelector.svelte';
	import Navigator from '$lib/components/navigation/Navigator.svelte';
	import SiteNavOptions from '$lib/components/navigation/siteNavOptions.svelte';
	import { page } from '$app/stores';
	import { setLocalStorageItem } from '$scripts/localStorage';
	import type { ScoreViewPreference } from '$scripts/types/types';
	import Grid from '$lib/components/containers/Grid.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import AdminControlsModal from '$lib/components/modals/AdminControlsModal.svelte';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import { admin_controls_pages } from '$lib/scripts/site';
	import TeamSelector from '$lib/components/containers/micro/TeamSelector.svelte';

	let viewPreferences: { label: string; value: ScoreViewPreference }[] = [
		{ label: 'Actual', value: 'Actual' },
		{ label: 'ATS', value: 'ATS' },
		{ label: 'Both', value: 'Both' }
	];

	function toggleNav(): void {
		$nav_toggled = !$nav_toggled;
	}
</script>

<menu />
<aside id="app-menu">
	{#if $larger_than_mobile}
		<button
			id="nav-label"
			on:click={toggleNav}
			class="nav-label {$nav_toggled && !$larger_than_mobile ? 'mobile-nav-open' : ''}"
		>
			<Fa icon={faBars} class="fa-bars" size="lg" />
		</button>
	{:else}
		<ModalButtonAndSlot modal_button_styles={'background:transparent'} use_discreet_button={true}>
			<Fa slot="button-icon" icon={faBars} class="fa-bars" size="lg" />
			<Navigator slot="modal-content" useModal={true} customStyles="background:var(--background)">
				<SiteNavOptions />
			</Navigator>
		</ModalButtonAndSlot>
	{/if}

	<Auth />

	<div class="settings-wrapper">
		{#if admin_controls_pages.includes($page.url.pathname)}
			<AdminControlsModal modal_button_styles={`border-radius: 1rem; padding: 0.75rem;`}>
				<Grid slot="modal-content" repeatColumns={2}>
					{#if $page.url.pathname.includes('/weekly')}
						<p>Select Season Type</p>
						<SeasonTypeSelect />
						<p>Select Year</p>
						<YearSelect />
						<p>Select Player</p>
						<PlayerSelect player_pool="weekly" />
						{#if $page.url.pathname === '/weekly/make-picks'}
							<p>Show Game IDs</p>
							<ToggleSwitch bind:checked={$show_IDs} />
							<p>Show Timestamps</p>
							<ToggleSwitch bind:checked={$show_timestamps} />
							<p>Show Spreads</p>
							<ToggleSwitch bind:checked={$show_spreads} />
							<p>Show ATS Winner</p>
							<ToggleSwitch bind:checked={$show_ATS_winner} />

							<p>Override Locked Games <Fa icon={$override_locked_picks ? faUnlock : faLock} /></p>
							<ToggleSwitch bind:checked={$override_locked_picks} />
						{/if}
					{:else if $page.url.pathname.includes('/pick6')}
						<p>Select Year</p>
						<YearSelect />
					{:else if $page.url.pathname.includes('/survivor')}
						<p>Select Player</p>
						<PlayerSelect player_pool="survivor" />
						<p>Select Year</p>
						<YearSelect />
						<p>Select Team</p>
						<TeamSelector />
						<p>Show Spreads</p>
						<ToggleSwitch bind:checked={$show_spreads} />
						<p>Override Locked Games <Fa icon={$override_locked_picks ? faUnlock : faLock} /></p>
						<ToggleSwitch bind:checked={$override_locked_picks} />
					{/if}
				</Grid>
			</AdminControlsModal>
		{/if}

		<LightDarkToggle />

		<ModalButtonAndSlot use_discreet_button={true} modal_button_styles={'background:transparent;'}>
			<svelte:fragment slot="button-icon">
				<Fa icon={faCog} class="fa-Cog" size="lg" />
			</svelte:fragment>

			<svelte:fragment slot="modal-content">
				{#if $page.url.pathname === '/weekly/make-picks'}
					<label class="score-view-selector-label"
						>View Scores
						<select
							class="score-view-selector"
							bind:value={$preferred_score_view}
							on:change={() => setLocalStorageItem('scoreViewPreference', $preferred_score_view)}
						>
							{#each viewPreferences as preference}
								<option
									selected={preference.value === $preferred_score_view}
									value={preference.value}>{preference.label}</option
								>
							{/each}
						</select>
					</label>
				{:else if $page.url.pathname === '/weekly/standings'}
					<Grid slot="modal-content" repeatColumns={2}>
						<span>Show Net Tiebreakers</span>
						<ToggleSwitch adminOnly={true} bind:checked={$show_net_tiebreakers} />
						<span>Show UIDs</span>
						<ToggleSwitch adminOnly={true} bind:checked={$show_IDs} />
					</Grid>
				{/if}
				<ThemeSelector invisible={true} />
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
		gap: 1rem;
		right: 0;
		z-index: var(--zSticky);
		transition: all 200ms ease-in-out;
		color: var(--background, hsl(120, 16%, 17%));
		text-align: center;
		justify-items: center;
		justify-content: center;
		grid-area: menu;
		max-width: 100%;
		position: sticky;
		top: 0;
		max-height: 100vh;
		grid-template-columns: repeat(2, minmax(3rem, auto)) 1fr;
		background: linear-gradient(
			hsla(var(--background-value, hsl(120, 16%, 17%)), 90%) 90%,
			hsla(var(--background-value, hsl(120, 16%, 17%)), 50%) 95%,
			transparent 99%
		);
		@include responsive_mobile_only {
			backdrop-filter: blur(5px);
			border-radius: 0 0 1em 1em;
		}

		@include responsive_desktop_only {
			grid-template-columns: min-content;
			grid-template-rows: repeat(2, min-content) 1fr; //** getting set above depending on player being logged in
			padding: 0.5rem;
			border-radius: 1em 0 0 1em;
			font-size: 0.75rem;
		}
	}
	button {
		@include defaultButtonStyles;
		@include discreetButtonStyles;
		margin: unset;
		width: 100%;
		color: var(--text);
		&:hover,
		&:focus {
			background-color: hsla(var(--text-value, white), 10%);
		}
	}
	.mobile-nav-open {
		box-shadow: 0 0 0 hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
		@include pulse;
	}
	.settings-wrapper {
		display: grid;
		gap: 0.5em;
		place-items: center;
		@include responsive_mobile_only {
			grid-template-columns: repeat(3, minmax(min-content, 1fr));
			justify-self: end;
		}
		@include responsive_desktop_only {
			grid-auto-columns: max-content;
			position: absolute;
			bottom: 0;
			margin-bottom: 1em;
		}
	}
	.score-view-selector {
		@include defaultSelect;
		&-label {
			display: grid;
			font-weight: bold;
		}
	}
</style>
