<script lang="ts">
	import type { Player } from '$classes/player';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { resetScoredPicksForWeek, scorePicksForWeek } from '$scripts/scorePicks';
	import {
		createWeeklyPicksForAllPlayers,
		createWeeklyPicksForPlayer,
		deleteWeeklyPicksForAllPlayers,
		deleteWeeklyPicksForPlayer
	} from '$scripts/weekly/weeklyAdmin';
	import AdminExpandSection from './adminExpandSection.svelte';
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import { selectedWeek } from '$scripts/store';

	export let selectedYear: number;
	export let selectedPlayer: Player;

	// Min and Max for a minmax grid column function
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Picks" bind:minColumns>
	<StyledButton on:click={() => scorePicksForWeek($selectedWeek, selectedYear)}>
		<span>Score Picks For <b>Week {$selectedWeek}, {selectedYear}</b></span>
	</StyledButton>
	{#if selectedPlayer}
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed) createWeeklyPicksForPlayer(selectedPlayer, false, true);
			}}
		>
			<span>Create All Picks for <b>{selectedPlayer.name}</b></span>
		</StyledButton>
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed)
					createWeeklyPicksForPlayer(
						selectedPlayer,
						false,
						true,
						undefined,
						$selectedWeek,
						selectedYear
					);
			}}
		>
			<span
				>Create Picks for <b>{selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}</b
				></span
			>
		</StyledButton>
		<StyledButton
			on:click={createWeeklyPicksForAllPlayers}
			text="Create Picks for All Weekly Players"
		/>
		<DeletionButton
			on:click={() => deleteWeeklyPicksForPlayer(selectedPlayer, $selectedWeek, selectedYear)}
		>
			<span
				>Delete All Picks for <b>{selectedPlayer.name} for Week {$selectedWeek}, {selectedYear}</b
				></span
			>
		</DeletionButton>
	{/if}
	<DeletionButton
		on:click={deleteWeeklyPicksForAllPlayers}
		text="Delete All Picks for All Weekly Players"
	/>
	<DeletionButton on:click={() => resetScoredPicksForWeek($selectedWeek, selectedYear)}>
		<span>Reset Scored Picks For <b>Week {$selectedWeek}, {selectedYear}</b></span>
	</DeletionButton>
</AdminExpandSection>
