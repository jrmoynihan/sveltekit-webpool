<script lang="ts">
	import { image_sizes, responsive_sizes } from '$lib/scripts/classes/constants';
	import type { Team } from '$scripts/classes/team';
	import { fade } from 'svelte/transition';

	export let team: Team = null;
	export let grayscale = false;
	export let rounded = false;
	export let topRounded = false;
	export let bottomRounded = false;
	export let frosted = false;
	export let whiteBg = false;
	// export let width = 'auto';
	export let height = 'auto';
</script>

<picture class="picture" style="height: {height};" transition:fade={{ duration: 400 }}>
	<source
		sizes={responsive_sizes.join(', ')}
		srcset={`${image_sizes.map(
			(size) => `/g${team.fontPath.split('.')[0]}-${size}.webp ${size}w`
		)}, `}
		type="image/webp"
	/>
	<img
		class="logo"
		class:grayscale
		class:rounded
		class:frosted
		class:whiteBg
		class:topRounded
		class:bottomRounded
		loading="lazy"
		decoding="async"
		sizes={'50vw'}
		alt="{team.city}-{team.name}"
		srcset={`${image_sizes.map(
			(size) => `/g${team.fontPath.split('.')[0]}-${size}.webp ${size}w`
		)}, `}
		src={`/g${team.fontPath.split('.')[0]}-400.webp`}
	/>
</picture>

<style lang="scss">
	.picture {
		@include accelerate;
		@include flexCenter;
		box-shadow: none;
	}
	.logo {
		@include accelerate;
		transition: all 300ms ease-in-out;
		padding: 1rem;
		max-height: 6rem;
		max-width: 100%;
	}
	.grayscale {
		filter: grayscale(100%);
		opacity: 0.5;
	}
	.frosted {
		@include frostedGlassHighContrast;
	}
	.rounded {
		@include rounded;
	}
	.topRounded {
		border-radius: 5vh 5vh 0 0;
	}
	.bottomRounded {
		border-radius: 0 0 5vh 5vh;
	}
	.whiteBg {
		background: radial-gradient(white 40%, transparent);
	}
</style>
