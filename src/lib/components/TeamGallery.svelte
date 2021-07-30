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
		box-sizing: border-box;
		display: grid;
		grid-column: span 2;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		// margin: 1rem;
		// padding: 1rem;
		width: 100%;
		justify-items: stretch;
	}
	.team-image-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		justify-content: center;
	}
	picture {
		// @include accelerate;
		@include frostedGlass;
		border-radius: 10px;
		box-shadow: none;
		// @include rounded;
		// padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	img {
		// @include accelerate;
		padding: 0.5rem 1rem;
	}
</style>
