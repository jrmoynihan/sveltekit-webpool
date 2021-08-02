<script lang="ts">
	import AccordionDetails from '$containers/AccordionDetails.svelte';
	import SeasonStandings from '$tables/SeasonStandings.svelte';
	import WeekStandings from '$tables/WeekStandings.svelte';
	import Tabs from '$navigation/Tabs.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { dev } from '$app/env';

	const standingsTabs = [
		{ name: 'Week', component: WeekStandings },
		{ name: 'Season', component: SeasonStandings }
	];
</script>

<PageTitle>Standings</PageTitle>

{#if dev}
	<AccordionDetails>
		<h4 slot='summary'>Dev Notes (not visible in production)</h4>
		<section class="dev-notes" slot="content">
			<p style='width:100ch;'>Season table doesn't really need to show weeks that aren't the current week</p>
		</section>
	</AccordionDetails>
{/if}

<section class="section-one">
	<Tabs selectedTab={standingsTabs[0]} tabs={standingsTabs} />
</section>

<style lang="scss">
	section {
		padding: 0 1rem;
	}
	.dev-notes {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
	}
	.section-one {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(20em, 100%), 1fr));
		// width: 100%;
		max-width: calc(max-content + 4ch);
	margin: 0 auto;
	}
</style>
