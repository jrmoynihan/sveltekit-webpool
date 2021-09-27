<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { goToMissedPick } from '$scripts/functions';
	import { showPickWarning } from '$scripts/store';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import Tooltip from '../Tooltip.svelte';

	export let invisible = false;
	export let currentPickCount: number = 0;
	export let totalGameCount: number = 0;
	export let upcomingGamesCount: number = 0;
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
		{#if $showPickWarning}
			<Tooltip tooltipTop="-500%">
				<svelte:fragment slot="text">You missed a pick! Click here to find it!</svelte:fragment>
				<div on:click={() => goToMissedPick(currentPicks)} slot="content">
					<Fa icon={faExclamationCircle} />
				</div>
			</Tooltip>
		{/if}
	{:else}
		{currentPickCount} / {totalGameCount} Picks Made ({upcomingGamesCount} Left to Play)
		{#if $showPickWarning}
			<Tooltip tooltipTop="-500%">
				<svelte:fragment slot="text">You missed a pick! Click here to find it!</svelte:fragment>
				<div on:click={() => goToMissedPick(currentPicks)} slot="content">
					<Fa icon={faExclamationCircle} />
				</div>
			</Tooltip>
		{/if}
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
