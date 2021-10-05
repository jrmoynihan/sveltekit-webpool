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
		removeScoredPicksForWeek,
		removeWinnersFromGames,
		resetWeeklyUserRecords,
		scorePicksForWeek,
		updateTeamsOnScheduleDocs
	} from '$scripts/scorePicks';
	import { resetTeamRecords } from '$scripts/teams';
	import { findWeekDateTimeBounds } from '$scripts/schedule';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import {
		createWeeklyPicksForAllUsers,
		deleteTiebreakersForAllUsers,
		deleteWeeklyPicksForAllUsers,
		getAllGames
	} from '$scripts/weekly/weeklyAdmin';

	let selectedWeek: number = 1;
	let selectedYear: number = new Date().getFullYear();
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
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
<div class="grid">
	<button
		on:click={async () => {
			userPromise = getWeeklyUsers({});
			gamePromise = getAllGames();
			// maxWeekPromise = getMaxGameWeek();
		}}
	>
		<Fa icon={faSync} />
	</button>
	<button on:click={createWeeklyPicksForAllUsers}>Create Picks for All Users</button>
	<button class="deletion" on:click={deleteWeeklyPicksForAllUsers}
		>Delete All Picks for All Users</button
	>

	<WeekSelect bind:selectedWeek />
	<YearSelect bind:selectedYear />
	<button on:click={() => updateGameSpreads(selectedWeek, selectedYear)}
		>Update Spreads for Week {selectedWeek}, {selectedYear}</button
	>
	<button on:click={() => scorePicksForWeek(selectedWeek, selectedYear)}
		>Score Picks For Week {selectedWeek}, {selectedYear}</button
	>
	<button class="deletion" on:click={() => removeScoredPicksForWeek(selectedWeek, selectedYear)}
		>Remove Scored Picks For Week {selectedWeek}, {selectedYear}</button
	>
	<button class="deletion" on:click={() => removeWinnersFromGames(selectedWeek, selectedYear)}
		>Remove Game Winners For Week {selectedWeek}, {selectedYear}</button
	>
	<button class="deletion" on:click={resetTeamRecords}>Reset Team Records</button>
	<button on:click={() => updateTeamsOnScheduleDocs()}>Update Team Records</button>
	<button on:click={() => findWeekDateTimeBounds()}>Find Bounds for Each Week</button>
	<button class="deletion" on:click={() => resetWeeklyUserRecords()}>Reset User Records</button>
	<button class="deletion" on:click={() => deleteTiebreakersForAllUsers()}
		>Delete Tiebreakers for All Users</button
	>
</div>

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
