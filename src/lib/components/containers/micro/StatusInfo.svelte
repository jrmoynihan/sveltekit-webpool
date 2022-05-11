<script lang="ts">
	import type { ESPNScore, ESPNStatus } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import FinalGameScore from './FinalGameScore.svelte';
	import ScoresAts from './ScoresATS.svelte';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import { preferred_score_view } from '$scripts/store';

	export let promiseStatus: Promise<ESPNStatus>;
	export let promiseScores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }>;
	export let spread: number;
	export let ATSwinner: string;
	export let homeTeam: Team;
	export let awayTeam: Team;

	// let min = 30;
	// let max = 60;
	// let boxShadowMin = 0;
	// let boxShadowMax = 4;
	// let topLeft = Math.floor(Math.random() * (max - min) + min);
	// let topLeftTwo = Math.floor(Math.random() * (max - min) + min);
	// let topRight = Math.floor(Math.random() * (max - min) + min);
	// let topRightTwo = Math.floor(Math.random() * (max - min) + min);
	// let bottomLeft = Math.floor(Math.random() * (max - min) + min);
	// let bottomLeftTwo = Math.floor(Math.random() * (max - min) + min);
	// let bottomRight = Math.floor(Math.random() * (max - min) + min);
	// let bottomRightTwo = Math.floor(Math.random() * (max - min) + min);
	// let boxShadowOneX = Math.floor(Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin);
	// let boxShadowOneY = Math.floor(Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin);
	// let boxShadowTwoX = Math.floor(Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin);
	// let boxShadowTwoY = Math.floor(Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin);
	// let boxShadowOneSpread = Math.floor(
	// 	Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin + 1
	// );
	// let boxShadowTwoSpread = Math.floor(
	// 	Math.random() * (boxShadowMax - boxShadowMin) + boxShadowMin + 1
	// );
</script>

<div class="grid status-info">
	{#await promiseStatus}
		<div />
		<div />
		<div />
	{:then status}
		{#if status.type.description === 'Final'}
			{#await promiseScores}
				<div class="away">--</div>
				<div class="finalOrTime">Final</div>
				<div class="home">--</div>
			{:then { awayScoreData, homeScoreData }}
				{#if $preferred_score_view === 'Actual' || $preferred_score_view === 'Both'}
					<FinalGameScore
						isHigherScore={awayScoreData.value > homeScoreData.value}
						displayedScore={awayScoreData}
						gridArea={'away'}
					/>
					<div class="finalOrTime">Final</div>
					<FinalGameScore
						isHigherScore={homeScoreData.value > awayScoreData.value}
						displayedScore={homeScoreData}
						gridArea={'home'}
					/>
				{/if}
			{:catch error}
				<ErrorModal {error} />
			{/await}
		{:else if status.type.description === 'Scheduled'}
			<!-- <div class="away" />
			<div class="final" />
			<div class="home" /> -->
		{:else if status.type.description !== 'Canceled'}
			{#await promiseScores}
				<div class="away score">--</div>
				<div class="finalOrTime">--</div>
				<div class="home score">--</div>
			{:then { awayScoreData, homeScoreData }}
				<div class="away score">{awayScoreData.value}</div>
				<div class="grid period-clock finalOrTime">
					{#if status.type.completed === false}
						{#if status.type.description === 'Halftime'}
							<div>{status.type.description}</div>
						{:else if status.type.description !== 'Canceled'}
							<div>Q{status.period}</div>
							<div>{status.displayClock}</div>
						{:else}
							<div><strong>Canceled</strong></div>
						{/if}
					{/if}
				</div>
				<div class="home score">{homeScoreData.value}</div>
			{:catch error}
				<div class="away">--</div>
				<ErrorModal {error} />
			{/await}
		{/if}
	{:catch error}
		<ErrorModal {error} />
	{/await}
	{#if $preferred_score_view === 'Both' || $preferred_score_view === 'ATS'}
		<ScoresAts {promiseStatus} {promiseScores} {spread} {ATSwinner} {homeTeam} {awayTeam} />
	{/if}
</div>

<style lang="scss">
	.grid {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}
	.period-clock {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr));
		align-self: center;
	}
	div {
		// padding: 0.3rem 1rem;
		align-self: center;
		// &.at-symbol {
		// 	font-size: x-large;
		// }
	}
	.status-info {
		width: auto;
		justify-self: center;
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
		grid-template-rows: repeat(auto-fit, minmax(0, auto));
		grid-template-areas:
			'away finalOrTime home'
			'awayATS ATS homeATS';
		grid-area: statusInfo;
		align-self: center;
	}
	.away {
		grid-area: away;
	}
	.home {
		grid-area: home;
	}
	.finalOrTime {
		grid-area: finalOrTime;
		padding: 1rem;
	}
	.score {
		font-weight: bold;
		font-size: min(2.5rem, 5vw);
		min-width: 2ch;
		padding: min(0.5rem, 1.4vw);
	}
</style>
