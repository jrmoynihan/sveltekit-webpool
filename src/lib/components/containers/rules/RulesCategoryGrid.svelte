<script lang="ts">
	import { editing } from '$scripts/store';
	import { onSnapshot, query, collection, orderBy } from '@firebase/firestore';
	import EditableRule from '$containers/rules/EditableRule.svelte';
	import ViewOnlyRule from '$containers/rules/ViewOnlyRule.svelte';
	import { onDestroy } from 'svelte';

	export let selectedTab;

	let rules = [];
	let q = query(collection(selectedTab['ref'], 'Rules'), orderBy('order'));
	const unsubscribe = onSnapshot(q, (snap) => {
		rules = [];
		snap.docs.forEach((doc) => {
			const ref = doc.ref;
			rules = [...rules, { data: doc.data(), ref: ref }];
		});
	});

	onDestroy(() => unsubscribe());
</script>

<div id="rules-grid" class={$editing ? 'editing' : ''}>
	{#if rules}
		{#key rules}
			<ol class={$editing ? 'editing' : ''}>
				{#each rules as rule}
					{#if $editing}
						<EditableRule {rule} />
					{:else}
						<ViewOnlyRule {rule} />
					{/if}
				{/each}
			</ol>
		{/key}
	{/if}
</div>

<style lang="scss">
	#rules-grid {
		@include gridAndGap;
		justify-content: center;
		align-items: start;
		&.editing {
			grid-template-columns: 1fr;
		}
	}
	ol {
		display: grid;
		grid-template-columns: repeat(auto-fit, clamp(45ch, 100%, 75ch));
		justify-items: start;
		justify-content: center;
		&.editing {
			grid-template-columns: 1fr;
		}
	}
</style>
