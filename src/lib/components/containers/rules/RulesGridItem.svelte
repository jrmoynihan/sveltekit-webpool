<script lang="ts">
	import {
		DocumentSnapshot,
		QueryDocumentSnapshot,
		collection,
		query,
		orderBy,
		onSnapshot,
		CollectionReference
	} from '@firebase/firestore';
	import EditableRule from '../Rules/EditableRule.svelte';
	import ViewOnlyRule from '../Rules/ViewOnlyRule.svelte';
	// Expose a firestore document object to hold rule data
	export let ruleCategoryDocument: DocumentSnapshot;
	export let rulesCollection: CollectionReference;
	export let editable = false;
	export let editing = false;
	// Initialize an empty array to store document snapshots (listeners) of the WeeklyRules collection
	let ruleDocuments: QueryDocumentSnapshot[] = [];
	const categoryData = { ...ruleCategoryDocument.data() };
	const categoryTitle = categoryData.title;
	const categoryID = ruleCategoryDocument.id;

	// Dynamically watches for changes to the WeeklyRules collection, and brings them in in order of their 'order' field value
	// This will also react to changes to hte WeeklyRules collection's documents, but not the fields of those documents

	let q = query(collection(ruleCategoryDocument.ref, 'Rules'), orderBy('order'));
	console.log(q);
	console.log(ruleCategoryDocument.ref.path);

	// const unsubscribe = onSnapshot(q, (snap) => {
	// 	// Assign the DB collection items to the previously empty 'gridItems' array declared above
	// 	snap.docs.forEach((doc) => {
	// 		console.log(doc);

	// 		ruleDocuments = [...ruleDocuments, doc];
	// 	});
	// 	// Stop subscribing to the listener (prevent memory leaks)
	// 	unsubscribe();
	// });
</script>

{#if categoryTitle != 'Prizes'}
	<div class="rule-section" style="--ruleCount:{ruleDocuments.length}">
		<h1>{categoryTitle}</h1>
		editing: {editing}
		{#each ruleDocuments as ruleDocument}
			{#if editable && editing}
				<EditableRule {ruleDocument} {rulesCollection} {categoryID} />
			{:else}
				<ViewOnlyRule {ruleDocument} />
			{/if}
		{/each}
	</div>
{/if}

<style lang="scss">
	$ruleCount: var(--ruleCount);
	$themeText: var(--theme-text);
	/* Style the rule sections */
	.rule-section {
		display: grid;
		grid-template-columns: repeat(2, minmax(200px, 1fr));
		grid-template-rows: $ruleCount + 1;
		width: 100%;
		box-shadow: 0 0 15px $themeText;
		border-radius: 10px;
	}
	/* Style the rule section title */
	h1 {
		grid-column: span 2;
	}
</style>
