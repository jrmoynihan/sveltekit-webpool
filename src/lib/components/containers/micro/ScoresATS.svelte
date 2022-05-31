<script lang="ts">
	import type { ESPNScore, ESPNStatus } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import { getContext } from 'svelte';
	import AtSscore from './ATSscore.svelte';
	import AtStooltip from './ATStooltip.svelte';

	let promise_status: ESPNStatus = getContext('promise_status');
	let promise_scores: { home_score_data: ESPNScore; away_score_data: ESPNScore } =
		getContext('promise_scores');
	let spread: number = getContext('spread');
	let ATS_winner: string = getContext('ATS_winner');
	let home_team: Team = getContext('home_team');
	let away_team: Team = getContext('away_team');
</script>

{#await promise_status then status}
	{#if status.type.description === 'Final'}
		{#await promise_scores then scores}
			<AtSscore
				home_or_away={'Away'}
				team={away_team}
				{ATS_winner}
				score={scores.away_score_data}
				{spread}
				grid_area={'awayATS'}
			/>
			<AtStooltip />
			<AtSscore
				home_or_away={'Home'}
				team={home_team}
				{ATS_winner}
				score={scores.home_score_data}
				{spread}
				grid_area={'homeATS'}
			/>
		{/await}
	{/if}
{/await}
