<script lang="ts">
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import type { Game } from '$scripts/classes/game';
	import type { Player } from '$classes/player';
	import { largerThanMobile } from '$scripts/store';
	import { getAllGames } from '$scripts/weekly/weeklyAdmin';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let playersPromise: Promise<Player[]>;
	export let gamePromise: Promise<Game[]>;
	export let selectedYear: number;
	export let selectedPlayer: Player;
	let minColumns: string | number = '40%';
	let startOpen = true;
	let customContentStyles: string;

	$: customContentStyles = $largerThanMobile ? 'grid-column:span 2;' : undefined;
</script>

<AdminExpandSection summaryText="Selectors" bind:minColumns {startOpen} {customContentStyles}>
	<label for="refresh" class="span-2">
		<p>Refresh Players and Games</p>
		<button
			id="refresh"
			class="refresh"
			on:click={async () => {
				playersPromise = getWeeklyPlayers();
				gamePromise = getAllGames();
				// maxWeekPromise = getMaxGameWeek();
			}}
		>
			<Fa icon={faSync} />
		</button>
	</label>
	<label for="week-select">
		<p>Week</p>
		<WeekSelect />
	</label>
	<label for="year-select">
		<p>Year</p>
		<YearSelect bind:selectedYear />
	</label>

	{#await playersPromise}
		Loading players...
	{:then}
		<label for="player-select" class="span-2">
			<p>Player</p>
			<PlayerSelect bind:selectedPlayer bind:playersPromise />
		</label>
	{/await}
</AdminExpandSection>

<style lang="scss">
	button {
		@include styledButton;
	}
	.refresh {
		max-width: max-content;
	}
	label {
		display: grid;
		justify-items: center;
	}
	.span-2 {
		grid-column: span 2;
	}
</style>
