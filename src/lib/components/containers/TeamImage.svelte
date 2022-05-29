<script lang="ts">
	import { image_sizes, responsive_sizes } from '$lib/scripts/classes/constants';
	import type { Team } from '$scripts/classes/team';
	import { fade } from 'svelte/transition';

	export let team: Team = null;
	// export let width = 'auto';
	// export let height = 'auto';
	export let grayscale = false;
	export let frosted = false;
</script>

<picture transition:fade={{ duration: 400 }}>
	<!-- <source srcset={team.logoPath} type="image/webp" /> -->
	<img
		sizes={responsive_sizes.join(',')}
		alt="{team.city}-{team.name}"
		loading="lazy"
		decoding="async"
		class:grayscale
		class:frosted
		srcset={`${image_sizes.map(
			(size) => `/g${team.logoPath.split('.')[0]}-${size}.webp ${size}w`
		)}, `}
	/>
	<!-- <img
		src={`g/${team.logoPath}`}
		alt="{team.city}-{team.name}"
		{width}
		{height}
		loading="lazy"
		decoding="async"
		class:grayscale
		class:frosted
	/> -->
</picture>

<style lang="scss">
	picture {
		@include accelerate;
		@include flexCenter;
		box-shadow: none;
		aspect-ratio: 1 / 1;
		max-width: 100%;
		max-height: 100%;
	}
	img {
		@include accelerate;
		max-width: 100%;
	}
	.grayscale {
		filter: grayscale(100%);
		opacity: 0.5;
	}
	.frosted {
		@include frostedGlass;
	}
</style>
