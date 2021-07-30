<script lang="ts">
	import { useDarkTheme } from '$scripts/store';

	import TransitionWrapper from '../TransitionWrapper.svelte';

	export let tabs = [];
	export let selectedTab: { name: string; component: any };
</script>

<div class="tabs-container defaultTransition">
	<div class="tab-header defaultTransition">
		{#if tabs}
			{#each tabs as tab}
				<input type="radio" bind:group={selectedTab} value={tab} id={tab.name} />
				<label class="defaultTransition {$useDarkTheme ? 'dark' : 'light'}" for={tab.name}
					>{tab.name}</label
				>
			{/each}
		{/if}
	</div>
	<TransitionWrapper refresh={selectedTab}>
		<div class="tab-component">
			{#if selectedTab}
				<svelte:component this={selectedTab.component} />
			{/if}
			<slot name="tab-component" />
		</div>
	</TransitionWrapper>
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
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
		cursor: pointer;
		font-weight: bold;
		padding: 1rem;
		// background: radial-gradient(var(--alternate-color) 30%, transparent);
	}
	.tab-header {
		@include rounded;
		display: grid;
		gap: 0.2em;
		grid-template-columns: repeat(auto-fit, minmax(0, auto));
		& > label:first-of-type {
			border-radius: 1rem 0 0 1rem;
		}
		& > label:last-of-type {
			border-radius: 0 1rem 1rem 0;
		}
	}

	input[type='radio'] {
		visibility: hidden;
		display: none;
		&:checked + label {
			&.light {
				@include active;
			}
			&.dark {
				@include active($backgroundAlpha: 0.4);
			}
		}
	}
	.tab-component {
		border-radius: 1rem;
		display: grid;
		align-items: center;
		box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.3);
		padding: 1rem;
	}
</style>
