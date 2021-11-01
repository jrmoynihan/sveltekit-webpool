<script lang="ts">
	import type { HomeOrAway } from '$scripts/classes/constants';

	import type { ESPNScore } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';

	export let team: Team;
	export let ATSwinner: string;
	export let score: ESPNScore;
	export let spread: number;
	export let gridArea: string;
	export let homeOrAway: HomeOrAway;

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
	style="grid-area:{gridArea};--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
	class="ATSscore"
	class:higherATSscore={ATSwinner === team.abbreviation}
>
	{#if spread > 0}
		{#if homeOrAway === 'Away'}
			{score.value - spread}
		{:else if homeOrAway === 'Home'}
			{score.value}
		{/if}
	{:else if spread < 0}
		{#if homeOrAway === 'Away'}
			{score.value}
		{:else if homeOrAway === 'Home'}
			{score.value - spread * -1}
		{/if}
	{/if}
</div>

<style lang="scss">
	.ATSscore {
		align-self: center;
		min-width: 2ch;
		padding: 0.5rem;
		font-size: clamp(1.5rem, 5.5%, 5vw);
		font-weight: bold;
	}
	.higherATSscore {
		// border-radius: 100%;
		// outline: 2px solid;
		border-radius: var(--topLeft) var(--topRight) / var(--bottomRight) var(--bottomLeft);
		border: dashed;
		overflow: hidden;
	}
</style>
