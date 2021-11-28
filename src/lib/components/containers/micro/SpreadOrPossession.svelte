<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import type { ESPNSituation } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import { getTeamWithPossession } from '$scripts/dataFetching';
	import { updateGameSpreads } from '$scripts/weekly/weeklyAdmin';
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
	export let promiseSituation: Promise<ESPNSituation>;
	export let awayTeam: Team;
	export let homeTeam: Team;
	export let selectedWeek: number;
	export let selectedYear: number = new Date().getFullYear();
</script>

{#if spread}
	<div class="spreadOrPossession" class:active-game={disabled} style="line-height: 2;">
		{#if disabled}
			{#await promiseSituation then situation}
				{#if situation.possessionText}
					{#await getTeamWithPossession(situation.team.$ref) then teamWithPossession}
						{#if teamWithPossession === awayTeam.abbreviation}
							<Fa icon={faFootballBall} size="lg" rotate={45} />
							<Fa icon={faLock} size="lg" />
							<span />
						{:else if teamWithPossession === homeTeam.abbreviation}
							<span />
							<Fa icon={faLock} size="lg" />
							<Fa icon={faFootballBall} size="lg" rotate={45} />
						{/if}
					{/await}
				{:else}
					<span />
					<Fa icon={faLock} size="lg" />
					<span />
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
	<div class="spreadOrPossession">
		<StyledButton
			on:click={() => {
				updateGameSpreads(selectedWeek, selectedYear);
			}}
			text="No spread set. Click to set spreads."
		/>
	</div>
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
