<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let weeks: number[] = [];
	let currentWeek: number = 1; // @TODO find a function to determine the NFL week automatically
	export let selectedWeek: number = currentWeek;
	export let gridArea = '';

	const setDefaultWeeks = () => {
		if (weeks === undefined || weeks.length === 0) {
			for (let i = 1; i < 18; i++) {
				weeks = [...weeks, i];
			}
		}
	};

	const dispatch = createEventDispatcher();

	onMount(() => {
		setDefaultWeeks();
	});
</script>

<select
	bind:value={selectedWeek}
	on:change={() => dispatch('weekChanged', selectedWeek)}
	style={gridArea ? gridArea : ''}
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
