<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { useDarkTheme } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import GameTime from './micro/GameTime.svelte';
	import TeamImage from './TeamImage.svelte';
	import type { WeeklyGamePick } from '$scripts/classes/picks';
import { afterUpdate, onMount } from 'svelte';

	export let id = 'id';
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam : WeeklyGamePick = {pick: '', id:''}
	export let showIDs = false;
	export let competitions = [];

	const getStatus = async () => {
		const httpGameStatusEndpoint: string = competitions[0].status.$ref;
		const httpsGameStatusEndpoint = httpGameStatusEndpoint.replace('http', 'https');
		// console.log(httpsGameStatusEndpoint)
		const statusResponse = await fetch(httpsGameStatusEndpoint);
		const statusData = statusResponse.json();
		return statusData;
	};

	// TODO move this to a web worker to avoid slowdown?
	const getScores = async (): Promise<{ homeScoreData: any; awayScoreData: any }> => {
		const httpHomeEndpoint = competitions[0].competitors[0].score.$ref;
		const httpAwayEndpoint = competitions[0].competitors[1].score.$ref;
		const httpsHomeEndpoint = httpHomeEndpoint.replace('http', 'https');
		const httpsAwayEndpoint = httpAwayEndpoint.replace('http', 'https');
		const homeScoreResponse = await fetch(httpsHomeEndpoint);
		const awayScoreResponse = await fetch(httpsAwayEndpoint);
		const homeScoreData = await homeScoreResponse.json();
		const awayScoreData = await awayScoreResponse.json();
		return { homeScoreData, awayScoreData };
	};

    // const updatePick = async(): Promise<void> => {
    //     selectedTeams.forEach(selection => {
    //         if(selection.id === id){
    //             selection.pick = selectedTeam
    //         }
    //     }) 
    // }

</script>

<div class="matchup grid rounded">
	<label
		for="{id}-away"
		class:pressed={selectedTeam.pick === awayTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam.pick === awayTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
	>
		<input id="{id}-away" type="radio" bind:group={selectedTeam.pick} value={awayTeam.abbreviation} />
		<TeamImage
			team={awayTeam}
			grayscaled={selectedTeam.pick === homeTeam.abbreviation && selectedTeam.pick !== ''}
		/>
	</label>

	<label class="game-info rounded" for="{id}-none">
		<p class="grid info team-abbreviation">
			<span
				class="rounded"
				class:selected={selectedTeam.pick === awayTeam.abbreviation}
				class:dark-mode={$useDarkTheme}
				>{awayTeam.abbreviation}
				({awayTeam.wins}-{awayTeam.losses}{#if awayTeam.ties > 0}
					{awayTeam.ties}
				{/if})</span
			>
			<span> @ </span>
			<span
				class="rounded"
				class:selected={selectedTeam.pick === homeTeam.abbreviation}
				class:dark-mode={$useDarkTheme}
				>{homeTeam.abbreviation}
				({homeTeam.wins}-{homeTeam.losses}{#if homeTeam.ties > 0}
					{homeTeam.ties}
				{/if})
			</span>
		</p>
		<p class="grid info">
			{#await getStatus()}
				<span />
				<span />
				<span />
			{:then status}
				{#if status.type.description === 'Final'}
					<span />
					<span>Final</span>
					<span />
				{:else if status.type.description === 'Scheduled'}
					<span />
					<span />
					<span />
				{:else}
					{#await getScores()}
						--
					{:then { homeScoreData }}
						<span>{homeScoreData.value}</span>
					{:catch}
						--
					{/await}

					<span>Q{status.period}</span>

					{#await getScores()}
						--
					{:then { awayScoreData }}
						<span>{awayScoreData.value}</span>
					{:catch}
						--
					{/await}
				{/if}
			{:catch}
				unable to get game status...
			{/await}
		</p>

		{#if spread}
			<p style="line-height: 2;">
				{#if spread > 0}
					<Fa icon={faArrowCircleLeft} size="lg" />
				{/if}
				{spread > 0 ? `+${spread}` : spread}
				{#if spread < 0}
					<Fa icon={faArrowCircleRight} size="lg" />
				{/if}
			</p>
		{:else}
			No spread field set.
		{/if}
		<div class="dateTime">
			{showIDs ? id : ''}
			{#await getStatus()}
				{#if timestamp}
					<GameTime {timestamp} />
				{:else}
					No timestamp field set.
				{/if}
			{:then status}
				{#if status.type.description === 'Scheduled'}
					{#if timestamp}
						<GameTime {timestamp} />
					{:else}
						No timestamp field set.
					{/if}
				{:else if status.type.completed === false}
					{status.displayClock}
				{/if}
			{/await}
		</div>
		<input id="{id}-none" type="radio" bind:group={selectedTeam.pick} value="" />
	</label>
	<!-- <div class="home"> -->
	<label
		for="{id}-home"
		class:pressed={selectedTeam.pick === homeTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam.pick === homeTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
	>
		<input id="{id}-home" type="radio" bind:group={selectedTeam.pick} value={homeTeam.abbreviation} />
		<TeamImage
			team={homeTeam}
			grayscaled={selectedTeam.pick === awayTeam.abbreviation && selectedTeam.pick !== ''}
		/>
	</label>
</div>

<style lang="scss">
	input {
		visibility: hidden;
		height: 0;
		width: 0;
		display: none;
	}
	.grid {
		@include gridAndGap;
		justify-items: center;
	}
	.rounded {
		@include rounded;
	}
	.matchup {
		grid-template-columns: repeat(3, minmax(30%, 1fr));
	}
	label {
		@include defaultTransition;
		align-items: center;
		display: grid;
		padding: 0.5rem;
		height: 100%;
		width: 100%;
		grid-template-columns: minmax(0, 1fr);
	}
	.selected {
		@include defaultTransition;
		@include normalShadow;
		// font-weight: bold;
		// text-decoration: underline 2px;
		color: white;
		text-shadow: none;
		background-color: rgba(var(--accentValue-color), 100%);
		&.dark-mode {
			background-color: rgba(var(--accentValue-color), 40%);
			box-shadow: 0 0 6px 3px rgba(var(--accentValue-color), 30%);
		}
	}
	.team-abbreviation {
		font-weight: bold;
	}
	span {
		padding: 0.3rem 0.5rem;
	}
	.info {
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
	}
</style>
