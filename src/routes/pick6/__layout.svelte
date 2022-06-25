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
	import { larger_than_mobile, nav_toggled } from '$scripts/store';
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { pick6_tabs } from '$scripts/site';

	export let refresh: unknown;
</script>

<Navigator minItemSize="10rem" maxItemSize="max-content" customStyles="top: 3.5rem;">
	{#each pick6_tabs as tab, index}
		<NavLink {index} page_option={tab} fully_rounded={true} />
	{/each}
</Navigator>
<TransitionWrapper
	{refresh}
	customStyles={`${$nav_toggled ? 'margin-top: 0.6rem;' : 'margin-top: 0;'} display: grid; ${
		$larger_than_mobile
			? `grid-template-areas: 'heading heading' 'dock picks'; grid-template-columns: minmax(0,10%) minmax(0,1fr); grid-template-rows: minmax(0,auto) minmax(0,1fr);`
			: `grid-template-areas: 'heading' 'picks'; grid-template-columns: minmax(0,1fr); grid-template-rows: minmax(0,auto) minmax(0,1fr)`
	}`}
>
	<slot />
</TransitionWrapper>
