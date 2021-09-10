<script lang="ts">
	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
</script>

<p class="grid status info">
	{#await promiseStatus}
		<span />
		<span />
		<span />
	{:then status}
		{#if status.type.description === 'Final'}
			{#await promiseScores}
				<span>--</span>
			{:then { awayScoreData, homeScoreData }}
				<span class="score" class:higherScore={awayScoreData.value > homeScoreData.value}
					>{awayScoreData.value}</span
				>
			{:catch}
				<span>--</span>
			{/await}

			<span>Final</span>

			{#await promiseScores}
				<span>--</span>
			{:then { awayScoreData, homeScoreData }}
				<span class="score" class:higherScore={homeScoreData.value > awayScoreData.value}
					>{homeScoreData.value}</span
				>
			{:catch}
				<span>--</span>
			{/await}
		{:else if status.type.description === 'Scheduled'}
			<span />
			<span />
			<span />
		{:else if status.type.description !== 'Canceled'}
			{#await promiseScores}
				<span>--</span>
			{:then { awayScoreData }}
				<span class="score">{awayScoreData.value}</span>
			{:catch}
				<span>--</span>
			{/await}

			<span>
				{#if status.type.completed === false}
					{#if status.type.description === 'Halftime'}
						<p>{status.type.description}</p>
					{:else if status.type.description !== 'Canceled'}
						<p>Q{status.period}</p>
						<p>{status.displayClock}</p>
					{:else}
						<p><strong>Canceled</strong></p>
					{/if}
				{/if}
			</span>

			{#await promiseScores}
				<span>--</span>
			{:then { homeScoreData }}
				<span class="score">{homeScoreData.value}</span>
			{:catch}
				<span>--</span>
			{/await}
		{/if}
	{:catch}
		unable to get game status...
	{/await}
</p>

<style lang="scss">
	.grid {
		@include gridAndGap;
		justify-items: center;
	}
	span {
		padding: 0.3rem 0.5rem;
		align-self: center;
		&.at-symbol {
			font-size: x-large;
		}
	}
	.info {
		width: auto;
		justify-self: center;
	}
	.status {
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
	}
	.score {
		font-weight: bold;
		font-size: clamp(1rem, 5vw, 3rem);
		min-width: 2ch;
	}
	.higherScore {
		text-decoration: underline 2px solid;
	}
</style>
