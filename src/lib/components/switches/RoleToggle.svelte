<script lang="ts">
	import { updateUser } from '$scripts/store';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { Player } from '$classes/player';

	export let role: string;
	export let player: Player;
</script>

<div class="{role} toggle">
	{#if player}
		<div class:crossout={!player[role]}>{role}</div>
		<ToggleSwitch bind:checked={player[role]} on:toggle={async () => await updateUser(player)} />
	{/if}
</div>

<style lang="scss">
	div {
		text-transform: capitalize;
	}
	.toggle {
		display: grid;
		gap: 5px;
	}
	.crossout {
		text-decoration: line-through;
	}
</style>
