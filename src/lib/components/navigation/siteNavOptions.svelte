<script lang="ts">
	import { PageOptions } from '$scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { currentUser, userData } from '$scripts/auth';
	export let modalID: string = '';
</script>

{#each PageOptions as pageOption, index}
	{#if pageOption.requiresAdmin === true}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.admin === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else if pageOption.requiresWeekly}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.weekly === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else if pageOption.requiresSurvivor}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.survivor === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else if pageOption.requiresPick6}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.pick6 === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else if pageOption.requiresPlayoffs}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.playoffs === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else if pageOption.requiresCollege}
		{#if $userData !== undefined && $currentUser !== undefined}
			{#if $userData.college === true}
				<NavLink {index} {pageOption} {modalID} />
			{/if}
		{/if}
	{:else}
		<NavLink {index} {pageOption} {modalID} />
	{/if}
{/each}
