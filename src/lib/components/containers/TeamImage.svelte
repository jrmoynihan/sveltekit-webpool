<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { fade } from 'svelte/transition';

	export let team: Team = null;
	export let width = 'auto';
	export let height = 'auto';
	export let grayscale = false;
	export let frosted = false;
</script>

<picture transition:fade={{ duration: 400 }}>
	<!-- <source srcset={team.logoPath} type="image/webp" /> -->
	<img
		src={team.logoPath}
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
		@include flexCenter;
		box-shadow: none;
		z-index: 2;
	}
	img {
		@include accelerate;
		// padding: clamp(0.2rem, 5vw, 0.5rem) clamp(1rem, 5vw, 2rem);
		max-width: 100%;
		max-height: 6rem;
	}
	.grayscale {
		filter: grayscale(100%);
		opacity: 0.5;
	}
	.frosted {
		@include frostedGlass;
	}
</style>
