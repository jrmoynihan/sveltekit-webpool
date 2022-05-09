<script lang="ts">
	import {
		currentPicks,
		gamesPromise,
		largerThanMobile,
		navChecked,
		overrideDisabled,
		picksPromise,
		preferredScoreView,
		selected_season_type,
		selected_player,
		selected_week,
		showATSwinner,
		showIDs,
		showNetTiebreakers,
		showSpreads,
		showTimestamps,
		tiebreakerPromise,
		selected_year
	} from '$scripts/store';
	import { faBars, faCog, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Auth from '$lib/components/auth/Auth.svelte';
	import ModalButtonAndSlot from '$lib/components/modals/ModalWithButton.svelte';
	import LightDarkToggle from '$lib/components/switches/LightDarkToggle.svelte';
	import ThemeSelector from '$lib/components/switches/ThemeSelector.svelte';
	import Navigator from '$lib/components/navigation/Navigator.svelte';
	import SiteNavOptions from '$lib/components/navigation/siteNavOptions.svelte';
	import { page } from '$app/stores';
	import MultiToggleSwitch from '$lib/components/switches/MultiToggleSwitch.svelte';
	import { getLocalStorageItem, setLocalStorageItem } from '$scripts/localStorage';
	import type { ScoreViewPreference } from '$scripts/types/types';
	import { onMount } from 'svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import AdminControlsModal from '$lib/components/modals/AdminControlsModal.svelte';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import { changedQuery } from '$lib/scripts/weekly/weeklyPlayers';
	import type { Player } from '$lib/scripts/classes/player';
	import { adminControlsPages } from '$lib/scripts/site';

	let storedScoreViewPreference: ScoreViewPreference;
	let viewPreferences: { label: string; value: ScoreViewPreference }[] = [
		{ label: 'Actual', value: 'Actual' },
		{ label: 'ATS', value: 'ATS' },
		{ label: 'Both', value: 'Both' }
	];

	function toggleNav(): void {
		$navChecked = !$navChecked;
	}
	export async function adminSelectorsUpdated() {
		const promises = changedQuery(
			$selected_year,
			$selected_season_type,
			$selected_week,
			$selected_player
		);
		$gamesPromise = (await promises).gamesPromise;
		$picksPromise = (await promises).picksPromise;
		$tiebreakerPromise = (await promises).tiebreakerPromise;
		$currentPicks = await $picksPromise;
	}
	onMount(async () => {
		storedScoreViewPreference = await getLocalStorageItem('scoreViewPreference');
	});
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
		</button>
	{:else}
		<ModalButtonAndSlot modalButtonStyles={'background:transparent'} discreetButton={true}>
			<Fa slot="button-icon" icon={faBars} class="fa-bars" size="lg" />
			<Navigator slot="modal-content" useModal={true} customStyles="background:var(--background)">
				<SiteNavOptions />
			</Navigator>
		</ModalButtonAndSlot>
	{/if}

	<Auth />

	<div class="settings-wrapper">
		{#if adminControlsPages.includes($page.url.pathname)}
			<AdminControlsModal modalButtonStyles={`border-radius: 1rem; padding: 0.75rem;`}>
				<Grid slot="modal-content" repeatColumns={2}>
					{#if $page.url.pathname === '/weekly/make-picks'}
						<p>Show Game IDs</p>
						<ToggleSwitch bind:checked={$showIDs} />
						<p>Show Timestamps</p>
						<ToggleSwitch bind:checked={$showTimestamps} />
						<p>Show Spreads</p>
						<ToggleSwitch bind:checked={$showSpreads} />
						<p>Show ATS Winner</p>
						<ToggleSwitch bind:checked={$showATSwinner} />

						<p>Override Locked Games <Fa icon={$overrideDisabled ? faUnlock : faLock} /></p>
						<ToggleSwitch bind:checked={$overrideDisabled} />
						<p>Select Season Type</p>
						<SeasonTypeSelect on:change={adminSelectorsUpdated} />
						<p>Select Year</p>
						<YearSelect on:change={adminSelectorsUpdated} />
						<p>Select Player</p>
						<PlayerSelect player_pool="weekly" on:change={adminSelectorsUpdated} />
					{/if}
				</Grid>
			</AdminControlsModal>
		{/if}

		<LightDarkToggle />

		<ModalButtonAndSlot discreetButton={true} modalButtonStyles={'background:transparent;'}>
			<svelte:fragment slot="button-icon">
				<Fa icon={faCog} class="fa-Cog" size="lg" />
			</svelte:fragment>

			<svelte:fragment slot="modal-content">
				{#if $page.url.pathname === '/weekly/makePicks'}
					<MultiToggleSwitch
						titleText="View Scores"
						showSelectedValue={false}
						items={viewPreferences}
						selectedItem={storedScoreViewPreference
							? viewPreferences.find((preference) => preference.value === storedScoreViewPreference)
							: viewPreferences[1]}
						bind:selectedValue={$preferredScoreView}
						on:toggle={() => setLocalStorageItem('scoreViewPreference', $preferredScoreView)}
					/>
					<label class="score-view-selector-label"
						>View Scores
						<select class="score-view-selector" bind:value={$preferredScoreView}>
							{#each viewPreferences as preference}
								<option selected={preference.value === $preferredScoreView} value={preference.value}
									>{preference.label}</option
								>
							{/each}
						</select>
					</label>
				{:else if $page.url.pathname === '/weekly/standings'}
					<Grid slot="modal-content" repeatColumns={2}>
						<span>Show Net Tiebreakers</span>
						<ToggleSwitch adminOnly={true} bind:checked={$showNetTiebreakers} />
						<span>Show UIDs</span>
						<ToggleSwitch adminOnly={true} bind:checked={$showIDs} />
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
		gap: 0.75em;
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
		grid-template-columns: repeat(2, min-content) 1fr;
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
			grid-template-columns: 1fr 1fr 1fr;
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
