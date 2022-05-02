<script lang="ts">
	import type { Player } from '$classes/player';
	import { getWeeklyPlayers } from '$scripts/weekly/weeklyPlayers';

	export let selectedPlayer: Player;
	export let playersPromise: Promise<Player[]> = getWeeklyPlayers(false);
	export let customStyles = '';
	export let adminOnly = false;
</script>

{#await playersPromise}
	Loading Players...
{:then players}
	<select
		id="player-select"
		class:adminOnly
		style={customStyles}
		bind:value={selectedPlayer}
		on:change
	>
		{#each players as player}
			<option value={player}>{player.name} ({player.nickname})</option>
		{/each}
	</select>
{/await}

<style lang="scss">
	select {
		@include defaultSelect;
		&.adminOnly {
			@include admin;
		}
	}
</style>
