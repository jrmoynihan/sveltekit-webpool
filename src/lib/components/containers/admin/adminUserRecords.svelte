<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { all_icons } from '$lib/scripts/classes/constants';
	import { defaultToast } from '$lib/scripts/toasts';
	import { LogAndToast } from '$lib/scripts/utilities/logging';
	import { createSeasonRecordForPlayer, getSeasonRecords } from '$lib/scripts/weekly/seasonRecord';
	import {
		createWeeklyRecordsForPlayer,
		deleteWeeklyRecordsForPlayer
	} from '$lib/scripts/weekly/weeklyRecords';
	import {
		all_seasons,
		larger_than_mobile,
		selected_player,
		selected_season_type,
		selected_year,
		weekly_players
	} from '$scripts/store';
	import { where } from '@firebase/firestore';
	import { toast } from '@zerodevx/svelte-toast';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number;
	$: minColumns = $larger_than_mobile ? 0 : '40%';

	// 5/13/2022
	function resetWeeklyPlayerRecords() {
		LogAndToast({ msg: 'Reset Player Records was removed.  Not yet re-implemented!' });
	}
	function createSeasonRecordsForEachWeeklyPlayer() {
		$weekly_players.forEach(async (player) => {
			const constraints = [
				where('uid', '==', player.uid),
				where('season_year', '==', $selected_year)
			];
			const record_doc = await getSeasonRecords({ constraints });
			// If no season record doc already exists for the selected year for this player, create a new one.
			if (record_doc.empty) {
				createSeasonRecordForPlayer({ player, season_year: $selected_year });
			}
		});
		LogAndToast({
			msg: 'Created season records for each weekly player.',
			icon: all_icons.checkmark
		});
	}
	function createWeeklyRecordForEachPlayer() {
		const toast_id = defaultToast({
			title: 'Creating Weekly Records',
			icon: all_icons.hourglass
		});
		for (const player of $weekly_players) {
			toast.set({ id: toast_id, msg: `Creating weekly records for ${player.name}...` });
			const season = $all_seasons.find(
				(s) => s.year === $selected_year && s.type_name === $selected_season_type
			);
			createWeeklyRecordsForPlayer({ player, season });
		}
		toast.set({ id: toast_id, msg: 'Finished making weekly records for all weekly pool players!' });
	}
</script>

<AdminExpandSection
	summaryText="Player Records"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<DeletionButton on:click={resetWeeklyPlayerRecords}>Reset Player Records</DeletionButton>
	<StyledButton on:click={createSeasonRecordsForEachWeeklyPlayer}
		>Create {$selected_year} Season Records For Each Player</StyledButton
	>
	<StyledButton on:click={createWeeklyRecordForEachPlayer}
		>Create {$selected_year} Weekly Records For Each Player</StyledButton
	>
	<DeletionButton on:click={() => deleteWeeklyRecordsForPlayer({ player: $selected_player })}
		>Delete Weekly Records For {$selected_player.name}</DeletionButton
	>
</AdminExpandSection>
