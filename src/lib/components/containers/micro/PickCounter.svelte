<script lang="ts">
	import { browser } from '$app/env';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
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

	const findMissedPick = () => {
		if (browser) {
			const yOffset = -200;
			-for(const [i, value] of currentPicks.entries()){
				if(value.pick === ''){
					return i
				}
			}
			console.log(index);
			const element = document.getElementById(`game-${index}`);

			// The minus 1 accounts for this function running before the parent passes in the newly updated currentPickCount
			// I.E. -- When making the 16th pick, currentPickCount will still be 15
			if (currentPickCount < totalGameCount - 1 && element) {
				const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
				window.scrollTo({ top: y, behavior: 'smooth' });
			} else {
				setTimeout(() => {
					if (currentPickCount < totalGameCount) {
						$showPickWarning = true;
					}
				}, 1000);
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		}
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
				<svelte:fragment slot="text">You missed a pick! Click the icon to find it!</svelte:fragment>
				<Fa on:click={findMissedPick} slot="content" icon={faExclamationCircle} />
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
