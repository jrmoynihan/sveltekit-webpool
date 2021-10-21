<script lang="ts">
	import type { BuiltInTransition, BuiltInTransitionConfig } from '$scripts/classes/constants';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';

	export let customStyles = '';
	export let min: string | number = 0;
	export let max: string | number = 'max-content';
	export let repeat: string | number = 'auto-fit';
	export let padding: string | number = '1rem';
	export let gap: string | number = '1rem';
	export let customGridColumns: string = undefined;
	export let useTransition = true;
	export let useInAndOutTransitions = false;
	export let transitionType: BuiltInTransition = 'fade';
	export let inTransitionType: BuiltInTransition = 'fade';
	export let outTransitionType: BuiltInTransition = 'fade';
	export let transitionConfig: BuiltInTransitionConfig = { duration: 200 };
	export let inTransitionConfig: BuiltInTransitionConfig = { duration: 200 };
	export let outTransitionConfig: BuiltInTransitionConfig = { duration: 200 };

	const variableTransition = (
		node: Element | (SVGElement & { getTotalLength(): number }),
		args: {
			useTransition: boolean;
			transitionType: BuiltInTransition;
			transitionConfig: BuiltInTransitionConfig;
		}
	) => {
		if (args.useTransition) {
			switch (args.transitionType) {
				case 'fade':
					return fade(node, args.transitionConfig);
				case 'blur':
					return blur(node, args.transitionConfig);
				case 'fly':
					return fly(node, args.transitionConfig);
				case 'slide':
					return slide(node, args.transitionConfig);
				case 'scale':
					return scale(node, args.transitionConfig);
			}
		}
	};
</script>

{#if useInAndOutTransitions}
	<div
		class="grid"
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
		style="--min:{min}; --max:{max}; --repeat:{repeat};--padding:{padding}; --gap:{gap}; {customStyles};
	{customGridColumns ? customGridColumns : null};"
	>
		<slot />
	</div>
{:else}
	<div
		class="grid"
		transition:variableTransition={{ useTransition, transitionType, transitionConfig }}
		style="--min:{min}; --max:{max}; --repeat:{repeat};--padding:{padding}; ; --gap:{gap}; {customStyles};
	{customGridColumns ? customGridColumns : null};"
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
