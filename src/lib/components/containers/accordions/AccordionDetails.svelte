<script lang="ts">
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';

	export let expandTitle: string = '';
	export let showArrow: boolean = false;
	export let customExpandIcon: IconDefinition = null;
	export let iconClass: string = 'fa-CaretDown';
	export let expandDuration: number = 300;
	export let customContentStyles: string = '';
	export let customDetailsStyles: string = '';
	export let customSummaryStyles: string = '';
	export let cloudyBackground = false;
	export let frostedGlass = true;
	export let open = false;
	export let adminOnly = false;
	export let overflowY = 'auto';
	export let overflow_X = 'auto';
	let detailsElement: HTMLDetailsElement;
	let summaryElement: HTMLElement;
	let contentElement: HTMLElement;
	let animation: Animation = null;
	export let isCollapsing: boolean = false;
	export let isExpanding: boolean = false;

	// $: if (detailsElement) {
	// 	summaryElement = detailsElement.querySelector('summary');
	// }
	// $: if (detailsElement) {
	// 	contentElement = detailsElement.querySelector('.content');
	// }

	const dispatch = createEventDispatcher();

	const clicked = () => {
		dispatch('click');
		toggle();
	};

	export function toggle() {
		if (!open && (isCollapsing || !isExpanding)) {
			// alert('expanding');
			expand();
		} else if (isExpanding || open) {
			collapse();
		}
	}
	export function expand() {
		isExpanding = true;
		isCollapsing = false;
		// Add an overflow on the <details> to avoid content overflowing
		detailsElement.style.overflow = 'hidden';
		// Apply a fixed height on the element
		detailsElement.style.height = `${detailsElement.offsetHeight}px`;
		// Force the [open] attribute on the details element
		detailsElement.open = true;
		// Wait for the next frame to call the expand function
		window.requestAnimationFrame(() => startExpand());
	}
	function startExpand() {
		// Set the element as "being expanding"
		isExpanding = true;
		// Get the current fixed height of the element
		const startHeight = `${detailsElement.offsetHeight}px`;
		// Calculate the open height of the element (summary height + content height)
		const endHeight = `${summaryElement.offsetHeight + contentElement.offsetHeight}px`;

		// If there is already an animation running
		if (animation) {
			// Cancel the current animation
			animation.cancel();
		}

		// Start a WAAPI animation
		animation = detailsElement.animate(
			{
				// Set the keyframes from the startHeight to endHeight
				height: [startHeight, endHeight]
			},
			{
				duration: expandDuration,
				easing: 'ease-out'
			}
		);
		// When the animation is complete, call onAnimationFinish()
		animation.onfinish = () => onAnimationFinish(true);
		// If the animation is cancelled, isExpanding variable is set to false
		animation.oncancel = () => (isExpanding = false);
	}

	export function collapse() {
		isCollapsing = true;
		isExpanding = false;

		// Add an overflow on the <details> to avoid content overflowing
		detailsElement.style.overflow = 'hidden';

		// Store the current height of the element
		const startHeight = `${detailsElement.offsetHeight}px`;

		// Calculate the height of the summary
		const endHeight = `${summaryElement.offsetHeight}px`;

		// If there is already an animation running
		if (animation) {
			// Cancel the current animation
			animation.cancel();
		}

		// Start a WAAPI animation
		animation = detailsElement.animate(
			{
				// Set the keyframes from the startHeight to endHeight
				height: [startHeight, endHeight]
			},
			{
				duration: expandDuration,
				easing: 'ease-out'
			}
		);

		// When the animation is complete, call onAnimationFinish()
		animation.onfinish = () => {
			onAnimationFinish(false);
		};
		// If the animation is cancelled, isCollapsing variable is set to false
		animation.oncancel = () => (isCollapsing = false);
	}

	function onAnimationFinish(isNowOpen: boolean) {
		// Set the open attribute based on the parameter
		open = isNowOpen;
		// Clear the stored animation
		animation = null;
		// Reset isCollapsing & isExpanding
		isCollapsing = false;
		isExpanding = false;
		// Remove the overflow hidden and the fixed height
		detailsElement.style.height = '';
		detailsElement.style.overflowY = overflowY;
		detailsElement.style.overflowX = overflow_X;
	}

	const checkforSpace = async (e: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (e.code === 'Space') {
			toggle();
		}
	};
</script>

<details
	bind:this={detailsElement}
	class:cloudyBackground
	class:frostedGlass
	class:adminOnly
	bind:open
	on:click|self|preventDefault|stopPropagation={clicked}
	on:keydown|preventDefault={(e) => checkforSpace(e)}
	tabindex="0"
	style={customDetailsStyles}
>
	<summary
		bind:this={summaryElement}
		on:click|self|preventDefault|stopPropagation={clicked}
		on:keydown|preventDefault={(e) => checkforSpace(e)}
		class:adminOnly
		class={showArrow ? '' : 'hideArrow'}
		style="display:{showArrow ? 'list-item' : 'flex'}; border-radius:{open
			? '0'
			: 'inherit'}; {customSummaryStyles}"
	>
		{#if customExpandIcon}
			<Fa icon={customExpandIcon} class={iconClass} />
		{/if}
		{#if expandTitle !== ''}
			{expandTitle}
		{/if}
		<slot name="summary" />
	</summary>

	<div bind:this={contentElement} class="content" style={customContentStyles}>
		<slot name="content" />
	</div>
</details>

<style lang="scss">
	// @import 'src/Styles/Mixins.scss';
	details,
	summary {
		@include defaultTransition;
		@include rounded;
		outline: none;
		width: 100%;
	}
	details {
		@include accelerate;
		@include thinnestBorder;
		@include noOutline;
		color: var(--main-color);
		&:hover,
		&:focus-within {
			@include dayShadow;
		}
		&.cloudyBackground {
			@include cloudyBackground;
		}
		&.frostedGlass {
			@include frostedGlass;
		}
		@include normalShadow;

		&[open] {
			// box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.137);
			& summary ~ * {
				@include accelerate;
				animation: sweep 0.5s ease-in-out;
			}
		}
	}
	@keyframes sweep {
		0% {
			opacity: 0;
			transform: translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	summary {
		color: black;
		padding: 0.5em;
		transition: border-radius 0ms;
		cursor: pointer;
		justify-content: center;
		position: sticky;
		top: 0;
		background: rgb(255 255 255);
		z-index: 1;
		&::marker,
		&::-webkit-details-marker {
			&::before {
				box-sizing: border-box;
				width: 0;
				height: 0;
				border-top: 60px solid transparent;
				border-bottom: 60px solid transparent;
				border-left: 60px solid black;
			}
		}
	}

	.hideArrow {
		&::marker,
		&::-webkit-details-marker {
			content: '';
		}
	}
	.content {
		box-sizing: border-box;
		padding: 1rem;
		width: 100%;
	}
	.adminOnly {
		@include admin;
	}
</style>
