<script context="module">
</script>

<script lang="ts">
	import PickSixGroup from '$lib/components/containers/accordions/PickSixGroup.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type { Team } from '$scripts/classes/team';
	import { largerThanMobile, all_teams, current_season_year } from '$scripts/store';
	import type { pickSixItem } from '$scripts/types/types';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';

	let previousYear = $current_season_year - 1;

	let groupOneTeams: pickSixItem[] = [];
	let groupTwoTeams: pickSixItem[] = [];
	let groupThreeTeams: pickSixItem[] = [];
	let arrays: Team[][] = [];
	let sortedByWins: Team[] = [];

	if ($all_teams.length > 0) {
		sortedByWins = $all_teams.sort(
			(teamOne, teamTwo) =>
				teamOne.records[`${previousYear}`].wins - teamTwo.records[`${previousYear}`].wins
		);
		// Split the 32 teams into three groups, approximately evenly
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

		fallback(node) {
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

<div class="grid" style={$largerThanMobile ? '' : 'margin-bottom: 20%;'}>
	<button
		class="reset"
		on:click={() => {
			resetGroup(groupOneTeams);
			resetGroup(groupTwoTeams);
			resetGroup(groupThreeTeams);
			groupOneTeams = groupOneTeams;
			groupTwoTeams = groupTwoTeams;
			groupThreeTeams = groupThreeTeams;
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
		<div
			transition:fly={{ delay: 1250, y: 300, duration: 500, easing: quintOut }}
			style={'max-width:max-content; margin:auto;margin-top:15%'}
		>
			<StyledButton on:click={() => alert('add the CRUD!')} customStyles=""
				>Submit Picks</StyledButton
			>
		</div>
	{/if}
</div>

<div class="fixed" class:to-left={$largerThanMobile} class:to-bottom={!$largerThanMobile}>
	<Grid
		customStyles={$largerThanMobile ? 'grid-template-rows:repeat(6,minmax(0,1fr));' : ''}
		repeatColumns={$largerThanMobile
			? 1
			: groupOneSelectedCount + groupTwoSelectedCount + groupThreeSelectedCount}
	>
		{#if !$largerThanMobile && groupOneSelectedCount === 2 && groupTwoSelectedCount === 2 && groupThreeSelectedCount === 2}
			<div transition:slide class="submit-picks">
				<StyledButton on:click={() => alert('add the CRUD!')} customStyles=""
					>Submit Picks</StyledButton
				>
			</div>
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

<style lang="scss">
	.reset {
		@include deletionButton;
		max-width: max-content;
	}
	.grid {
		@include gridAndGap;
		padding: 1rem;
		margin: 0 auto;
		@include responsive_desktop_only {
			max-width: 80%;
		}
	}
	.fixed {
		display: grid;
		background-color: var(--background);
		width: 100%;
		&.to-bottom {
			@include fixed($bottom: 0);
			border-top: 2px solid var(--accent);
		}
		&.to-left {
			@include fixed($left: 0, $top: 5%, $bottom: 0);
			grid-template-rows: minmax(0, min-content);
			width: 10%;
		}
	}
	.submit-picks {
		@include responsive_mobile_only {
			grid-column: span 6;
		}
	}
	.animation-container {
		height: 100%;
	}
</style>
