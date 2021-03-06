<script lang="ts">
	import type { Game } from '$classes/game';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import Grid from '$containers/Grid.svelte';
	import TeamImage from '$containers/TeamImage.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import { isBeforeGameTime } from '$lib/scripts/utilities/functions';
	import { createWeeklyPicksForPlayer } from '$lib/scripts/weekly/weeklyAdmin';
	import { getGameData, getPicksData } from '$lib/scripts/weekly/weeklyPlayers';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import {
		all_teams,
		selected_week,
		selected_year,
		use_dark_theme,
		weekly_players
	} from '$scripts/store';
	import { orderBy, QueryConstraint, where } from '@firebase/firestore';
	import { fade, fly } from 'svelte/transition';

	let hover_player: string;
	let hover_game: string;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let gamesPromise: Promise<Game[]>;
	let data_promise: Promise<{ picks: WeeklyPickDoc[]; games: Game[] }>;

	const createMissingPicks = async (picks: WeeklyPickDoc[], games: Game[]) => {
		for await (const player of $weekly_players) {
			const games_with_missing_picks = [];
			const player_pick_docs = picks.filter((pick) => pick.uid === player.uid);
			for await (const game of games) {
				const game_pick_doc = player_pick_docs.find((pick) => pick.game_id === game.id);
				if (!game_pick_doc) {
					games_with_missing_picks.push(game);
				}
			}
			if (games_with_missing_picks.length > 0) {
				console.log(
					`Creating missing picks for ${player.name}.  Missing games: `,
					games_with_missing_picks
				);
				await createWeeklyPicksForPlayer({
					player,
					games: games_with_missing_picks
				});
			} else {
				console.log(`${player.name} has all picks`);
			}
		}
	};
	const confirmAllPicksArePresent = async (
		picks: WeeklyPickDoc[],
		games: Game[],
		picks_constraints: QueryConstraint[]
	) => {
		// If the number of pick docs returned doesn't equal the number of players times the number of games, there are missing docs.
		if (picks.length !== $weekly_players.length * games.length) {
			console.log(
				`not all picks are present! Expected: ${$weekly_players.length} weekly players * ${
					games.length
				} games = ${$weekly_players.length * games.length} picks; only got ${picks.length} picks`
			);
			// A fallback to create missing picks on the fly
			await createMissingPicks(picks, games);
			console.log('created missing picks...');
			// Get the full set of picks, now that the missing ones have been created
			picks = await getPicksData({ constraints: picks_constraints });
			console.log('all picks are now present!');
			return picks;
		} else {
			return picks;
		}
	};
	const getData = async () => {
		const picks_constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year),
			orderBy('uid'),
			orderBy('timestamp')
		];
		const games_constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year),
			orderBy('timestamp')
		];
		picksPromise = getPicksData({ constraints: picks_constraints });
		gamesPromise = getGameData({ constraints: games_constraints });
		let [picks, games] = await Promise.all([picksPromise, gamesPromise]);
		picks = await confirmAllPicksArePresent(picks, games, picks_constraints);
		return { picks, games };
	};

	$: if ($selected_week && $selected_year) data_promise = getData();
</script>

<section class="view-picks">
	<PageTitle>View League Picks</PageTitle>
	<WeekSelect customStyles={'width:fit-content;margin:auto;'} />

	{#await data_promise}
		<LoadingSpinner />
	{:then { picks, games }}
		{#if picks && games}
			<TransitionWrapper refresh={picks}>
				<Grid
					repeatColumns={games.length + 2}
					minColumns={'min-content'}
					maxColumns={'max-content'}
					gap={'0.4rem;'}
					customStyles={'overflow-x: auto;max-width: 90%;margin: auto;position:relative;justify-content:unset;justify-items:center;'}
				>
					<div />
					{#each games as game}
						{@const home = game.home_team_abbreviation}
						{@const away = game.away_team_abbreviation}
						<div
							transition:fade={{ duration: 750 }}
							class="game label"
							class:hovered={hover_game === game.id}
							on:mouseover={() => (hover_game = game.id)}
							on:mouseleave={() => (hover_game = '')}
							on:focus={() => (hover_game = game.id)}
							on:blur={() => (hover_game = '')}
						>
							<p>{home}</p>
							<p>@</p>
							<p>{away}</p>
						</div>
					{/each}
					<div>Wins</div>
					{#each $weekly_players.sort((a, b) => (a.nickname > b.nickname ? 1 : -1)) as player}
						{@const player_picks = picks.filter((pick) => pick.uid === player.uid)}
						<div
							transition:fly={{ x: -100, duration: 750 }}
							class="nickname label"
							class:hovered={hover_player === player.uid}
							on:mouseover={() => (hover_player = player.uid)}
							on:mouseleave={() => (hover_player = '')}
							on:focus={() => (hover_player = player.uid)}
							on:blur={() => (hover_player = '')}
						>
							{player.nickname}
						</div>
						{#each games as game}
							{#await isBeforeGameTime(game.timestamp) then before_gametime}
								{#each player_picks as pick_doc}
									{@const { pick, game_id, is_correct } = pick_doc}
									{@const picked_team = $all_teams.find((team) => team.abbreviation === pick)}
									<!-- Match the pick document to the game -->
									{#if game_id === game.id}
										<!-- If there's no pick, display a placeholder dash -->
										{#if pick === null || pick === '' || before_gametime}
											<div
												transition:fly={{ x: -100, duration: 750 }}
												class="rounded placeholder no-pick"
											>
												-
											</div>
										{:else}
											<div
												transition:fly={{ x: -100, duration: 750 }}
												class="rounded image-holder"
												class:winner={is_correct}
												class:dark={$use_dark_theme}
												class:hovered={hover_player === player.uid || hover_game === game.id}
												on:mouseover={() => {
													hover_player = player.uid;
													hover_game = game.id;
												}}
												on:mouseleave={() => {
													hover_player = '';
													hover_game = '';
												}}
												on:focus={() => {
													hover_player = player.uid;
													hover_game = game.id;
												}}
												on:blur={() => {
													hover_player = '';
													hover_game = '';
												}}
											>
												<TeamImage team={picked_team} />
											</div>
										{/if}
									{/if}
								{/each}
							{:catch error}
								<ErrorModal {error} />
							{/await}
						{/each}
						{player_picks.filter((pick) => pick.is_correct).length}
					{/each}
				</Grid>
			</TransitionWrapper>
		{/if}
	{:catch error}
		<ErrorModal {error} />
	{/await}
</section>

<style lang="scss">
	.view-picks {
		display: grid;
		grid-template-rows: repeat(3, minmax(0, auto));
		gap: 0.5rem;
	}
	div {
		padding: 1em;
	}
	.rounded {
		border-radius: 5rem;
	}
	.label {
		border-radius: 1rem;
	}
	.image-holder {
		display: grid;
		place-items: center;
		height: 3.75rem;
		width: 3.75rem;
	}
	.placeholder {
		height: 3.75rem;
		width: 3.75rem;
	}
	.nickname {
		z-index: var(--above);
		background: hsla(var(--background-value), 80%);
		justify-self: end;
		display: flex;
		position: sticky;
		left: -1rem;
		backdrop-filter: blur(3px);
		&.hovered {
			background: hsla(var(--background-value), 100%);
		}
	}
	.winner {
		background-color: hsla(120, 100%, 20%, 20%);
		&.dark {
			background-color: hsla(120, 18%, 44%, 0.34);
		}
	}
	.hovered {
		outline: 2px solid hsla(var(--accent-value), 40%);
		transition: background-color 350ms ease-in-out, outline 20ms ease-in-out;
		&.winner {
			background-color: hsla(120, 100%, 20%, 50%);
			&.dark {
				background-color: hsla(120, 18%, 44%, 0.7);
			}
		}
	}
</style>
