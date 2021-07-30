<script lang="ts">
	import SeasonStandings from './../../lib/tabular/SeasonStandings.svelte';
	import WeekStandings from './../../lib/tabular/WeekStandings.svelte';

	import Tabs from '$navigation/Tabs.svelte';

	const standingsTabs = [
		{ name: 'Week', component: WeekStandings },
		{ name: 'Season', component: SeasonStandings }
	];
</script>

<details>
	<summary>
		<h1>Standings</h1>
	</summary>

	<section class="section-one">
		<p>
			Split screen for two components that show week leaders and season; contain them in tabs when
			viewport shrinks; load data only once upon instantiation in module-scoped script tag
		</p>
		<p>Season table doesn't really need to show weeks that aren't the current week</p>
	</section>
</details>

<section class="section-two">
	<Tabs selectedTab={standingsTabs[0]} tabs={standingsTabs} />
</section>

<style lang="scss">
	section {
		padding: 0 1rem;
	}
	.section-one {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
	}
	.section-two {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(20em, 100%), 1fr));
		width: 100%;
	}
</style>
