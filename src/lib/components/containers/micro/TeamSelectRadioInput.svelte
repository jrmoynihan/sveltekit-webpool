<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { Team } from '$scripts/classes/team';
	import { goToMissedPick } from '$scripts/scrollAndFocus';
	import { overrideDisabled, use_dark_theme } from '$scripts/store';
	import IntersectionObserver from 'svelte-intersection-observer';
	import TeamImage from '../TeamImage.svelte';
	import TeamNameImage from '../TeamNameImage.svelte';
	import TeamRecord from './TeamRecord.svelte';

	export let id: string;
	export let team: Team;
	export let selected_team_abbreviation: string;
	export let disabled: boolean;
	export let current_picks: WeeklyPickDoc[] = [];
	export let element: HTMLElement;
	export let show_game_container: boolean;
	export let show_team_name_images: boolean;
</script>

<label
	for="{id}-{team.abbreviation}"
	class="dayShadow nightShadow"
	class:selected={selected_team_abbreviation === team.abbreviation}
	class:dark-mode={$use_dark_theme}
	class:disabled
	tabindex="0"
>
	<input
		id="{id}-{team.abbreviation}"
		type="radio"
		bind:group={selected_team_abbreviation}
		on:change={() => {
			if (!$overrideDisabled) {
				goToMissedPick(current_picks);
			}
		}}
		value={team.abbreviation}
		{disabled}
	/>
	<!--prettier-ignore-->
	<IntersectionObserver once={true} {element}	on:intersect={() => {show_game_container = true;}}>
		{#if show_game_container}
			<TeamImage
				{team}
				grayscale={selected_team_abbreviation !== team.abbreviation && selected_team_abbreviation !== ''}
			/>
			{#if show_team_name_images}
				<TeamNameImage
					{team}
					rounded={true}
					whiteBg={true}
					width="300rem"
					grayscale={selected_team_abbreviation !== team.abbreviation && selected_team_abbreviation !== ''}
				/>
			{/if}
		{/if}
		<TeamRecord showTeamAbbreviation={!show_team_name_images} team={team} />
	</IntersectionObserver>
</label>

<style lang="scss">
	input {
		visibility: hidden;
		height: 0;
		width: 0;
		display: none;
	}
	label {
		@include defaultTransition;
		@include rounded;
		cursor: pointer;
		place-items: center;
		display: grid;
		padding: 0.7rem;
		height: 100%;
		width: 100%;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr) minmax(0, 1fr) auto;
		gap: 5px;
	}
	.selected {
		@include normalShadow;
		@include accentedContainer;
		color: white;
		text-shadow: none;
		&.disabled {
			@include accentedContainer(70%);
		}
		&.dark-mode {
			@include accentedContainerDarkMode;
			&.disabled {
				@include accentedContainer(10%);
			}
		}
	}
	.dayShadow:hover {
		@include nightShadow;
		transition: all 300ms ease-in-out;
		transform: scale(1.03);
	}
	.nightShadow:focus {
		@include nightShadow;
		transition: all 300ms ease-in-out;
		transform: scale(1.03);
	}
</style>
