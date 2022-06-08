<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import PickCorrectnessIndicator from './PickCorrectnessIndicator.svelte';

	let is_ATS_winner: Writable<boolean> = getContext('is_ATS_winner');
	let game_is_over: Writable<boolean> = getContext('game_is_over');
</script>

<div class="winLossAt">
	{#if $is_ATS_winner !== undefined && $game_is_over}
		<PickCorrectnessIndicator is_correct={$is_ATS_winner} />
	{:else}
		<span class="at-symbol"> AT </span>
	{/if}
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
