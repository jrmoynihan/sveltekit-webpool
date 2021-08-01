<script lang="ts">
	import type { CollectionReference, DocumentSnapshot, doc } from '@firebase/firestore';

	export let rulesCollection: CollectionReference;
	export let ruleDocument: DocumentSnapshot;
	export let categoryID: string;

	const id = ruleDocument.id;
	const ruleData = { ...ruleDocument.data() };

	function updateRule() {
		// doc(rulesCollection, categoryID).collection('Rules').doc(id).update({
		// 	text: ruleData.text,
		// 	order: ruleData.order
		// });
	}
</script>

<div class="rule-item">
	<textarea bind:value={ruleData.text} on:change={updateRule} />
	<input class="order-input" bind:value={ruleData.order} on:change={updateRule} />
</div>

<style>
	.order-input {
		max-width: 50px;
	}
	.rule-item {
		align-content: center;
		align-items: center;
		justify-content: center;
		display: flex;
		gap: 10px;
	}
</style>
