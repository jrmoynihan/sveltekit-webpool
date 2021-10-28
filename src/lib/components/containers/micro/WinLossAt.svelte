<script lang="ts">
	import { useDarkTheme } from '$scripts/store';
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	export let gameIsOver: boolean;
	export let isATSwinner: boolean;
</script>

<div class="winLossAt">
	{#if isATSwinner && gameIsOver}
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
	{:else if isATSwinner === false && gameIsOver}
		<Tooltip tooltipWidth="350%" tooltipTop="-400%">
			<p slot="text">You got this one wrong. Better luck next time!</p>
			<Fa
				slot="content"
				icon={faTimesCircle}
				size="2x"
				color={$useDarkTheme ? 'tomato' : 'darkred'}
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
