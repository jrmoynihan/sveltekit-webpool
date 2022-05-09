<script lang="ts">
	import { all_teams } from '$scripts/store';
	import TeamImage from './containers/TeamImage.svelte';
	import TeamNameImage from './containers/TeamNameImage.svelte';
</script>

<div class="team-gallery">
	{#each $all_teams as team}
		<div class="team-image-container">
			<TeamImage {team} />
			<TeamNameImage {team} />
		</div>
	{/each}
</div>

<style lang="postcss">
	.team-gallery {
		@include rounded;
		box-sizing: border-box;
		display: inline-grid;
		grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
		width: 87%;
		overflow: clip;
		row-gap: 1rem;
	}
	.team-image-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px, 50%), 1fr));
		justify-content: center;
	}
</style>
