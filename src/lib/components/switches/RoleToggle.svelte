<script lang="ts">
	import { updateUser } from '$scripts/store';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { WebUser } from '$scripts/classes/webUser';

	export let role: string;
	export let user: WebUser;
</script>

<div class="{role} toggle">
	{#if user}
		<div class:crossout={!user[role]}>{role}</div>
		<ToggleSwitch bind:checked={user[role]} on:toggle={async () => await updateUser(user)} />
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
