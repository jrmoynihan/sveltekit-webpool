<script lang="ts">
	import GameTime from '$lib/components/containers/micro/GameTime.svelte';
	import PickCorrectnessIndicator from '$lib/components/containers/micro/PickCorrectnessIndicator.svelte';
	import TeamSelectRadioInput from '$lib/components/containers/micro/TeamSelectRadioInput.svelte';
	import TeamImage from '$lib/components/containers/TeamImage.svelte';
	import LoadingSpinner from '$lib/components/misc/LoadingSpinner.svelte';
	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import { all_icons } from '$lib/scripts/classes/constants';
	import { Survivor } from '$lib/scripts/classes/survivor';
	import { isBeforeGameTime } from '$lib/scripts/functions';
	import { myWarning } from '$lib/scripts/logging';
	import { createSurvivorDoc, getSurvivorData } from '$lib/scripts/survivor/survivorAdmin';
	import { defaultToast } from '$lib/scripts/toasts';
	import { getGameData } from '$lib/scripts/weekly/weeklyPlayers';

	import {
		all_teams,
		games_promise,
		larger_than_mobile,
		override_locked_picks,
		selected_player,
		selected_week,
		selected_year,
		use_dark_theme,
		window_width
	} from '$scripts/store';
	import { arrayUnion, deleteDoc, orderBy, updateDoc, where } from '@firebase/firestore';
	import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '$lib/components/containers/Tooltip.svelte';

	// let headers = ['Away Team', 'Game Date', 'Home Team'];
	let layout_breakpoint = 1620;
	let element: HTMLElement;
	let custom_label_styles =
		'grid-template-rows: minmax(0, 5rem) minmax(0, auto) minmax(0,auto); gap: 0;';
	let show_game_container = false;
	let pick = '';
	let survivor_promise: Promise<Survivor[]>;
	let show_past_picks = false;
	let total_incorrect_picks = 0;
	let survivor_player_is_dead = false;

	async function getData() {
		const game_constraints = [
			where('week', '==', $selected_week),
			where('season_year', '==', $selected_year),
			where('season_type', '==', 'Regular Season'),
			orderBy('timestamp', 'asc')
		];
		$games_promise = getGameData({ constraints: game_constraints });
		survivor_promise = getOrCreateSurvivorData();
	}
	async function getOrCreateSurvivorData() {
		const survivor_constraints = [
			where('season_year', '==', $selected_year),
			where('uid', '==', $selected_player.uid)
		];
		let promise = getSurvivorData({ constraints: survivor_constraints });
		let survivors = await promise;
		if (survivors.length === 0) {
			const picks = [];
			for (let i = 1; i <= 18; i++) {
				picks.push({ week: i, pick: '' });
			}
			const new_survivor = new Survivor({
				uid: $selected_player.uid,
				nickname: $selected_player.nickname,
				season_year: $selected_year,
				picks
			});
			await createSurvivorDoc(new_survivor);
			promise = getSurvivorData({ constraints: survivor_constraints });
		} else if (survivors.length > 1) {
			myWarning({ msg: 'More than one survivor found for this player.  Extra docs were deleted.' });
			const docs_to_remove = survivors.slice(1);
			docs_to_remove.forEach(async (doc) => {
				await deleteDoc(doc.doc_ref);
			});
		}
		survivors = await promise;
		pick = survivors[0]?.picks?.find((p) => p.week === $selected_week)?.pick || '';
		total_incorrect_picks = survivors[0]?.picks?.filter((p) => p.is_correct === false).length;
		return promise;
	}
	async function updateSurvivorPick() {
		const survivor = await survivor_promise;
		const picks = survivor[0].picks;
		const pick_to_update = picks?.find((pick) => pick.week === $selected_week);
		if (pick_to_update) {
			pick_to_update.pick = pick;
			await updateDoc(survivor[0].doc_ref, { picks });
		} else {
			const new_pick = {
				week: $selected_week,
				pick
			};
			await updateDoc(survivor[0].doc_ref, { picks: arrayUnion(new_pick) });
		}
		defaultToast({
			title: 'Survivor Pick Submitted!',
			msg: `Your week ${$selected_week} pick has been saved.`,
			icon: all_icons.checkmark
		});
		survivor_promise = getOrCreateSurvivorData();
	}

	$: if ($selected_player.uid && $selected_year && $selected_week) getData();
	// Show additional images in larger layout sizes
	$: show_team_name_images = $window_width > layout_breakpoint;
	$: survivor_player_is_dead = total_incorrect_picks > 1;
</script>

<div class="make-picks">
	<section class="selector-section">
		<WeekSelect />
		{#if !survivor_player_is_dead}
			{#if total_incorrect_picks === 1}
				<Tooltip tooltipTop={'-5rem'}>
					<p slot="text">Don't screw it up! You can only pick incorrectly one more time!</p>
					<h2 slot="content">You're on your SECOND CHANCE</h2>
				</Tooltip>
			{/if}
			<button class="submit" on:click={updateSurvivorPick}>Submit Pick</button>
		{/if}
		{#await survivor_promise then survivor_data}
			{@const picks = survivor_data[0]?.picks}

			{#if !$larger_than_mobile && picks.find((p) => p.pick !== '')}
				<button class="show-picks-btn" on:click={() => (show_past_picks = !show_past_picks)}
					><Fa icon={show_past_picks ? faCaretRight : faCaretLeft} size="lg" />
					{show_past_picks ? 'Hide' : 'Show'} Past Picks</button
				>
			{/if}
		{/await}
	</section>
	<section class="games-section" bind:this={element}>
		{#await $games_promise}
			<LoadingSpinner />
		{:then games}
			{#await survivor_promise}
				<LoadingSpinner />
			{:then survivor_data}
				{#each games as { timestamp, away_team_abbreviation, home_team_abbreviation, id }}
					{@const away_team = $all_teams.find((t) => t.abbreviation === away_team_abbreviation)}
					{@const home_team = $all_teams.find((t) => t.abbreviation === home_team_abbreviation)}
					{@const team_picks = survivor_data[0]?.picks.map((p) => p.pick)}
					{@const this_weeks_pick = survivor_data[0]?.picks.find((p) => p.week === $selected_week)}
					{@const pick_is_home = this_weeks_pick?.pick === home_team_abbreviation}
					{@const pick_is_away = this_weeks_pick?.pick === away_team_abbreviation}
					{@const pick_is_home_or_away = pick_is_home || pick_is_away}
					{@const mark_correct = this_weeks_pick?.is_correct}
					{@const away_disabled =
						survivor_player_is_dead ||
						(team_picks?.includes(away_team_abbreviation) && !pick_is_away)}
					{@const home_disabled =
						survivor_player_is_dead ||
						(team_picks?.includes(home_team_abbreviation) && !pick_is_home)}
					{#await isBeforeGameTime(timestamp) then is_before_game_time}
						<!-- TODO: Componentize this -->
						<div class="game" class:dark={$use_dark_theme}>
							<TeamSelectRadioInput
								{id}
								{element}
								team={away_team}
								{custom_label_styles}
								{survivor_player_is_dead}
								disabled={!$override_locked_picks && (away_disabled || !is_before_game_time)}
								show_disabled_icons={!$override_locked_picks &&
									(away_disabled || !is_before_game_time)}
								bind:pick
								bind:show_game_container
								bind:show_team_name_images
							/>
							{#if pick_is_home_or_away && mark_correct !== undefined}
								<PickCorrectnessIndicator is_correct={mark_correct} />
							{:else if is_before_game_time}
								<GameTime {timestamp} />
							{:else}
								<span />
							{/if}
							<TeamSelectRadioInput
								{id}
								{element}
								team={home_team}
								{custom_label_styles}
								{survivor_player_is_dead}
								disabled={!$override_locked_picks && (home_disabled || !is_before_game_time)}
								show_disabled_icons={!$override_locked_picks &&
									(home_disabled || !is_before_game_time)}
								bind:pick
								bind:show_game_container
								bind:show_team_name_images
							/>
						</div>
					{/await}
				{/each}
			{/await}
		{/await}
	</section>
	{#if survivor_player_is_dead}
		<h2 class="dead-msg">You're DEAD!</h2>
	{/if}
	<section class="past-picks-section" class:collapsed={!show_past_picks}>
		{#await survivor_promise then survivor_data}
			{@const picks = survivor_data[0].picks}
			{#if picks.find((p) => p.pick !== '')}
				<div class="past-pick-headers">
					<h3>Week</h3>
					<h3>Pick</h3>
					{#if !$larger_than_mobile}
						<button
							class="show-picks-btn top-right"
							on:click={() => (show_past_picks = !show_past_picks)}
							><Fa icon={show_past_picks ? faCaretRight : faCaretLeft} size="lg" />
							{show_past_picks ? 'Hide' : 'Show'} Past Picks</button
						>
					{:else}
						<span />
					{/if}
				</div>
			{/if}
			{#each picks as { week, pick, is_correct }}
				{@const team = $all_teams?.find((t) => t.abbreviation === pick)}
				{#if pick}
					<div class="past-pick">
						<div>{week}</div>
						{#if team}
							<TeamImage {team} />
						{/if}
						<PickCorrectnessIndicator {is_correct} />
					</div>
				{/if}
			{/each}
		{/await}
	</section>
</div>

<style lang="scss">
	.make-picks {
		display: grid;
		@include responsive_desktop_only {
			grid-template-columns: 7fr 1fr;
			grid-template-areas: 'selector past-picks' 'games past-picks';
		}
		@include responsive_mobile_only {
			grid-template-columns: 1fr;
			grid-template-areas: 'selector' 'games';
		}
	}
	.selector-section {
		grid-area: selector;
		display: flex;
		grid-gap: 1rem;
		flex-flow: wrap;
		justify-content: center;
		justify-self: center;
	}
	.games-section {
		grid-area: games;
		display: grid;
		grid-template-columns: repeat(auto-fit, 20vw);
		@include responsive_mobile_only {
			grid-template-columns: 1fr;
		}
		max-width: 100%;
		gap: 1rem;
		justify-content: center;
		padding: 1rem 0.5rem;
	}
	.past-picks-section {
		background-color: var(--background);
		@include responsive_desktop_only {
			grid-area: past-picks;
		}
		@include responsive_mobile_only {
			position: absolute;
			transition: transform 300ms ease-in-out;
			&.collapsed {
				transform: translateX(100%);
			}
		}
	}
	.past-pick,
	.past-pick-headers {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		place-items: center;
	}
	.game {
		@include defaultContainerStyles;
		@include rounded;
		background-color: hsla(120 20% 100% / 100%);
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 10rem));
		place-items: center;
		gap: 0.5rem;
		padding: 1rem;
		@include responsive_mobile_only {
			width: 100%;
			padding: 0.5rem;
			grid-template-columns: repeat(3, minmax(0, 30%));
		}
		&.dark {
			background-color: hsla(120 20% 25% / 100%);
		}
	}
	.submit,
	.show-picks-btn {
		@include styledButton;
	}
	.top-right {
		@include pulse;
	}
	.dead-msg {
		box-sizing: border-box;
		grid-area: games;
		width: 100%;
		height: 100%;
		padding-top: 5rem;
		backdrop-filter: blur(5px);
	}
</style>
