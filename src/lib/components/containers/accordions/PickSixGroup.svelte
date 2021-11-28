<script lang="ts">
	import Grid from '../Grid.svelte';
	import TeamImage from '../TeamImage.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AccordionDetails from './AccordionDetails.svelte';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import type { pickSixItem } from '$scripts/types/types';
	import { flip } from 'svelte/animate';
	import { defaultToast } from '$scripts/toasts';
	import { largerThanMobile } from '$scripts/store';
	import PickSixButton from '$lib/components/buttons/PickSixButton.svelte';

	export let group: pickSixItem[];
	export let groupSelectedCount: number;
	export let groupLetter: string;

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),

		fallback(node, params) {
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
	open={groupSelectedCount !== 2}
	showArrow={true}
	expandTitle="Group {groupLetter} ({groupSelectedCount}/2 picks made)"
	customSummaryStyles="font-weight:bold; {groupSelectedCount === 2
		? 'background: rgba(var(--accentValue-color) / 40%); color:var(--main-color);'
		: ''} transition: all 300ms ease-in-out; "
>
	<div
		slot="content"
		class="pick6 grid"
		style="grid-template-columns: {$largerThanMobile ? '1fr 1fr' : '1fr'}"
	>
		<Grid
			min={'25%'}
			max={'1fr'}
			customStyles={'align-items:start; grid-template-rows: repeat(3,minmax(5rem,35%));'}
		>
			{#each group.filter((item) => !item.selected) as teamOption (teamOption.team.abbreviation)}
				<div
					class="animation-container"
					animate:flip={{ duration: 300 }}
					in:receive={{ key: teamOption.team.abbreviation }}
					out:send={{ key: teamOption.team.abbreviation }}
				>
					<PickSixButton bind:teamOption bind:selectedCount={groupSelectedCount} />
				</div>
			{/each}
		</Grid>
		{#if $largerThanMobile}
			<Grid
				min={'25%'}
				max={'49%'}
				customStyles={`align-items:start; grid-template-rows: repeat(3,max-content); grid-template-columns: ${
					$largerThanMobile ? '1fr 1fr' : '1fr'
				};`}
			>
				{#each group.filter((item) => item.selected) as teamOption (teamOption.team.abbreviation)}
					<div
						class="animation-container"
						animate:flip={{ duration: 300 }}
						in:receive={{ key: teamOption.team.abbreviation }}
						out:send={{ key: teamOption.team.abbreviation }}
					>
						<PickSixButton bind:teamOption bind:selectedCount={groupSelectedCount} />
					</div>
				{/each}
				{#if groupSelectedCount === 0}
					<div class="placeholder">Pick 1</div>
					<div class="placeholder">Pick 2</div>
				{:else if groupSelectedCount === 1}
					<div class="placeholder">Pick 2</div>
				{/if}
			</Grid>
		{/if}
	</div>
</AccordionDetails>

<style lang="scss">
	.grid {
		@include gridAndGap;
		padding: 1rem;
	}
	.animation-container {
		height: 100%;
	}
	.placeholder {
		@include rounded;
		display: grid;
		place-content: center;
		outline: 2px var(--accent-color) solid;
		height: 10rem;
	}
	button {
		@include styledButton;
		display: grid;
		gap: 0.5rem;
		@include responsive_mobile-only {
			grid-column: span 2;
		}
	}
	.selected {
		background: rgba(51 77 51 / 80%);
		border-color: rgba(51 77 51 / 100%);
	}
</style>
