<script context="module">
</script>

<script lang="ts">
	import PickSixGroup from '$lib/components/containers/accordions/PickSixGroup.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type { Team } from '$scripts/classes/team';
	import { largerThanMobile } from '$scripts/store';
	import { allTeams } from '$scripts/teams';
	import type { pickSixItem } from '$scripts/types/types';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';

	// If the date is January-August (0-9), then return the previous year, since that is when the season started
	let currentYear: number =
		new Date().getMonth() < 9 ? new Date().getFullYear() - 1 : new Date().getFullYear();
	let previousYear = currentYear - 1;

	let groupOneTeams: pickSixItem[] = [];
	let groupTwoTeams: pickSixItem[] = [];
	let groupThreeTeams: pickSixItem[] = [];
	let arrays: Team[][] = [];
	let sortedByWins: Team[] = [];

	if ($allTeams.length > 0) {
		sortedByWins = $allTeams.sort(
			(teamOne, teamTwo) =>
				teamOne.records[`${previousYear}`].wins - teamTwo.records[`${previousYear}`].wins
		);
		const size = 11;
		for (let i = 0; i < sortedByWins.length; i += size) {
			arrays.push(sortedByWins.slice(i, i + size));
		}
		groupOneTeams = createPickSixArray(arrays[0]);
		groupTwoTeams = createPickSixArray(arrays[1]);
		groupThreeTeams = createPickSixArray(arrays[2]);
	}

	function createPickSixArray(group: Team[]): pickSixItem[] {
		return group.map((team) => {
			return { team, selected: false };
		});
	}

	function resetGroup(group: pickSixItem[]) {
		group.forEach((t) => {
			t.selected = false;
		});
	}

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	$: groupOneSelectedCount = groupOneTeams.filter((item) => item.selected === true).length;
	$: groupTwoSelectedCount = groupTwoTeams.filter((item) => item.selected === true).length;
	$: groupThreeSelectedCount = groupThreeTeams.filter((item) => item.selected === true).length;
</script>

<PageTitle>Pick6</PageTitle>
<svelte:head>
	<title>Pick6 Pool</title>
</svelte:head>

<div class="grid">
	<button
		class="reset"
		on:click={() => {
			resetGroup(groupOneTeams);
			groupOneTeams = groupOneTeams;
		}}>Reset All</button
	>

	<PickSixGroup
		bind:group={groupOneTeams}
		bind:groupSelectedCount={groupOneSelectedCount}
		groupLetter={'A'}
	/>
	<PickSixGroup
		bind:group={groupTwoTeams}
		bind:groupSelectedCount={groupTwoSelectedCount}
		groupLetter={'B'}
	/>
	<PickSixGroup
		bind:group={groupThreeTeams}
		bind:groupSelectedCount={groupThreeSelectedCount}
		groupLetter={'C'}
	/>
	{#if $largerThanMobile && groupOneSelectedCount === 2 && groupTwoSelectedCount === 2 && groupThreeSelectedCount === 2}
		<button on:click={() => alert('add the CRUD!')}>Submit Picks</button>
	{/if}
</div>
{#if !$largerThanMobile}
	<div class="fixed">
		<Grid repeat={groupOneSelectedCount + groupTwoSelectedCount + groupThreeSelectedCount}>
			{#if groupOneSelectedCount === 2 && groupTwoSelectedCount === 2 && groupThreeSelectedCount === 2}
				<button style="grid-column: span 6;" on:click={() => alert('add the CRUD!')}
					>Submit Picks</button
				>
			{/if}
			{#each groupOneTeams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
				<div
					class="animation-container"
					animate:flip={{ duration: 300 }}
					in:receive={{ key: teamOption.team.abbreviation }}
					out:send={{ key: teamOption.team.abbreviation }}
				>
					<PickSixButton bind:teamOption bind:selectedCount={groupOneSelectedCount} />
				</div>
			{/each}
			{#each groupTwoTeams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
				<div
					class="animation-container"
					animate:flip={{ duration: 300 }}
					in:receive={{ key: teamOption.team.abbreviation }}
					out:send={{ key: teamOption.team.abbreviation }}
				>
					<PickSixButton bind:teamOption bind:selectedCount={groupTwoSelectedCount} />
				</div>
			{/each}
			{#each groupThreeTeams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
				<div
					class="animation-container"
					animate:flip={{ duration: 300 }}
					in:receive={{ key: teamOption.team.abbreviation }}
					out:send={{ key: teamOption.team.abbreviation }}
				>
					<PickSixButton bind:teamOption bind:selectedCount={groupThreeSelectedCount} />
				</div>
			{/each}
		</Grid>
	</div>
{/if}

<style lang="scss">
	.reset {
		@include deletionButton;
		max-width: max-content;
	}
	h3 {
		grid-column: span 2;
	}
	.grid {
		@include gridAndGap;
		padding: 1rem;
	}
	button {
		@include styledButton;
		display: grid;
		gap: 0.5rem;
		max-width: max-content;
	}
	.fixed {
		@include fixed($bottom: 0);
		display: grid;
		background-color: var(--alternate-color);
		border-top: 2px solid var(--accent-color);
		width: 100%;
	}
	.animation-container {
		height: 100%;
	}
</style>
