<script lang="ts">
	import type { BuiltInTransition, BuiltInTransitionConfig } from '$scripts/transitions';
	import { variableTransition } from '$scripts/transitions';

	export let customStyles = '';
	export let min: string | number = 0;
	export let max: string | number = 'max-content';
	export let repeat: string | number = 'auto-fit';
	export let padding: string | number = '1rem';
	export let gap: string | number = '1rem';
	export let useTransition = true;
	export let useInAndOutTransitions = false;
	export let transitionType: BuiltInTransition = 'fade';
	export let inTransitionType: BuiltInTransition = 'fade';
	export let outTransitionType: BuiltInTransition = 'fade';
	export let transitionConfig: BuiltInTransitionConfig = { duration: 200 };
	export let inTransitionConfig: BuiltInTransitionConfig = { duration: 200 };
	export let outTransitionConfig: BuiltInTransitionConfig = { duration: 200 };
</script>

{#if useInAndOutTransitions}
	<div
		class="grid {customClasses}"
		in:variableTransition={{
			useTransition: true,
			transitionType: inTransitionType,
			transitionConfig: inTransitionConfig
		}}
		out:variableTransition={{
			useTransition: true,
			transitionType: outTransitionType,
			transitionConfig: outTransitionConfig
		}}
		style="--min:{min}; --max:{max}; --repeat:{repeat};--padding:{padding}; --gap:{gap}; {customStyles};"
	>
		<slot />
	</div>
{:else}
	<div
		class="grid"
		transition:variableTransition={{ useTransition, transitionType, transitionConfig }}
		style="--min:{min}; --max:{max}; --repeat:{repeat};--padding:{padding}; ; --gap:{gap}; {customStyles};"
	>
		<slot />
	</div>
{/if}

<style lang="scss">
	.grid {
		@include gridCenter($gap: var(--gap));
		grid-template-columns: repeat(var(--repeat), minmax(var(--min), var(--max)));
		padding: var(--padding);
	}
</style>
