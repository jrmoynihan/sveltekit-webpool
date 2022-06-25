<script lang="ts">
	import { seasonBoundsCollection } from '$lib/scripts/firebase/collections';
	import { seasonBoundConverter } from '$lib/scripts/firebase/converters';
	import { selected_season, selected_season_type, selected_year } from '$lib/scripts/store';
	import { doc, getDoc } from '@firebase/firestore';
	import { createEventDispatcher } from 'svelte';

	export let gridArea = '';
	let seasons: string[] = ['Regular Season', 'Post-Season', 'Pre-Season', 'Off-Season'];
	const dispatch = createEventDispatcher();

	const updateSelectedSeason = async () => {
		const doc_ref = doc(
			seasonBoundsCollection.withConverter(seasonBoundConverter),
			`${$selected_year}_${$selected_season_type
				.toLocaleLowerCase()
				.replace(' ', '')
				.replace('-', '')}`
		);
		const season_doc = await getDoc(doc_ref);
		$selected_season = season_doc.data();
		dispatch('change', { $selected_season, $selected_season_type });
	};
</script>

<select
	bind:value={$selected_season_type}
	on:change={updateSelectedSeason}
	style={gridArea ? gridArea : ''}
>
	{#each seasons as season}
		<option value={season}>{season}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
	}
</style>
