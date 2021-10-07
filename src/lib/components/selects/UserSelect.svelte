<script lang="ts">
	import type { WebUser } from '$scripts/classes/webUser';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';

	export let selectedUser: WebUser;
</script>

{#await getWeeklyUsers(false)}
	Loading Users...
{:then users}
	<select bind:value={selectedUser}>
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
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>
