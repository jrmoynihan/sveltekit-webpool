<script lang="ts">
	import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
	import Fa from 'svelte-fa';
	import { cubicInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let expandTitle: string = '';
	export let expanderIconSide: 'left' | 'right' | 'none' = 'none';
	export let customExpandIcon: IconDefinition = null;
	export let iconClass: string = 'fa-CaretDown';
	export let customContentStyles: string = '';
	export let customSummaryStyles: string = '';
	export let customAccordionContainerStyles: string = '';
	export let cloudyBackground = false;
	export let frostedGlass = true;
	export let open = false;
	export let adminOnly = false;
	export let slideParameters = { duration: 500, easing: cubicInOut };
	export let iconClosedRotation = 90; // in degrees
	export let iconOpenRotation = -90; // in degrees

	export const toggle = () => (open = !open);
</script>

<div
	class="accordion-container"
	style={customAccordionContainerStyles}
	style:--icon-closed-rotation={`${iconClosedRotation}deg`}
	style:--icon-open-rotation={`${iconOpenRotation}deg`}
>
	<button
		class:cloudyBackground
		class:frostedGlass
		class:adminOnly
		class:left-icon={expanderIconSide === 'left'}
		class:right-icon={expanderIconSide === 'right'}
		class:no-icon={expanderIconSide === 'none'}
		on:click={toggle}
		aria-expanded={open}
		tabindex="0"
		style={customSummaryStyles}
	>
		{#if customExpandIcon && expanderIconSide === 'left'}
			<Fa
				icon={customExpandIcon}
				class={iconClass}
				rotate={open ? iconOpenRotation : iconClosedRotation}
			/>
		{:else if expanderIconSide === 'left'}
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
		{#if expandTitle !== ''}
			{expandTitle}
		{/if}
		<slot name="summary" />
		{#if customExpandIcon && expanderIconSide === 'right'}
			<Fa
				icon={customExpandIcon}
				class={iconClass}
				rotate={open ? iconOpenRotation : iconClosedRotation}
			/>
		{:else if expanderIconSide === 'right'}
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
		// @include normalShadow;
		box-sizing: border-box;
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
		transition: border-radius 800ms ease-in-out, background-color 300ms ease-in-out;
		border-radius: 1rem;
		width: 100%;
		&.right-icon {
			grid-template-columns: 1fr auto;
		}
		&.left-icon {
			grid-template-columns: auto 1fr;
		}
		&.no-icon {
			grid-template-columns: 1fr;
		}
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
		transform: rotate(var(--icon-closed-rotation));
	}

	[aria-expanded='true'] svg {
		transform: rotate(var(--icon-open-rotation));
	}
</style>
