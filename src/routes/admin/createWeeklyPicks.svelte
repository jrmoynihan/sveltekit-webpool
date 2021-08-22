<script lang="ts">
	import AccordionDetails from '$lib/components/containers/AccordionDetails.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type { Game } from '$scripts/classes/game';
	import { WeeklyPickDoc } from '$scripts/classes/picks';
	import type { WebUser } from '$scripts/classes/webUser';
	import { scheduleCollection, usersCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, userConverter, weeklyPickConverter } from '$scripts/converters';
	import { defaultToast } from '$scripts/toasts';
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

			console.log('got users!', users);
			weeklyUsers = users;
			return users;
		} catch (error) {
			console.log('getWeeklyUsers had an error: ', error);
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

			console.log('got games!', games);
			weeklyGames = games;
			return games;
		} catch (error) {
			console.log('getGames had an error: ', error);
		}
	};
	let userPromise = getWeeklyUsers();
	let gamePromise = getAllGames();

	const createWeeklyPicksForAllUsers = async () => {
		try {
			weeklyUsers.forEach((user) => {
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
			});
			defaultToast(
				'Created Weekly Picks!',
				'Pick documents were created for every game, for every Weekly pool user.'
			);
			// alert('created WeeklyPicks!!');
		} catch (error) {
			console.log(error);
			alert(error);
		}
	};
	const deleteWeeklyPicksForAllUsers = async () => {
		const q = query(weeklyPicksCollection);
		const allWeeklyDocs = await getDocs(q);
		allWeeklyDocs.forEach((doc) => {
			deleteDoc(doc.ref);
		});
		defaultToast('Deleted Weekly Picks!', 'All pick documents were deleted.');
		// alert('deleted WeeklyPicks!!');
	};
</script>

<PageTitle>Create Weekly Picks</PageTitle>
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
	Loading Users...
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
	Loading Games...
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
