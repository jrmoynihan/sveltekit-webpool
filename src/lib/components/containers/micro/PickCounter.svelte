<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { scrollToNextGame } from '$scripts/functions';
	import { showPickWarning } from '$scripts/store';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import Tooltip from '../Tooltip.svelte';

	export let invisible = false;
	export let currentPickCount = 0;
	export let totalGameCount = 0;
	export let upcomingGamesCount = 0;
	export let currentPicks: WeeklyPickDoc[] = [];

	const findMissedPick = async () => {
		for (const [i, value] of currentPicks.entries()) {
			if (value.pick === '') {
				return i;
			}
		}
	};
	const goToMissedPick = async () => {
		const pickIndex = await findMissedPick();
		scrollToNextGame(pickIndex - 1, 0, 2); // Force it to run the scroll to game instead of scroll to top;
	};
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
				<div on:click={goToMissedPick} slot="content">
					<Fa icon={faExclamationCircle} />
				</div>
			</Tooltip>
		{/if}
	{:else}
		{currentPickCount} / {totalGameCount} Picks Made ({upcomingGamesCount} Left to Play)
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
