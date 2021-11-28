<script lang="ts">
	import { browser } from '$app/env';
	import { Accordion } from '$scripts/classes/accordion';
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
	let accordion: Accordion;

	onMount(() => {
		if (browser) {
			// this.querySelectorAll('details').forEach((el) => {
			accordion = new Accordion(detailsElement, expandDuration, overflowY, overflow_X);
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
				accordion.shrink(expandDuration);
			} else {
				accordion.openAccordion(expandDuration);
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
