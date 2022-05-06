<script lang="ts">
	import { seasonTypes } from '$classes/constants';
	import type { SeasonType } from '$classes/seasonType';

	import { createEventDispatcher } from 'svelte';

	let types: SeasonType[] = seasonTypes;
	let currentSeasonType = types[1]; // @TODO find a function to determine the NFL week automatically
	export let selectedSeasonType: SeasonType = currentSeasonType;
	export let gridArea = '';

	const dispatch = createEventDispatcher();
</script>

<select
	bind:value={selectedSeasonType}
	on:change={() => dispatch('seasonTypeChanged', selectedSeasonType)}
	style={gridArea ? gridArea : ''}
>
	{#each types as type}
		<option value={type}>{type.text}</option>
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
