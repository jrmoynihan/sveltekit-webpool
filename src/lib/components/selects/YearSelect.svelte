<script lang="ts">
	import { seasonBoundsCollection } from '$lib/scripts/firebase/collections';
	import { seasonBoundConverter } from '$lib/scripts/firebase/converters';
	import {
		all_seasons,
		selected_season,
		selected_season_type,
		selected_year
	} from '$scripts/store';
	import { doc, getDoc } from '@firebase/firestore';
	import { createEventDispatcher } from 'svelte';

	export let grid_area = '';
	export let custom_styles = '';
	export let is_admin_control = false;
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
	class:admin={is_admin_control}
	style:grid-area={grid_area}
	style={custom_styles}
>
	{#each [...new Set($all_seasons.map((season) => season.year))].sort() as year}
		<option value={year}>{year}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
	}
	.admin {
		@include admin;
	}
</style>
