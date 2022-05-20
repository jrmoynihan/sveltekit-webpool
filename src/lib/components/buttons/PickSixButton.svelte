<script lang="ts">
	import { larger_than_mobile } from '$scripts/store';
	import type { pickSixItem } from '$scripts/types/types';
	import { faTrash } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import TeamImage from '../containers/TeamImage.svelte';

	export let teamOption: pickSixItem;
	export let selectedCount: number;
</script>

<button
	class:selected={teamOption.selected}
	on:click={() => {
		if (selectedCount < 2) {
			teamOption.selected = !teamOption.selected;
		} else {
			teamOption.selected = false;
		}
	}}
>
	<span>
		{#if teamOption.selected}
			<Fa
				icon={faTrash}
				style={$larger_than_mobile ? 'position:absolute; right: 10%; top: 10%;' : ''}
			/>
		{/if}
		{teamOption.team.abbreviation}
	</span>
	<TeamImage team={teamOption.team} width="100px" />
</button>

<style lang="scss">
	button {
		@include styledButton;
		box-sizing: border-box;
		display: grid;
		gap: 0.5rem;
		height: 100%;
		grid-template-rows: minmax(0, auto) minmax(0, 1fr);
		justify-items: center;
		padding: min(var(--padding-normal), 5%);
		@include responsive_mobile-only {
			grid-column: span 2;
		}
	}
	.selected {
		background: var(--pick6-selection);
		border-color: hsla(var(--pick6-selection-value), 1);
	}
</style>
