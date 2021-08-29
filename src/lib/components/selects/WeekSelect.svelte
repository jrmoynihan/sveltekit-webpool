<script lang="ts">
	import type { SeasonType } from '$scripts/classes/seasonType';
	import { setPreSeasonWeeks, setRegularSeasonWeeks } from '$scripts/functions';
	import { createEventDispatcher, onMount } from 'svelte';

	export let weeks: number[] = [];
	let currentWeek: number = 1; // @TODO find a function to determine the NFL week automatically
	export let selectedWeek: number = currentWeek;
	export let gridArea = '';
	export let selectedSeasonType: SeasonType = { id: 2, text: 'Regular Season' };
	export let customStyles = '';

	const setDefaultWeeks = () => {
		if (weeks === undefined || weeks.length === 0) {
			for (let i = 1; i < 18; i++) {
				weeks = [...weeks, i];
			}
		}
	};
	const changeWeeksAvailable = (selectedSeasonType) => {
		console.log('changed weeks available');
		if (selectedSeasonType.text === 'Regular Season') {
			weeks = setRegularSeasonWeeks();
		} else if (selectedSeasonType.text === 'Pre-Season') {
			weeks = setPreSeasonWeeks();
		}
	};

	const dispatch = createEventDispatcher();

	onMount(() => {
		setDefaultWeeks();
	});

	$: changeWeeksAvailable(selectedSeasonType);
</script>

<select
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
		@include frostedGlassHighContrast;
		@include rounded;
		display: inline-flex;
		padding: 1rem;
		font-weight: bold;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>
