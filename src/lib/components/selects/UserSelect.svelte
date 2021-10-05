<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';

	export let selectedUser: WebUser;
</script>

<select bind:value={selectedUser}>
	{#await getWeeklyUsers({ showToast: false })}
		Loading Users...
	{:then users}
		{#each users as user}
			<option value={user}>{user.name} ({user.nickname})</option>
		{/each}
	{/await}
</select>

<style lang="scss">
	select {
		@include frostedGlassHighContrast;
		@include rounded;
		display: inline-flex;
		padding: 1rem;
		font-weight: bold;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>
