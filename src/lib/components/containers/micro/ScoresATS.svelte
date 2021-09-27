<script lang="ts">
	import Tooltip from '../Tooltip.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let spread: number;
</script>

{#await promiseStatus then status}
	{#if status.type.description === 'Final'}
		<div class="ATS-scores">
			{#await promiseScores then scores}
				{#if spread > 0}
					<span class="ATSscore">{scores.awayScoreData.value - spread}</span>
					<Tooltip tooltipWidth="300%">
						<svelte:fragment slot="text">Scores adjusted Against the Spread.</svelte:fragment>
						<span slot="content">ATS</span>
					</Tooltip>
					<span class="ATSscore">{scores.homeScoreData.value}</span>
				{:else if spread < 0}
					<span class="ATSscore">{scores.awayScoreData.value}</span>
					<Tooltip tooltipWidth="300%">
						<svelte:fragment slot="text">Scores adjusted Against the Spread.</svelte:fragment>
						<span slot="content">ATS</span>
					</Tooltip>
					<span class="ATSscore">{scores.homeScoreData.value - spread * -1}</span>
				{/if}
			{/await}
		</div>
	{/if}
{/await}

<style lang="scss">
	.ATS-scores {
		grid-area: scoresATS;
		@include gridAndGap;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		font-weight: 600;
	}
	span {
		// padding: 0.3rem 0.5rem;
		align-self: center;
	}
	.ATSscore {
		min-width: 2ch;
	}
</style>
