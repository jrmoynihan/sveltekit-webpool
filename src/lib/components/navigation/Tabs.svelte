<script lang="ts">
	import { largerThanMobile, useDarkTheme } from '$scripts/store';
	import TransitionWrapper from '../TransitionWrapper.svelte';

	export let tabs = [];
	export let selectedTab = {};
</script>

<div class="tabs-container defaultTransition">
	<div class="tab-header defaultTransition">
		{#if tabs}
			{#each tabs as tab}
				<input
					type="radio"
					bind:group={selectedTab}
					value={tab}
					id={tab.name}
					on:change={() => console.log(`tab changed`)}
				/>
				<label
					class="defaultTransition {$useDarkTheme ? 'dark' : 'light'}
					{$largerThanMobile ? '' : 'mobile'}"
					for={tab.name}><h3>{tab.name}</h3></label
				>
			{/each}
		{/if}
	</div>
	<TransitionWrapper refresh={selectedTab}>
		<div class="tab-component">
			{#if selectedTab}
				<svelte:component this={selectedTab['component']} {selectedTab}>
					<slot name="tab-component" />
				</svelte:component>
			{/if}
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
		align-items: center;
		box-shadow: 0 0 2px 2px hsla(0, 0%, 0%, 0.3);
		cursor: pointer;
		display: grid;
		font-weight: bold;
		padding: 1rem;
		height: 100%;
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
	}

	input[type='radio'] {
		visibility: hidden;
		display: none;
		&:checked + label {
			&.light {
				@include active($color: var(--background));
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
		box-shadow: 0 0 2px 2px hsla(0, 0%, 0%, 0.3);
		padding: 1rem;
	}
</style>
