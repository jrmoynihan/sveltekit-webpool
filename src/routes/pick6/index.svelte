<script lang="ts">
	import PickSixGroup from '$lib/components/containers/accordions/PickSixGroup.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import type { Team } from '$scripts/classes/team';
	import { larger_than_mobile, all_teams, current_season_year } from '$scripts/store';
	import type { pickSixItem } from '$scripts/types/types';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';

	let previousYear = $current_season_year - 1;
	let group_one_teams: pickSixItem[] = [];
	let group_two_teams: pickSixItem[] = [];
	let group_three_teams: pickSixItem[] = [];
	let arrays: Team[][] = [];
	let sortedByWins: Team[] = [];
	let group_one_open = false;
	let group_two_open = false;
	let group_three_open = false;
	let toggle_group_one: () => boolean;
	let toggle_group_two: () => boolean;
	let toggle_group_three: () => boolean;

	// TODO: Need to fix this method of storing Team records in the database eventually.  The records map will get bigger every year.
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
		group_one_teams = createPickSixArray(arrays[0]);
		group_two_teams = createPickSixArray(arrays[1]);
		group_three_teams = createPickSixArray(arrays[2]);
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

	// Open group one on component initialization if the picks haven't been made
	setTimeout(() => {
		group_one_selected_count !== 2 ? (group_one_open = true) : null;
	}, 500);

	$: group_one_selected_count = group_one_teams.filter((item) => item.selected === true).length;
	$: group_two_selected_count = group_two_teams.filter((item) => item.selected === true).length;
	$: group_three_selected_count = group_three_teams.filter((item) => item.selected === true).length;
	$: group_one_selected_count === 2 ? (group_one_open = false) : (group_one_open = true);
	$: group_two_selected_count === 2 ? (group_two_open = false) : (group_two_open = true);
	$: group_three_selected_count === 2 ? (group_three_open = false) : (group_three_open = true);
</script>

<PageTitle>Pick6</PageTitle>
<svelte:head>
	<title>Pick6 Pool</title>
</svelte:head>

<div class="grid layout-container">
	<h2>Pick two teams from each group!</h2>
	<button
		class="reset"
		on:click={() => {
			resetGroup(group_one_teams);
			resetGroup(group_two_teams);
			resetGroup(group_three_teams);
			group_one_teams = group_one_teams;
			group_two_teams = group_two_teams;
			group_three_teams = group_three_teams;
		}}>Reset All</button
	>
	<div class="grid groups-container" style={$larger_than_mobile ? '' : 'margin-bottom: 20%;'}>
		<PickSixGroup
			bind:group={group_one_teams}
			bind:group_selected_count={group_one_selected_count}
			bind:toggle={toggle_group_one}
			bind:open={group_one_open}
			group_letter={'A'}
		/>
		<PickSixGroup
			bind:group={group_two_teams}
			bind:group_selected_count={group_two_selected_count}
			bind:toggle={toggle_group_two}
			bind:open={group_two_open}
			group_letter={'B'}
		/>
		<PickSixGroup
			bind:group={group_three_teams}
			bind:group_selected_count={group_three_selected_count}
			bind:toggle={toggle_group_three}
			bind:open={group_three_open}
			group_letter={'C'}
		/>
	</div>
	{#if group_one_selected_count === 2 && group_two_selected_count === 2 && group_three_selected_count === 2}
		<button
			transition:fly={{ y: 300, duration: 500, easing: quintOut }}
			class="submit"
			on:click={() => alert('add the CRUD!')}>Submit Picks</button
		>
	{/if}
</div>
<div class="grid fixed controls-container to-bottom to-left">
	{#each group_one_teams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
		<div
			class="animation-container"
			animate:flip={{ duration: 300 }}
			in:receive={{ key: teamOption.team.abbreviation }}
			out:send={{ key: teamOption.team.abbreviation }}
		>
			<PickSixButton bind:teamOption bind:selectedCount={group_one_selected_count} />
		</div>
	{/each}
	{#each group_two_teams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
		<div
			class="animation-container"
			animate:flip={{ duration: 300 }}
			in:receive={{ key: teamOption.team.abbreviation }}
			out:send={{ key: teamOption.team.abbreviation }}
		>
			<PickSixButton bind:teamOption bind:selectedCount={group_two_selected_count} />
		</div>
	{/each}
	{#each group_three_teams.filter((teamOption) => teamOption.selected) as teamOption (teamOption.team.abbreviation)}
		<div
			class="animation-container"
			animate:flip={{ duration: 300 }}
			in:receive={{ key: teamOption.team.abbreviation }}
			out:send={{ key: teamOption.team.abbreviation }}
		>
			<PickSixButton bind:teamOption bind:selectedCount={group_three_selected_count} />
		</div>
	{/each}
</div>

<style lang="scss">
	.layout-container {
		@include responsive_desktop_only {
			max-width: 80%;
			// grid-template-columns: 1fr;
		}
	}
	.groups-container {
		width: 100%;
		@include responsive_desktop_only {
			grid-template-rows: repeat(3, minmax(0, auto));
			grid-template-columns: 1fr;
		}
	}
	.reset {
		@include deletionButton;
		max-width: max-content;
	}
	.grid {
		@include gridAndGap;
		padding: 1rem;
		margin: 0 auto;
	}
	.fixed {
		display: grid;
		background-color: var(--background);
		@include responsive_mobile_only {
			&.to-bottom {
				@include fixed($bottom: 0, $top: 80%);
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				border-top: 2px solid var(--accent);
				width: 100%;
				height: 28%;
				left: 0;
				right: 0;
				margin: auto;
				flex-direction: row;
				margin-bottom: 0;
				overflow-y: scroll;
				& > div {
					flex-grow: 1;
					flex-basis: auto;
					width: 6rem;
					height: 8rem;
				}
			}
		}
		@include responsive_desktop_only {
			&.to-left {
				@include fixed($left: 0, $top: 5%, $bottom: 0);
				grid-template-rows: repeat(auto-fit, minmax(0, max-content));
			}
		}
	}
	.submit {
		@include styledButton;
		@include pulse($pulseDistance: 1.5rem);
		max-width: max-content;
	}
	.animation-container {
		height: 100%;
	}
</style>
