<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { fly } from 'svelte/transition';
	import MissedPickIndicator from './MissedPickIndicator.svelte';

	export let invisible = false;
	export let currentPickCount = 0;
	export let totalGameCount = 0;
	export let upcomingGamesCount = 0;
	export let currentPicks: WeeklyPickDoc[] = [];
</script>

<div
	class="pick-count"
	class:invisible
	in:fly={{ delay: 250, duration: 200, x: 150 }}
	out:fly={{ duration: 200, x: -150 }}
>
	{#if upcomingGamesCount === totalGameCount}
		{currentPickCount} / {totalGameCount} Picks Made
		<MissedPickIndicator {currentPicks} />
	{:else}
		{currentPickCount} / {totalGameCount} Picks Made ({upcomingGamesCount} Left to Play)
		<MissedPickIndicator {currentPicks} />
	{/if}
</div>

<style lang="scss">
	.pick-count {
		@include defaultTransition;
		grid-area: pickCount;
		align-self: center;
	}
	.invisible {
		@include accelerate;
		opacity: 0;
		pointer-events: none;
		transform: translateX(-100%);
	}
</style>
