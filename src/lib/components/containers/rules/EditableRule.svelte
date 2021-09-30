<script lang="ts">
	import { updateDoc } from '@firebase/firestore';
	import type { Rule } from '$scripts/classes/rules';
	import { myLog } from '$scripts/classes/constants';
	import { errorToast } from '$scripts/toasts';

	export let rule: Rule;

	const updateRule = async (): Promise<void> => {
		try {
			myLog(`before rule change: ${rule}`);
			updateDoc(rule.docRef, { ...rule });
			myLog(`after rule change: ${rule}`);
		} catch (err) {
			console.error(err);
			errorToast('Unable to make rule change.  See console log for details.');
		}
	};
</script>

<div class="rule-item">
	<textarea bind:value={rule.text} on:change={updateRule} />
	<input class="order-input" bind:value={rule.order} on:change={updateRule} />
	{#if rule.subtext}
		<textarea bind:value={rule.subtext} on:change={updateRule} />
		<div class="order-input">{rule.order}</div>
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
