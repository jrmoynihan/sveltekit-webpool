<script lang="ts">
	import type { Team } from '$lib/scripts/classes/team';
	import { larger_than_mobile, selected_year, use_dark_theme } from '$scripts/store';
	import { faTrash } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import TeamImage from '../containers/TeamImage.svelte';

	export let team: Team;
	export let selected: boolean;
	export let group_selected_count: number = 0;
	export let only_unselect: boolean = false;
	export let show_record: boolean = false;

	$: record = team.records.find((r) => r.year === $selected_year - 1);
</script>

<button
	class:selected
	on:click={() => {
		if (!only_unselect && group_selected_count < 2) {
			selected = !selected;
		} else {
			selected = false;
		}
	}}
>
	<span>
		{#if selected}
			<Fa
				icon={faTrash}
				style={`${
					$larger_than_mobile ? 'position:absolute; right: -1.5rem; top: 45%;' : ''
				} color: ${$use_dark_theme ? 'inherit' : 'var(--text)'}`}
			/>
		{/if}
		{team.abbreviation}
	</span>
	<TeamImage {team} />
	{#if show_record}
		<span>
			{record?.wins}-{record?.losses}{#if record?.ties}-{record?.ties}{/if}
			<p>({record?.year})</p>
		</span>
	{/if}
</button>

<style lang="scss">
	button {
		@include styledButton;
		box-sizing: border-box;
		display: grid;
		gap: 0.5rem;
		height: 100%;
		grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);
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
