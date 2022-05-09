<script lang="ts">
	import { selected_season_type } from '$lib/scripts/store';

	export let gridArea = '';
	let seasons: string[] = ['Regular Season', 'Post-Season', 'Pre-Season', 'Off-Season'];
</script>

<select bind:value={$selected_season_type} on:change style={gridArea ? gridArea : ''}>
	{#each seasons as season}
		<option value={season}>{season}</option>
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
