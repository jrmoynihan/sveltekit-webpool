<script lang="ts">
	import { all_seasons, selected_year } from '$lib/scripts/store';

	let all_years = [...new Set($all_seasons.map((season) => season.year))].sort();
	export let grid_area = '';
</script>

<select id="year-select" bind:value={$selected_year} on:change style:grid-area={grid_area}>
	{#each all_years as year}
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
