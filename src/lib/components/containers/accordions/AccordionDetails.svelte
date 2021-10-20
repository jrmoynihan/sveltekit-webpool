<script lang="ts">
	import { browser } from '$app/env';
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
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
	export class Accordion {
		el: HTMLDetailsElement;
		summary: HTMLElement;
		content: HTMLElement;
		animation: Animation;
		isClosing: boolean;
		isExpanding: boolean;
		open: boolean;
		userAppliedOverflowYStyle: string;
		userAppliedOverflowXStyle: string;

		constructor(element: HTMLDetailsElement, overflow_Y?: string) {
			// Store the <details> element
			this.el = element;
			// Store the <summary> element
			this.summary = element.querySelector('summary');
			// Store the <div class="content"> element
			this.content = element.querySelector('.content');
			// Store any user-applied overflow styling
			this.userAppliedOverflowXStyle = overflow_X;
			this.userAppliedOverflowYStyle = overflow_Y;

			// Store the animation object (so we can cancel it if needed)
			this.animation = null;
			// Store if the element is closing
			this.isClosing = false;
			// Store if the element is expanding
			this.isExpanding = false;
			// Detect user clicks on the summary element
			this.summary.addEventListener('click', (e) => this.onClick(e));
		}

		onClick(e: MouseEvent) {
			// Stop default behaviour from the browser
			e.preventDefault();
			// Add an overflow on the <details> to avoid content overflowing
			this.el.style.overflow = 'hidden';
			// Check if the element is being closed or is already closed
			if (this.isClosing || !this.el.open) {
				this.openAccordion();
				// Check if the element is being openned or is already open
			} else if (this.isExpanding || this.el.open) {
				this.shrink();
			}
		}

		shrink() {
			// Set the element as "being closed"
			this.isClosing = true;

			// Add an overflow on the <details> to avoid content overflowing
			this.el.style.overflow = 'hidden';

			// Store the current height of the element
			const startHeight = `${this.el.offsetHeight}px`;
			// Calculate the height of the summary
			const endHeight = `${this.summary.offsetHeight}px`;

			// If there is already an animation running
			if (this.animation) {
				// Cancel the current animation
				this.animation.cancel();
			}

			// Start a WAAPI animation
			this.animation = this.el.animate(
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
			this.animation.onfinish = () => this.onAnimationFinish(false);
			// If the animation is cancelled, isClosing variable is set to false
			this.animation.oncancel = () => (this.isClosing = false);
		}

		openAccordion() {
			// Apply a fixed height on the element
			this.el.style.height = `${this.el.offsetHeight}px`;
			// Force the [open] attribute on the details element
			this.el.open = true;
			// Wait for the next frame to call the expand function
			window.requestAnimationFrame(() => this.expand());
		}

		expand() {
			// Set the element as "being expanding"
			this.isExpanding = true;
			// Get the current fixed height of the element
			const startHeight = `${this.el.offsetHeight}px`;
			// Calculate the open height of the element (summary height + content height)
			const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

			// If there is already an animation running
			if (this.animation) {
				// Cancel the current animation
				this.animation.cancel();
			}

			// Start a WAAPI animation
			this.animation = this.el.animate(
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
			this.animation.onfinish = () => this.onAnimationFinish(true);
			// If the animation is cancelled, isExpanding variable is set to false
			this.animation.oncancel = () => (this.isExpanding = false);
		}

		onAnimationFinish(open: boolean) {
			// Set the open attribute based on the parameter
			this.el.open = open;
			// Clear the stored animation
			this.animation = null;
			// Reset isClosing & isExpanding
			this.isClosing = false;
			this.isExpanding = false;
			// Remove the overflow hidden and the fixed height
			this.el.style.height = '';
			this.el.style.overflowY = this.userAppliedOverflowYStyle;
			this.el.style.overflowX = this.userAppliedOverflowXStyle;
		}
	}
	let accordion: Accordion;
	onMount(() => {
		if (browser) {
			// this.querySelectorAll('details').forEach((el) => {
			accordion = new Accordion(detailsElement, overflowY);
			// });
		}
	});

	onDestroy(() => {
		if (browser) {
			document.querySelectorAll('summary').forEach((el) => {
				removeEventListener('click', el.onclick);
			});
		}
	});

	const dispatch = createEventDispatcher();

	const clicked = (element: string) => {
		dispatch('click');
		// console.log(`clicked ${element}`);
	};
	const checkforSpace = async (e: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (e.code === 'Space') {
			if (accordion.el.open) {
				accordion.shrink();
			} else {
				accordion.openAccordion();
			}
		}
	};
</script>

<details
	bind:this={detailsElement}
	class:cloudyBackground
	class:frostedGlass
	class:adminOnly
	bind:open
	on:click|self|preventDefault|stopPropagation={() => clicked('details')}
	on:keydown|preventDefault={(e) => checkforSpace(e)}
	tabindex="0"
	style={customDetailsStyles}
>
	<summary
		class:adminOnly
		class={showArrow ? '' : 'hideArrow'}
		style="display:{showArrow ? 'list-item' : 'flex'}; {customSummaryStyles}"
	>
		{#if customExpandIcon}
			<Fa icon={customExpandIcon} class={iconClass} />
		{/if}
		{#if expandTitle !== ''}
			{expandTitle}
		{/if}
		<slot name="summary" />
	</summary>

	<div class="content" style={customContentStyles} on:click={() => clicked('content')}>
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
		padding: 1rem;
		width: 100%;
	}
	.adminOnly {
		@include admin;
	}
</style>
