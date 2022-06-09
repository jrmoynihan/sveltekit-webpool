<script context="module" lang="ts">
	// TODO: replace this eventually with a handle function that runs on every request
	export const load = async ({ url }: LoadEvent): Promise<LoadOutput> => ({
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
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { survivor_tabs } from '$scripts/site';

	export let refresh: unknown;
</script>

<Navigator minItemSize="10rem" maxItemSize="max-content" customStyles="top: 3.5rem;">
	{#each survivor_tabs as tab, index}
		<NavLink {index} page_option={tab} fully_rounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles={$nav_toggled ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}>
	<slot />
</TransitionWrapper>
