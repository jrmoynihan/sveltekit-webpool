<script lang="ts">
	// import type { QueryDocumentSnapshot } from '@firebase/firestore';

	// export let rulesCollectionDocuments: QueryDocumentSnapshot[] = [];
	// let itemCount: number;
	// $: itemCount = rulesCollectionDocuments.length;
</script>

<div id="rules-grid">
	<slot />
</div>

<style lang="scss">
	#rules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, clamp(45ch, 50%, 75ch));
		gap: 15px;
		@media (max-width: 960px) {
			grid-template-columns: clamp(45ch, 50%, 75ch);
		}
	}
</style>
