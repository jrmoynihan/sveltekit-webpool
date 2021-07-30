<script lang="ts">
	import { teamConverter } from '$scripts/converters';
	import { doc, setDoc } from '@firebase/firestore';
	import { allTeams, teamsCollection } from '$scripts/teams';
	import type { Team } from '$scripts/classes';

	function writeTeamDoc(team: Team): void {
		console.log(team);
		try {
			var docRef;
			if (team.docRef) {
				docRef = team.docRef;
			} else {
				docRef = doc(teamsCollection, team.abbreviation);
			}
			let definedKeys = {};
			Object.keys(team).forEach((key) => {
				if (team[key] !== undefined) {
					definedKeys[key] = team[key];
				}
			});

			setDoc(docRef.withConverter(teamConverter), definedKeys);
			alert('success!');
		} catch (err) {
			alert(err);
		}
	}

	const conferences = ['AFC', 'NFC'];
	const divisions = ['East', 'West', 'North', 'South'];
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
