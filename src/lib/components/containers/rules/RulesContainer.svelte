<script lang="ts">
	import { RuleTab, type RuleCategory } from '$classes/rules';
	import PrizeCard from '$containers/rules/PrizeCard.svelte';
	import RulesCategoryGrid from '$containers/rules/RulesCategoryGrid.svelte';
	import { ruleCategoryConverter } from '$lib/scripts/firebase/converters';
	import { myLog } from '$lib/scripts/utilities/logging';
	import Tabs from '$navigation/Tabs.svelte';
	import { CollectionReference, onSnapshot, orderBy, query } from '@firebase/firestore';
	import { onDestroy } from 'svelte';

	// This container can receive different collection references for the various pools
	export let rulesCollection: CollectionReference;

	let ruleCategories: RuleCategory[];
	const ruleQuery = query(rulesCollection, orderBy('order'));
	// Dynamically watches for changes to the Rules collection, and brings them in in order of their 'order' field value
	// This will also react to changes to hte Rules collection's documents, but not the fields of those documents
	const unsubscribe = onSnapshot(ruleQuery.withConverter(ruleCategoryConverter), (snap) => {
		try {
			const ruleDocs: RuleCategory[] = [];
			snap.forEach((doc) => {
				const data = doc.data();
				const ref = doc.ref;
				ruleDocs.push({ docRef: ref, ...data });
			});
			// Trigger reactive update (hopefully)
			ruleCategories = ruleDocs;
		} catch (err) {
			console.error(err);
		}
	});
	onDestroy(() => {
		unsubscribe(); // Stop listening to the collection when the component is unmounted from the DOM
		myLog({ msg: 'unsubscribed from rule document changes!' });
	});

	let tabs: RuleTab[] = [];

	$: ruleCategories?.forEach((ruleCategory) => {
		if (ruleCategory.title !== 'Prizes') {
			// Package categories that aren't prizes info into objects that are consumable by my Tabs components
			const tab = new RuleTab({
				name: ruleCategory.title,
				component: RulesCategoryGrid,
				data: ruleCategory,
				ref: ruleCategory.docRef
			});
			// Re-assignment will trigger the reactive update
			tabs = [...tabs, tab];
		}
	});
</script>

{#if ruleCategories}
	<PrizeCard {ruleCategories} />
	<hr />
{/if}
{#if tabs.length > 0}
	<Tabs {tabs} selected_tab={tabs[0]} />
{/if}
