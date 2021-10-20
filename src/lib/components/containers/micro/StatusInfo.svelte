<script lang="ts">
	import ScoresAts from './ScoresATS.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let spread: number;
	export let isATSwinner: boolean | null;

	let min = 30;
	let max = 60;
	// let boxShadowMin = 0;
	// let boxShadowMax = 4;
	let topLeft = Math.floor(Math.random() * (max - min) + min);
	let topLeftTwo = Math.floor(Math.random() * (max - min) + min);
	let topRight = Math.floor(Math.random() * (max - min) + min);
	let topRightTwo = Math.floor(Math.random() * (max - min) + min);
	let bottomLeft = Math.floor(Math.random() * (max - min) + min);
	let bottomLeftTwo = Math.floor(Math.random() * (max - min) + min);
	let bottomRight = Math.floor(Math.random() * (max - min) + min);
	let bottomRightTwo = Math.floor(Math.random() * (max - min) + min);
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
			{:then { awayScoreData, homeScoreData }}
				<!-- --boxOneX:{boxShadowOneX}px; --boxOneY:{boxShadowOneY}px; --boxTwoX: {boxShadowTwoX}px; --boxTwoY:{boxShadowTwoY}px;--boxOneSpread:{boxShadowOneSpread}px;--boxTwoSpread:{boxShadowTwoSpread}px;" -->
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%;"
					class="away score"
					class:higherScore={awayScoreData.value > homeScoreData.value}
				>
					{awayScoreData.value}
				</div>
			{:catch}
				<div class="away">--</div>
			{/await}

			<div class="finalOrTime">Final</div>

			{#await promiseScores}
				<div class="home">--</div>
			{:then { awayScoreData, homeScoreData }}
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%;"
					class="home score"
					class:higherScore={homeScoreData.value > awayScoreData.value}
				>
					{homeScoreData.value}
				</div>
			{:catch}
				<div class="home">--</div>
			{/await}
		{:else if status.type.description === 'Scheduled'}
			<!-- <div class="away" />
			<div class="final" />
			<div class="home" /> -->
		{:else if status.type.description !== 'Canceled'}
			{#await promiseScores}
				<div class="away">--</div>
			{:then { awayScoreData }}
				<div class="away score">{awayScoreData.value}</div>
			{:catch}
				<div class="away">--</div>
			{/await}

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

			{#await promiseScores}
				<div class="home">--</div>
			{:then { homeScoreData }}
				<div class="home score">{homeScoreData.value}</div>
			{:catch}
				<div class="home">--</div>
			{/await}
		{/if}
	{:catch}
		unable to get game status...
	{/await}
	<ScoresAts {promiseStatus} {promiseScores} {spread} {isATSwinner} />
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
	.higherScore {
		// border-radius: 100%;
		border-radius: var(--topLeft) var(--topRight) / var(--bottomRight) var(--bottomLeft);
		outline: dashed;
		// box-shadow: var(--boxOneX) var(--boxOneY) var(--boxOneSpread) 2px currentColor, // var(--boxTwoX) var(--boxTwoY) var(--boxTwoSpread) 2px currentColor;
	}
</style>
