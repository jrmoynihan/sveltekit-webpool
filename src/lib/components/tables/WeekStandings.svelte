<script lang="ts">
	import {
		selected_season_type,
		selected_week,
		selected_year,
		weekly_players,
		window_width
	} from '$scripts/store';
	import { where, orderBy, setDoc, doc } from '@firebase/firestore';
	import {
		getGameData,
		getTiebreakerData,
		getWeeklyRecordData
	} from '$scripts/weekly/weeklyPlayers';
	import { ErrorAndToast, LogAndToast } from '$scripts/logging';
	import type { Game } from '$classes/game';
	import ErrorModal from '../modals/ErrorModal.svelte';
	import { WeeklyTiebreaker } from '$classes/tiebreaker';
	import { mobile_breakpoint } from '$scripts/site';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import WeeklyStandingsRow from '$components/tables/WeeklyStandingsRow.svelte';
	import ReturnToTop from '$components/buttons/ReturnToTop.svelte';
	import { PlayerRecord } from '$lib/scripts/classes/playerRecord';
	import { dev } from '$app/env';
	import AdminOnlyControl from '../misc/AdminOnlyControl.svelte';
	import YearSelect from '../selects/YearSelect.svelte';
	import { weeklyRecordsCollection, weeklyTiebreakersCollection } from '$lib/scripts/collections';
	import { recordConverter, weeklyTiebreakerConverter } from '$lib/scripts/converters';

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
			orderBy('wins', 'desc'),
			orderBy('net_tiebreaker_absolute')
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
		let need_to_update_records = false;
		let need_to_update_tiebreakers = false;

		if (!last_game) {
			LogAndToast({
				title: 'No last game found.',
				msg: 'An admin needs to reset the game data to identify the last game of the week.'
			});
			return;
		}

		// Make sure a record doc exists for each player. If not, create one.
		$weekly_players.forEach((player) => {
			const found_player_record = weekly_records?.find((record) => record.uid === player.uid);
			if (!found_player_record) {
				const new_record_doc_ref = doc(weeklyRecordsCollection);
				const new_record = new PlayerRecord({
					doc_ref: new_record_doc_ref,
					uid: player.uid,
					season_year: $selected_year,
					season_type: $selected_season_type,
					week: $selected_week,
					wins: 0,
					losses: 0,
					net_tiebreaker: 0,
					net_tiebreaker_absolute: 0,
					prize_amount: 0
				});
				setDoc(new_record_doc_ref.withConverter(recordConverter), new_record);
				need_to_update_records = true;
			}
			const found_tiebreaker = tiebreakers?.find((tiebreaker) => tiebreaker.uid === player.uid);
			if (!found_tiebreaker) {
				const new_tiebreaker_doc_ref = doc(weeklyTiebreakersCollection);
				const new_tiebreaker = new WeeklyTiebreaker({
					doc_ref: new_tiebreaker_doc_ref,
					uid: player.uid,
					season_year: $selected_year,
					season_type: $selected_season_type,
					week: $selected_week,
					score_guess: 0
				});
				setDoc(new_tiebreaker_doc_ref.withConverter(weeklyTiebreakerConverter), new_tiebreaker);
				need_to_update_tiebreakers = true;
			}
		});
		if (need_to_update_records) {
			weekly_records = await getWeeklyRecordData({
				constraints: weekly_player_record_constraints
			});
		}
		if (need_to_update_tiebreakers) {
			tiebreakers = await getTiebreakerData({
				constraints: tiebreaker_constraints
			});
		}

		return { tiebreakers, last_game, weekly_records };
	};

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

<div class="week grid" class:dev style="--columns:{header_count}">
	<WeekSelect
		customStyles="grid-area:week-selector;"
		on:change={changeData}
		on:incrementWeek={changeData}
		on:decrementWeek={changeData}
	/>
	{#if dev}
		<AdminOnlyControl>
			<YearSelect on:change={changeData} grid_area={'year-selector'} />
		</AdminOnlyControl>
	{/if}
	<div class="table grid" class:dev>
		{#each week_headers as header}
			<div class="header">{header}</div>
		{/each}
		{#await data_promise then { tiebreakers, last_game, weekly_records }}
			{#if weekly_records.length === $weekly_players.length && tiebreakers.length === $weekly_players.length && last_game}
				{#each $weekly_players as player, i}
					{@const tiebreaker = tiebreakers.find((doc) => doc.uid === player.uid)}
					{@const record = weekly_records.find((doc) => doc.uid === player.uid)}
					<WeeklyStandingsRow {player} {i} {tiebreaker} {last_game} {record} />
				{/each}
			{/if}
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
		grid-template-areas: 'week-selector' 'table';
		gap: 1rem;
		&.dev {
			grid-template-areas: 'week-selector year-selector' 'table table';
			grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		}
	}
	.table {
		grid-template-columns: repeat(var(--columns), minmax(max-content, 1fr));
		padding-bottom: 1rem;
		column-gap: 0;
		&.dev {
			grid-column: 1 / span 2;
		}
	}

	.header {
		font-weight: bold;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid hsla(var(--accent-value, hsl(37, 75%, 65%)), 50%);
	}
</style>
