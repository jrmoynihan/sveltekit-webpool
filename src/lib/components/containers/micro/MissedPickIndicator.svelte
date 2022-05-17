<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { goToMissedPick } from '$scripts/scrollAndFocus';
	import { show_missing_pick_warning } from '$scripts/store';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	export let currentPicks: WeeklyPickDoc[];
</script>

{#if $show_missing_pick_warning}
	<Tooltip tooltipTop="-500%">
		<svelte:fragment slot="text">You missed a pick! Click here to find it!</svelte:fragment>
		<button on:click={() => goToMissedPick(currentPicks)} slot="content">
			<Fa icon={faExclamationCircle} />
		</button>
	</Tooltip>
{/if}
