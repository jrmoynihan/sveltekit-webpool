<script lang="ts">
	import { scrollToNextGame } from '$lib/scripts/animations/scrollAndFocus';
	import type { Team } from '$scripts/classes/team';
	import { override_locked_picks, use_dark_theme } from '$scripts/store';
	import { faCancel } from '@fortawesome/free-solid-svg-icons/index.es';
	import { useTooltip } from '@untemps/svelte-use-tooltip';
	import Fa from 'svelte-fa';
	import IntersectionObserver from 'svelte-intersection-observer';
	import TeamImage from '../TeamImage.svelte';
	import TeamNameImage from '../TeamNameImage.svelte';
	import TeamRecord from './TeamRecord.svelte';

	export let id: string;
	export let team: Team;
	export let pick: string;
	export let element: HTMLElement;
	export let show_game_container: boolean;
	export let show_team_name_images: boolean;
	export let custom_label_styles = '';
	export let disabled: boolean;
	export let show_disabled_icons: boolean = false;
	export let survivor_player_is_dead: boolean = false;
</script>

<label
	for="{id}-{team.abbreviation}"
	class="dayShadow nightShadow"
	class:selected={pick === team.abbreviation}
	class:dark-mode={$use_dark_theme}
	class:disabled
	tabindex="0"
	style={custom_label_styles}
>
	<input
		id="{id}-{team.abbreviation}"
		type="radio"
		bind:group={pick}
		on:change={() => {
			if (!$override_locked_picks) scrollToNextGame();
		}}
		value={team.abbreviation}
		{disabled}
	/>
	<!--prettier-ignore-->
	<IntersectionObserver once={true} {element}	on:intersect={() => {show_game_container = true;}}>
		{#if show_game_container}
			<TeamImage
				{team}
				grayscale={disabled || (pick !== team.abbreviation && pick !== '')}
			/>
			{#if show_team_name_images}
				<TeamNameImage
					{team}
					rounded={true}
					whiteBg={true}
					grayscale={disabled || (pick !== team.abbreviation && pick !== '')}
				/>
			{/if}
		{/if}
		{#if show_disabled_icons}
		<span class="already-used-tooltip" use:useTooltip={{
			animated: true,
			content: survivor_player_is_dead ? `You're dead!` : 'This pick has already been used!',
			containerClassName: `custom-tooltip __tooltip __tooltip-top ${use_dark_theme ? '__tooltip-dark' : ''}`,
		}}>
		<Fa icon={faCancel} size='3x' color={$use_dark_theme ? 'tomato' : 'darkred'} />
		</span>
		{:else}
		<TeamRecord showTeamAbbreviation={!show_team_name_images} {team} />
		{/if}
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
		box-sizing: border-box;
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
	.already-used-tooltip {
		padding-top: 0.5rem;
		width: 100%;
		place-self: center;
	}
</style>
