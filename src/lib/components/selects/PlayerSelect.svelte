<script lang="ts">
	import type { PoolsToQuery } from '$lib/scripts/types/types';
	import { all_players, selected_player } from '$scripts/store';
	import { createEventDispatcher } from 'svelte';

	export let player_pool: PoolsToQuery;
	export let customStyles = '';
	export let adminOnly = false;
	export let selected_uid: string = $selected_player.uid;
	const dispatch = createEventDispatcher();

	const player_changed = async () => {
		$selected_player = $all_players.find((player) => player.uid === selected_uid);
		dispatch('change', selected_uid);
	};
</script>

<select
	id="player-select"
	class:adminOnly
	style={customStyles}
	bind:value={selected_uid}
	on:change={player_changed}
>
	{#if player_pool === 'all'}
		{#each $all_players as player}
			<option value={player.uid}>{player.name} ({player.nickname})</option>
		{/each}
	{:else}
		{#each $all_players.filter((player) => player[`${player_pool}`] === true) as player}
			<option value={player.uid}>{player.name} ({player.nickname})</option>
		{/each}
	{/if}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
		&.adminOnly {
			@include admin;
		}
	}
</style>
