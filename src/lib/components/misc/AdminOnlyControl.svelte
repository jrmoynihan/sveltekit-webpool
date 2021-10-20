<script lang="ts">
	import { userData } from '$scripts/auth/auth';
</script>

{#if $userData?.admin}
	<slot />
{/if}
