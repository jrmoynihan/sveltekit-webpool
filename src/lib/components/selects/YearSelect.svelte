<script lang="ts">
	import { seasonBoundsCollection } from '$scripts/collections';
	import { seasonBoundConverter } from '$scripts/converters';

	import {
		all_seasons,
		selected_season,
		selected_season_type,
		selected_year
	} from '$scripts/store';
	import { doc, getDoc } from '@firebase/firestore';
	import { createEventDispatcher } from 'svelte';

	export let grid_area = '';
	const dispatch = createEventDispatcher();
	// let all_years = [...new Set($all_seasons.map((season) => season.year))].sort();

	const updateSelectedSeason = async () => {
		const doc_season = $selected_season_type.toLocaleLowerCase().replace(' ', '').replace('-', '');
		const doc_ref = doc(
			seasonBoundsCollection.withConverter(seasonBoundConverter),
			`${$selected_year}_${doc_season}`
		);
		const season_doc = await getDoc(doc_ref);
		$selected_season = season_doc.data();
		dispatch('change', { $selected_season, $selected_year });
	};
</script>

<select
	id="year-select"
	bind:value={$selected_year}
	on:change={updateSelectedSeason}
	style:grid-area={grid_area}
>
	{#each [...new Set($all_seasons.map((season) => season.year))].sort() as year}
		<option value={year}>{year}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
	}
</style>
