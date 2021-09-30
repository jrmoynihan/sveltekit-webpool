<script lang="ts">
	import {
		onSnapshot,
		QueryDocumentSnapshot,
		orderBy,
		query,
		DocumentReference,
		CollectionReference,
		getDocs,
		DocumentData
	} from '@firebase/firestore';
	import ToggleSwitch from '$switches/ToggleSwitch.svelte';
	import { userData } from '$scripts/auth';
	import Fa from 'svelte-fa';
	import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import { ruleCategoryConverter } from '$scripts/converters';
	import PrizeCard from '$containers/rules/PrizeCard.svelte';
	import RulesCategoryGrid from '$containers/rules/RulesCategoryGrid.svelte';
	import Tabs from '$navigation/Tabs.svelte';
	import { editing } from '$scripts/store';
	import type { WebUser } from '$scripts/classes/webUser';
	import type { RuleCategory } from '$scripts/classes/rules';

	// Dynamically pass a specific rules collection in
	export let rulesCollection: CollectionReference;

	// By default, even an admin won't see an editable rule page
	let editable = false;

	// But an admin will have the option to make it editable
	const isUserAdmin = (userData: WebUser): boolean => {
		if (userData !== undefined) {
			return userData.admin;
		}
	};
	$: editable = isUserAdmin($userData);

	const getRuleCategories = async () => {
		const ruleCategories: RuleCategory[] = [];
		// Orders the rule documents as they are queried
		const ruleQuery = query(rulesCollection, orderBy('order'));
		const ruleCategorySnapshot = await getDocs(ruleQuery.withConverter(ruleCategoryConverter));
		ruleCategorySnapshot.forEach((ruleCategory) => {
			const ruleCategoryData = ruleCategory.data();
			const ruleCategoryRef = ruleCategory.ref;
			ruleCategories.push({ docRef: ruleCategoryRef, ...ruleCategoryData });
		});
		return ruleCategories;
	};
	const makeTabs = async (ruleCategories: RuleCategory[]) => {
		let tabs: { name: string; component: any; data: any; ref: DocumentReference }[] = [];
		ruleCategories.forEach((ruleCategory) => {
			tabs.push({
				name: ruleCategory.title,
				component: RulesCategoryGrid,
				data: ruleCategory,
				ref: ruleCategory.docRef
			});
		});
		return tabs;
	};

	// Dynamically watches for changes to the WeeklyRules collection, and brings them in in order of their 'order' field value
	// This will also react to changes to hte WeeklyRules collection's documents, but not the fields of those documents
	// const unsubscribe = onSnapshot(ruleQuery.withConverter(ruleCategoryConverter), (snap) => {
	// 	try {
	// 		snap.forEach((doc) => {
	// 			rulesCollectionDocuments = [...rulesCollectionDocuments, doc];
	// 		});
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// });
	// onDestroy(() => {
	// 	unsubscribe(); // Stop listening to the collection when the component is unmounted from the DOM
	// 	console.log('unsubscribed from rule changes!');
	// });

	// let tab = {};

	// $: {
	// 	if (rulesCollectionDocuments) {
	// 		rulesCollectionDocuments.forEach((doc) => {
	// 			const data = doc.data();
	// 			const ref = doc.ref;
	// 			// const q = query(collection(doc.ref, 'Rules'), orderBy('order'));
	// 			tab = { name: data.title, component: RulesCategoryGrid, data: data, ref: ref };
	// 			if (tab['name'] !== 'Prizes') {
	// 				tabs = [...tabs, tab];
	// 			}
	// 		});
	// 	}
	// }
	let ruleCategoryPromise = getRuleCategories();
	let tabPromise: Promise<
		{ name: string; component: ToggleSwitch; data: any; ref: DocumentReference<DocumentData> }[]
	>;
	const getTabs = async (ruleCategoryPromise: Promise<RuleCategory[]>) => {
		if (ruleCategoryPromise) {
			const ruleCategories = await ruleCategoryPromise;
			tabPromise = makeTabs(ruleCategories);
		}
	};
	$: getTabs(ruleCategoryPromise);
</script>

<!-- Allows admins to edit this text directly -->
{#if editable}
	<div id="editToggle" class="editToggle">
		<div class="editToggle-text">Edit (Admin Only)</div>
		<div class="lock-switch ">
			<ToggleSwitch on:toggle={() => ($editing = !$editing)} />
			<Fa icon={$editing ? faUnlock : faLock} size="lg" />
		</div>
	</div>
{/if}

{#await ruleCategoryPromise}
	Loading rules...
{:then ruleCategories}
	<PrizeCard {ruleCategories} />
	<hr />
	{#await tabPromise}
		Loading tabs...
	{:then tabs}
		<Tabs {tabs} selectedTab={tabs[0]} />
	{/await}
{/await}

<style lang="scss">
	div {
		@include flexCenter;
		padding: 1%;
	}
	.editToggle {
		@include rounded;
		display: grid;
		padding: 1rem;
		border: 2px var(--accent-color, rgb(233, 181, 99)) solid;
		margin: 1rem auto;
		max-width: max-content;
	}
	.editToggle-text {
		width: 20vmin;
	}
	.lock-switch {
		display: flex;
		gap: 0.3em;
	}
</style>
