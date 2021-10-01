<script lang="ts">
	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
</script>

<div class="grid status-info">
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

			<div class="grid period-clock">
				{#if status.type.completed === false}
					{#if status.type.description === 'Halftime'}
						<div>{status.type.description}</div>
					{:else if status.type.description !== 'Canceled'}
						<div>Q{status.period}</div>
						<div>{status.displayClock}</div>
					{:else}
						<div><strong>Canceled</strong></div>
					{/if}
				{/if}
			</div>

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
</div>

<style lang="scss">
	.grid {
		display: grid;
		justify-items: center;
	}
	.period-clock {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr));
		align-self: center;
	}
	span {
		padding: 0.3rem 1rem;
		align-self: center;
		// &.at-symbol {
		// 	font-size: x-large;
		// }
	}
	.status-info {
		width: auto;
		justify-self: center;
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
		grid-area: statusInfo;
		align-self: center;
	}
	.score {
		font-weight: bold;
		font-size: min(3rem, 5vw);
		min-width: 2ch;
	}
	.higherScore {
		text-decoration: underline 2px solid;
	}
</style>
