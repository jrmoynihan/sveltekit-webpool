<script lang="ts">
	import SeasonStandings from '$components/tables/SeasonStandings.svelte';
	import WeekStandings from '$components/tables/WeekStandings.svelte';
	import Tabs from '$navigation/Tabs.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { writable } from 'svelte/store';
	import { Tab } from '$lib/scripts/classes/tab';

	const tabs = [
		new Tab({ name: 'Week', component: WeekStandings }),
		new Tab({ name: 'Season', component: SeasonStandings })
	];
	const selected_tab = writable(tabs[0]);
</script>

<PageTitle>Standings</PageTitle>

<section class="standings">
	<Tabs bind:selected_tab={$selected_tab} {tabs} />
</section>

<style lang="scss">
	.standings {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(20em, 100%), 1fr));
		max-width: min(100%, 70em);
		margin: 0 auto;
		padding: 0 1rem;
	}
</style>
