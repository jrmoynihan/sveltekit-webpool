<script lang="ts">
	import { all_teams, selected_team } from '$scripts/store';

	export let is_admin_control = false;
</script>

<select bind:value={$selected_team} class:admin={is_admin_control} required>
	<option value={''} disabled selected>Select a Team</option>
	{#each $all_teams as team}
		<option value={team}>{team.city} {team.name}</option>
	{/each}
</select>

<style lang="scss">
	select {
		@include defaultSelect;
		&:required:invalid {
			content: 'Please select a team';
		}
	}
	.admin {
		@include admin;
	}
</style>
