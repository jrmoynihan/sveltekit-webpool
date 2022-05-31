<script lang="ts">
	import type { Team, TeamRecord } from '$scripts/classes/team';
	import { selected_year, use_dark_theme } from '$scripts/store';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let showTeamAbbreviation = false;
	export let team: Team;
	export let year = $selected_year;
	let disabled: Writable<boolean> = getContext('disabled');
	let record: TeamRecord;
	let wins: number;
	let losses: number;
	let ties: number;
	$: record = team?.records.find((r) => r.year === year);
	$: wins = record?.wins;
	$: losses = record?.losses;
	$: ties = record?.ties;
</script>

<span
	class="rounded team-abbreviation"
	class:dark-mode={$use_dark_theme}
	class:disabled={$disabled}
>
	{#if showTeamAbbreviation}
		{team.abbreviation}
	{/if}
	<p>
		({wins}-{losses}{#if ties > 0}-{ties}{/if})
	</p>
</span>

<style lang="scss">
	span {
		padding: 0.3rem 0.5rem;
		align-self: center;
	}
	.rounded {
		@include rounded;
	}
	.team-abbreviation {
		font-weight: bold;
	}
	.disabled {
		opacity: 0.5;
	}
</style>
