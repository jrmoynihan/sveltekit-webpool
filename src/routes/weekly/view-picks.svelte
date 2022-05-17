<script lang="ts">
	import Grid from '$containers/Grid.svelte';
	import TeamImage from '$containers/TeamImage.svelte';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import ErrorModal from '$components/modals/ErrorModal.svelte';
	import WeekSelect from '$components/selects/WeekSelect.svelte';
	import { ErrorAndToast, myLog } from '$scripts/logging';
	import type { Game } from '$classes/game';
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	// import type { Team } from '$classes/team';
	import { scheduleCollection, teamsCollection, weeklyPicksCollection } from '$scripts/collections';
	import { gameConverter, teamConverter, weeklyPickConverter } from '$scripts/converters';
	import { isBeforeGameTime } from '$scripts/functions';
	import {
		all_teams,
		selected_week,
		selected_year,
		use_dark_theme,
		weekly_players
	} from '$scripts/store';
	import { where, orderBy } from '@firebase/firestore';
	import { fade, fly } from 'svelte/transition';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import { getGameData, getPicksData } from '$lib/scripts/weekly/weeklyPlayers';

	let hoverPlayer: string;
	let hoverGame: string;

	const getData = async () => {
		const picks_constraints = [
			where('week', '==', $selected_week),
			where('year', '==', $selected_year),
			orderBy('game_id')
		];
		const games_constraints = [
			where('week', '==', $selected_week),
			where('year', '==', $selected_year),
			orderBy('id')
		];
		picksPromise = getPicksData({ constraints: picks_constraints });
		gamesPromise = getGameData({ constraints: games_constraints });
		const [picks, games] = await Promise.all([picksPromise, gamesPromise]);
		return { picks, games };
	};

	let picksPromise: Promise<WeeklyPickDoc[]>;
	let gamesPromise: Promise<Game[]>;
	let data_promise: Promise<{ picks: WeeklyPickDoc[]; games: Game[] }> = getData();

	function changedWeek() {
		data_promise = getData();
	}
	$: {
		$selected_week;
		data_promise = getData();
	}
</script>

<PageTitle>View League Picks</PageTitle>
<WeekSelect
	customStyles={'width:fit-content;margin:auto;'}
	on:change={changedWeek}
	on:incrementWeek={changedWeek}
	on:decrementWeek={changedWeek}
/>

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
					<div
						transition:fade={{ duration: 750 }}
						class="game label"
						class:hovered={hoverGame === game.id}
						on:mouseover={() => (hoverGame = game.id)}
						on:mouseleave={() => (hoverGame = '')}
						on:focus={() => (hoverGame = game.id)}
						on:blur={() => (hoverGame = '')}
					>
						{game.short_name}
					</div>
				{/each}
				<div>Wins</div>
				{#each $weekly_players as player}
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
							{#each picks as pickdoc}
								{@const { pick, uid, game_id, is_correct } = pickdoc}
								{#if uid === player.uid && game_id === game.id}
									{#if pick === null || pick === ''}
										<div transition:fly={{ x: -100, duration: 750 }} class="rounded placeholder">
											-
										</div>
									{:else}
										{#each $all_teams as team}
											{#if team.abbreviation === pick}
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
														class:winner={is_correct}
														class:dark={$use_dark_theme}
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
					<!-- TODO: add back player win record for the displayed week -->
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
		transition: background-color 350ms ease-in-out, outline 20ms ease-in-out;
		&.winner {
			background-color: hsla(120, 100%, 20%, 50%);
			&.dark {
				background-color: hsla(120, 18%, 44%, 0.7);
			}
		}
	}
</style>
