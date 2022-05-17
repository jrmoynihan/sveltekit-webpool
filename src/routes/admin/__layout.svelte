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
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { admin_tabs } from '$lib/scripts/site';

	export let refresh: unknown;

	const maxLengthText: number = 10;
	// Can change 'maxLengthText = Math.max(...textLengths)' to keep all text in a single line
	// const textLengths: number[] = adminTabs.map((tab) => {
	// 	return tab.navigationText.length;
	// });
</script>

<Navigator minItemSize="{maxLengthText}ch" maxItemSize="max-content" customStyles="top:3.2rem;">
	{#each admin_tabs as tab, index}
		<NavLink {index} page_option={tab} fully_rounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles="display:grid;">
	<slot />
</TransitionWrapper>
