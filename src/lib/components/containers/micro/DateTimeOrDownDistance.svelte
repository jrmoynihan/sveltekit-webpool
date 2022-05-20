<script lang="ts">
	import type { ESPNSituation, ESPNStatus } from '$scripts/classes/game';
	import type { Timestamp } from '@firebase/firestore';
	import { show_timestamps } from '$scripts/store';
	import GameTime from './GameTime.svelte';

	export let timestamp: Timestamp;
	export let promise_status: Promise<ESPNStatus>;
	export let promise_situation: Promise<ESPNSituation>;
</script>

<div class="dateTime info">
	{$show_timestamps
		? `${timestamp.toDate().toLocaleDateString()} ${timestamp.toDate().toLocaleTimeString()}`
		: ''}
	{#await promise_status}
		{#if timestamp}
			<GameTime {timestamp} />
		{:else}
			No timestamp field set.
		{/if}
	{:then status}
		{#if status.type.description === 'Scheduled'}
			{#if timestamp}
				<GameTime {timestamp} />
			{:else}
				No timestamp field set.
			{/if}
		{:else if status.type.completed === false}
			{#await promise_situation then situation}
				{#if situation.downDistanceText !== undefined}
					<div style="font-size: 0.8rem;">
						<span
							class="downDistance"
							class:red-zone={situation.isRedZone && situation.yardLine <= 20}
							>{situation.downDistanceText}</span
						>
					</div>
				{/if}
			{/await}
		{/if}
	{/await}
</div>

<style lang="scss">
	.dateTime {
		grid-area: dateTimeOrDownDistance;
		@include gridAndGap;
		width: auto;
		justify-self: center;
		align-self: flex-end;
	}
	.downDistance {
		padding: 0.5rem;
	}
	.red-zone {
		background: darkred;
		border-radius: 1rem;
		color: white;
	}
</style>
