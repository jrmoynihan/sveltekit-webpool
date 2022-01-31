<script lang="ts">
	import { largerThanMobile } from '$scripts/store';

	import type { pickSixItem } from '$scripts/types/types';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
				style={$largerThanMobile ? 'position:absolute; right: 10%; top: 10%;' : ''}
			/>
		{/if}
		{teamOption.team.abbreviation}
	</span>
	<TeamImage team={teamOption.team} width="100px" />
</button>

<style lang="scss">
	button {
		@include styledButton;
		display: grid;
		gap: 0.5rem;
		height: 100%;
		@include responsive_mobile-only {
			grid-column: span 2;
		}
	}
	.selected {
		background: var(--pick6-selection);
		border-color: hsla(var(--pick6-selection-value), 1);
	}
</style>
