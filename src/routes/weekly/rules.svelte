<script lang="ts">
	import RulesContainer from '$containers/rules/RulesContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { weeklyRulesCollection } from '$lib/scripts/firebase/collections';
</script>

<PageTitle>Weekly Pool Rules</PageTitle>

<RulesContainer rulesCollection={weeklyRulesCollection} />
