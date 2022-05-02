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
	import { PageOption } from '$scripts/classes/pageOption';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export let refresh: unknown;

	const adminTabs: PageOption[] = [
		new PageOption({ navigationText: 'Manage Players', path: '/admin/manage-players' }),
		new PageOption({ navigationText: 'Manage Teams', path: '/admin/manage-teams' }),
		new PageOption({ navigationText: 'Game Data', path: '/admin/set-games' }),
		new PageOption({ navigationText: 'Weekly Pool Admin', path: '/admin/weekly-pool-admin' }),
		new PageOption({ navigationText: 'The Sandbox', path: '/admin/sandbox' })
	];

	const textLengths: number[] = adminTabs.map((tab) => {
		return tab.navigationText.length;
	});

	const maxLengthText: number = Math.max(...textLengths);
</script>

<Navigator minItemSize="{maxLengthText}ch" maxItemSize="max-content" customStyles="top:3.2rem;">
	{#each adminTabs as tab, index}
		<!-- {#if dev} -->
		<NavLink {index} pageOption={tab} fullyRounded={true} />
		<!-- {:else if tab.navigationText !== 'Toggle Roles'}
			<NavLink {index} pageOption={tab} fullyRounded={true} /> -->
		<!-- {/if} -->
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles="display:grid;">
	<slot />
</TransitionWrapper>
