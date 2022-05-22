<script lang="ts">
	import { scrollToNextGame } from '$scripts/scrollAndFocus';
	import { show_missing_pick_warning } from '$scripts/store';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';
</script>

{#if $show_missing_pick_warning}
	<Tooltip tooltipTop="-500%">
		<svelte:fragment slot="text">You missed a pick! Click here to find it!</svelte:fragment>
		<button on:click={scrollToNextGame} slot="content">
			<Fa icon={faExclamationCircle} />
		</button>
	</Tooltip>
{/if}
