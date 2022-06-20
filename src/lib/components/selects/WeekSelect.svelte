<script lang="ts">
	import { dev } from '$app/env';
	import { makeNumericArrayOfDesiredLength } from '$lib/scripts/utilities/functions';
	import { selected_season, selected_week } from '$scripts/store';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons/index.es';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';

	export let weeks: number[] = makeNumericArrayOfDesiredLength($selected_season?.number_of_weeks);
	export let showButtons = true;
	export let customStyles = '';
	export let customSelectStyles = '';
	export let customButtonStyles = '';

	const dispatch = createEventDispatcher();

	const increment = () => {
		$selected_week += 1;
		dispatch('incrementWeek');
	};
	const decrement = () => {
		$selected_week -= 1;
		dispatch('decrementWeek');
	};

	$: weeks = makeNumericArrayOfDesiredLength(dev ? 18 : $selected_season?.number_of_weeks);
</script>

<div class="weekSelectors" style={customStyles}>
	{#if showButtons}
		<button
			class="arrow"
			style={customButtonStyles}
			on:click={decrement}
			disabled={$selected_week - 1 < Math.min(...weeks)}><Fa icon={faChevronLeft} /></button
		>
	{/if}
	<select id="week-select" bind:value={$selected_week} on:change style={customSelectStyles}>
		{#each weeks as week}
			<option value={week}>Week {week}</option>
		{/each}
	</select>
	{#if showButtons}
		<button class="arrow" on:click={increment} disabled={$selected_week + 1 > Math.max(...weeks)}
			><Fa icon={faChevronRight} /></button
		>
	{/if}
</div>

<style lang="scss">
	select {
		@include defaultSelect;
	}
	.arrow {
		@include styledButton;
		@include discreetButtonStyles;
		@include defaultTransition;
		text-shadow: none;
		color: var(--text);
	}
	.weekSelectors {
		@include gridAndGap;
		grid-template-columns: repeat(3, minmax(0, max-content));
	}
</style>
