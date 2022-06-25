<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { resetScoredPicksForWeek, scorePicksForWeek } from '$scripts/scorePicks';
	import {
		createWeeklyPicksForAllPlayers,
		createWeeklyPicksForPlayer,
		deleteWeeklyPicksForAllPlayers,
		deleteWeeklyPicksForPlayer,
		getFutureGames,
		getSpecificGames
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { selected_player, selected_week, selected_year } from '$scripts/store';
	import { where } from '@firebase/firestore';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	// Min and Max for a minmax grid column function
	let minColumns: string | number = '40%';

	function deleteAllWeeklyPicksForPlayer() {
		deleteWeeklyPicksForPlayer({ player: $selected_player });
	}
	function deleteSpecificWeeklyPicksForPlayer() {
		const constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year)
		];
		deleteWeeklyPicksForPlayer({ player: $selected_player, constraints });
	}
</script>

<AdminExpandSection summaryText="Picks" bind:minColumns {customContentStyles} {customSummaryStyles}>
	<StyledButton on:click={() => scorePicksForWeek($selected_week, $selected_year)}>
		<span>Score Picks For <b>Week {$selected_week}, {$selected_year}</b></span>
	</StyledButton>
	{#if $selected_player}
		<StyledButton
			on:click={async () => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed) {
					const games = await getFutureGames();
					createWeeklyPicksForPlayer({ player: $selected_player, games, showToast: true });
				}
			}}
		>
			<span>Create All Picks for <b>{$selected_player.name}</b></span>
		</StyledButton>
		<StyledButton
			on:click={async () => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed) {
					const constraints = [
						where('week', '==', $selected_week),
						where('year', '==', $selected_year)
					];
					const games = await getSpecificGames({ constraints });
					createWeeklyPicksForPlayer({ player: $selected_player, games, showToast: true });
				}
			}}
		>
			<span
				>Create Picks for <b>{$selected_player.name} for Week {$selected_week}, {$selected_year}</b
				></span
			>
		</StyledButton>
		<StyledButton
			on:click={createWeeklyPicksForAllPlayers}
			text="Create Picks for All Weekly Players"
		/>
		<DeletionButton on:click={deleteAllWeeklyPicksForPlayer}>
			<span>Delete All Picks for <b>{$selected_player.name}</b></span>
		</DeletionButton>
		<DeletionButton on:click={deleteSpecificWeeklyPicksForPlayer}>
			<span
				>Delete All Picks for <b
					>{$selected_player.name} for Week {$selected_week}, {$selected_year}</b
				></span
			>
		</DeletionButton>
	{/if}
	<DeletionButton
		on:click={deleteWeeklyPicksForAllPlayers}
		text="Delete All Picks for All Weekly Players"
	/>
	<DeletionButton on:click={() => resetScoredPicksForWeek($selected_week, $selected_year)}>
		<span>Reset Scored Picks For <b>Week {$selected_week}, {$selected_year}</b></span>
	</DeletionButton>
</AdminExpandSection>
