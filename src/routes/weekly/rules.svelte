<script lang="ts">
	import { weeklyRulesCollection } from '$scripts/collections';
	import RulesContainer from '$containers/rules/RulesContainer.svelte';
</script>

<h1>Weekly Pool Rules</h1>

<RulesContainer rulesCollection={weeklyRulesCollection} />
