<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { scrollToNextGame } from '$scripts/scrollAndFocus';
	import { useDarkTheme } from '$scripts/store';
	import IntersectionObserver from 'svelte-intersection-observer';
	import TeamImage from '../TeamImage.svelte';
	import TeamNameImage from '../TeamNameImage.svelte';
	import TeamRecord from './TeamRecord.svelte';

	export let id: string;
	export let selectedTeam: string;
	export let homeOrAwayTeam: Team;
	export let disabled: boolean;
	export let index: number;
	export let currentPickCount: number;
	export let totalGameCount: number;
	export let showTeamNameImages: boolean;
	let element: HTMLElement;
	let showGameContainer = false;
</script>

<label
	for="{id}-{homeOrAwayTeam}"
	class="rounded dayShadow nightShadow"
	class:pressed={selectedTeam === homeOrAwayTeam.abbreviation}
	class:selected={selectedTeam === homeOrAwayTeam.abbreviation}
	class:dark-mode={$useDarkTheme}
	class:disabled
	tabindex="0"
>
	<input
		id="{id}-{homeOrAwayTeam}"
		type="radio"
		bind:group={selectedTeam}
		on:input={() => scrollToNextGame(index, currentPickCount, totalGameCount)}
		value={homeOrAwayTeam.abbreviation}
		{disabled}
	/>
	<IntersectionObserver
		once={true}
		{element}
		on:intersect={() => {
			showGameContainer = true;
		}}
	>
		{#if showGameContainer}
			<TeamImage
				team={homeOrAwayTeam}
				grayscale={selectedTeam === homeOrAwayTeam.abbreviation && selectedTeam !== ''}
			/>
			{#if showTeamNameImages}
				<TeamNameImage
					team={homeOrAwayTeam}
					rounded={true}
					whiteBg={true}
					grayscale={selectedTeam === homeOrAwayTeam.abbreviation && selectedTeam !== ''}
					width="300rem"
				/>
			{/if}
		{/if}
	</IntersectionObserver>
	<TeamRecord showTeamAbbreviation={!showTeamNameImages} team={homeOrAwayTeam} />
</label>
