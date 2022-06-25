<script lang="ts">
	import type { Game } from '$classes/game';
	import type { WeeklyTiebreaker } from '$classes/tiebreaker';
	import ReturnToTop from '$components/buttons/ReturnToTop.svelte';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$components/tables/WeeklyStandingsRow.svelte';
	import type { PlayerRecord } from '$lib/scripts/classes/playerRecord';
	import { ErrorAndToast, LogAndToast, myLog, myWarning } from '$lib/scripts/utilities/logging';
	import { createTiebreaker } from '$lib/scripts/weekly/weeklyAdmin';
	import { createWeeklyRecordForPlayer } from '$lib/scripts/weekly/weeklyRecords';
	import { mobile_breakpoint } from '$scripts/site';
	import {
		selected_season_type,
		selected_week,
		selected_year,
		weekly_players,
		window_width
	} from '$scripts/store';
	import {
		getGameData,
		getTiebreakerData,
		getWeeklyRecordData
	} from '$scripts/weekly/weeklyPlayers';
	import { orderBy, QueryConstraint, where } from '@firebase/firestore';
	import ErrorModal from '../modals/ErrorModal.svelte';

	let initial_week_headers: string[] = ['Rank', 'Player', 'Wins', 'Losses', 'Tiebreaker', 'Prize'];
	let abbreviated_week_headers: string[] = ['#', 'Name', 'W', 'L', 'T', '$'];
	let week_headers: string[] = initial_week_headers;
	let header_count: number;

	const getLastGame = async (selected_week: number, selected_year: number) => {
		try {
			const last_game_constraints = [
				where('week', '==', selected_week),
				where('season_year', '==', selected_year),
				where('is_last_game_of_week', '==', true)
			];
			const last_game = await getGameData({ constraints: last_game_constraints });
			if (last_game.length === 1) return last_game[0];
			if (last_game.length === 0) throw new Error('No last game found.');
			if (last_game.length > 1) throw new Error('Multiple last games found.');
		} catch (error) {
			ErrorAndToast({ msg: 'Error encountered while getting last game.', error });
		}
	};

	const getData = async (): Promise<{
		tiebreakers: WeeklyTiebreaker[];
		last_game: Game;
		weekly_records: PlayerRecord[];
	}> => {
		const weekly_player_record_constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year),
			orderBy('prize_amount', 'desc'),
			orderBy('wins', 'desc'),
			orderBy('net_tiebreaker_absolute'),
			orderBy('nickname')
		];
		const tiebreaker_constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year)
		];

		// Wait for all the data to come in asynchrously
		let tiebreakers: WeeklyTiebreaker[] = await getTiebreakerData({
			constraints: tiebreaker_constraints
		});
		let last_game: Game = await getLastGame($selected_week, $selected_year);
		let weekly_records: PlayerRecord[] = await getWeeklyRecordData({
			constraints: weekly_player_record_constraints
		});

		if (!last_game) {
			LogAndToast({
				title: 'No last game found.',
				msg: 'An admin needs to reset the game data to identify the last game of the week.'
			});
			return;
		}

		// Make sure a record and tiebreaker doc exists for each player.
		const all_weekly_records_found = await confirmAllWeeklyRecordsExist(
			weekly_records,
			weekly_player_record_constraints
		);
		// If some records were missing, then re-query the database for the newly created ones
		if (!all_weekly_records_found) {
			weekly_records = await getWeeklyRecordData({
				constraints: weekly_player_record_constraints
			});
		}
		// If no tiebreaker doc is found, create one.
		const all_tiebreakers_found = await confirmAllTiebreakersExist(
			tiebreakers,
			tiebreaker_constraints
		);
		if (!all_tiebreakers_found) {
			tiebreakers = await getTiebreakerData({
				constraints: tiebreaker_constraints
			});
		}
		return { tiebreakers, last_game, weekly_records };
	};
	async function confirmAllWeeklyRecordsExist(
		weekly_records: PlayerRecord[],
		weekly_player_record_constraints: QueryConstraint[]
	) {
		let all_records_found = true;
		for await (const player of $weekly_players) {
			const found_player_record = weekly_records?.some((record) => record.uid === player.uid);
			// If no record doc is found, create one.
			if (found_player_record === undefined) {
				myWarning({
					msg: `A record for ${player.name} was not found.`,
					additional_params: [found_player_record, weekly_records, weekly_player_record_constraints]
				});
				await createWeeklyRecordForPlayer({
					player,
					season_year: $selected_year,
					season_type: $selected_season_type,
					week: $selected_week
				});
				myLog({
					msg: `Created weekly record for ${player.name}, week ${$selected_week}, ${$selected_year}`
				});
				all_records_found = false;
			}
		}
		return all_records_found;
	}
	async function confirmAllTiebreakersExist(
		tiebreakers: WeeklyTiebreaker[],
		tiebreaker_constraints: QueryConstraint[]
	) {
		let all_tiebreakers_found = true;
		for await (const player of $weekly_players) {
			const found_tiebreaker = tiebreakers?.some((tiebreaker) => tiebreaker.uid === player.uid);
			if (!found_tiebreaker) {
				myWarning({
					msg: `A weekly tiebreaker for ${player.name} was not found.`,
					additional_params: [found_tiebreaker, tiebreakers, tiebreaker_constraints]
				});
				await createTiebreaker({
					player,
					season_year: $selected_year,
					season_type: $selected_season_type,
					week: $selected_week,
					score_guess: 0
				});
				all_tiebreakers_found = false;
			}
		}
		return all_tiebreakers_found;
	}

	// Update the data promise if the week changes
	let data_promise: Promise<{
		tiebreakers: WeeklyTiebreaker[];
		last_game: Game;
		weekly_records: PlayerRecord[];
	}> = getData();

	function changeData() {
		data_promise = getData();
	}

	// Reactive statements allow headers to update when the screen resizes
	$: header_count = week_headers.length;
	$: week_headers =
		$window_width < mobile_breakpoint - 500 ? abbreviated_week_headers : initial_week_headers;
</script>

<div class="week grid" style="--columns:{header_count}">
	<WeekSelect
		customStyles="grid-area:week-selector;"
		on:change={changeData}
		on:incrementWeek={changeData}
		on:decrementWeek={changeData}
	/>
	<div class="table grid">
		{#each week_headers as header}
			<div class="header">{header}</div>
		{/each}
		{#if data_promise}
			{#await data_promise}
				Loading...
			{:then { tiebreakers, last_game, weekly_records }}
				{#each weekly_records as record, i}
					{@const tiebreaker = tiebreakers.find((doc) => doc.uid === record.uid)}
					{@const player = $weekly_players.find((player) => player.uid === record.uid)}
					<WeeklyStandingsRow {player} {i} {tiebreaker} {last_game} {record} />
				{/each}
			{:catch error}
				<ErrorModal>
					Unable to load data: {error}
				</ErrorModal>
			{/await}
		{/if}
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
		grid-template-areas: 'week-selector' 'table';
		gap: 1rem;
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
