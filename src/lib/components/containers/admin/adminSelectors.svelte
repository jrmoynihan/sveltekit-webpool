<script lang="ts">
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import { larger_than_mobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';
	import SeasonTypeSelect from '$lib/components/selects/SeasonTypeSelect.svelte';
	import type { PoolsToQuery } from '$lib/scripts/types/types';

	export let player_pool: PoolsToQuery = 'all';
	export let minColumns: string | number = '40%';
	export let startOpen = true;
	export let customContentStyles: string = null;
	export let customSummaryStyles: string = null;

	$: customContentStyles = $larger_than_mobile ? 'grid-column:span 2;' : undefined;
</script>

<AdminExpandSection
	summaryText="Selectors"
	bind:minColumns
	{startOpen}
	{customContentStyles}
	{customSummaryStyles}
>
	<label for="week-select">
		<p>Week</p>
		<WeekSelect />
	</label>
	<label for="season-type-select">
		<p>Season Type</p>
		<SeasonTypeSelect />
	</label>
	<label for="year-select">
		<p>Year</p>
		<YearSelect />
	</label>
	<label for="player-select">
		<p>Player</p>
		<PlayerSelect {player_pool} />
	</label>
</AdminExpandSection>

<style lang="scss">
	label {
		display: grid;
		justify-items: center;
	}
</style>
