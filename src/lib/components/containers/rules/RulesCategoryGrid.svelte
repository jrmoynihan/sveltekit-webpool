<script lang="ts">
	import EditableRule from '$containers/rules/EditableRule.svelte';
	import ViewOnlyRule from '$containers/rules/ViewOnlyRule.svelte';
	import { ruleConverter } from '$lib/scripts/firebase/converters';
	import type { Rule } from '$scripts/classes/rules';
	import { editing } from '$scripts/store';
	import { collection, CollectionReference, getDocs, orderBy, query } from '@firebase/firestore';

	export let selectedTab: { [x: string]: CollectionReference };

	const getRuleData = async () => {
		const rules: Rule[] = [];
		const q = query(collection(selectedTab['ref'], 'Rules'), orderBy('order'));
		const rulesSnapshot = await getDocs(q.withConverter(ruleConverter));
		rulesSnapshot.forEach((rule) => {
			const rulesData = rule.data();
			rules.push({ ...rulesData });
		});
		return rules;
	};
</script>

<div class="rules-grid" class:editing>
	{#await getRuleData()}
		Loading rules...
	{:then rules}
		<ol class:editing>
			{#each rules as rule}
				{#if $editing}
					<EditableRule {rule} />
				{:else}
					<ViewOnlyRule {rule} />
				{/if}
			{/each}
		</ol>
	{/await}
</div>

<style lang="scss">
	.rules-grid {
		@include gridCenter($gap: 10px);
		&.editing {
			grid-template-columns: 1fr;
		}
	}
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fit, clamp(40ch, 100%, 60ch));
		justify-items: start;
		justify-content: center;
		&.editing {
			grid-template-columns: 1fr;
		}
	}
</style>
