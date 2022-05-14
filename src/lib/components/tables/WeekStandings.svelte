<script lang="ts">
	import { selected_week, selected_year, window_width } from '$scripts/store';
	import { where, orderBy } from '@firebase/firestore';
	import {
		getGameData,
		getTiebreakerData,
		getWeeklyPlayers,
		getWeeklyRecordData
	} from '$scripts/weekly/weeklyPlayers';
	import { ErrorAndToast } from '$scripts/logging';
	import type { Game } from '$classes/game';
	import ErrorModal from '../modals/ErrorModal.svelte';
	import type { WeeklyTiebreaker } from '$classes/tiebreaker';
	import type { Player } from '$classes/player';
	import { mobile_breakpoint } from '$scripts/site';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$components/tables/WeeklyStandingsRow.svelte';
	import ReturnToTop from '$components/buttons/ReturnToTop.svelte';
	import type { PlayerRecord } from '$lib/scripts/classes/playerRecord';
	import { dev } from '$app/env';
	import AdminOnlyControl from '../misc/AdminOnlyControl.svelte';
	import YearSelect from '../selects/YearSelect.svelte';

	let initial_week_headers: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker', 'Prize'];
	let abbreviated_week_headers: string[] = ['#', 'Name', 'W', 'L', 'T', '$'];
	let week_headers: string[] = initial_week_headers;
	let header_count: number;

	const getLastGame = async (selected_week: number, selected_year: number) => {
		try {
			const last_game_constraints = [
				where('week', '==', selected_week),
				where('year', '==', selected_year),
				where('isLastGameOfWeek', '==', true)
			];
			const last_game = await getGameData({ constraints: last_game_constraints });
			if (last_game.length === 1) return last_game[0];
			if (last_game.length === 0) throw new Error('No last game found.');
			if (last_game.length > 1) throw new Error('Multiple last games found.');
		} catch (error) {
			ErrorAndToast({ msg: 'Error encountered while getting last game.', error });
		}
	};

	const getData = async (
		week: number,
		year: number
	): Promise<{
		weekly_players: Player[];
		tiebreakers: WeeklyTiebreaker[];
		last_game: Game;
		weekly_records: PlayerRecord[];
	}> => {
		const player_record_constraints = [
			where('week', '==', week),
			where('year', '==', year),
			orderBy('wins', 'desc'),
			orderBy('net_tiebreaker_absolute')
		];
		const tiebreaker_constraints = [where('week', '==', week), where('year', '==', year)];

		// Get the data asynchronously for each collection
		let weekly_player_promise: Promise<Player[]> = getWeeklyPlayers();
		let tiebreaker_promise: Promise<WeeklyTiebreaker[]> = getTiebreakerData({
			constraints: tiebreaker_constraints
		});
		let last_game_promise: Promise<Game> = getLastGame(week, year);
		let weekly_records_promise: Promise<PlayerRecord[]> = getWeeklyRecordData({
			constraints: player_record_constraints
		});

		// Wait for all the data to come in before resolving the getData() promise with the results
		const weekly_players: Player[] = await weekly_player_promise;
		const tiebreakers: WeeklyTiebreaker[] = await tiebreaker_promise;
		const last_game: Game = await last_game_promise;
		const weekly_records: PlayerRecord[] = await weekly_records_promise;

		return { weekly_players, tiebreakers, last_game, weekly_records };
	};

	// Update the data promise if the week changes
	let data_promise = getData($selected_week, $selected_year);
	$: data_promise = getData($selected_week, $selected_year);

	// Reactive statements allow headers to update when the screen resizes
	$: header_count = week_headers.length;
	$: week_headers =
		$window_width < mobile_breakpoint - 500 ? abbreviated_week_headers : initial_week_headers;
</script>

<div class="week grid" style="--columns:{header_count}">
	<WeekSelect customStyles="grid-area:selector;" />
	{#if dev}
		<AdminOnlyControl>
			<YearSelect />
		</AdminOnlyControl>
	{/if}
	<div class="table grid">
		{#each week_headers as header}
			<div class="header">{header}</div>
		{/each}
		{#await data_promise then { weekly_players, tiebreakers, last_game, weekly_records }}
			{#each weekly_players as player, i}
				{@const tiebreaker = tiebreakers.find((doc) => doc.uid === player.uid)}
				{@const record = weekly_records.find((doc) => doc.uid === player.uid)}
				<WeeklyStandingsRow {player} {i} {tiebreaker} {last_game} {record} />
			{/each}
		{:catch error}
			<ErrorModal>
				Unable to load data: {error}
			</ErrorModal>
		{/await}
	</div>
</div>
<ReturnToTop />

<style lang="scss">
	.grid {
		display: grid;
		width: 100%;
	}
	.week {
		justify-items: center;
		grid-template-areas: 'selector' 'table';
	}
	.table {
		grid-template-columns: repeat(var(--columns), minmax(max-content, 1fr));
		padding-bottom: 1rem;
		column-gap: 0;
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
	}
</style>
