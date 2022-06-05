<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { current_player, selected_week, selected_year } from '$lib/scripts/store';
	import type { ESPNSituation } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import { getTeamWithPossession } from '$scripts/dataFetching';
	import { updateGameSpreads } from '$scripts/weekly/weeklyAdmin';
	import {
		faArrowCircleLeft,
		faArrowCircleRight,
		faFootballBall,
		faLock
	} from '@fortawesome/free-solid-svg-icons/index.es';
	import { getContext } from 'svelte';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';
	import type { Writable } from 'svelte/store';
	import AdminOnlyControl from '$lib/components/misc/AdminOnlyControl.svelte';

	let spread: number = getContext('spread');
	let disabled: Writable<boolean> = getContext('disabled');
	let promise_situation: Writable<Promise<ESPNSituation>> = getContext('promise_situation');
	let away_team: Team = getContext('away_team');
	let home_team: Team = getContext('home_team');
</script>

{#if spread}
	<div class="spreadOrPossession" class:active-game={$disabled} style="line-height: 2;">
		{#if $disabled}
			{#await $promise_situation then situation}
				{#if situation.possessionText && situation.team}
					{#await getTeamWithPossession(situation.team.$ref) then teamWithPossession}
						{#if teamWithPossession === away_team.abbreviation}
							<Fa icon={faFootballBall} size="lg" rotate={45} />
							<Fa icon={faLock} size="lg" />
							<span />
						{:else if teamWithPossession === home_team.abbreviation}
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
							>Away Team ({away_team.abbreviation}) is favored by {spread}.</span
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
							>Home Team ({home_team.abbreviation}) is favored by {Math.abs(spread)}.</span
						>
					</Tooltip>
				</div>
			{/if}
		{/if}
	</div>
{:else}
	<AdminOnlyControl>
		<button
			class="spreadOrPossession admin"
			on:click={() => {
				updateGameSpreads($selected_week, $selected_year);
			}}
		>
			No spread set. Click to set spreads.
		</button>
	</AdminOnlyControl>
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
	.admin {
		@include styledButton;
		@include admin;
		text-shadow: none;
	}
</style>
