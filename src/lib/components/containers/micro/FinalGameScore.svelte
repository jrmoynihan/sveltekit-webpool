<script lang="ts">
	import type { ESPNScore } from '$scripts/classes/game';

	export let displayedScore: ESPNScore;
	export let isHigherScore: boolean;
	export let gridArea: string;

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

<div
	style="grid-area:{gridArea};--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%;"
	class="score"
	class:isHigherScore
>
	{#if displayedScore}
		{displayedScore.value}
	{:else}
		--
	{/if}
</div>

<style lang="scss">
	.score {
		font-weight: bold;
		font-size: min(2.5rem, 5vw);
		min-width: 2ch;
		padding: min(0.5rem, 1.4vw);
	}
	.isHigherScore {
		// border-radius: 100%;
		// box-shadow: var(--boxOneX) var(--boxOneY) var(--boxOneSpread) 2px currentColor, // var(--boxTwoX) var(--boxTwoY) var(--boxTwoSpread) 2px currentColor;
		border-radius: var(--topLeft) var(--topRight) / var(--bottomRight) var(--bottomLeft);
		outline: dashed;
	}
</style>
