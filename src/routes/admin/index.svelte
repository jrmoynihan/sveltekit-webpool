<script lang="ts">
	import { dev } from '$app/env';
	import RoleToggle from '$switches/RoleToggle.svelte';
</script>

<h1>Hi Admin!</h1>

{#if dev}
	<RoleToggle role="admin" />
	<RoleToggle role="college" />
	<RoleToggle role="pick6" />
	<RoleToggle role="playoffs" />
	<RoleToggle role="survivor" />
	<RoleToggle role="weekly" />
{/if}

<style lang="scss">
	h1 {
		color: var(--main-color);
	}
</style>
