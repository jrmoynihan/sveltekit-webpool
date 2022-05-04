<script context="module" lang="ts">
	export const load = async ({ url }: LoadInput): Promise<LoadOutput> => ({
		props: {
			refresh: url.pathname.split('/')[2]
		}
	});
</script>

<script lang="ts">
	import NavLink from '$navigation/NavLink.svelte';
	import Navigator from '$navigation/Navigator.svelte';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import { navChecked } from '$scripts/store';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { weeklyTabs } from '$scripts/site';

	export let refresh: unknown;
</script>

<Navigator minItemSize="10rem" maxItemSize="max-content">
	{#each weeklyTabs as tab, index}
		<NavLink {index} pageOption={tab} fullyRounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles={$navChecked ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}>
	<slot />
</TransitionWrapper>
