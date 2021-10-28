<script lang="ts">
	import type { WeeklyPickDoc } from '$scripts/classes/picks';
	import { goToMissedPick } from '$scripts/functions';
	import { showPickWarning } from '$scripts/store';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	export let currentPicks: WeeklyPickDoc[];
</script>

{#if $showPickWarning}
	<Tooltip tooltipTop="-500%">
		<svelte:fragment slot="text">You missed a pick! Click here to find it!</svelte:fragment>
		<button on:click={() => goToMissedPick(currentPicks)} slot="content">
			<Fa icon={faExclamationCircle} />
		</button>
	</Tooltip>
{/if}
