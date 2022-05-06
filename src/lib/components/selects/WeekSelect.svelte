<script lang="ts">
	import type { SeasonType } from '$scripts/classes/seasonType';
	import { getPreSeasonWeeks, getRegularSeasonWeeks } from '$scripts/functions';
	import { selectedWeek } from '$scripts/store';
	import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';

	export let weeks: number[] = [];
	export let selectedSeasonType: SeasonType = { id: 2, text: 'Regular Season' };
	export let showButtons = true;
	export let customStyles = '';
	export let customSelectStyles = '';
	export let customButtonStyles = '';

	const dispatch = createEventDispatcher();

	const changeWeeksAvailable = async (selectedSeasonType: SeasonType): Promise<void> => {
		// console.log('changed weeks available');
		if (selectedSeasonType.text === 'Regular Season') {
			weeks = await getRegularSeasonWeeks();
		} else if (selectedSeasonType.text === 'Pre-Season') {
			weeks = await getPreSeasonWeeks();
		}
	};
	const increment = () => {
		$selectedWeek += 1;
		// dispatch('incrementWeek', selectedWeek);
		dispatch('incrementWeek');
	};
	const decrement = () => {
		$selectedWeek -= 1;
		// dispatch('decrementWeek', selectedWeek);
		dispatch('decrementWeek');
	};
	const weekChanged = () => dispatch('weekChanged');

	$: changeWeeksAvailable(selectedSeasonType);
</script>

<div class="weekSelectors" style={customStyles}>
	{#if showButtons}
		<button class="arrow" style={customButtonStyles} on:click={decrement}
			><Fa icon={faChevronLeft} /></button
		>
	{/if}
	<select
		id="week-select"
		bind:value={$selectedWeek}
		on:change={() => {
			weekChanged();
		}}
		style={customSelectStyles}
	>
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
