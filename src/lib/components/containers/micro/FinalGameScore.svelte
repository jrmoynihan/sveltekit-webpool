<script lang="ts">
	import type { ESPNScore } from '$scripts/classes/game';

	export let displayedScore: ESPNScore;
	export let isHigherScore: boolean;
	export let gridArea: string;

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
		font-size: clamp(1.5rem, 5.5%, 5vw);
		min-width: 2ch;
		padding: min(0.5rem, 1.4vw);
	}
	.isHigherScore {
		border-radius: 100%;
		border: 2px solid hsla(var(--accent-value, black), 50%);
	}
</style>
