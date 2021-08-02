<script lang="ts">
	import { dev } from '$app/env';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import RoleToggle from '$switches/RoleToggle.svelte';
</script>

<PageTitle>Toggle Your Roles</PageTitle>

{#if dev}
	<RoleToggle role="admin" />
	<RoleToggle role="college" />
	<RoleToggle role="pick6" />
	<RoleToggle role="playoffs" />
	<RoleToggle role="survivor" />
	<RoleToggle role="weekly" />
{/if}
