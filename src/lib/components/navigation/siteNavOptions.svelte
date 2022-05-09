<script lang="ts">
	import { PageOptions } from '$scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { firebase_user, current_player } from '$scripts/store';
</script>

{#each PageOptions as pageOption, index}
	{#if pageOption.requiresAdmin === true}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.admin === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresWeekly}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.weekly === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresSurvivor}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.survivor === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPick6}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.pick6 === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPlayoffs}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.playoffs === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresCollege}
		{#if $current_player !== undefined && $firebase_user !== undefined}
			{#if $current_player.college === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else}
		<NavLink {index} {pageOption} />
	{/if}
{/each}
