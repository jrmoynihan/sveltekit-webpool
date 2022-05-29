<script lang="ts">
	import { dev } from '$app/env';
	import { page_options } from '$lib/scripts/site';
	import NavLink from '$navigation/NavLink.svelte';
	import { firebase_user, current_player } from '$scripts/store';
</script>

{#each page_options as page, index}
	{#if page.has_no_requirements}
		<NavLink {index} page_option={page} />
		<!-- If there's an active/authorized user... -->
	{:else if $current_player !== undefined && $firebase_user !== undefined}
		{#if dev || (page.requires_admin === true && $current_player.admin === true)}
			<NavLink {index} page_option={page} />
		{:else if page.requires_weekly && $current_player.weekly === true}
			<NavLink {index} page_option={page} />
		{:else if page.requires_survivor && $current_player.survivor === true}
			<NavLink {index} page_option={page} />
		{:else if page.requires_pick6 && $current_player.pick6 === true}
			<NavLink {index} page_option={page} />
		{:else if page.requires_playoffs && $current_player.playoffs === true}
			<NavLink {index} page_option={page} />
		{:else if page.requires_college && $current_player.college === true}
			<NavLink {index} page_option={page} />
		{/if}
	{/if}
{/each}
