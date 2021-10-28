<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { Team } from '$scripts/classes/team';
	import { goToMissedPick } from '$scripts/functions';
	import { useDarkTheme } from '$scripts/store';

	import IntersectionObserver from 'svelte-intersection-observer';
	import TeamImage from '../TeamImage.svelte';
	import TeamNameImage from '../TeamNameImage.svelte';
	import TeamRecord from './TeamRecord.svelte';

	export let id: string;
	export let homeOrAwayTeam: Team;
	export let selectedTeam: string;
	export let disabled: boolean;
	export let currentPicks: WeeklyPickDoc[] = [];
	export let element: HTMLElement;
	export let showGameContainer: boolean;
	export let showTeamNameImages: boolean;
</script>

<label
	for="{id}-{homeOrAwayTeam.abbreviation}"
	class="dayShadow nightShadow"
	class:selected={selectedTeam === homeOrAwayTeam.abbreviation}
	class:dark-mode={$useDarkTheme}
	class:disabled
	tabindex="0"
>
	<input
		id="{id}-{homeOrAwayTeam.abbreviation}"
		type="radio"
		bind:group={selectedTeam}
		on:change={() => goToMissedPick(currentPicks)}
		value={homeOrAwayTeam.abbreviation}
		{disabled}
	/>
	<!--prettier-ignore-->
	<IntersectionObserver once={true} {element}	on:intersect={() => {showGameContainer = true;}}>
		{#if showGameContainer}
			<TeamImage
				team={homeOrAwayTeam}
				grayscale={selectedTeam !== homeOrAwayTeam.abbreviation && selectedTeam !== ''}
			/>
			{#if showTeamNameImages}
				<TeamNameImage
					team={homeOrAwayTeam}
					rounded={true}
					whiteBg={true}
					width="300rem"
					grayscale={selectedTeam !== homeOrAwayTeam.abbreviation && selectedTeam !== ''}
				/>
			{/if}
		{/if}
		<TeamRecord showTeamAbbreviation={!showTeamNameImages} team={homeOrAwayTeam} />
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
			@include accentedContainer(70%, 10%);
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
