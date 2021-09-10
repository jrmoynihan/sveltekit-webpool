<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import {
		faArrowCircleLeft,
		faArrowCircleRight,
		faFootballBall,
		faLock
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	export let spread: number;
	export let disabled: boolean;
	export let promiseSituation: Promise<any>;
	export let awayTeam: Team;
	export let homeTeam: Team;
</script>

{#if spread}
	<div class="spreadOrPossession" class:active-game={disabled} style="line-height: 2;">
		{#if disabled}
			{#await promiseSituation then situation}
				{#if situation.possessionText}
					{#if situation.possessionText.indexOf(awayTeam.abbreviation) >= 0}
						<Fa icon={faFootballBall} size="lg" rotate={45} />
						<Fa icon={faLock} size="lg" />
						<span />
					{/if}
				{/if}
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
	</div>
{:else}
	No spread field set.
{/if}

<style lang="scss">
	.spreadOrPossession {
		grid-area: spreadOrPossession;
		width: auto;
		justify-self: center;
	}
	.active-game {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: 100%;
		justify-items: center;
	}
	.arrow-container {
		position: relative;
	}
</style>
