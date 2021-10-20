<script lang="ts">
	import { useDarkTheme } from '$scripts/store';
	import { fly } from 'svelte/transition';

	export let evenRow: boolean = false;
	export let inTheMoney: boolean = false;
	export let delay = 0;
	export let xEvenRow = 250;
	export let xOddRow = -250;
	export let duration = 600;
	let dark = $useDarkTheme;
</script>

{#if evenRow}
	<div
		in:fly={{ x: xEvenRow, duration, delay }}
		class:evenRow
		class:dark
		class:redZone={inTheMoney}
	>
		<slot />
	</div>
{:else}
	<div in:fly={{ x: xOddRow, duration, delay }} class:evenRow class:dark class:redZone={inTheMoney}>
		<slot />
	</div>
{/if}

<style lang="scss">
	div {
		@include defaultTransition;
		padding: 0.2em;
		min-height: 2rem;
		height: 100%;
		align-content: center;
		display: grid;
	}
	.evenRow {
		// opacity: 0.1;
		background-color: rgba(var(--accentValue-color, rgb(233, 181, 99)), 50%);
		color: var(--alternate-color, rgb(36, 50, 36));
		&.dark {
			color: var(--main-color, rgb(255, 255, 255));
		}
	}
	.redZone {
		background-color: rgba(139, 0, 0, 80%);
		color: white;
		&.evenRow {
			background-color: rgba(178, 34, 34, 80%);
			color: white;
		}
	}
</style>
