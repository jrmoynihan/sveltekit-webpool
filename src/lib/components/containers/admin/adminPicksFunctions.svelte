<script lang="ts">
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
	import { selected_player, selected_week, selected_year } from '$scripts/store';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	// Min and Max for a minmax grid column function
	let minColumns: string | number = '40%';
</script>

<AdminExpandSection summaryText="Picks" bind:minColumns {customContentStyles} {customSummaryStyles}>
	<StyledButton on:click={() => scorePicksForWeek($selected_week, $selected_year)}>
		<span>Score Picks For <b>Week {$selected_week}, {$selected_year}</b></span>
	</StyledButton>
	{#if $selected_player}
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed) createWeeklyPicksForPlayer({ player: $selected_player });
			}}
		>
			<span>Create All Picks for <b>{$selected_player.name}</b></span>
		</StyledButton>
		<StyledButton
			on:click={() => {
				const proceed = confirm(
					'Are you sure?  These picks are created upon joining the pool.  You may want to delete all existing pick documents first, or delete/create picks for an individual player instead.'
				);
				if (proceed)
					createWeeklyPicksForPlayer(
						$selected_player,
						false,
						true,
						undefined,
						$selected_week,
						$selected_year
					);
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
		<DeletionButton
			on:click={() => deleteWeeklyPicksForPlayer($selected_player, $selected_week, $selected_year)}
		>
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
