<script lang="ts">
	import SeasonStandings from '$tables/SeasonStandings.svelte';
	import WeekStandings from '$tables/WeekStandings.svelte';
	import Tabs from '$navigation/Tabs.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import { writable } from 'svelte/store';

	const standingsTabs = [
		{ name: 'Week', component: WeekStandings },
		{ name: 'Season', component: SeasonStandings }
	];
	const selectedStandingsTab = writable(standingsTabs[0]);
</script>

<PageTitle>Standings</PageTitle>

<DevNotes>
	<svelte:fragment>
		Season table doesn't really need to show weeks that aren't the current week
	</svelte:fragment>
</DevNotes>

<section class="standings">
	<Tabs bind:selectedTab={$selectedStandingsTab} tabs={standingsTabs} />
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
