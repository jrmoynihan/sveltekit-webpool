<script lang="ts">
	import { showTimestamps } from '$scripts/store';
	import type { Timestamp } from 'firebase/firestore';
	import GameTime from './GameTime.svelte';

	export let timestamp: Timestamp;
	export let promiseStatus: Promise<any>;
	export let promiseSituation: Promise<any>;
</script>

<div class="dateTime info">
	{$showTimestamps ? timestamp.toDate().getTime() : ''}
	{#await promiseStatus}
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
			{#await promiseSituation then situation}
				{#if situation.downDistanceText !== undefined}
					<div style="font-size: 0.8rem;">
						<span class:red-zone={situation.yardLine <= 20}>{situation.downDistanceText}</span>
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
	}
	.red-zone {
		background: darkred;
		border-radius: 1rem;
		color: white;
	}
</style>
