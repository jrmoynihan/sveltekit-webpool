<script lang="ts">
	import { policeCarLight } from '$scripts/classes/constants';
	import type { Team } from '$scripts/classes/team';
	import { isBeforeGameTime, scrollToNextGame } from '$scripts/functions';
	import { showPickWarning, useDarkTheme, windowWidth } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';
	import {
		faArrowCircleLeft,
		faArrowCircleRight,
		faCheckCircle,
		faFootballBall,
		faLock
	} from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import GameTime from './micro/GameTime.svelte';
	import TeamRecord from './micro/TeamRecord.svelte';
	import TeamImage from './TeamImage.svelte';
	import TeamNameImage from './TeamNameImage.svelte';
	import Tooltip from './Tooltip.svelte';
	import IntersectionObserver from 'svelte-intersection-observer';

	export let id = 'id';
	export let index: number;
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam: string = '';
	export let showIDs = false;
	export let showTimestamps = false;
	export let competitions = [];
	export let currentPickCount = 0;
	export let totalGameCount = 0;
	export let gridColumns = 1;
	let layoutBreakpoint = 620;
	let showTeamNameImages = false;
	let disabled: boolean = false;
	let gameIsOver = false;
	let beforeGameTime = false;
	let element;
	let showGameContainer = false;

	const getStatus = async (): Promise<any> => {
		const httpGameStatusEndpoint: string = competitions[0].status.$ref;
		const httpsGameStatusEndpoint: string = httpGameStatusEndpoint.replace('http', 'https');
		// console.log(httpsGameStatusEndpoint)
		const statusResponse = await fetch(httpsGameStatusEndpoint);
		const statusData = statusResponse.json();
		return statusData;
	};
	const getSituation = async (): Promise<any> => {
		const httpGameSituationEndpoint: string = competitions[0].situation.$ref;
		const httpsGameSituationEndpoint: string = httpGameSituationEndpoint.replace('http', 'https');
		const situationResponse = await fetch(httpsGameSituationEndpoint);
		const situationData = situationResponse.json();
		// console.table(situationData);
		return situationData;
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
	let promiseSituation = getSituation();
	let statusInterval: NodeJS.Timer;
	let checkGameTimeInterval: NodeJS.Timer;

	// Show additional images in larger layout sizes
	$: {
		if ($windowWidth < layoutBreakpoint * gridColumns) {
			showTeamNameImages = false;
		} else {
			showTeamNameImages = true;
		}
	}
	// Re-check if the game is over periodically, preventing additional API calls for game statuses
	$: promiseStatus.then((status) => {
		if (status?.type?.description === 'Final') {
			gameIsOver = true;
		}
	});
	$: if (gameIsOver || beforeGameTime) {
		clearInterval(statusInterval);
	}
	// **************

	onMount(async () => {
		checkGameTimeInterval = setInterval(async () => {
			const now = new Date().getTime();
			beforeGameTime = await isBeforeGameTime(timestamp, now);
			if (beforeGameTime) {
				disabled = false;
			} else {
				disabled = true;
				clearInterval(checkGameTimeInterval);
			}
		}, 60000);

		// Every 60 seconds, update the game status if the game has started, but hasn't ended
		statusInterval = setInterval(() => {
			promiseScores = getScores();
			promiseStatus = getStatus();
			promiseSituation = getSituation();
		}, 60000);
	});

	// Prevent memory leak
	onDestroy(() => {
		clearInterval(statusInterval);
		clearInterval(checkGameTimeInterval);
	});
</script>

<div bind:this={element} class="matchup grid rounded" id="game-{index}">
	<label
		for="{id}-away"
		class="rounded dayShadow nightShadow"
		class:pressed={selectedTeam === awayTeam.abbreviation}
		class:selected={selectedTeam === awayTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
		class:disabled
		tabindex="0"
	>
		<input
			id="{id}-away"
			type="radio"
			bind:group={selectedTeam}
			on:input={() => scrollToNextGame(index, currentPickCount, totalGameCount)}
			value={awayTeam.abbreviation}
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
					team={awayTeam}
					grayscale={selectedTeam === homeTeam.abbreviation && selectedTeam !== ''}
				/>
				{#if showTeamNameImages}
					<TeamNameImage
						team={awayTeam}
						rounded={true}
						whiteBg={true}
						width="300rem"
						grayscale={selectedTeam === homeTeam.abbreviation && selectedTeam !== ''}
					/>
				{/if}
			{/if}
			<TeamRecord showTeamAbbreviation={!showTeamNameImages} team={awayTeam} />
		</IntersectionObserver>
	</label>

	<label class="game-info rounded" for="{id}-none">
		<p class="grid info pick-at-pick">
			{#await promiseStatus}
				<span />
			{:then status}
				<span>
					{#if status.type.description === 'Final'}
						{#await promiseScores then { homeScoreData, awayScoreData }}
							{#if selectedTeam === awayTeam.abbreviation && awayScoreData.value > homeScoreData.value}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{/if}
						{/await}
					{/if}</span
				>
			{/await}
			<span class="at-symbol"> AT </span>
			{#await promiseStatus}
				<span />
			{:then status}
				<span>
					{#if status.type.description === 'Final'}
						{#await promiseScores then { homeScoreData, awayScoreData }}
							{#if selectedTeam === homeTeam.abbreviation && homeScoreData.value > awayScoreData.value}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{/if}
						{/await}
					{/if}</span
				>
			{/await}
		</p>
		<p class="grid status info">
			{#await promiseStatus}
				<span />
				<span />
				<span />
			{:then status}
				{#if status.type.description === 'Final'}
					{#await promiseScores}
						<span>--</span>
					{:then { awayScoreData }}
						<span class="score">{awayScoreData.value}</span>
					{:catch}
						<span>--</span>
					{/await}

					<span>Final</span>

					{#await promiseScores}
						<span>--</span>
					{:then { homeScoreData }}
						<span class="score">{homeScoreData.value}</span>
					{:catch}
						<span>--</span>
					{/await}
				{:else if status.type.description === 'Scheduled'}
					<span />
					<span />
					<span />
				{:else if status.type.description !== 'Canceled'}
					{#await promiseScores}
						<span>--</span>
					{:then { awayScoreData }}
						<span class="score">{awayScoreData.value}</span>
					{:catch}
						<span>--</span>
					{/await}

					<span>
						{#if status.type.completed === false}
							{#if status.type.description === 'Halftime'}
								<p>{status.type.description}</p>
							{:else if status.type.description !== 'Canceled'}
								<p>Q{status.period}</p>
								<p>{status.displayClock}</p>
							{:else}
								<p><strong>Canceled</strong></p>
							{/if}
						{/if}
					</span>

					{#await promiseScores}
						<span>--</span>
					{:then { homeScoreData }}
						<span class="score">{homeScoreData.value}</span>
					{:catch}
						<span>--</span>
					{/await}
				{/if}
			{:catch}
				unable to get game status...
			{/await}
		</p>
		{#await promiseStatus then status}
			{#if status.type.description === 'Final'}
				<p style="display:grid; grid-template-columns: repeat(3,minmax(0,1fr));">
					{#await promiseScores then scores}
						{#if spread > 0}
							<span>({scores.awayScoreData.value})</span>
							<span>ATS</span>
							<span>({scores.homeScoreData.value + spread})</span>
						{:else if spread < 0}
							<span>({scores.awayScoreData.value + spread * -1})</span>
							<span>ATS</span>
							<span>({scores.homeScoreData.value})</span>
						{/if}
					{/await}
				</p>
			{/if}
		{/await}

		{#if spread}
			<p class="spread info" class:active-game={disabled} style="line-height: 2;">
				{#if disabled}
					{#await promiseSituation then situation}
						{#if situation.possessionText}
							{#if situation.possessionText.indexOf(awayTeam.abbreviation) >= 0}
								<Fa icon={faFootballBall} size="lg" rotate={45} />
								<Fa icon={faLock} size="lg" />
								<span />
							{/if}
						{/if}
					{/await}

					{#await promiseSituation then situation}
						{#if situation.possessionText}
							{#if situation.possessionText.indexOf(homeTeam.abbreviation) >= 0}
								<span />
								<Fa icon={faLock} size="lg" />
								<Fa icon={faFootballBall} size="lg" rotate={45} />
							{/if}
						{/if}
					{/await}
				{:else}
					{#if spread > 0}
						<div class="arrow-container">
							<Tooltip
								tooltipHorizontalPosition="-50%"
								tooltipTop="-220%"
								tooltipWidth="clamp(5rem,40ch,25rem)"
							>
								<Fa slot="content" icon={faArrowCircleLeft} size="lg" />
								<span slot="text" class="tooltip"
									>Away Team ({awayTeam.abbreviation}) is favored by {spread}.</span
								>
							</Tooltip>
						</div>
					{/if}
					<span>{spread > 0 ? `+${spread}` : spread}</span>
					{#if spread < 0}
						<div class="arrow-container">
							<Tooltip
								tooltipHorizontalPosition="-50%"
								tooltipTop="-220%"
								tooltipWidth="clamp(5rem,40ch,25rem)"
							>
								<Fa slot="content" icon={faArrowCircleRight} size="lg" />
								<span slot="text" class="tooltip"
									>Home Team ({homeTeam.abbreviation}) is favored by {Math.abs(spread)}.</span
								>
							</Tooltip>
						</div>
					{/if}
				{/if}
			</p>
		{:else}
			No spread field set.
		{/if}
		<div class="dateTime info">
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
					<!-- {#if status.type.description === 'Halftime'}
						<p>{status.type.description}</p>
					{:else if status.type.description !== 'Canceled'}
						<p>
							<span>Q{status.period}</span>
							<span>{status.displayClock}</span>
						</p>
					{:else}
						<p><strong>Canceled</strong></p>
					{/if} -->
					{#await promiseSituation then situation}
						{#if situation.downDistanceText !== undefined}
							<p style="font-size: 0.8rem;">
								<span class:red-zone={situation.yardLine <= 20}>{situation.downDistanceText}</span>
							</p>
						{/if}
					{/await}
				{/if}
			{/await}
		</div>
		<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
	</label>

	<label
		for="{id}-home"
		class="rounded dayShadow nightShadow"
		class:pressed={selectedTeam === homeTeam.abbreviation}
		class:selected={selectedTeam === homeTeam.abbreviation}
		class:dark-mode={$useDarkTheme}
		class:disabled
		tabindex="0"
	>
		<input
			id="{id}-home"
			type="radio"
			bind:group={selectedTeam}
			on:input={() => scrollToNextGame(index, currentPickCount, totalGameCount)}
			value={homeTeam.abbreviation}
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
					team={homeTeam}
					grayscale={selectedTeam === awayTeam.abbreviation && selectedTeam !== ''}
				/>
				{#if showTeamNameImages}
					<TeamNameImage
						team={homeTeam}
						rounded={true}
						whiteBg={true}
						grayscale={selectedTeam === awayTeam.abbreviation && selectedTeam !== ''}
						width="300rem"
					/>
				{/if}
			{/if}
		</IntersectionObserver>
		<TeamRecord showTeamAbbreviation={!showTeamNameImages} team={homeTeam} />
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
		grid-template-columns: repeat(3, minmax(0, 1fr));
		height: 100%;
	}
	label {
		@include defaultTransition;
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
		@include defaultTransition;
		@include normalShadow;
		@include accentedContainer;
		color: white;
		text-shadow: none;
		&.disabled {
			@include accentedContainer(70%, 10%);
		}
	}
	span {
		padding: 0.3rem 0.5rem;
		align-self: center;
		&.at-symbol {
			font-size: x-large;
		}
	}
	.info {
		width: auto;
		justify-self: center;
	}
	.game-info {
		display: grid;
		align-items: end;
	}
	.status {
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
	}
	.score {
		font-weight: bold;
		font-size: clamp(1rem, 5vw, 3rem);
		min-width: 2ch;
	}
	.pick-at-pick {
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
	}
	.dayShadow:hover {
		@include nightShadow;
	}
	.nightShadow:focus {
		@include nightShadow;
	}
	.arrow-container {
		position: relative;
	}
	.red-zone {
		background: darkred;
		border-radius: 1rem;
		color: white;
	}
	.dateTime {
		@include gridAndGap;
	}
	.active-game {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: 100%;
		justify-items: center;
	}
</style>
