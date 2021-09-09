<script lang="ts">
	import { browser } from '$app/env';
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Fa from 'svelte-fa';

	export let expandTitle: string = '';
	export let showArrow: boolean = true;
	export let customExpandIcon: IconDefinition = null;
	export let iconClass: string = 'fa-CaretDown';
	export let expandDuration: number = 300;
	export class Accordion {
		el: HTMLDetailsElement;
		summary: HTMLElement;
		content: HTMLElement;
		animation: Animation;
		isClosing: boolean;
		isExpanding: boolean;

		constructor(element: HTMLDetailsElement) {
			// Store the <details> element
			this.el = element;
			// Store the <summary> element
			this.summary = element.querySelector('summary');
			// Store the <div class="content"> element
			this.content = element.querySelector('.content');

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
				this.open();
				// Check if the element is being openned or is already open
			} else if (this.isExpanding || this.el.open) {
				this.shrink();
			}
		}

		shrink() {
			// Set the element as "being closed"
			this.isClosing = true;

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

		open() {
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
			this.el.style.overflow = '';
		}
	}

	onMount(() => {
		if (browser) {
			document.querySelectorAll('details').forEach((el) => {
				new Accordion(el);
			});
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

	function clicked() {
		dispatch('click');
	}
</script>

<details on:click={clicked}>
	<summary
		class={showArrow ? '' : 'hideArrow'}
		style="{showArrow ? 'display:list-item' : 'display:flex'};"
	>
		{#if customExpandIcon}<Fa icon={customExpandIcon} class={iconClass} />{/if}
		&nbsp;
		{expandTitle}
		<slot name="summary" />
	</summary>
	<div class="content" on:click={clicked}>
		<slot name="content" />
	</div>
</details>

<style lang="scss">
	// @import 'src/Styles/Mixins.scss';
	details,
	summary {
		outline: none;
		transition: all 100ms ease-in-out;
		width: 100%;
	}
	details {
		@include cloudyBackground;
		@include frostedGlass;
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
	// .content {
	// 	display: grid;
	// 	grid-template-columns: 75% minmax(0, 1fr);
	// 	padding: 1em;
	// 	justify-items: center;
	// 	align-items: center;
	// 	box-sizing: border-box;
	// 	gap: 5px;
	// }

	summary {
		padding: 0.5em;
		transition: all 300ms ease-in-out;
		cursor: pointer;
		justify-content: center;
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
	details {
		@include rounded;
		&:hover {
			@include dayShadow;
		}
	}
	.content {
		padding: 1rem;
		width: 100%;
	}
</style>
