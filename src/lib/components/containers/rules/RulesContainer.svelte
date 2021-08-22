<script lang="ts">
	import {
		onSnapshot,
		QueryDocumentSnapshot,
		orderBy,
		query,
		CollectionReference
	} from '@firebase/firestore';
	import ToggleSwitch from '$switches/ToggleSwitch.svelte';
	import { userData } from '$scripts/auth';
	import Fa from 'svelte-fa';
	import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
	import { rulesConverter } from '$scripts/converters';
	import PrizeCard from '$containers/rules/PrizeCard.svelte';
	import RulesCategoryGrid from '$containers/rules/RulesCategoryGrid.svelte';
	import { onDestroy } from 'svelte';
	import Tabs from '$navigation/Tabs.svelte';
	import { editing } from '$scripts/store';
	import type { WebUser } from '$scripts/classes/webUser';

	// Dynamically pass a specific rules collection in
	export let rulesCollection: CollectionReference;

	// By default, even an admin won't see an editable rule page
	$editing = false;
	let editable = false;

	// But an admin will have the option to make it editable
	const isUserAdmin = (userData: WebUser): boolean => {
		if (userData !== undefined) {
			return userData.admin;
		}
	};
	$: editable = isUserAdmin($userData);

	// Initialize an empty array to store document snapshots (listeners) of the WeeklyRules collection
	let rulesCollectionDocuments: QueryDocumentSnapshot[] = [];

	// Orders the rule documents as they are queried
	let ruleQuery = query(rulesCollection, orderBy('order'));

	// Dynamically watches for changes to the WeeklyRules collection, and brings them in in order of their 'order' field value
	// This will also react to changes to hte WeeklyRules collection's documents, but not the fields of those documents
	const unsubscribe = onSnapshot(ruleQuery.withConverter(rulesConverter), (snap) => {
		try {
			snap.forEach((doc) => {
				rulesCollectionDocuments = [...rulesCollectionDocuments, doc];
			});
			// console.log('fetched rules!', rulesCollectionDocuments);
			// unsubscribe();
		} catch (err) {
			console.error(err);
		}
	});
	onDestroy(() => {
		unsubscribe(); // Stop listening to the collection when the component is unmounted from the DOM
		console.log('unsubscribed from rule changes!');
	});

	let tabs = [];
	let tab = {};

	$: {
		if (rulesCollectionDocuments) {
			rulesCollectionDocuments.forEach((doc) => {
				const data = doc.data();
				const ref = doc.ref;
				// const q = query(collection(doc.ref, 'Rules'), orderBy('order'));
				tab = { name: data.title, component: RulesCategoryGrid, data: data, ref: ref };
				if (tab['name'] !== 'Prizes') {
					tabs = [...tabs, tab];
				}
			});
		}
	}
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

<PrizeCard {rulesCollectionDocuments} />
<hr />

{#if tabs}
	<Tabs {tabs} selectedTab={tabs[0]} />
{/if}

<style lang="scss">
	div {
		padding: 1%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.editToggle {
		@include rounded;
		display: grid;
		padding: 1rem;
		border: 2px var(--accent-color) solid;
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
