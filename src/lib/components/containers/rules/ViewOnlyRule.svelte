<script lang="ts">
	import { DocumentSnapshot } from '@firebase/firestore';
	export let ruleDocument: DocumentSnapshot;
	let ruleData = { ...ruleDocument.data() };
</script>

<div class="rule-item">{@html ruleData.text}</div>

<style>
	/* Style rule items */
	.rule-item {
		display: inline-block;
		padding: 2vw;
		justify-content: center;
		align-items: center;
		align-content: center;
		align-self: center;
		max-width: 100%;
	}
</style>
