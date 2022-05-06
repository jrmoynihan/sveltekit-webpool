<script lang="ts">
	import { PageOptions } from '$scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { firebase_user, player_data } from '$scripts/store';
</script>

{#each PageOptions as pageOption, index}
	{#if pageOption.requiresAdmin === true}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.admin === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresWeekly}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.weekly === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresSurvivor}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.survivor === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPick6}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.pick6 === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPlayoffs}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.playoffs === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresCollege}
		{#if $player_data !== undefined && $firebase_user !== undefined}
			{#if $player_data.college === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else}
		<NavLink {index} {pageOption} />
	{/if}
{/each}
