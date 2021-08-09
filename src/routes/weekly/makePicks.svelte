<script lang="ts">
	import { dev } from '$app/env';
	import MatchupContainer from '$lib/components/containers/MatchupContainer.svelte';
	import Clock from '$lib/components/misc/Clock.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { Game } from '$scripts/classes/game';
	import { gameConverter } from '$scripts/converters';
	import { scheduleCollection } from '$scripts/schedule';
	import { mobileBreakpoint } from '$scripts/site';
	import { windowWidth } from '$scripts/store';
	import { onSnapshot, query, where } from '@firebase/firestore';
	import { onMount } from 'svelte';

	let showIDs = false;
	let selectedWeek = 1;
	let q = query(scheduleCollection, where('week', '==', selectedWeek));
	let weekOfGames: Game[] = [];

	const getGames = async () => {
		q = query(scheduleCollection, where('week', '==', selectedWeek));
		// const snapshot = await runQuery(q.withConverter(gameConverter))
		weekOfGames = [];
		onSnapshot(q.withConverter(gameConverter), (snapshot) => {
			snapshot.docs.forEach((doc) => {
				weekOfGames = [...weekOfGames, doc.data()];
			});
		});
	};
	onMount(() => {
		getGames();

		// TODO make a query to get active player's picks for this week
	});
</script>

<PageTitle>Make Weekly Picks</PageTitle>
{#if dev}
	<div style="display:grid">
		Show Game IDs (not visible in production)
		<ToggleSwitch bind:checked={showIDs} />
	</div>
{/if}
<!-- {#if $windowWidth > mobileBreakpoint} -->
<Clock />
<!-- {/if} -->
<div class="grid positioning">
<WeekSelect bind:selectedWeek on:weekChanged={getGames} />
{#if weekOfGames}
	<div class="grid weekGames" style={$windowWidth > mobileBreakpoint ? 'max-width:60%;':''}>
		{#each weekOfGames as { id, spread, timestamp, homeTeam, awayTeam, competitions }}
			<div class="game-container">
				<MatchupContainer {id} {spread} {homeTeam} {awayTeam} bind:showIDs {timestamp} {competitions}/>
			</div>
		{/each}
	</div>
{/if}
</div>

<style lang="scss">
		.grid {
		@include gridAndGap;
		justify-items: center;
	}
	.positioning{
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
	}
	.game-container {
		@include defaultContainerStyles;
		cursor: initial;
		width: 100%;
	}
	.weekGames {
		justify-content: center;
		padding: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(min(100%,30em), 1fr))  // min function prevents grid blowout
	}
</style>
