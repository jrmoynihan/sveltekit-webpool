<script lang="ts">
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import Fa from 'svelte-fa';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let expandTitle: string = '';
	export let showArrow: boolean = false;
	export let customExpandIcon: IconDefinition = null;
	export let iconClass: string = 'fa-CaretDown';
	export let customContentStyles: string = '';
	export let customSummaryStyles: string = '';
	export let cloudyBackground = false;
	export let frostedGlass = true;
	export let open = false;
	export let adminOnly = false;
	export let slideParameters = { duration: 500, easing: cubicInOut };

	export const toggle = () => (open = !open);

	const checkforSpace = async (e: KeyboardEvent & { currentTarget: EventTarget & HTMLElement }) => {
		if (e.code === 'Space') {
			toggle();
		}
	};
</script>

<div class="accordion-container">
	<button
		class:cloudyBackground
		class:frostedGlass
		class:adminOnly
		on:click={toggle}
		aria-expanded={open}
		on:keydown|preventDefault={(e) => checkforSpace(e)}
		tabindex="0"
		style={customSummaryStyles}
	>
		{#if expandTitle !== ''}
			{expandTitle}
		{/if}
		<slot name="summary" />
		{#if customExpandIcon}
			<Fa icon={customExpandIcon} class={iconClass} rotate={open ? 90 : 0} />
		{:else if showArrow}
			<svg
				style="tran"
				width="20"
				height="20"
				fill="none"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				viewBox="0 0 24 24"
				stroke="currentColor"><path d="M9 5l7 7-7 7" /></svg
			>
		{/if}
	</button>
	{#if open}
		<div class="content" style={customContentStyles} transition:slide={slideParameters}>
			<slot name="content" />
		</div>
	{/if}
</div>

<style lang="scss">
	button {
		@include normalShadow;
		box-sizing: border-box;
		border: none;
		background: none;
		display: grid;
		color: inherit;
		font: inherit;
		cursor: pointer;
		margin: 0;
		padding: 0.5em;
		gap: 0.5rem;
		justify-items: center;
		align-items: center;
		grid-template-columns: 1fr auto;
		transition: border-radius 800ms ease-in-out, background-color 300ms ease-in-out;
		border-radius: 1rem;
		width: 100%;
		&[aria-expanded='true'] {
			border-radius: 1rem 1rem 0 0;
			transition: border-radius 0s ease-in-out, background-color 300ms ease-in-out;
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
		}
	}
	.content {
		border-radius: 0 0 1rem 1rem;
		transition: background-color 300ms ease-in-out;
	}

	svg {
		transition: transform 0.2s ease-in;
	}

	[aria-expanded='true'] svg {
		transform: rotate(0.25turn);
	}
</style>
