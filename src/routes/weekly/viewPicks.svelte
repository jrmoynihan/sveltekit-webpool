<script lang="ts">
	import Grid from '$containers/Grid.svelte';
	import TeamImage from '$containers/TeamImage.svelte';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import { myError, myLog } from '$classes/constants';
	import type { Game } from '$classes/game';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { Team } from '$classes/team';
	import { scheduleCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, teamConverter, weeklyPickConverter } from '$scripts/converters';
	import { isBeforeGameTime } from '$scripts/functions';
	import { selectedWeek, useDarkTheme } from '$scripts/store';
	import { teamsCollection } from '$scripts/teams';
	import { errorToast } from '$scripts/toasts';
	import { query, where, getDocs, orderBy } from 'firebase/firestore';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import type { Player } from '$classes/player';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';

	let now = new Date();
	// let selectedWeek: number = 1;
	let selectedYear: number = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear();
	let hoverUser: string;
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
			myLog('picks', 'getAllPicksForWeek', null, weeklyPicks);
			return weeklyPicks;
		} catch (error) {
			errorToast('error in getAllPicksForWeek');
			myError('getAllPicksForWeek', error);
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
			myLog('games', 'getAllGamesForWeek', null, games);
			return games;
		} catch (error) {
			errorToast('error in getAllGamesForWeek');
			myError('getAllGamesForWeek', error);
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
			errorToast('error in getAllTeams');
			myError('getAllTeams', error);
		}
	};
	const getData = async (selectedWeek: number, selectedYear: number) => {
		picksPromise = getAllPicksForWeek(selectedWeek, selectedYear);
		gamesPromise = getAllGamesForWeek(selectedWeek, selectedYear);
	};

	let weekPromise: Promise<number> = findCurrentWeekOfSchedule();
	let userPromise: Promise<Player[]> = getWeeklyPlayers(false);
	let teamsPromise: Promise<Team[]> = getAllTeams();
	let picksPromise: Promise<WeeklyPickDoc[]>;
	let gamesPromise: Promise<Game[]>;

	onMount(async () => {
		// selectedWeek = await weekPromise;  TODO:  this is fine during regular season, but not during playoffs
		getData($selectedWeek, selectedYear);
	});
</script>

<PageTitle>View League Picks</PageTitle>
<!-- <h3><em>(just showcasing the images until I build this page)</em></h3> -->
<!-- <TeamGallery /> -->
<WeekSelect
	customStyles={'width:fit-content;margin:auto;'}
	on:weekChanged={() => getData($selectedWeek, selectedYear)}
	on:decrementWeek={() => getData($selectedWeek, selectedYear)}
	on:incrementWeek={() => getData($selectedWeek, selectedYear)}
/>

{#await userPromise then users}
	{#await teamsPromise then teams}
		{#await picksPromise then picks}
			{#await gamesPromise}
				<span transition:fade style="margin: auto;">Loading...</span>
			{:then games}
				{#if users && picks && games}
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
							{#each users as user}
								<div
									transition:fly={{ x: -100, duration: 750 }}
									class="nickname label"
									class:hovered={hoverUser === user.uid}
									on:mouseover={() => (hoverUser = user.uid)}
									on:mouseleave={() => (hoverUser = '')}
									on:focus={() => (hoverUser = user.uid)}
									on:blur={() => (hoverUser = '')}
								>
									{user.nickname}
								</div>
								{#each games as game}
									{#await isBeforeGameTime(game.timestamp) then notAbleToSee}
										{#each picks as pick}
											{#if pick.uid === user.uid && pick.gameId === game.id}
												{#if pick.pick === null || pick.pick === ''}
													<div
														transition:fly={{ x: -100, duration: 750 }}
														class="rounded placeholder"
													>
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
																	class:hovered={hoverUser === user.uid || hoverGame === game.id}
																	on:mouseover={() => {
																		hoverUser = user.uid;
																		hoverGame = game.id;
																	}}
																	on:mouseleave={() => {
																		hoverUser = '';
																		hoverGame = '';
																	}}
																	on:focus={() => {
																		hoverUser = user.uid;
																		hoverGame = game.id;
																	}}
																	on:blur={() => {
																		hoverUser = '';
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
								{user?.weeklyPickRecord[`week_${selectedWeek}`]?.wins}
							{/each}
						</Grid>
					</TransitionWrapper>
				{/if}
			{:catch error}
				<ErrorModal {error} />
			{/await}
		{:catch error}
			<ErrorModal {error} />
		{/await}
	{:catch error}
		<ErrorModal {error} />
	{/await}
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
