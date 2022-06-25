<script lang="ts">
	import type { Tab } from '$lib/scripts/classes/tab';
	import { larger_than_mobile, use_dark_theme } from '$scripts/store';
	import TransitionWrapper from '../TransitionWrapper.svelte';

	export let tabs: Tab[];
	export let selected_tab: Tab;

	export const checkForEnterOrSpace = (
		e: KeyboardEvent & { currentTarget: EventTarget & HTMLLabelElement },
		index: number
	) => {
		if (e.code === 'Enter' || e.code === 'Space') {
			selected_tab = tabs[index];
		}
	};
</script>

<div class="tabs-container defaultTransition">
	<div class="tab-header defaultTransition">
		{#if tabs}
			{#each tabs as tab, i}
				<label
					class="defaultTransition"
					class:dark={$use_dark_theme}
					class:light={!$use_dark_theme}
					class:mobile={!$larger_than_mobile}
					class:active={tab === selected_tab}
					for={tab.name}
					tabindex="0"
					on:keypress={(e) => checkForEnterOrSpace(e, i)}
				>
					<input type="radio" bind:group={selected_tab} value={tab} id={tab.name} />
					<h3>{tab.name}</h3>
				</label>
			{/each}
		{/if}
	</div>
	<div class="tab-component">
		<TransitionWrapper refresh={selected_tab}>
			<svelte:component this={selected_tab.component} {selected_tab} />
		</TransitionWrapper>
	</div>
	<slot name="tab-footer" />
</div>

<style lang="scss">
	.defaultTransition {
		@include defaultTransition;
	}
	.tabs-container {
		@include gridAndGap;
		grid-template-rows: max-content max-content;
		margin: 1rem 0;
		@include responsive_desktop_only {
			margin: 1rem 5rem;
		}
	}
	label {
		box-sizing: border-box;
		align-items: center;
		box-shadow: 0 0 2px 2px hsla(0, 0%, 0%, 0.3);
		cursor: pointer;
		display: grid;
		font-weight: bold;
		padding: 1rem;
		height: 100%;
		&.active.light {
			@include active($color: var(--background));
		}
		&.active.dark {
			@include active($backgroundAlpha: 0.4);
		}
	}
	.tab-header {
		@include rounded;
		align-items: center;
		display: grid;
		gap: 0.2em;
		grid-template-columns: repeat(auto-fit, minmax(15ch, auto));
		& > label:first-of-type {
			border-radius: 1rem 0 0 1rem;
		}
		& > label:last-of-type {
			border-radius: 0 1rem 1rem 0;
		}
		& > label.mobile {
			border-radius: 1rem;
		}
		& > label:hover:not(.active),
		& > label:focus-within:not(.active) {
			&.dark {
				background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 20%);
			}
			&.light {
				background-color: hsla(var(--accent-value, forestgreen), 60%);
				color: var(--background);
			}
		}
	}

	input[type='radio'] {
		visibility: hidden;
		display: none;
	}

	.tab-component {
		border-radius: 1rem;
		display: grid;
		align-items: center;
		box-shadow: 0 0 2px 2px hsla(0, 0%, 0%, 0.3);
		padding: 1rem;
	}
</style>
