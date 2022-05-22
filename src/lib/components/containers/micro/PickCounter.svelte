<script lang="ts">
	import { fly } from 'svelte/transition';
	import MissedPickIndicator from './MissedPickIndicator.svelte';

	export let invisible = false;
	export let currentPickCount = 0;
	export let totalGameCount = 0;
	export let upcomingGamesCount = 0;
</script>

<div
	class="pick-count"
	class:invisible
	in:fly={{ delay: 250, duration: 200, x: 150 }}
	out:fly={{ duration: 200, x: -150 }}
>
	{#if upcomingGamesCount === totalGameCount}
		<p>{currentPickCount} / {totalGameCount} Picks Made</p>
		<MissedPickIndicator />
	{:else}
		<p>{currentPickCount} / {totalGameCount} Picks Made</p>
		<p>({upcomingGamesCount} Left to Play)</p>
		<MissedPickIndicator />
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
