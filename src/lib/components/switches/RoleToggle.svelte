<script lang="ts">
	import { userData } from '$scripts/auth';
	import { updateUser } from '$scripts/store';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';

	export let role = 'admin';
</script>

<div class="{role} toggle">
	{#if $userData}
		<div class:crossout={!$userData[role]}>{role}</div>
		<ToggleSwitch
			bind:checked={$userData[role]}
			on:toggle={async () => await updateUser($userData)}
		/>
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
