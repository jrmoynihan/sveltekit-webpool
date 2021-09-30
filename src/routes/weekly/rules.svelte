<script lang="ts">
	import { weeklyRulesCollection } from '$scripts/collections';
	import RulesContainer from '$containers/rules/RulesContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
</script>

<PageTitle>Weekly Pool Rules</PageTitle>

<RulesContainer rulesCollection={weeklyRulesCollection} />
