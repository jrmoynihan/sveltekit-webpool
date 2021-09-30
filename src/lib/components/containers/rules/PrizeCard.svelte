<script lang="ts">
	import PrizeInfo from '$containers/rules/PrizeInfo.svelte';
	import type { RuleCategory } from '$scripts/classes/rules';

	export let ruleCategories: RuleCategory[];
</script>

<div class="prize-section">
	{#each ruleCategories as ruleCategory}
		{#if ruleCategory.title === 'Prizes'}
			<PrizeInfo prizeData={ruleCategory} />
		{/if}
	{/each}
</div>

<style lang="scss">
	$themeText: var(--theme-text);
	.prize-section {
		display: grid;
		box-shadow: 0 0 15px $themeText;
		border-radius: 10px;
	}
</style>
