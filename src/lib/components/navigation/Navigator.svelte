<script lang="ts">
	import { largerThanMobile, navChecked } from '$scripts/store';

	export let minItemSize = '200px';
	export let maxItemSize = '1fr';
	export let customStyles: string = '';
	export let useModal = false;
	export let offsetTop = false;
	export let modalID: string = '';
</script>

<nav
	class:offsetTop
	class="navigationList {$navChecked ? 'expanded' : 'collapsed'} {$largerThanMobile
		? null
		: useModal
		? 'modal'
		: null}"
	style="--minItemSize:{minItemSize}; --maxItemSize: {maxItemSize}; {customStyles}"
>
	<slot {modalID} />
</nav>

<style lang="scss">
	$minItemSize: var(--minItemSize);
	$maxItemSize: var(--maxItemSize);
	* {
		box-sizing: border-box;
	}
	.navigationList {
		@include gridAndGap(0.5rem);
		place-items: center;
		text-align: center;
		font-weight: bold;
		grid-area: nav;
		grid-template-columns: repeat(auto-fit, minmax($minItemSize, $maxItemSize));
		max-width: 100%;
		padding: 0.2rem 0;
		top: 0;
		transition: all 300ms ease-in-out;
		width: 100%;
		z-index: 10;
		background: radial-gradient(
			rgba(var(--alternateValue-color, rgb(36, 50, 36)), 90%) 70%,
			transparent
		);
		@include responsive_desktop_only {
			position: sticky;
		}
		@include responsive_mobile_only {
			font-size: 1.5rem;
			margin-top: 0.5rem;
		}
	}
	.collapsed {
		@include accelerate;
		margin: 0;
		// max-height: 0.2em;
		opacity: 0;
		pointer-events: none;
		// transform: rotateX(90deg);
	}
	nav {
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.modal {
		grid-area: unset;
		// position: fixed;
		// width: 90%;
		// left: 5%;
		// right: 5%;
		// height: auto;
		// top: 25%;
		border-radius: 2rem;
		padding: 1rem;
	}
	.offsetTop {
		transform: translateY(-3px);
	}
</style>
