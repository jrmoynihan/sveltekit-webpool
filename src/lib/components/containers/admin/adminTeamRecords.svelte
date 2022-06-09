<script lang="ts">
	import DeletionButton from '$lib/components/buttons/DeletionButton.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { defaultToast } from '$lib/scripts/toasts';
	import { updateTeamRecordsFromESPN } from '$scripts/scorePicks';
	import { all_teams, larger_than_mobile, selected_year } from '$scripts/store';
	import { updateDoc } from '@firebase/firestore';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;

	const resetTeamRecordsForASpecificYear = async (year: number, skipConfirmation = false) => {
		let proceed: boolean;
		skipConfirmation ? (proceed = true) : (proceed = false);
		proceed = confirm('Are you sure you want to reset the team records?');
		if (proceed) {
			$all_teams.forEach((team) => {
				const current_records = team.records;
				// NOTE: This *will* mutate the found record within the records array
				// https://stackoverflow.com/a/62497208/11080659
				const record_for_selected_year = current_records.find((record) => record.year === year);
				if (record_for_selected_year) {
					record_for_selected_year.wins = 0;
					record_for_selected_year.losses = 0;
					record_for_selected_year.ties = 0;
				}
				updateDoc(team.docRef, { records: current_records });
			});
			defaultToast({
				title: 'Records Reset!',
				msg: 'All team records have been reset to 0-0-0 (Wins-Losses-Ties).'
			});
		}
	};

	let minColumns: string | number;
	$: minColumns = $larger_than_mobile ? 0 : '40%';
</script>

<AdminExpandSection
	summaryText="NFL Teams"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<StyledButton
		on:click={() => {
			updateTeamRecordsFromESPN($selected_year);
		}}>Update Team Records for {$selected_year}</StyledButton
	>
	<DeletionButton on:click={() => resetTeamRecordsForASpecificYear($selected_year)}
		>Reset Team Records for {$selected_year}</DeletionButton
	>
</AdminExpandSection>
