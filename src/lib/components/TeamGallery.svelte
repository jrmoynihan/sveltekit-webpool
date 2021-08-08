<script lang="ts">
	import { dev } from '$app/env';
	import { allTeams } from '$scripts/teams';
import TeamImage from './containers/TeamImage.svelte';
import TeamNameImage from './containers/TeamNameImage.svelte';
</script>

<div class="team-gallery">
	<!-- {#await teamsPromise()}
        Loading teams...
    {:then teams} -->
	{#each $allTeams as team}
		<div class="team-image-container">
			<TeamImage {team}/>
			<TeamNameImage {team}/>
		</div>
	{/each}
	<!-- {:catch}
        Failed to load teams -- please contact site admin.
        {@debug teamsPromise}
    {/await} -->
</div>

<style lang="scss">
	.team-gallery {
		@include rounded;
		box-sizing: border-box;
		display: inline-grid;
		grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
		width: 87%;
		overflow: clip;
	}
	.team-image-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px, 50%), 1fr));
		justify-content: center;
	}
</style>
