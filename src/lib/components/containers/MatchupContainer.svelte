<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { useDarkTheme } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import GameTime from './micro/GameTime.svelte';
	import TeamImage from './TeamImage.svelte';

	export let id = 'id';
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam = '';
	export let showIDs = false;
	export let competitions = [
		//     {
		//     competitors: [{
		//         score: {
		//             $ref: ''
		//         }
		//     }]
		// }
	];
	const getStatus = async () => {
		const statusResponse = await fetch(competitions[0].status.$ref);
		const statusData = statusResponse.json();
		return statusData;
	};

	// TODO should move this to a web worker to avoid slowdown
	const getScores = async (): Promise<{ homeScoreData: any; awayScoreData: any }> => {
		const homeScoreResponse = await fetch(competitions[0].competitors[0].score.$ref);
		const awayScoreResponse = await fetch(competitions[0].competitors[1].score.$ref);
		const homeScoreData = await homeScoreResponse.json();
		const awayScoreData = await awayScoreResponse.json();
		return { homeScoreData, awayScoreData };
	};

	// onMount(()=>{

	// })
</script>

<div class="matchup grid rounded">
	<!-- <div class="away"> -->
	<label
		for="{id}-away"
		class:pressed={selectedTeam === awayTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam === awayTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
	>
		<input id="{id}-away" type="radio" bind:group={selectedTeam} value={awayTeam.abbreviation} />
		<TeamImage
			team={awayTeam}
			grayscaled={selectedTeam === homeTeam.abbreviation && selectedTeam !== ''}
		/>
	</label>
	<!-- </div> -->
	<label class="game-info rounded" for="{id}-none">
		<p class="grid info team-abbreviation">
			<span
				class="rounded"
				class:selected={selectedTeam === awayTeam.abbreviation}
				class:dark-mode={$useDarkTheme}>{awayTeam.abbreviation}</span
			>
			<span> @ </span>
			<span
				class="rounded"
				class:selected={selectedTeam === homeTeam.abbreviation}
				class:dark-mode={$useDarkTheme}>{homeTeam.abbreviation}</span
			>
		</p>
		<p class="grid info">
			{#await getStatus()}
				<span />
				<span />
				<span />
			{:then status}
				{#if status.type.description === 'Final'}
                    <span></span>
                    <span>Final</span>
                    <span></span>
				{:else if status.type.description === 'Scheduled'}
					<span />
					<span></span>
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
				...
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
		<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" />
	</label>
	<!-- <div class="home"> -->
	<label
		for="{id}-home"
		class:pressed={selectedTeam === homeTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam === homeTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
	>
		<input id="{id}-home" type="radio" bind:group={selectedTeam} value={homeTeam.abbreviation} />
		<TeamImage
			team={homeTeam}
			grayscaled={selectedTeam === awayTeam.abbreviation && selectedTeam !== ''}
		/>
	</label>
	<!-- </div> -->
</div>

<style lang="scss">
	* {
		@include defaultTransition;
	}
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
        grid-template-columns: minmax(0,1fr)
	}
	.selected {
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
	.team-abbreviation{
        font-weight: bold;
    }
	span {
		padding: 0.3rem 0.5rem;
	}
	.info {
		grid-template-columns: minmax(0,1fr) minmax(0,auto) minmax(0,1fr);
	}
</style>
