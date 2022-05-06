<script lang="ts">
	import { windowWidth } from '$scripts/store';
	import type { Timestamp } from '@firebase/firestore';

	export let timestamp: Timestamp;
	let date = timestamp.toDate();
	let dateString = date.toDateString();
	let dateLocaleString = date.toLocaleDateString();
	let dateLocaleTimeString = date.toLocaleTimeString([], { timeStyle: 'short' });
	let useShortDate = false;
	let container: HTMLDivElement;
	$: useShortDate = $windowWidth < 500 || container?.getBoundingClientRect().width < 75;
</script>

<div bind:this={container}>
	{#if useShortDate}
		<p>{dateLocaleString}</p>
	{:else}
		<p>{dateString}</p>
	{/if}
	<p>@ {dateLocaleTimeString}</p>
</div>

<style lang="scss">
</style>
