<script lang="ts">
	import PrizeInfo from '$containers/rules/PrizeInfo.svelte';
	import type { RuleCategory } from '$scripts/classes/rules';

	export let ruleCategories: RuleCategory[];
</script>

<section class="prize-section">
	{#each ruleCategories as ruleCategory}
		{#if ruleCategory.title === 'Prizes'}
			<PrizeInfo prizeData={ruleCategory} />
		{/if}
	{/each}
</section>

<style lang="scss">
	$themeText: var(--theme-text);
	.prize-section {
		display: grid;
		grid-template-rows: repeat(auto-fit, minmax(0, max-content));
		box-shadow: 0 0 15px $themeText;
		border-radius: 10px;
	}
</style>
