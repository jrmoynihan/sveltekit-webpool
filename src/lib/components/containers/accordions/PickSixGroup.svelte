<script lang="ts">
	import AccordionDetails from './AccordionDetails.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import type { pickSixItem } from '$scripts/types/types';
	import { flip } from 'svelte/animate';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';

	export let group: pickSixItem[];
	export let group_selected_count: number;
	export let group_letter: string;
	export let toggle: () => boolean;
	export let open: boolean;

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<AccordionDetails
	bind:toggle
	bind:open
	expanderIconSide={'left'}
	customSummaryStyles="font-weight:bold; {group_selected_count === 2
		? 'background: hsla(var(--accent-value), 40%); color:var(--text);'
		: ''} transition: all 300ms ease-in-out; "
>
	<div slot="summary">
		<p>Group {group_letter}</p>
		<p>({group_selected_count}/2 picks made)</p>
	</div>
	<div slot="content" class="pick6 grid condensed expansive">
		{#each group.filter((item) => !item.selected) as { team, selected } (team.abbreviation)}
			<div
				class="animation-container"
				animate:flip={{ duration: 300 }}
				in:receive={{ key: team.abbreviation }}
				out:send={{ key: team.abbreviation }}
			>
				<PickSixButton bind:team bind:selected bind:group_selected_count show_record={true} />
			</div>
		{/each}
	</div>
</AccordionDetails>

<style lang="scss">
	.grid {
		@include gridAndGap;
		padding: 1rem;
		grid-template-rows: repeat(auto-fit, minmax(1fr, auto));
	}
	.condensed {
		grid-template-columns: 1fr 1fr;
	}
	.expansive {
		@include responsive_desktop_only {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.animation-container {
		height: 100%;
	}
</style>
