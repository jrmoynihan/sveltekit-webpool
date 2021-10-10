<script lang="ts">
	import { startingYear } from '$scripts/classes/constants';

	import { createEventDispatcher } from 'svelte';

	export let years: number[] = [];
	let currentYear = new Date().getFullYear();
	export let selectedYear: number = currentYear;
	export let gridArea = '';

	for (let i = startingYear; i <= currentYear; i++) {
		years = [...years, i];
	}

	const dispatch = createEventDispatcher();
</script>

<select
	id="year-select"
	bind:value={selectedYear}
	on:change={() => dispatch('yearChanged', selectedYear)}
	style={gridArea ? gridArea : ''}
>
	{#each years as year}
		<option value={year}>{year}</option>
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
