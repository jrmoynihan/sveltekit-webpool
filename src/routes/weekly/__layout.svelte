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
	import { nav_toggled } from '$scripts/store';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { weeklyTabs } from '$scripts/site';

	export let refresh: unknown;
</script>

<Navigator minItemSize="10rem" maxItemSize="max-content" customStyles="top: 3.5rem;">
	{#each weeklyTabs as tab, index}
		<NavLink {index} pageOption={tab} fullyRounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles={$nav_toggled ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}>
	<slot />
</TransitionWrapper>
