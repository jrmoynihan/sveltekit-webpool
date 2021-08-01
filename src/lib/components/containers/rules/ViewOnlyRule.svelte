<script lang="ts">
	import type { DocumentReference } from '@firebase/firestore';
	import type {DocumentData} from 'firebase/firestore'

	export let rule : {data: DocumentData, ref: DocumentReference};
	
	let ruleData = { ...rule.data };
</script>

<li class="rule-item">{@html ruleData.text}</li>

<style>
	/* Style rule items */
	.rule-item {
		display: inline-block;
		padding: 0.5rem 2rem;
		max-width: 100%;
		justify-content: center;
		align-items: center;
		align-content: center;
	}
</style>
