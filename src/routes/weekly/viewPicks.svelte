<script lang="ts">
	import Grid from '$lib/components/containers/Grid.svelte';
	import TeamImage from '$lib/components/containers/TeamImage.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import { myError, myLog } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';

	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { Team } from '$scripts/classes/team';
	import type { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, teamConverter, weeklyPickConverter } from '$scripts/converters';
	import { isBeforeGameTime } from '$scripts/functions';
	import { findCurrentWeekOfSchedule } from '$scripts/schedule';
	import { useDarkTheme } from '$scripts/store';
	import { teamsCollection } from '$scripts/teams';
	import { errorToast } from '$scripts/toasts';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import { orderBy } from 'firebase/firestore';
	import { getDocs } from 'firebase/firestore';
	import { where } from 'firebase/firestore';
	import { query } from 'firebase/firestore';

	let selectedWeek: number;
	let displayedYear: number = new Date().getFullYear();
	let weeklyPickPromise: WeeklyPickDoc[];
	let gamesPromise: Game[];
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
	const getCurrentWeek = async () => {
		const week = await findCurrentWeekOfSchedule();
		return week;
	};
</script>

<PageTitle>View League Picks</PageTitle>
<!-- <h3><em>(just showcasing the images until I build this page)</em></h3> -->
<!-- <TeamGallery /> -->
<WeekSelect bind:selectedWeek customStyles={'width:fit-content;margin:auto;'} />

{#await getWeeklyUsers(false) then users}
	{#await getAllTeams() then teams}
		{#await getAllPicksForWeek(selectedWeek, displayedYear)}
			Loading...
		{:then picks}
			{#await getAllGamesForWeek(selectedWeek, displayedYear)}
				Loading...
			{:then games}
				{#if users && picks && games}
					<Grid
						repeat={games.length + 2}
						min={'min-content'}
						max={'max-content'}
						gap={'0.4rem;'}
						customStyles={'overflow-x: auto;max-width: 90%;margin: auto;position:relative;justify-content:unset;justify-items:center;'}
					>
						<div />
						{#each games as game}
							<div
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
								{#await isBeforeGameTime(game.timestamp)}
									...
								{:then notAbleToSee}
									{#each picks as pick}
										{#if pick.uid === user.uid && pick.gameId === game.id}
											{#if pick.pick === null || pick.pick === ''}
												<div class="rounded placeholder">-</div>
											{:else}
												{#each teams as team}
													{#if team.abbreviation === pick.pick}
														{#if notAbleToSee}
															<div class="rounded placeholder">-</div>
														{:else}
															<div
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
							{user.weeklyPickRecord[`week_${selectedWeek}`].wins}
						{/each}
					</Grid>
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
		background: rgba(var(--alternate-color) / 80%);
		justify-self: end;
		display: flex;
	}
	.winner {
		background-color: rgba(darkgreen, 20%);
		&.dark {
			background-color: rgba(92 133 92 / 34%);
		}
	}
	.hovered {
		outline: 2px solid rgba(var(--accentValue-color) / 40%);
		&.winner {
			background-color: rgba(darkgreen, 50%);
			&.dark {
				background-color: rgba(92 133 92 / 70%);
			}
		}
	}
</style>
