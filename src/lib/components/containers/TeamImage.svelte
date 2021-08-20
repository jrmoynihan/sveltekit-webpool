<script lang="ts">
	import { dev } from '$app/env';
	import type { Team } from '$scripts/classes/team';

	export let team: Team = null;
	export let width = 'auto';
	export let height = '100rem';
	export let grayscale = false;
	export let frosted = false;
</script>

<picture>
	<!-- <source srcset={team.logoPath} type="image/webp" /> -->
	<img
		src={dev ? `../../../static/${team.logoPath}` : team.logoPath}
		alt="{team.city}-{team.name}"
		{width}
		{height}
		loading="lazy"
		class:grayscale
		class:frosted
	/>
</picture>

<style lang="scss">
	picture {
		@include accelerate;
		box-shadow: none;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
	}
	img {
		@include accelerate;
		@include defaultTransition;
		padding: 0.5rem 1rem;
		max-width: min(12rem, 33vw);
		max-height: 8rem;
		&:hover {
			transform: scale(1.1);
		}
	}
	.grayscale {
		filter: grayscale(100%);
		opacity: 0.5;
	}
	.frosted {
		@include frostedGlass;
	}
</style>
