<script lang="ts">
	import { teamConverter } from '$scripts/converters';
	import { doc, setDoc } from '@firebase/firestore';
	import { allTeams, teamsCollection } from '$scripts/teams';
	import type { Team } from '$scripts/classes/team';
	import { conferences, divisions } from '$scripts/classes/constants';

	function writeTeamDoc(team: Team): void {
		try {
			// If the team has a document reference, store it; otherwise, find one from its abbreviation
			var docRef;
			if (team.docRef) {
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

			// Since this is admin-only, the alert interface is sufficient for success/error notification
			alert('success!');
		} catch (err) {
			alert(err);
		}
	}
</script>

{#each $allTeams as team, i (team)}
	<p>
		{#each Object.keys($allTeams[0]) as key}
			{#if key !== 'docRef'}
				<label for={`${team}-${key}`}>
					{#if key === 'conference'}
						<select
							id={`${team}-${key}`}
							bind:value={team[key]}
							style="font-style:{team[key] ? '' : 'italic'}"
							>{#each conferences as conf}
								<option value={conf}>{conf}</option>
							{/each}
						</select>
					{:else if key === 'division'}
						<select
							id={`${team}-${key}`}
							bind:value={team[key]}
							style="font-style:{team[key] ? '' : 'italic'}"
							>{#each divisions as div}
								<option value={div}>{div}</option>
							{/each}
						</select>
					{:else if key === 'wins' || key === 'losses' || key === 'ties'}
						<label for={`${team}-${key}`}>
							{key}
							<input
								type="number"
								id={`${team}-${key}`}
								bind:value={team[key]}
								style="font-style:{team[key] ? '' : 'italic'}"
								placeholder={key}
							/>
						</label>
					{:else}
						<input
							type="text"
							id={`${team}-${key}`}
							bind:value={team[key]}
							style="font-style:{team[key] ? '' : 'bold'}"
							placeholder={key}
						/>
					{/if}
				</label>
			{/if}
		{/each}
		<button on:click={() => writeTeamDoc(team)}>Update Doc</button>
	</p>
	<p>
		{#each Object.keys(team) as key, i (key)}
			{#if key !== 'docRef'}
				{#if team[key] !== undefined || team[key] === 0}
					<div style="color:{team[key] ? 'green' : 'black'}; display:inline-flex">{team[key]}</div>
				{:else}
					<strong>{key}</strong>
				{/if}
				|| &nbsp;
			{/if}
		{/each}
		<img src={team.logoPath} alt={team.name} width="50px" />
		<img src={team.fontPath} alt={team.name} width="50px" />
	</p>
	<hr />
{/each}
