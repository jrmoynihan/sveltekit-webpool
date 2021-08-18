<script lang="ts">
	import { home, policeCarLight } from '$scripts/classes/constants';

	import type { Team } from '$scripts/classes/team';
	import { isBeforeGameTime } from '$scripts/functions';
	import { useDarkTheme } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import { faArrowCircleLeft, faArrowCircleRight, faLock } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import GameTime from './micro/GameTime.svelte';
	import TeamImage from './TeamImage.svelte';

	export let id = 'id';
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam: string = '';
	export let showIDs = false;
	export let showTimestamps = false;
	export let competitions = [];

	let disabled: boolean = false;
	$: isBeforeGameTime(timestamp).then((result) => (disabled = !result));

	const getStatus = async (): Promise<any> => {
		const httpGameStatusEndpoint: string = competitions[0].status.$ref;
		const httpsGameStatusEndpoint = httpGameStatusEndpoint.replace('http', 'https');
		// console.log(httpsGameStatusEndpoint)
		const statusResponse = await fetch(httpsGameStatusEndpoint);
		const statusData = statusResponse.json();
		return statusData;
	};

	// TODO move this to a web worker to avoid slowdown?
	const getScores = async (): Promise<{ homeScoreData: any; awayScoreData: any }> => {
		try {
			let homeScoreData;
			let awayScoreData;
			const httpHomeEndpoint = competitions[0].competitors[0].score.$ref;
			const httpAwayEndpoint = competitions[0].competitors[1].score.$ref;
			const httpsHomeEndpoint = httpHomeEndpoint.replace('http', 'https');
			const httpsAwayEndpoint = httpAwayEndpoint.replace('http', 'https');
			const homeScoreResponse = await fetch(httpsHomeEndpoint);
			const awayScoreResponse = await fetch(httpsAwayEndpoint);

			if (homeScoreResponse.ok) {
				homeScoreData = await homeScoreResponse.json();
			}
			if (awayScoreResponse.ok) {
				awayScoreData = await awayScoreResponse.json();
			}
			if (homeScoreData !== undefined && awayScoreData !== undefined) {
				return { homeScoreData, awayScoreData };
			} else {
				throw `error getting scores`;
			}
		} catch (error) {
			console.error(`%c${policeCarLight} error getting scores!`);
		}
	};
	let promiseStatus = getStatus();
	let promiseScores = getScores();
</script>

<div class="matchup grid rounded">
	<label
		for="{id}-away"
		class:pressed={selectedTeam === awayTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam === awayTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
		class:disabled
	>
		<input
			id="{id}-away"
			type="radio"
			bind:group={selectedTeam}
			value={awayTeam.abbreviation}
			{disabled}
		/>
		<TeamImage
			team={awayTeam}
			grayscaled={selectedTeam === homeTeam.abbreviation && selectedTeam !== ''}
		/>
	</label>

	<label class="game-info rounded" for="{id}-none">
		<p class="grid info team-abbreviation">
			<span
				class="rounded"
				class:selected={selectedTeam === awayTeam.abbreviation}
				class:dark-mode={$useDarkTheme}
				class:disabled
				>{awayTeam.abbreviation}
				({awayTeam.wins}-{awayTeam.losses}{#if awayTeam.ties > 0}
					{awayTeam.ties}
				{/if})</span
			>
			<span> @ </span>
			<span
				class="rounded"
				class:selected={selectedTeam === homeTeam.abbreviation}
				class:dark-mode={$useDarkTheme}
				class:disabled
				>{homeTeam.abbreviation}
				({homeTeam.wins}-{homeTeam.losses}{#if homeTeam.ties > 0}
					{homeTeam.ties}
				{/if})
			</span>
		</p>
		<p class="grid info">
			{#await promiseStatus}
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
					{#await promiseScores}
						--
					{:then { homeScoreData }}
						<span>{homeScoreData.value}</span>
					{:catch}
						--
					{/await}

					<span>Q{status.period}</span>

					{#await promiseScores}
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
				{#if disabled}
					<Fa icon={faLock} size="lg" />
				{:else}
					{#if spread > 0}
						<Fa icon={faArrowCircleLeft} size="lg" />
					{/if}
					{spread > 0 ? `+${spread}` : spread}
					{#if spread < 0}
						<Fa icon={faArrowCircleRight} size="lg" />
					{/if}
				{/if}
			</p>
		{:else}
			No spread field set.
		{/if}
		<div class="dateTime">
			{showIDs ? id : ''}
			{showTimestamps ? timestamp.toDate().getTime() : ''}
			{#await promiseStatus}
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
		<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
	</label>
	<!-- <div class="home"> -->
	<label
		for="{id}-home"
		class:pressed={selectedTeam === homeTeam.abbreviation}
		class="rounded"
		class:selected={selectedTeam === homeTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
		class:disabled
	>
		<input
			id="{id}-home"
			type="radio"
			bind:group={selectedTeam}
			value={homeTeam.abbreviation}
			{disabled}
		/>
		<TeamImage
			team={homeTeam}
			grayscaled={selectedTeam === awayTeam.abbreviation && selectedTeam !== ''}
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
		@include accentedContainer;
		color: white;
		text-shadow: none;
		&.disabled {
			@include accentedContainer(70%, 10%);
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
