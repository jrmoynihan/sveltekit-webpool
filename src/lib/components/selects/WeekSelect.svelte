<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let weeks: number[] = [];
	let currentWeek: number = 11; // @TODO find a function to determine the NFL week automatically
	export let selectedWeek: number = currentWeek;
	export let gridArea = '';

	for (let i = 1; i < 18; i++) {
		weeks = [...weeks, i];
	}

	const dispatch = createEventDispatcher();
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
