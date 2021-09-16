<script lang="ts">
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { myError, myLog } from '$scripts/classes/constants';
	import { Game } from '$scripts/classes/game';
	import { WeeklyPickDoc } from '$scripts/classes/picks';
	import { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection, usersCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, userConverter, weeklyPickConverter } from '$scripts/converters';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import { deleteDoc, doc, getDocs, query, setDoc, where, updateDoc } from '@firebase/firestore';
	import Fa from 'svelte-fa';
	import { getConsensusSpread } from '$scripts/functions';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';

	let weeklyUsers: WebUser[] = [];
	let weeklyGames: Game[] = [];
	let selectedWeek: number = 1;
	let selectedYear: number = new Date().getFullYear();

	const getWeeklyUsers = async () => {
		try {
			const users: WebUser[] = [];
			const q = query(usersCollection, where('weekly', '==', true));
			const querySnapshot = await getDocs(q.withConverter(userConverter));
			querySnapshot.forEach((doc) => {
				const id = doc.id;
				const ref = doc.ref;
				const user = new WebUser({ id: id, ref: ref, ...doc.data() });
				users.push(user);
			});

			const title = 'Got Weekly Users!';
			const msg = 'Retrieved all users who are Weekly Pool players.';
			defaultToast({ title, msg });
			myLog(msg, 'createWeeklyPicksForUser', undefined, users);
			weeklyUsers = users;
			return users;
		} catch (error) {
			const msg = `Encountered an error while trying to get weekly users.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('getWeeklyUsers', error, msg);
		}
	};

	const getAllGames = async () => {
		try {
			const games: Game[] = [];
			const q = query(scheduleCollection);
			const querySnapshot = await getDocs(q.withConverter(gameConverter));
			querySnapshot.forEach((doc) => {
				const docRef = doc.ref;
				const id = doc.id;
				const game = new Game({ id, docRef, ...doc.data() });
				games.push(game);
			});
			weeklyGames = games;
			const title = 'Got All Games!';
			const msg = 'Retrieved all game documents from the Schedule collection.';
			defaultToast({ title, msg });
			myLog(msg, 'getAllGames');
			return games;
		} catch (error) {
			let msg = `Encountered an error while trying to get all game documents.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('getAllGames', error, msg);
		}
	};

	const getMaxGameWeek = async (): Promise<number> => {
		try {
			const gameWeeks = weeklyGames.map((game) => {
				return game.week;
			});
			const maxWeek: number = Math.max.apply(Math, gameWeeks);
			const msg = `determined the max game week was ${maxWeek}`;
			// let msgTitle = 'Created Tiebreakers!';
			// defaultToast(msgTitle, msg);
			myLog(msg, 'getMaxGameWeek');
			return maxWeek;
		} catch (error) {
			let msg = `Encountered an error while finding max game week.`;
			// errorToast(msg);
			myError('createTiebreakersForAllUsers', error, msg);
		}
	};

	let userPromise = getWeeklyUsers();
	let gamePromise = getAllGames();
	let maxWeekPromise = getMaxGameWeek();

	const createWeeklyPicksForAllUsers = async () => {
		try {
			weeklyUsers.forEach((user) => {
				createWeeklyPicksForUser(user, false);
			});
			const title = 'Created Weekly Picks!';
			const msg = 'Pick documents were created for every game, for every Weekly pool user.';
			defaultToast({ title, msg });
			myLog(msg, 'createWeeklyPicksForUser');
		} catch (error) {
			const msg = `Encountered an error while trying to create all users' picks.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('createWeeklyPicksForAllUsers', error, msg);
		}
	};
	const createWeeklyPicksForUser = async (user: WebUser, logAll: boolean = true) => {
		try {
			weeklyGames.forEach((game) => {
				const newWeeklyPickRef = doc(weeklyPicksCollection);
				const pickDoc = new WeeklyPickDoc({
					docRef: newWeeklyPickRef,
					id: game.id,
					pick: '',
					uid: user.id,
					week: game.week,
					year: game.timestamp.toDate().getFullYear(),
					timestamp: game.timestamp,
					game: { ...game },
					type: game.type,
					isCorrect: null
				});
				setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
			});
			const title = 'Created Weekly Picks!';
			const msg = `Pick documents were created for every game for ${user.name} (${user.nickname})`;
			if (logAll) {
				defaultToast({ title, msg });
				myLog(msg, 'createWeeklyPicksForUser');
			}
		} catch (error) {
			const msg = `Encountered an error while trying to delete ${user.name}'s picks.  Check the console for more info. ${error}`;
			if (logAll) {
				errorToast(msg);
				myError('deleteWeeklyPicksForUser', error, msg);
			} else {
				throw error;
			}
		}
	};

	const deleteWeeklyPicksForAllUsers = async () => {
		try {
			const q = query(weeklyPicksCollection);
			const allWeeklyDocs = await getDocs(q);
			allWeeklyDocs.forEach((doc) => {
				deleteDoc(doc.ref);
			});
			const title = 'Deleted Weekly Picks!';
			const msg = 'All pick documents were deleted.';
			defaultToast({ title, msg });
			myLog(msg, 'deleteWeeklyPicksForAllUsers');
		} catch (error) {
			const msg = `Encountered an error while trying to delete all user's picks.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('deleteWeeklyPicksForAllUsers', error, msg);
		}
	};
	const deleteWeeklyPicksForUser = async (user: WebUser) => {
		try {
			const q = query(weeklyPicksCollection, where('uid', '==', user.id));
			const allWeeklyDocsForUser = await getDocs(q);
			allWeeklyDocsForUser.forEach((doc) => {
				deleteDoc(doc.ref);
			});
			const title = 'Deleted Weekly Picks!';
			const msg = `All pick documents were deleted for ${user.name} (${user.nickname})`;
			defaultToast({ title, msg });
			myLog(msg, 'deleteWeeklyPicksForUser');
		} catch (error) {
			const msg = `Encountered an error while trying to delete ${user.name}'s picks. Check the console for more info. ${error}`;
			errorToast(msg);
			myError('deleteWeeklyPicksForUser', error, msg);
		}
	};
	const createTiebreakersForAllUsers = async () => {
		try {
			weeklyUsers.forEach((user) => {
				createTiebreakersForUser(user, false);
			});
			const title = 'Created Tiebreakers!';
			const msg = 'Tiebreaker documents were created for every game, for every Weekly pool user.';
			defaultToast({ title, msg });
			myLog(msg, 'createTiebreakersForAllUsers');
		} catch (error) {
			const msg = `Encountered an error while trying to create all users' tiebreaker documents.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('createTiebreakersForAllUsers', error, msg);
		}
	};
	// @TODO: need to finish this function!
	const createTiebreakersForUser = async (user: WebUser, logAll: boolean = true) => {
		try {
			const maxWeek = await maxWeekPromise;
			const uid = user.id;
			for (let i = 1; i <= maxWeek; i++) {}
			if (logAll) {
			}
		} catch (error) {
			const msg = `Encountered an error while trying to create tiebreaker documents for ${user.name} (${user.nickname})`;
			errorToast(msg);
			myError('createTiebreakersForAllUsers', error, msg);
		}
	};
	const updateSpreads = async (week: number, year: number) => {
		try {
			// Update the pick game objects on the pick documents?
			const q = query(weeklyPicksCollection, where('week', '==', week), where('year', '==', year));
			const picks = await getDocs(q.withConverter(weeklyPickConverter));
			picks.forEach((pick) => {
				const data = pick.data();
				const game = data.game;
				if (isNaN(game.spread)) {
					getUpdatedSpread(game).then((updatedSpread) => {
						const updatedGame = { ...game, spread: updatedSpread };
						updateDoc(pick.ref, { game: updatedGame });
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
		on:click={() => {
			userPromise = getWeeklyUsers();
			gamePromise = getAllGames();
		}}
	>
		<Fa icon={faSync} />
	</button>
	<button on:click={createWeeklyPicksForAllUsers}>Create Picks for All Users</button>
	<button on:click={deleteWeeklyPicksForAllUsers}>Delete All Picks for All Users</button>

	<WeekSelect bind:selectedWeek />
	<YearSelect bind:selectedYear />
	<button on:click={() => updateSpreads(selectedWeek, selectedYear)}>Update Week Spreads</button>
</div>

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

<style lang="scss">
	.grid {
		@include gridAndGap;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20%), 1fr));
	}
	button {
		@include styledButton;
	}
</style>
