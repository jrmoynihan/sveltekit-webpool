<script lang="ts">
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { myError, myLog } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import type { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection } from '$scripts/collections';
	import { gameConverter } from '$scripts/converters';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import { getDocs, query, where, updateDoc } from '@firebase/firestore';
	import Fa from 'svelte-fa';
	import { getConsensusSpread } from '$scripts/functions';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import {
		resetScoredPicksForWeek,
		removeWinnersFromGames,
		resetWeeklyUserRecords,
		scorePicksForWeek,
		updateGamesAndATSWinners,
		updateTeamRecords
	} from '$scripts/scorePicks';
	import { resetTeamRecords } from '$scripts/teams';
	import { findWeekDateTimeBounds } from '$scripts/schedule';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import {
		createWeeklyPicksForAllUsers,
		createWeeklyPicksForUser,
		deleteTiebreakersForAllUsers,
		deleteWeeklyPicksForAllUsers,
		deleteWeeklyPicksForUser,
		getAllGames
	} from '$scripts/weekly/weeklyAdmin';
	import UserSelect from '$lib/components/selects/UserSelect.svelte';
	import Tooltip from '$lib/components/containers/Tooltip.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';

	let selectedWeek: number = 1;
	let selectedYear: number = new Date().getFullYear();
	let selectedUser: WebUser;
	let userPromise: Promise<WebUser[]>;
	let gamePromise: Promise<Game[]>;

	const updateGameSpreads = async (week: number, year: number) => {
		try {
			// Update the pick game objects on the pick documents?
			const q = query(scheduleCollection, where('week', '==', week), where('year', '==', year));
			const games = await getDocs(q.withConverter(gameConverter));
			games.forEach((gameDoc) => {
				const game = gameDoc.data();
				if (isNaN(game.spread)) {
					getUpdatedSpread(game).then((updatedSpread) => {
						updateDoc(gameDoc.ref, { spread: updatedSpread });
					});
				}
			});
			defaultToast({
				title: 'Updated Spreads!',
				msg: `Week ${selectedWeek} spreads were successfully updated!`
			});
		} catch (error) {
			errorToast('Failed to update spreads.  See console logs.');
			myError('updateSpreads', error);
		}
	};
	const getUpdatedSpread = async (game: Game) => {
		const updatedSpread = await getConsensusSpread(game.id);
		return updatedSpread;
	};
	const customGridStyles =
		'grid-template-columns: minmax(15%,max-content) repeat(auto-fit,minmax(0,1fr));';
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
<Grid>
	<Grid customStyles={customGridStyles}>
		<button
			on:click={async () => {
				userPromise = getWeeklyUsers();
				gamePromise = getAllGames();
				// maxWeekPromise = getMaxGameWeek();
			}}
		>
			<Fa icon={faSync} />
		</button>
		<WeekSelect bind:selectedWeek />
		<YearSelect bind:selectedYear />

		{#await userPromise}
			Loading users...
		{:then users}
			<UserSelect bind:selectedUser />
		{/await}
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<h3>Spreads</h3>
		<button on:click={() => updateGameSpreads(selectedWeek, selectedYear)}>
			<span>Update Spreads for <b> Week {selectedWeek}, {selectedYear}</b></span>
		</button>
	</Grid>
	<hr />
	<Grid
		customStyles={`grid-template-rows: 1fr 1fr;grid-template-columns:minmax(10%,max-content) repeat(auto-fit,minmax(25%,1fr));`}
	>
		<h3 style="grid-row: span 2;">Picks</h3>
		<button on:click={() => scorePicksForWeek(selectedWeek, selectedYear)}>
			<span>Score Picks For <b>Week {selectedWeek}, {selectedYear}</b></span>
		</button>
		<button class="deletion" on:click={() => resetScoredPicksForWeek(selectedWeek, selectedYear)}>
			<span>Reset Scored Picks For <b>Week {selectedWeek}, {selectedYear}</b></span>
		</button>
		{#if selectedUser}
			<button
				on:click={() => {
					const proceed = confirm(
						'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual user instead.'
					);
					if (proceed) {
						createWeeklyPicksForUser(selectedUser, false, true);
					}
				}}
			>
				<span>Create Picks for <b>{selectedUser.name}</b></span>
			</button>
			<button on:click={createWeeklyPicksForAllUsers}>Create Picks for All Users</button>
			<button
				class="deletion"
				on:click={() => deleteWeeklyPicksForUser(selectedUser, selectedWeek, selectedYear)}
			>
				<span
					>Delete All Picks for <b>{selectedUser.name} for Week {selectedWeek}, {selectedYear}</b
					></span
				>
			</button>
		{/if}
		<button class="deletion" on:click={deleteWeeklyPicksForAllUsers}>
			<span />Delete All Picks for All Users
		</button>
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<h3>Tiebreakers</h3>
		<button on:click={() => alert('Not Yet Implemented!')}>
			[NYI] Create Tiebreakers for All Users
		</button>
		<button class="deletion" on:click={() => deleteTiebreakersForAllUsers()}>
			Delete Tiebreakers for All Users
		</button>
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<h3>Games</h3>
		<button on:click={() => updateGamesAndATSWinners(selectedWeek)}>
			<span>Find Winners of <b>Week {selectedWeek}</b> Games</span>
		</button>
		<button class="deletion" on:click={() => removeWinnersFromGames(selectedWeek, selectedYear)}>
			<span>Remove Game Winners For <b>Week {selectedWeek}, {selectedYear}</b></span>
		</button>
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<h3>NFL Team Records</h3>
		<button
			on:click={() => {
				const proceed = confirm('Have you already updated the game winners?  If so, click OK.');
				if (proceed) {
					updateTeamRecords();
				}
			}}>Update Team Records</button
		>
		<button class="deletion" on:click={resetTeamRecords}>Reset Team Records</button>
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<Tooltip>
			<p slot="text">User pick records are created when games are <i>scored</i>.</p>
			<h3 slot="content">User Records (Weekly/Season)</h3>
		</Tooltip>
		<button class="deletion" on:click={() => resetWeeklyUserRecords()}>Reset User Records</button>
	</Grid>
	<hr />
	<Grid customStyles={customGridStyles}>
		<h3>Schedule</h3>
		<button on:click={() => findWeekDateTimeBounds()}>Find Bounds for Each Week</button>
	</Grid>
</Grid>

{#if userPromise}
	{#await userPromise}
		<LoadingSpinner msg="Loading users..." />
	{:then weeklyUsers}
		<AccordionDetails expandTitle="Weekly Users">
			<svelte:fragment slot="content">
				{#each weeklyUsers as user}
					<p>{user.name} -- weekly: {user.weekly}</p>
				{/each}
			</svelte:fragment>
		</AccordionDetails>
	{/await}
{/if}

{#if gamePromise}
	{#await gamePromise}
		<LoadingSpinner msg="Loading games..." />
	{:then games}
		<AccordionDetails expandTitle="Weekly Games">
			<svelte:fragment slot="content">
				{#each games as game}
					<p>{game.name}</p>
				{/each}
			</svelte:fragment>
		</AccordionDetails>
	{/await}
{/if}

<style lang="scss">
	.grid {
		@include gridAndGap;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20%), 1fr));
	}
	button {
		@include styledButton;
	}
	.deletion {
		background: darkred;
		border: 4px solid firebrick;
	}
</style>
