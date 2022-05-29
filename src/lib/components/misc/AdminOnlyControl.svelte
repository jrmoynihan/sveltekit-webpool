<script lang="ts">
	import { dev } from '$app/env';
	import { current_player } from '$scripts/store';
</script>

{#if dev || $current_player?.admin}
	<slot />
{/if}
