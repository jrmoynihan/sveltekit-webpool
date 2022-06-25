<script lang="ts">
	import RulesContainer from '$containers/rules/RulesContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { weeklyRulesCollection } from '$lib/scripts/firebase/collections';
</script>

<div class="rules">
	<PageTitle>Weekly Pool Rules</PageTitle>

	<RulesContainer rulesCollection={weeklyRulesCollection} />
</div>

<style lang="scss">
	.rules {
		display: grid;
		grid-template-rows: repeat(auto-fit, minmax(0, max-content));
		gap: 1rem;
	}
</style>
