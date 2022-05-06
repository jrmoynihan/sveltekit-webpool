<script lang="ts">
	import { player_data } from '$scripts/store';
</script>

{#if $player_data?.admin}
	<slot />
{/if}
