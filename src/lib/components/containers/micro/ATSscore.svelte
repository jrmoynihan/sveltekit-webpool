<script lang="ts">
	import type { ESPNScore } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';

	export let team: Team;
	export let ATS_winner: string;
	export let score: ESPNScore;
	export let spread: number;
	export let grid_area: string;
	export let home_or_away: 'Home' | 'Away';

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
	style="grid-area:{grid_area};--topLeft:{topLeft}% {topLeftTwo}%; --topRight:{topRight}% {topRightTwo}%; --bottomLeft:{bottomLeft}% {bottomLeftTwo}%; --bottomRight:{bottomRight}% {bottomRightTwo}%"
	class="ATSscore"
	class:higherATSscore={ATS_winner === team.abbreviation}
>
	{#if spread > 0}
		{#if home_or_away === 'Away'}
			{score.value - spread}
		{:else if home_or_away === 'Home'}
			{score.value}
		{/if}
	{:else if spread < 0}
		{#if home_or_away === 'Away'}
			{score.value}
		{:else if home_or_away === 'Home'}
			{score.value - spread * -1}
		{/if}
	{/if}
</div>

<style lang="scss">
	.ATSscore {
		align-self: center;
		min-width: 2ch;
		padding: 0.5rem;
		font-size: clamp(1rem, 7vw, 1.7rem);
		font-weight: bold;
	}
	.higherATSscore {
		border-radius: 100%;
		border: 2px solid hsla(var(--accent-value, black), 50%);
	}
</style>
