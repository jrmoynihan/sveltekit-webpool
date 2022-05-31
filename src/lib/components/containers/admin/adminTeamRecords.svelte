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

	const resetTeamRecords = async (skipConfirmation = false) => {
		let proceed: boolean;
		skipConfirmation ? (proceed = true) : (proceed = false);
		proceed = confirm('Are you sure you want to reset the team records?');
		if (proceed) {
			$all_teams.forEach((team) => {
				updateDoc(team.docRef, { wins: 0, losses: 0, ties: 0 });
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
	<DeletionButton on:click={() => resetTeamRecords()}>Reset Team Records</DeletionButton>
</AdminExpandSection>
