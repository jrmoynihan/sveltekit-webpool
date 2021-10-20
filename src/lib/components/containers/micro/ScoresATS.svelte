<script lang="ts">
	import Tooltip from '../Tooltip.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let spread: number;
	export let isATSwinner: boolean | null;

	let min = 30;
	let max = 60;
	let topLeft = Math.floor(Math.random() * (max - min) + min);
	let topLeftTwo = Math.floor(Math.random() * (max - min) + min);
	let topRight = Math.floor(Math.random() * (max - min) + min);
	let topRightTwo = Math.floor(Math.random() * (max - min) + min);
	let bottomLeft = Math.floor(Math.random() * (max - min) + min);
	let bottomLeftTwo = Math.floor(Math.random() * (max - min) + min);
	let bottomRight = Math.floor(Math.random() * (max - min) + min);
	let bottomRightTwo = Math.floor(Math.random() * (max - min) + min);
</script>

{#await promiseStatus then status}
	{#if status.type.description === 'Final'}
		<!-- <div class="ATS-scores"> -->
		{#await promiseScores then scores}
			{#if spread > 0}
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
					class="awayATS ATSscore"
					class:higherATSscore={isATSwinner}
				>
					{scores.awayScoreData.value - spread}
				</div>
				<Tooltip
					tooltipWidth="300%"
					tooltipTop="-650%"
					customStyleTooltipParent="grid-area:ATS;align-self:center;"
				>
					<svelte:fragment slot="text">Scores adjusted Against the Spread.</svelte:fragment>
					<div slot="content" class="ATS-text">ATS</div>
				</Tooltip>
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
					class="homeATS ATSscore"
					class:higherATSscore={isATSwinner}
				>
					{scores.homeScoreData.value}
				</div>
			{:else if spread < 0}
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
					class="awayATS ATSscore"
					class:higherATSscore={isATSwinner}
				>
					{scores.awayScoreData.value}
				</div>
				<Tooltip
					tooltipWidth="300%"
					tooltipTop="-650%"
					customStyleTooltipParent="grid-area:ATS;align-self:center;"
				>
					<svelte:fragment slot="text">Scores adjusted Against the Spread.</svelte:fragment>
					<div slot="content" class="ATS-text">ATS</div>
				</Tooltip>
				<div
					style="--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
					class="homeATS ATSscore"
					class:higherATSscore={isATSwinner}
				>
					{scores.homeScoreData.value - spread * -1}
				</div>
			{/if}
		{/await}
		<!-- </div> -->
	{/if}
{/await}

<style lang="scss">
	.homeATS {
		grid-area: homeATS;
	}
	.awayATS {
		grid-area: awayATS;
	}
	div {
		// padding: 0.3rem 0.5rem;
		align-self: center;
	}
	.ATSscore {
		min-width: 2ch;
		padding: 0.5rem;
		font-size: min(2.5rem, 5vw);
		font-weight: bold;
	}
	.higherATSscore {
		// border-radius: 100%;
		// outline: 2px solid;
		border-radius: var(--topLeft) var(--topRight) / var(--bottomRight) var(--bottomLeft);
		outline: dashed;
	}
</style>
