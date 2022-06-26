<script context="module" lang="ts">
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
	import { weekly_tabs } from '$scripts/site';

	export let refresh: unknown;
</script>

<Navigator minItemSize="10rem" maxItemSize="max-content">
	{#each weekly_tabs as tab, index}
		<NavLink {index} page_option={tab} fully_rounded={true} />
	{/each}
</Navigator>
<TransitionWrapper
	bind:refresh
	customStyles={$nav_toggled ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}
>
	<slot />
</TransitionWrapper>
