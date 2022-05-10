<script lang="ts">
	import { selected_week, selected_season } from '$scripts/store';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import type { SeasonBoundDoc } from '$classes/seasonBound';
	import { makeNumericArrayOfDesiredLength } from '$lib/scripts/functions';

	export let weeks: number[] = [];
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

	const changeWeeksAvailable = async (selected_season: SeasonBoundDoc): Promise<void> => {
		weeks = makeNumericArrayOfDesiredLength(selected_season.number_of_weeks);
		$selected_week = weeks[0];
	};

	$: if ($selected_season) changeWeeksAvailable($selected_season);
</script>

<div class="weekSelectors" style={customStyles}>
	{#if showButtons}
		<button class="arrow" style={customButtonStyles} on:click={decrement}
			><Fa icon={faChevronLeft} /></button
		>
	{/if}
	<select id="week-select" bind:value={$selected_week} on:change style={customSelectStyles}>
		{#each weeks as week}
			<option value={week}>Week {week}</option>
		{/each}
	</select>
	{#if showButtons}
		<button class="arrow" on:click={increment}><Fa icon={faChevronRight} /></button>
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
		grid-template-columns: max-content 1fr max-content;
	}
</style>
