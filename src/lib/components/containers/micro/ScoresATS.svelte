<script lang="ts">
	import { HomeOrAway } from '$scripts/classes/constants';
	import type { ESPNScore, ESPNStatus } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import AtSscore from './ATSscore.svelte';
	import AtStooltip from './ATStooltip.svelte';

	export let promiseStatus: Promise<ESPNStatus>;
	export let promiseScores: Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }>;
	export let spread: number;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let ATSwinner: string;
</script>

{#await promiseStatus then status}
	{#if status.type.description === 'Final'}
		{#await promiseScores then scores}
			<AtSscore
				homeOrAway={HomeOrAway.Away}
				team={awayTeam}
				{ATSwinner}
				score={scores.awayScoreData}
				{spread}
				gridArea={'awayATS'}
			/>
			<AtStooltip />
			<AtSscore
				homeOrAway={HomeOrAway.Home}
				team={homeTeam}
				{ATSwinner}
				score={scores.homeScoreData}
				{spread}
				gridArea={'homeATS'}
			/>
		{/await}
	{/if}
{/await}
