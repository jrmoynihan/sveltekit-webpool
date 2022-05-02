<script lang="ts">
	import { PageOptions } from '$scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { authorizedUser, playerData } from '$scripts/store';
</script>

{#each PageOptions as pageOption, index}
	{#if pageOption.requiresAdmin === true}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.admin === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresWeekly}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.weekly === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresSurvivor}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.survivor === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPick6}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.pick6 === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPlayoffs}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.playoffs === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresCollege}
		{#if $playerData !== undefined && $authorizedUser !== undefined}
			{#if $playerData.college === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else}
		<NavLink {index} {pageOption} />
	{/if}
{/each}
