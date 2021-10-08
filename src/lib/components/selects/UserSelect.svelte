<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import { createEventDispatcher } from 'svelte';

	export let selectedUser: WebUser;
	export let userPromise: Promise<WebUser[]> = getWeeklyUsers(false);
	export let customStyles = '';

	const dispatch = createEventDispatcher();
</script>

{#await userPromise}
	Loading Users...
{:then users}
	<select
		style={customStyles}
		bind:value={selectedUser}
		on:change={() => dispatch('userChanged', selectedUser)}
	>
		{#each users as user}
			<option value={user}>{user.name} ({user.nickname})</option>
		{/each}
	</select>
{/await}

<style lang="scss">
	select {
		@include frostedGlassHighContrast;
		@include rounded;
		display: inline-flex;
		padding: 1rem;
		font-weight: bold;
		max-width: 100%;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>
