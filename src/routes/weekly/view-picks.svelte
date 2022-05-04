<script lang="ts">
	import Grid from '$containers/Grid.svelte';
	import TeamImage from '$containers/TeamImage.svelte';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import { ErrorAndToast, myError, myLog } from '$classes/constants';
	import type { Game } from '$classes/game';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { Team } from '$classes/team';
	import { scheduleCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, teamConverter, weeklyPickConverter } from '$scripts/converters';
	import { isBeforeGameTime } from '$scripts/functions';
	import { currentSeasonYear, selectedWeek, useDarkTheme } from '$scripts/store';
	import { teamsCollection } from '$scripts/teams';
	import { query, where, getDocs, orderBy } from 'firebase/firestore';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import type { Player } from '$classes/player';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';

	let selectedYear: number = $currentSeasonYear;
	let hoverPlayer: string;
	let hoverGame: string;

	const getAllPicksForWeek = async (selectedWeek: number, selectedYear: number) => {
		try {
			const weeklyPicks: WeeklyPickDoc[] = [];
			const q = query(
				weeklyPicksCollection,
				where('week', '==', selectedWeek),
				where('year', '==', selectedYear),
				orderBy('gameId')
			);
			const weeklyPickDocs = await getDocs(q.withConverter(weeklyPickConverter));
			weeklyPickDocs.forEach((doc) => {
				weeklyPicks.push(doc.data());
			});
			myLog({
				msg: 'picks: ',
				additional_params: weeklyPicks,
				function_name: 'getAllPicksForWeek',
				location: 'weekly/view-picks.svelte'
			});
			return weeklyPicks;
		} catch (error) {
			const msg = 'Error getting weekly picks. See console for details.';
			ErrorAndToast({
				msg,
				error,
				function_name: 'getAllPicksForWeek',
				location: 'weekly/view-picks.svelte'
			});
		}
	};
	const getAllGamesForWeek = async (selectedWeek: number, selectedYear: number) => {
		try {
			const games: Game[] = [];
			const q = query(
				scheduleCollection,
				where('week', '==', selectedWeek),
				where('year', '==', selectedYear),
				orderBy('id')
			);
			const gameDocs = await getDocs(q.withConverter(gameConverter));
			gameDocs.forEach((doc) => {
				games.push(doc.data());
			});
			myLog({
				msg: 'games: ',
				additional_params: games,
				function_name: 'getAllGamesForWeek',
				location: 'weekly/view-picks.svelte'
			});
			return games;
		} catch (error) {
			const msg = 'Error getting games. See console for details.';
			ErrorAndToast({
				msg,
				error,
				function_name: 'getAllGamesForWeek',
				location: 'weekly/view-picks.svelte'
			});
		}
	};
	const getAllTeams = async () => {
		try {
			const teams: Team[] = [];
			const q = query(teamsCollection);
			const teamDocs = await getDocs(q.withConverter(teamConverter));
			teamDocs.forEach((doc) => {
				teams.push(doc.data());
			});
			return teams;
		} catch (error) {
			const msg = 'Error getting teams. See console for details.';
			ErrorAndToast({
				msg,
				error,
				function_name: 'getAllTeams',
				location: 'weekly/view-picks.svelte'
			});
		}
	};
	const getData = async (selectedWeek: number, selectedYear: number) => {
		picksPromise = getAllPicksForWeek(selectedWeek, selectedYear);
		gamesPromise = getAllGamesForWeek(selectedWeek, selectedYear);
		playersPromise = getWeeklyPlayers(false);
		teamsPromise = getAllTeams();
		const [picks, games, players, teams] = await Promise.all([
			picksPromise,
			gamesPromise,
			playersPromise,
			teamsPromise
		]);
		return { picks, games, players, teams };
	};

	let weekPromise: Promise<number> = findCurrentWeekOfSchedule();
	let playersPromise: Promise<Player[]>;
	let teamsPromise: Promise<Team[]>;
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let gamesPromise: Promise<Game[]>;
	let data_promise: Promise<{
		picks: WeeklyPickDoc[];
		games: Game[];
		players: Player[];
		teams: Team[];
	}> = getData($selectedWeek, selectedYear);

	onMount(async () => {
		// selectedWeek = await weekPromise;  TODO:  this is fine during regular season, but not during playoffs
	});
	$: data_promise = getData($selectedWeek, selectedYear);
</script>

<PageTitle>View League Picks</PageTitle>
<WeekSelect customStyles={'width:fit-content;margin:auto;'} />

{#await data_promise}
	<LoadingSpinner />
{:then { picks, games, players, teams }}
	{#if players && picks && games && teams}
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
					<div
						transition:fade={{ duration: 750 }}
						class="game label"
						class:hovered={hoverGame === game.id}
						on:mouseover={() => (hoverGame = game.id)}
						on:mouseleave={() => (hoverGame = '')}
						on:focus={() => (hoverGame = game.id)}
						on:blur={() => (hoverGame = '')}
					>
						{game.shortName}
					</div>
				{/each}
				<div>Wins</div>
				{#each players as player}
					<div
						transition:fly={{ x: -100, duration: 750 }}
						class="nickname label"
						class:hovered={hoverPlayer === player.uid}
						on:mouseover={() => (hoverPlayer = player.uid)}
						on:mouseleave={() => (hoverPlayer = '')}
						on:focus={() => (hoverPlayer = player.uid)}
						on:blur={() => (hoverPlayer = '')}
					>
						{player.nickname}
					</div>
					{#each games as game}
						{#await isBeforeGameTime(game.timestamp) then notAbleToSee}
							{#each picks as pick}
								{#if pick.uid === player.uid && pick.gameId === game.id}
									{#if pick.pick === null || pick.pick === ''}
										<div transition:fly={{ x: -100, duration: 750 }} class="rounded placeholder">
											-
										</div>
									{:else}
										{#each teams as team}
											{#if team.abbreviation === pick.pick}
												{#if notAbleToSee}
													<div
														transition:fly={{ x: -100, duration: 750 }}
														class="rounded placeholder"
													>
														-
													</div>
												{:else}
													<div
														transition:fly={{ x: -100, duration: 750 }}
														class="rounded image-holder"
														class:winner={pick.isCorrect}
														class:dark={$useDarkTheme}
														class:hovered={hoverPlayer === player.uid || hoverGame === game.id}
														on:mouseover={() => {
															hoverPlayer = player.uid;
															hoverGame = game.id;
														}}
														on:mouseleave={() => {
															hoverPlayer = '';
															hoverGame = '';
														}}
														on:focus={() => {
															hoverPlayer = player.uid;
															hoverGame = game.id;
														}}
														on:blur={() => {
															hoverPlayer = '';
															hoverGame = '';
														}}
													>
														<TeamImage {team} width={'60'} />
													</div>
												{/if}
											{/if}
										{/each}
									{/if}
								{/if}
							{/each}
						{:catch error}
							<ErrorModal {error} />
						{/await}
					{/each}
					{player?.weeklyPickRecord[`week_${selectedWeek}`]?.wins}
				{/each}
			</Grid>
		</TransitionWrapper>
	{/if}
{:catch error}
	<ErrorModal {error} />
{/await}

<style lang="scss">
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
		&.winner {
			background-color: hsla(120, 100%, 20%, 50%);
			&.dark {
				background-color: hsla(120, 18%, 44%, 0.7);
			}
		}
	}
</style>
