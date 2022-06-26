<script lang="ts">
	import type { Team } from '$lib/scripts/classes/team';
	import { larger_than_mobile, selected_year, use_dark_theme } from '$scripts/store';
	import { faTrash } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import TeamImage from '../containers/TeamImage.svelte';

	export let team: Team;
	export let disabled: boolean = false;
	export let selected: boolean;
	export let group_selected_count: number = 0;
	export let only_unselect: boolean = false;
	export let show_previous_year_record: boolean = false;
	export let show_this_year_record: boolean = false;

	$: previous_year_record = team.records.find((r) => r.year === $selected_year - 1);
	$: this_year_record = team.records.find((r) => r.year === $selected_year);
</script>

<button
	class:selected
	class:not-clickable={disabled}
	{disabled}
	on:click={() => {
		if (!only_unselect && group_selected_count < 2) {
			selected = !selected;
		} else {
			selected = false;
		}
	}}
>
	<span>
		{#if !disabled && selected}
			<Fa
				icon={faTrash}
				style={`${$larger_than_mobile ? 'position:absolute; right: -2rem; top: 45%;' : ''} color: ${
					$use_dark_theme ? 'inherit' : 'var(--text)'
				}`}
			/>
		{/if}
		{team.abbreviation}
	</span>
	<TeamImage {team} />
	{#if show_previous_year_record}
		<span>
			{previous_year_record?.wins}-{previous_year_record?.losses}{#if previous_year_record?.ties}-{previous_year_record?.ties}{/if}
			<p>({previous_year_record?.year})</p>
		</span>
	{/if}
	{#if show_this_year_record}
		<span>
			{this_year_record?.wins}-{this_year_record?.losses}{#if this_year_record?.ties}-{this_year_record?.ties}{/if}
			<p>({this_year_record?.year})</p>
		</span>
	{/if}
</button>

<style lang="scss">
	button {
		@include styledButton;
		max-width: unset;
		box-sizing: border-box;
		display: grid;
		gap: 0.25rem;
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
	.not-clickable {
		&:active,
		&:hover,
		&:focus {
			cursor: unset;
			box-shadow: none;
			outline-offset: 0.25rem;
			outline: var(--accent) solid 1px;
			transform: scale(1);
		}
	}
</style>
