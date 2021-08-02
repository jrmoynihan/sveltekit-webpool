<script lang="ts">
	import { allTeams } from '$scripts/teams';
</script>

<div class="team-gallery">
	<!-- {#await teamsPromise()}
        Loading teams...
    {:then teams} -->
	{#each $allTeams as team}
		<div class="team-image-container">
			<picture>
				<!-- <source srcset={team.logoPath} type="image/webp" /> -->
				<img
					src={team.logoPath}
					alt="{team.city}-{team.name}"
					width="auto"
					height="100rem"
					loading="lazy"
				/>
			</picture>
			<picture>
				<!-- <source srcset={team.logoPath} type="image/webp" /> -->
				<img
					class='logo'
					src={team.fontPath}
					alt="{team.city}-{team.name}"
					width="200rem"
					height="auto"
					loading="lazy"
				/>
			</picture>
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
		grid-template-columns: repeat(auto-fit, minmax(min(30rem,100%), 1fr));
		width: 87%;
		overflow: clip;
	}
	.team-image-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(150px,50%), 1fr));
		justify-content: center;
	}
	picture {
		// @include accelerate;
		@include frostedGlass;
		box-shadow: none;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	img {
		// @include accelerate;
		padding: 0.5rem 1rem;
		&.logo{
			padding: 0 1rem;
		}
	}
</style>
