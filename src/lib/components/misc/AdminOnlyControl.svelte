<script lang="ts">
	import { playerData } from '$scripts/store';
</script>

{#if $playerData?.admin}
	<slot />
{/if}
