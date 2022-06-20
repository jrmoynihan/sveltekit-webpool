<script lang="ts">
	import RulesContainer from '$containers/rules/RulesContainer.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import { pick6RulesCollection } from '$lib/scripts/firebase/collections';
</script>

<PageTitle>Pick6 Pool Rules</PageTitle>

<RulesContainer rulesCollection={pick6RulesCollection} />
