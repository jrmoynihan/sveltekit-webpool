<script lang="ts">
	import { navChecked } from '$scripts/store';

	export let minItemSize = '200px';
	export let maxItemSize = '1fr';
</script>

<nav
	class="navigationList {$navChecked ? 'expanded' : 'collapsed'}"
	style="--minItemSize:{minItemSize}; --maxItemSize: {maxItemSize}"
>
	<slot />
</nav>

<style lang="scss">
	$minItemSize: var(--minItemSize);
	$maxItemSize: var(--maxItemSize);
	* {
		box-sizing: border-box;
	}
	.navigationList {
		@include gridAndGap(10px);
		align-items: center;
		font-weight: bold;
		grid-area: nav;
		grid-template-columns: repeat(auto-fit, minmax($minItemSize, $maxItemSize));
		justify-items: center;
		max-width: 100%;
		// padding-bottom: 1rem;
		padding-top: 0;
		text-align: center;
		top: 0;
		transition: all 300ms ease-in-out;
		width: 100%;
		z-index: 10;
		@include responsive_desktop_only {
			position: sticky;
		}
		@include responsive_mobile_only {
			font-size: 1.5rem;
			gap: 2px;
			margin-top: 0.5rem;
		}
	}
	.collapsed {
		opacity: 0;
		// height: 0;
		pointer-events: none;
	}

	// &:checked + label {
	// 	color: var(--main-color);
	// 	text-shadow: 0px 0px 5px var(--alternate-color);
	// 	transition: all 300ms ease-in-out;
	// 	&:hover {
	// 		text-decoration: underline 2px var(--main-color);
	// 	}
	// 	&.dark-mode {
	// 		background: radial-gradient(rgba(var(--accentValue-color), 0.5), transparent);
	// 	}
	// 	&.light-mode {
	// 		background: radial-gradient(transparent, rgba(var(--accentValue-color), 0.5));
	// 	}
	// }

	nav {
		display: flex;
		justify-content: center;
		width: 100%;
		// --background: rgba(255, 255, 255, 0.7);
	}
</style>
