<script lang="ts">
	import AccordionDetails from '$containers/AccordionDetails.svelte';
	import SeasonStandings from '$tabular/SeasonStandings.svelte';
	import WeekStandings from '$tabular/WeekStandings.svelte';

	import Tabs from '$navigation/Tabs.svelte';

	const standingsTabs = [
		{ name: 'Week', component: WeekStandings },
		{ name: 'Season', component: SeasonStandings }
	];
</script>

<AccordionDetails expandIcon={null}>
	<h1 slot="summary">Standings</h1>

	<section class="section-one" slot="content">
		<p>
			Split screen for two components that show week leaders and season; contain them in tabs when
			viewport shrinks
		</p>
		<p>Season table doesn't really need to show weeks that aren't the current week</p>
	</section>
</AccordionDetails>

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
