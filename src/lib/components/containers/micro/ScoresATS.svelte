<script lang="ts">
	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let spread: number;
</script>

{#await promiseStatus then status}
	{#if status.type.description === 'Final'}
		<div class="ATS-scores">
			{#await promiseScores then scores}
				{#if spread > 0}
					<span>({scores.awayScoreData.value - spread})</span>
					<span>ATS</span>
					<span>({scores.homeScoreData.value})</span>
				{:else if spread < 0}
					<span>({scores.awayScoreData.value})</span>
					<span>ATS</span>
					<span>({scores.homeScoreData.value - spread * -1})</span>
				{/if}
			{/await}
		</div>
	{/if}
{/await}

<style lang="scss">
	.ATS-scores {
		grid-area: scoresATS;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}
	span {
		// padding: 0.3rem 0.5rem;
		align-self: center;
	}
</style>
