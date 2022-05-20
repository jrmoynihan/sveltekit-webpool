<script lang="ts">
	import { use_dark_theme } from '$scripts/store';
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	export let game_is_over: boolean;
	export let is_ATS_winner: boolean;
</script>

<div class="winLossAt">
	{#if is_ATS_winner && game_is_over}
		<Tooltip tooltipWidth="250%">
			<p slot="text">You picked correctly!</p>
			<Fa
				slot="content"
				icon={faCheckCircle}
				size="2x"
				color="green"
				style="background-color: white; border-radius:100%;"
			/>
		</Tooltip>
	{:else if is_ATS_winner === false && game_is_over}
		<Tooltip tooltipWidth="350%" tooltipTop="-400%">
			<p slot="text">You got this one wrong. Better luck next time!</p>
			<Fa
				slot="content"
				icon={faTimesCircle}
				size="2x"
				color={$use_dark_theme ? 'tomato' : 'darkred'}
				style="background-color: white; border-radius:100%;"
			/>
		</Tooltip>
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
