<script lang="ts">
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	// export let promiseStatus: Promise<any>;
	// export let promiseScores: Promise<any>;
	// export let selectedTeam: string;
	// export let spread: number;
	// export let homeTeam: Team;
	// export let awayTeam: Team;
	export let isATSwinner: boolean | null;
</script>

<div class="winLossAt">
	{#if isATSwinner}
		<Tooltip tooltipWidth="250%">
			<p slot="text">You picked correctly!</p>
			<Fa slot="content" icon={faCheckCircle} size="2x" color="green" />
		</Tooltip>
	{:else if isATSwinner === false}
		<Tooltip tooltipWidth="350%" tooltipTop="-400%">
			<p slot="text">You got this one wrong. Better luck next time!</p>
			<Fa slot="content" icon={faTimesCircle} size="2x" color="red" />
		</Tooltip>
	{:else if isATSwinner === null}
		<span class="at-symbol"> AT </span>
	{/if}
	<!-- {#await promiseStatus}
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
	{/await} -->
</div>

<style lang="scss">
	span {
		padding: 0.3rem 0.5rem;
		font-size: x-large;
		align-self: center;
	}
	.winLossAt {
		@include gridAndGap;
		justify-items: center;
		width: auto;
		align-self: flex-start;
		justify-self: center;
		grid-area: WinLossAt;
	}
</style>
