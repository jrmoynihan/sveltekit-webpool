<script lang="ts">
	import { PageOptions } from '$scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { currentUser, userData, userDataSnapshot } from '$scripts/auth/auth';
</script>

{#each PageOptions as pageOption, index}
	{#if pageOption.requiresAdmin === true}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.admin === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresWeekly}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.weekly === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresSurvivor}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.survivor === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPick6}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.pick6 === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresPlayoffs}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.playoffs === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else if pageOption.requiresCollege}
		{#if $userDataSnapshot !== undefined && $currentUser !== undefined}
			{#if $userDataSnapshot.college === true}
				<NavLink {index} {pageOption} />
			{/if}
		{/if}
	{:else}
		<NavLink {index} {pageOption} />
	{/if}
{/each}
