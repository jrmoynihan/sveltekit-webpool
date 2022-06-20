<script lang="ts">
	import { dev } from '$app/env';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';
	import PickSixGroup from '$lib/components/containers/accordions/PickSixGroup.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { all_icons } from '$lib/scripts/classes/constants';
	import { PickSixDoc } from '$lib/scripts/classes/picks';
	import { pickSixCollection } from '$lib/scripts/firebase/collections';
	import { pickSixConverter } from '$lib/scripts/firebase/converters';
	import { createPickSixDoc, getPickSixData } from '$lib/scripts/pick6/pick6';
	import { makeNumericArrayOfDesiredLength } from '$lib/scripts/utilities/functions';
	import { LogAndToast, myError } from '$lib/scripts/utilities/logging';
	import type { Team } from '$scripts/classes/team';
	import {
		all_seasons,
		all_teams,
		current_player,
		current_season_start,
		current_season_year,
		larger_than_mobile,
		selected_year
	} from '$scripts/store';
	import type { pickSixItem } from '$scripts/types/types';
	import { doc, setDoc, Timestamp, updateDoc, where } from '@firebase/firestore';
	import { faCaretUp } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade, fly } from 'svelte/transition';

	let pick_dock_visible: boolean = $larger_than_mobile;
	let group_one_teams: pickSixItem[] = [];
	let group_two_teams: pickSixItem[] = [];
	let group_three_teams: pickSixItem[] = [];
	let sortedByWins: Team[] = [];
	let group_one_open = false;
	let group_two_open = false;
	let group_three_open = false;
	let is_before_season_start = $current_season_start.valueOf() > Timestamp.now().valueOf();
	let existing_pick_promise: Promise<PickSixDoc> = null;
	let existing_picks: string[] = [];
	let toggle_group_one: () => boolean;
	let toggle_group_two: () => boolean;
	let toggle_group_three: () => boolean;

	function getPickSixArrays(year: number = $current_season_year) {
		const previous_year = year - 1;
		if (previous_year < 2020) return;
		try {
			let arrays: Team[][] = [];
			// Sort the teams by their wins from the previous season
			sortedByWins = $all_teams.sort((teamOne, teamTwo) =>
				// TODO: Need to fix this method of storing Team records in the database eventually.  The records map will get bigger every year.
				{
					const team_one_records_from_previous_year = teamOne.records.find(
						(record) => record.year === previous_year
					);
					const team_two_records_from_previous_year = teamTwo.records.find(
						(record) => record.year === previous_year
					);

					return (
						team_one_records_from_previous_year?.wins - team_two_records_from_previous_year?.wins
					);
				}
			);
			// Split the 32 teams into two groups of 11 and one group of 10
			const size = 11;
			for (let i = 0; i < sortedByWins.length; i += size) {
				arrays.push(sortedByWins.slice(i, i + size));
			}
			group_one_teams = createPickSixArray(arrays[0]);
			group_two_teams = createPickSixArray(arrays[1]);
			group_three_teams = createPickSixArray(arrays[2]);
		} catch (error) {
			myError({
				msg: 'Error in getPickSixArrays',
				error
			});
		}
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
		return group;
	}
	function selectExistingPicks() {
		existing_picks.forEach((pick) => {
			const group_one_team = group_one_teams.find((t) => t.team.abbreviation === pick);
			if (group_one_team) {
				group_one_team.selected = true;
				return;
			}
			const group_two_team = group_two_teams.find((t) => t.team.abbreviation === pick);
			if (group_two_team) {
				group_two_team.selected = true;
				return;
			}
			const group_three_team = group_three_teams.find((t) => t.team.abbreviation === pick);
			if (group_three_team) {
				group_three_team.selected = true;
				return;
			}
		});
	}

	async function submitSixPicks() {
		const picks = all_selected_teams.map((t) => t.team.abbreviation);
		const new_doc = doc(pickSixCollection);
		const { uid, name, nickname } = $current_player;
		const season_year = dev ? $selected_year : $current_season_year;
		const pick_doc_data = new PickSixDoc({
			doc_ref: new_doc,
			picks,
			season_year,
			uid,
			name,
			nickname
		});
		await setDoc(new_doc.withConverter(pickSixConverter), pick_doc_data);
		const title = `${$selected_year} Pick Six Submitted`;
		const msg = `Your picks have been submitted for ${$selected_year}`;
		LogAndToast({ title, msg, icon: all_icons.checkmark });
	}

	async function updatePicks() {
		const picks = all_selected_teams.map((t) => t.team.abbreviation);
		const existing_pick_doc = await existing_pick_promise;
		await updateDoc(existing_pick_doc.doc_ref, { picks });
		const title = `${$selected_year} Pick Six Updated`;
		const msg = `Your picks have been updated for ${$selected_year}`;
		LogAndToast({ title, msg, icon: all_icons.checkmark });
	}

	async function getPlayerPickDoc() {
		const pick_doc_constraints = [
			where('uid', '==', $current_player.uid),
			where('season_year', '==', $selected_year)
		];
		const player_pick_doc_data = await getPickSixData({ constraints: pick_doc_constraints });

		if (player_pick_doc_data.length > 0) {
			console.log('Player has picks', player_pick_doc_data[0].picks);
			existing_picks = player_pick_doc_data[0].picks;
			return player_pick_doc_data[0];
		}
		// If there is no pick 6 doc, make one.
		else {
			const new_doc = await createPickSixDoc({
				player: $current_player,
				season_year: $selected_year
			});
			return new_doc;
		}
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

	$: if ($selected_year)
		is_before_season_start =
			$all_seasons.find((season) => season.year === $selected_year).start_date.valueOf() >
			Timestamp.now().valueOf();
	$: if ($all_teams.length > 0 && $selected_year && is_before_season_start)
		getPickSixArrays($selected_year);
	$: if ($selected_year) existing_pick_promise = getPlayerPickDoc();
	$: group_one_selected_count = group_one_teams.filter((item) => item.selected === true).length;
	$: group_two_selected_count = group_two_teams.filter((item) => item.selected === true).length;
	$: group_three_selected_count = group_three_teams.filter((item) => item.selected === true).length;
	$: group_one_selected_count === 2 ? (group_one_open = false) : (group_one_open = true);
	$: group_two_selected_count === 2 ? (group_two_open = false) : (group_two_open = true);
	$: group_three_selected_count === 2 ? (group_three_open = false) : (group_three_open = true);
	$: all_selected_teams = [
		...group_one_teams.filter((item) => item.selected === true),
		...group_two_teams.filter((item) => item.selected === true),
		...group_three_teams.filter((item) => item.selected === true)
	];
	$: total_selected_count =
		group_one_selected_count + group_two_selected_count + group_three_selected_count;
	$: if (existing_picks.length > 0) {
		selectExistingPicks();
	}
</script>

<PageTitle>Pick6</PageTitle>
<svelte:head>
	<title>Pick6 Pool</title>
</svelte:head>

{#if is_before_season_start}
	{#key existing_picks}
		<div class="grid layout-container">
			<h2>Pick two teams from each group!</h2>
			<button
				class="reset"
				on:click={() => {
					group_one_teams = resetGroup(group_one_teams);
					group_two_teams = resetGroup(group_two_teams);
					group_three_teams = resetGroup(group_three_teams);
				}}>Reset All</button
			>
			<div class="grid groups-container">
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
					on:click={async () => (existing_picks ? updatePicks() : submitSixPicks())}
					>{existing_picks ? 'Update' : 'Submit'} Picks</button
				>
			{/if}
		</div>

		<!-- The dock showing the player's picks -->
		<div class="pick-dock grid fixed to-bottom to-left" class:hidden={!pick_dock_visible}>
			{#if !$larger_than_mobile}
				<button
					class="toggle-pick-dock"
					class:hidden={!pick_dock_visible}
					on:click={() => (pick_dock_visible = !pick_dock_visible)}
					><span class:rotated={pick_dock_visible}><Fa icon={faCaretUp} /></span></button
				>
			{/if}
			{#each all_selected_teams as { team, selected } (team.abbreviation)}
				<div
					class="animation-container"
					animate:flip={{ duration: 300 }}
					in:receive={{ key: team.abbreviation }}
					out:send={{ key: team.abbreviation }}
				>
					<PickSixButton bind:team bind:selected only_unselect={true} />
				</div>
			{/each}
			{#each makeNumericArrayOfDesiredLength(6 - total_selected_count) as i}
				<placeholder class="placeholder" />
			{/each}
		</div>
	{/key}
{/if}

{#if !is_before_season_start}
	{#await existing_pick_promise then pick_data}
		<h2>Your Picks</h2>
		<div class="player-picks grid">
			{#each pick_data.picks as pick}
				{@const team = $all_teams.find((team) => team.abbreviation === pick)}
				<PickSixButton disabled={true} selected={true} {team} />
			{/each}
		</div>
	{/await}
{/if}

<style lang="scss">
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
	.layout-container {
		@include responsive_desktop_only {
			max-width: 75%;
		}
		@include responsive_mobile_only {
			margin-bottom: 25vh;
		}
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
				height: 20rem;
				left: 0;
				right: 0;
				margin: auto;
				flex-direction: column;
				margin-bottom: 0;
				// overflow-y: scroll;
				transition: transform 0.4s ease-in-out;
				transform: translate3d(0, 0, 0);
				& > div,
				& > placeholder {
					flex-grow: 1;
					flex-basis: auto;
					width: 6rem;
					height: 8rem;
				}
			}
			&.hidden {
				transform: translate3d(0, 100%, 0);
			}
		}
		@include responsive_desktop_only {
			&.to-left {
				@include fixed($left: 0, $top: 5%, $bottom: 0);
				width: 10%;
				grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
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
	.placeholder {
		@include rounded;
		display: grid;
		place-content: center;
		outline: 2px hsla(var(--accent-value), 50%) solid;
		height: max(8.5rem, 100%);
	}
	.toggle-pick-dock {
		@include styledButton;
		@include pulse($pulseDistance: 1.5rem);
		background-color: hsla(var(--accent-hue), 10%, 10%, 100%);
		max-width: max-content;
		position: absolute;
		z-index: var(--above);
		top: -2rem;
		right: 0;
		transition: transform 0.4s ease-in-out 1s;
		transform: translate3d(0, 0, 0);
		&.hidden {
			transition: transform 0.4s ease-in-out 0s;
			transform: translate3d(0, -50%, 0);
		}
	}
	.rotated {
		transition: transform 0.4s ease-in-out;
		transform: rotate(180deg);
	}
	.player-picks {
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}
</style>
