<script lang="ts">
	import { larger_than_mobile, nav_toggled } from '$scripts/store';

	export let minItemSize = '200px';
	export let maxItemSize = '1fr';
	export let customStyles = '';
	export let useModal = false;
	export let offsetTop = false;
	export let modalID = '';
	export let grid_area = null;
</script>

<nav
	class:offsetTop
	class:modal={!$larger_than_mobile && useModal}
	class:expanded={$nav_toggled}
	class:collapsed={!$nav_toggled}
	class="navigationList"
	style:grid-area={grid_area}
	style="--minItemSize:{minItemSize}; --maxItemSize: {maxItemSize}; {customStyles}"
>
	<slot {modalID} />
</nav>

<style lang="scss">
	$minItemSize: var(--minItemSize);
	$maxItemSize: var(--maxItemSize);

	.navigationList {
		place-items: center;
		text-align: center;
		font-weight: bold;
		max-width: 100%;
		padding: 0.2rem 0;
		padding-bottom: 0.4rem;
		top: 0;
		transition: gap 500ms ease-in-out;
		width: 100%;
		background: var(--background);

		@supports (backdrop-filter: none) {
			backdrop-filter: blur(5px);
		}

		@include responsive_desktop_only {
			display: flex;
			gap: 0.5rem;
			position: sticky;
			z-index: var(--above);
		}
		@include responsive_mobile_only {
			@include gridAndGap(0.5rem);
			grid-template-columns: repeat(auto-fit, minmax($minItemSize, $maxItemSize));
			font-size: 1.5rem;
			margin-top: 0.5rem;
		}
	}
	.collapsed {
		@include accelerate;
		margin: 0;
		opacity: 0;
		pointer-events: none;
	}
	nav {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.modal {
		grid-area: unset;
		border-radius: 2rem;
		padding: 1rem;
	}
	.offsetTop {
		transform: translateY(-3px);
	}
</style>
