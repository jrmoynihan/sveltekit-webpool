<script lang="ts">
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { myError, myLog } from '$scripts/classes/constants';
	import type { Game } from '$scripts/classes/game';
	import { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection, usersCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, userConverter, weeklyPickConverter } from '$scripts/converters';
	import { defaultToast, errorToast } from '$scripts/toasts';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import { deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
	import Fa from 'svelte-fa';

	let weeklyUsers: WebUser[] = [];
	let weeklyGames: Game[] = [];

	const getWeeklyUsers = async () => {
		try {
			const users: WebUser[] = [];
			const q = query(usersCollection, where('weekly', '==', true));
			const querySnapshot = await getDocs(q.withConverter(userConverter));
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});

			let msgTitle = 'Got Weekly Users!';
			let msg = 'Retrieved all users who are Weekly Pool players.';
			defaultToast(msgTitle, msg);
			myLog(msg, 'createWeeklyPicksForUser', undefined, users);
			weeklyUsers = users;
			return users;
		} catch (error) {
			let msg = `Encountered an error while trying to get weekly users.  Check the console for more info. ${error}`;
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
				games.push(doc.data());
			});
			weeklyGames = games;
			let msgTitle = 'Got All Games!';
			let msg = 'Retrieved all game documents from the Schedule collection.';
			defaultToast(msgTitle, msg);
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
			let msg = `determined the max game week was ${maxWeek}`;
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
			let msgTitle = 'Created Weekly Picks!';
			let msg = 'Pick documents were created for every game, for every Weekly pool user.';
			defaultToast(msgTitle, msg);
			myLog(msg, 'createWeeklyPicksForUser');
		} catch (error) {
			let msg = `Encountered an error while trying to create all users' picks.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('createWeeklyPicksForAllUsers', error, msg);
		}
	};
	const createWeeklyPicksForUser = async (user: WebUser, logAll: boolean = true) => {
		try {
			weeklyGames.forEach((game) => {
				const newWeeklyPickRef = doc(weeklyPicksCollection);
				const pickDoc = new WeeklyPickDoc(
					newWeeklyPickRef,
					game.id,
					'',
					user.id,
					game.week,
					game.timestamp.toDate().getFullYear(),
					game.timestamp,
					{ ...game },
					game.type
				);
				setDoc(newWeeklyPickRef.withConverter(weeklyPickConverter), pickDoc);
			});
			let msgTitle = 'Created Weekly Picks!';
			let msg = `Pick documents were created for every game for ${user.name} (${user.nickname})`;
			if (logAll) {
				defaultToast(msgTitle, msg);
				myLog(msg, 'createWeeklyPicksForUser');
			}
		} catch (error) {
			let msg = `Encountered an error while trying to delete ${user.name}'s picks.  Check the console for more info. ${error}`;
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
			let msgTitle = 'Deleted Weekly Picks!';
			let msg = 'All pick documents were deleted.';
			defaultToast(msgTitle, msg);
			myLog(msg, 'deleteWeeklyPicksForAllUsers');
		} catch (error) {
			let msg = `Encountered an error while trying to delete all user's picks.  Check the console for more info. ${error}`;
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
			let msgTitle = 'Deleted Weekly Picks!';
			let msg = `All pick documents were deleted for ${user.name} (${user.nickname})`;
			defaultToast(msgTitle, msg);
			myLog(msg, 'deleteWeeklyPicksForUser');
		} catch (error) {
			let msg = `Encountered an error while trying to delete ${user.name}'s picks. Check the console for more info. ${error}`;
			errorToast(msg);
			myError('deleteWeeklyPicksForUser', error, msg);
		}
	};
	const createTiebreakersForAllUsers = async () => {
		try {
			weeklyUsers.forEach((user) => {
				createTiebreakersForUser(user, false);
			});
			let msgTitle = 'Created Tiebreakers!';
			let msg = 'Tiebreaker documents were created for every game, for every Weekly pool user.';
			defaultToast(msgTitle, msg);
			myLog(msg, 'createTiebreakersForAllUsers');
		} catch (error) {
			let msg = `Encountered an error while trying to create all users' tiebreaker documents.  Check the console for more info. ${error}`;
			errorToast(msg);
			myError('createTiebreakersForAllUsers', error, msg);
		}
	};
	const createTiebreakersForUser = async (user: WebUser, logAll: boolean = true) => {
		try {
			const maxWeek = await maxWeekPromise;
			const uid = user.id;
			for (let i = 1; i <= maxWeek; i++) {}
			if (logAll) {
			}
		} catch (error) {
			let msg = `Encountered an error while trying to create tiebreaker documents for ${user.name} (${user.nickname})`;
			errorToast(msg);
			myError('createTiebreakersForAllUsers', error, msg);
		}
	};
</script>

<PageTitle>Weekly Pool Admin</PageTitle>
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
	button {
		@include defaultButtonStyles;
	}
</style>
