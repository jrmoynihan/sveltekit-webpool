<script lang="ts">
	import type { SeasonType } from '$scripts/classes/seasonType';
	import { getPreSeasonWeeks, getRegularSeasonWeeks } from '$scripts/functions';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { createEventDispatcher, onMount } from 'svelte';

	export let weeks: number[] = [];
	export let selectedWeek: number;
	export let gridArea = '';
	export let selectedSeasonType: SeasonType = { id: 2, text: 'Regular Season' };
	export let customStyles = '';

	const dispatch = createEventDispatcher();

	const changeWeeksAvailable = async (selectedSeasonType: SeasonType): Promise<void> => {
		// console.log('changed weeks available');
		if (selectedSeasonType.text === 'Regular Season') {
			weeks = await getRegularSeasonWeeks();
		} else if (selectedSeasonType.text === 'Pre-Season') {
			weeks = await getPreSeasonWeeks();
		}
	};
	onMount(async () => {
		selectedWeek = await findCurrentWeekOfSchedule();
	});
	$: changeWeeksAvailable(selectedSeasonType);
</script>

<select
	id="week-select"
	bind:value={selectedWeek}
	on:change={() => dispatch('weekChanged', selectedWeek)}
	style="{customStyles};{gridArea ? gridArea : ''}"
>
	{#each weeks as week}
		<option value={week}>Week {week}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
	}
</style>
