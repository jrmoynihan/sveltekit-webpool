<script lang="ts">
	import { DocumentReference, updateDoc } from '@firebase/firestore';
	import type { DocumentData } from '@firebase/firestore';

	export let rule: { data: DocumentData; ref: DocumentReference };

	const ruleData = { ...rule.data };

	function updateRule(): void {
		try {
			console.log('before', rule);
			if (ruleData.subtext) {
				updateDoc(rule.ref, {
					text: ruleData.text,
					order: ruleData.order,
					subtext: ruleData.subtext
				});
			} else {
				updateDoc(rule.ref, { text: ruleData.text, order: ruleData.order });
			}

			console.log('after', rule);
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="rule-item">
	<textarea bind:value={ruleData.text} on:change={updateRule} />
	<input class="order-input" bind:value={ruleData.order} on:change={() => updateRule()} />
	{#if ruleData.subtext}
		<textarea bind:value={ruleData.subtext} on:change={updateRule} />
		<div class="order-input">{ruleData.order}</div>
	{/if}
</div>

<style lang="scss">
	.order-input {
		max-width: 50px;
	}
	.rule-item {
		@include gridCenter;
		align-content: center;
		grid-template-columns: 1fr max-content;
		gap: 10px;
		width: 100%;
	}
	textarea {
		font-family: inherit;
		font-weight: lighter;
		border-radius: 1em;
		padding: 1em;
	}
</style>
