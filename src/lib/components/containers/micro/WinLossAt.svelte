<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let selectedTeam: string;
	export let spread: number;
	export let homeTeam: Team;
	export let awayTeam: Team;
</script>

<div class="winLossAt">
	{#await promiseStatus}
		<span class="at-symbol"> AT </span>
	{:then status}
		<span>
			{#if status.type.description === 'Final'}
				{#await promiseScores then { homeScoreData, awayScoreData }}
					{#if selectedTeam === homeTeam.abbreviation}
						{#if (spread < 0 && homeScoreData.value + spread > awayScoreData.value) || (spread > 0 && awayScoreData.value - spread < homeScoreData.value)}
							<Fa icon={faCheckCircle} size="2x" color="green" />
						{:else if spread === 0 && homeScoreData.value > awayScoreData.value}
							<Fa icon={faCheckCircle} size="2x" color="green" />
						{:else}
							<Fa icon={faTimesCircle} size="2x" color="red" />
						{/if}
					{/if}
					{#if selectedTeam === awayTeam.abbreviation}
						{#if (spread < 0 && homeScoreData.value + spread < awayScoreData.value) || (spread > 0 && awayScoreData.value - spread > homeScoreData.value)}
							<Fa icon={faCheckCircle} size="2x" color="green" />
						{:else if spread === 0 && awayScoreData.value > homeScoreData.value}
							<Fa icon={faCheckCircle} size="2x" color="green" />
						{:else}
							<Fa icon={faTimesCircle} size="2x" color="red" />
						{/if}
					{/if}
				{/await}
			{:else}
				<span class="at-symbol"> AT </span>
			{/if}
		</span>
	{/await}
</div>

<style lang="scss">
	span {
		padding: 0.3rem 0.5rem;
		align-self: center;
	}
	.winLossAt {
		@include gridAndGap;
		justify-items: center;
		width: auto;
		justify-self: center;
		grid-area: WinLossAt;
	}
</style>
