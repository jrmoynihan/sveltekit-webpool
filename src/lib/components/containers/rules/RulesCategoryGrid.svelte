<script lang="ts">
import { editing } from "$scripts/store";
import { onSnapshot, query, collection, orderBy } from "@firebase/firestore";
import EditableRule from "$containers/rules/EditableRule.svelte";
import ViewOnlyRule from "$containers/rules/ViewOnlyRule.svelte";
import { onDestroy } from "svelte";

	export let selectedTab

	let rules = []
	let q = query(collection(selectedTab['ref'], 'Rules'), orderBy('order'));
	const unsubscribe = onSnapshot(q,snap=>{
		rules = []
		snap.docs.forEach(doc => {
			const ref = doc.ref
			rules = [...rules, {data: doc.data(), ref: ref}]
		})
	})

	onDestroy(()=>unsubscribe())
</script>

<div id="rules-grid" class={$editing ? 'editing': 'false'}>
	<!-- <slot /> -->
	{#if rules}
	{#key rules}
		<ul>
			{#each rules as rule}
				{#if $editing}
					<EditableRule {rule}/>
				{:else}
					<ViewOnlyRule {rule}/>
				{/if}
			{/each}
		</ul>
		{/key}
	{/if}
</div>

<style lang="scss">
	#rules-grid {
		@include gridAndGap;
		// grid-template-columns: repeat(auto-fit, clamp(45ch, 50%, 75ch));
		justify-content: center;
		align-items: start;
		column-gap: 2rem;
		@media (max-width: 960px) {
			// grid-template-columns: clamp(45ch, 50%, 75ch);
		}
		&.editing{
			grid-template-columns: 1fr;
		}
	}
	ul{
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(min(50ch,100%),1fr));
		width: 100%;
	}
</style>
