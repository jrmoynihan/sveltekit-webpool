<script lang="ts">
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import { larger_than_mobile } from '$scripts/store';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import type { PoolsToQuery } from '$lib/scripts/types/types';

	export let player_pool: PoolsToQuery = 'all';
	export let customContentStyles: string = null;

	$: customContentStyles = $larger_than_mobile ? 'grid-column:span 2;' : undefined;
</script>

<section class="selectors">
	<label for="week-select" class="week">
		<p>Week</p>
		<WeekSelect />
	</label>
	<label for="season-type-select" class="type">
		<p>Season Type</p>
		<SeasonTypeSelect />
	</label>
	<label for="year-select" class="year">
		<p>Year</p>
		<YearSelect />
	</label>
	<label for="player-select" class="player">
		<p>Player</p>
		<PlayerSelect {player_pool} />
	</label>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	label {
		display: grid;
		justify-items: center;
		grid-template-columns: minmax(0, 1fr);
		flex-grow: 1;
	}
</style>
