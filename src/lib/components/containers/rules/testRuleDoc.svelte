<script lang="ts">
	import {
		collection,
		onSnapshot,
		orderBy,
		query,
		QueryDocumentSnapshot
	} from '@firebase/firestore';
	import type { RuleCategory } from '$scripts/classes/rules';
	import { firestoreDB } from '$scripts/firebaseInit';

	export let ruleDoc: QueryDocumentSnapshot;
	let rules = [];

	const rulesSubCollection = collection(firestoreDB, ruleDoc.ref.path, 'Rules');
	const rulesQuery = query(rulesSubCollection, orderBy('order'));
	const unsubscribe = onSnapshot(rulesQuery, (snap) => {
		snap.forEach((doc) => {
			rules = [...rules, doc.data()];
		});
	});
</script>

{#each rules as rule}
	<p>{rule.text}</p>
{/each}

<style lang="scss">
</style>
