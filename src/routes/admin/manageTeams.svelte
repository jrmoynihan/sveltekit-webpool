<script lang="ts">
	import { teamConverter } from '$scripts/converters';
	import { doc, DocumentReference, setDoc } from 'firebase/firestore';
	import { allTeams, teamsCollection } from '$scripts/teams';
	import type { Team } from '$scripts/classes/team';
	import { conferences, divisions } from '$scripts/classes/constants';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { defaultToast } from '$scripts/toasts';

	let selectedTeam = $allTeams[0];

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

<select bind:value={selectedTeam} class="team-select">
	{#each $allTeams as team (team)}
		<option value={team}>{team.city} {team.name}</option>
	{/each}
</select>
{#if selectedTeam}
	<div class="info-grid">
		<div class="images" style="grid-area:image;">
			<img src={selectedTeam.logoPath} alt={selectedTeam.name} width="200px" />
			<img src={selectedTeam.fontPath} alt={selectedTeam.name} width="200px" />
		</div>
		{#each Object.keys(selectedTeam) as key}
			{#if key !== 'docRef'}
				<label for={`${selectedTeam.abbreviation}-${key}`} style="grid-area:{key}">
					{key}
					{#if key === 'conference'}
						<select
							id={`${selectedTeam.abbreviation}-${key}`}
							bind:value={selectedTeam[key]}
							style="font-style:{selectedTeam[key] ? '' : 'italic'}"
							>{#each conferences as conf}
								<option value={conf}>{conf}</option>
							{/each}
						</select>
					{:else if key === 'division'}
						<select
							id={`${selectedTeam.abbreviation}-${key}`}
							bind:value={selectedTeam[key]}
							style="font-style:{selectedTeam[key] ? '' : 'italic'}"
							>{#each divisions as div}
								<option value={div}>{div}</option>
							{/each}
						</select>
					{:else if key === 'wins' || key === 'losses' || key === 'ties'}
						<input
							type="number"
							id={`${selectedTeam.abbreviation}-${key}`}
							bind:value={selectedTeam[key]}
							style="font-style:{selectedTeam[key] ? '' : 'italic'};  width:min(calc({selectedTeam[
								key
							].toString().length}ch + 5rem),100%);"
							placeholder={key}
						/>
					{:else}
						<input
							type="text"
							id={`${selectedTeam.abbreviation}-${key}`}
							bind:value={selectedTeam[key]}
							style="font-style:{selectedTeam[key] ? '' : 'bold'} ; width:min(calc({selectedTeam[
								key
							].toString().length}ch + 5rem),100%);"
							placeholder={key}
						/>
					{/if}
				</label>
			{/if}
		{/each}
		<button on:click={() => writeTeamDoc(selectedTeam)}>Update Doc</button>
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
		@include editableInput;
		@include rounded;
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
	img {
		max-width: 100%;
	}
	.info-grid {
		width: 100%;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
		grid-template-areas: 'conference division image' 'city name abbreviation' 'wins losses ties' 'fontPath logoPath docID' '. update .';
		place-items: center;
		justify-content: center;
	}
	.team-select {
		background-color: rgba(var(--accentValue-color, rgb(233, 181, 99)), 80%);
		color: var(--alternate-color, rgb(36, 50, 36));
		margin: 2rem auto;
	}
</style>
