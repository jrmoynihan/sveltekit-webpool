<script lang="ts">
	import type { QueryDocumentSnapshot } from '@firebase/firestore';
	import PrizeInfo from '$containers/rules/PrizeInfo.svelte';

	export let rulesCollectionDocuments: QueryDocumentSnapshot[] = [];
</script>

<div class="prize-section">
	<!-- <div id="title"><h2>Prizes</h2></div> -->
	{#each rulesCollectionDocuments as rulesDocument}
		{#if rulesDocument.id === 'Prizes'}
			<PrizeInfo {rulesDocument} />
		{/if}
	{/each}
</div>

<style lang="scss">
	$themeText: var(--theme-text);
	/* Style the rule sections */
	.prize-section {
		display: grid;
		// grid-template-columns: repeat(4, minmax(200px, 1fr));
		// width: 100%;
		box-shadow: 0 0 15px $themeText;
		border-radius: 10px;
	}
	// #title {
	// 	grid-column: span 4;
	// 	text-decoration: underline 2px;
	// 	line-height: 1.2;
	// 	color: var(--accent-color);
	// 	font-size: 1.1em;
	// }
</style>
