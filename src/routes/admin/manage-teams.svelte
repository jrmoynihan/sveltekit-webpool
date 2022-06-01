<script lang="ts">
	import { teamConverter } from '$scripts/converters';
	import { doc, DocumentReference, setDoc } from '@firebase/firestore';
	import type { Team } from '$scripts/classes/team';
	import { conferences, divisions } from '$scripts/classes/constants';
	import PageTitle from '$components/misc/PageTitle.svelte';
	import { defaultToast } from '$scripts/toasts';
	import { all_teams } from '$scripts/store';
	import { teamsCollection } from '$lib/scripts/collections';
	import TeamImage from '$lib/components/containers/TeamImage.svelte';
	import TeamNameImage from '$lib/components/containers/TeamNameImage.svelte';

	let selected_team = $all_teams[0];

	function writeTeamDoc(team: Team): void {
		try {
			// If the team has a document reference, store it; otherwise, find one from its abbreviation
			let docRef: DocumentReference;
			if (team.docRef && team.docRef.path === team.abbreviation) {
				docRef = team.docRef;
			} else {
				docRef = doc(teamsCollection, team.abbreviation);
			}

			// Collect the properties that are defined on the Team object to avoid writing undefined data to the DB
			let definedKeys = {};
			Object.keys(team).forEach((key) => {
				if (team[key] !== undefined) {
					definedKeys[key] = team[key];
				}
			});

			// Write the defined properties to the document in the Team collection
			setDoc(docRef.withConverter(teamConverter), definedKeys);

			defaultToast({
				title: 'Team Updated!',
				msg: `${team.city} ${team.name} team document was updated.`
			});
			// Since this is admin-only, the alert interface is sufficient for success/error notification
			// alert('success!');
		} catch (err) {
			alert(err);
		}
	}
</script>

<PageTitle>Manage Teams</PageTitle>

<select bind:value={selected_team} class="team-select">
	{#each $all_teams as team (team)}
		<option value={team}>{team.city} {team.name}</option>
	{/each}
</select>
{#if selected_team}
	<div class="info-grid">
		<div class="images" style="grid-area:image;">
			<TeamImage team={selected_team} />
			<TeamNameImage team={selected_team} />
		</div>
		{#each Object.keys(selected_team) as key}
			{#if key !== 'docRef'}
				<label for={`${selected_team.abbreviation}-${key}`} style="grid-area:{key}">
					{key}
					{#if key === 'conference'}
						<select
							id={`${selected_team.abbreviation}-${key}`}
							bind:value={selected_team[key]}
							style="font-style:{selected_team[key] ? '' : 'italic'}"
							>{#each conferences as conf}
								<option value={conf}>{conf}</option>
							{/each}
						</select>
					{:else if key === 'division'}
						<select
							id={`${selected_team.abbreviation}-${key}`}
							bind:value={selected_team[key]}
							style="font-style:{selected_team[key] ? '' : 'italic'}"
							>{#each divisions as div}
								<option value={div}>{div}</option>
							{/each}
						</select>
					{:else if key === 'wins' || key === 'losses' || key === 'ties'}
						<input
							type="number"
							id={`${selected_team.abbreviation}-${key}`}
							bind:value={selected_team[key]}
							style="font-style:{selected_team[key]
								? ''
								: 'italic'};  width:min(calc({selected_team[key].toString()
								.length}ch + 5rem),100%);"
							placeholder={key}
						/>
					{:else}
						<input
							type="text"
							id={`${selected_team.abbreviation}-${key}`}
							bind:value={selected_team[key]}
							style="font-style:{selected_team[key] ? '' : 'bold'} ; width:min(calc({selected_team[
								key
							].toString().length}ch + 5rem),100%);"
							placeholder={key}
						/>
					{/if}
				</label>
			{/if}
		{/each}
		<button on:click={() => writeTeamDoc(selected_team)}>Update Doc</button>
	</div>
{/if}

<style lang="scss">
	select {
		@include rounded;
		margin: 0 auto;
		max-width: max-content;
		padding: 1rem;
	}
	input {
		@include defaultInput;
		@include rounded;
		box-sizing: border-box;
		padding: 1rem;
		width: 100%;
		text-align: center;
	}
	select,
	input {
		margin-top: 0.5rem;
	}
	button {
		@include styledButton;
		margin: 1rem;
		grid-area: update;
	}
	label,
	.images,
	.info-grid {
		display: grid;
		@include rounded;
	}
	label {
		box-sizing: border-box;
		grid-template-columns: 1fr;
		grid-template-rows: min-content auto;
		align-items: start;
		justify-items: center;
		justify-content: center;
		text-align: center;
		text-transform: capitalize;
		margin: 1rem;
		padding: 1rem;
		width: 100%;
	}
	.images {
		@include frostedGlass;
		grid-template-columns: 1fr 1fr;
		place-items: center;
		padding: 0.5rem;
	}
	.info-grid {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-areas: 'conference division image' 'city name abbreviation' 'wins losses ties' 'fontPath logoPath docID' '. update .';
		place-items: center;
		justify-content: center;
	}
	.team-select {
		background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 80%);
		color: var(--background, hsl(120, 16%, 17%));
		margin: 2rem auto;
	}
</style>
