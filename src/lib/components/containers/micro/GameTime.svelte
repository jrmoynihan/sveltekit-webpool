<script lang="ts">
	import { windowWidth } from '$scripts/store';

	import type { Timestamp } from '@firebase/firestore';

	export let timestamp: Timestamp;
	let date = timestamp.toDate();
	let dateString = date.toDateString();
	let dateLocaleString = date.toLocaleDateString();
	let dateLocaleTimeString = date.toLocaleTimeString([], { timeStyle: 'short' });
	let useShortDate = false;
	$: useShortDate = $windowWidth < 500;
</script>

<!-- {Intl.DateTimeFormat('en-US',{weekday:'long'}).format(timestamp.toDate().getDay())} -->
<div>
	{#if useShortDate}
		<p>{dateLocaleString}</p>
	{:else}
		<p>{dateString}</p>
	{/if}
	<p>@ {dateLocaleTimeString}</p>
</div>

<style lang="scss">
</style>
