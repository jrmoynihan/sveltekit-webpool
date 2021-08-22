<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { useDarkTheme } from '$scripts/store';

	export let showTeamAbbreviation = false;
	export let disabled = false;
	export let team: Team;
</script>

<span class="rounded team-abbreviation" class:dark-mode={$useDarkTheme} class:disabled>
	{#if showTeamAbbreviation}
		{team.abbreviation}
	{/if}
	<p>
		({team.wins}-{team.losses}{#if team.ties > 0}-{team.ties}{/if})
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
</style>
