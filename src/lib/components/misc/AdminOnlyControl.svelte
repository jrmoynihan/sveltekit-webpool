<script lang="ts">
	import { current_player } from '$scripts/store';
</script>

{#if $current_player?.admin}
	<slot />
{/if}
