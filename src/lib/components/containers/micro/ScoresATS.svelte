<script lang="ts">
	import { HomeOrAway } from '$scripts/classes/constants';
	import type { ESPNScore, ESPNStatus } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import AtSscore from './ATSscore.svelte';
	import AtStooltip from './ATStooltip.svelte';

	export let promise_status: Promise<ESPNStatus>;
	export let promise_scores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }>;
	export let spread: number;
	export let home_team: Team;
	export let away_team: Team;
	export let ATS_winner: string;
</script>

{#await promise_status then status}
	{#if status.type.description === 'Final'}
		{#await promise_scores then scores}
			<AtSscore
				home_or_away={HomeOrAway.Away}
				team={away_team}
				{ATS_winner}
				score={scores.awayScoreData}
				{spread}
				grid_area={'awayATS'}
			/>
			<AtStooltip />
			<AtSscore
				home_or_away={HomeOrAway.Home}
				team={home_team}
				{ATS_winner}
				score={scores.homeScoreData}
				{spread}
				grid_area={'homeATS'}
			/>
		{/await}
	{/if}
{/await}
