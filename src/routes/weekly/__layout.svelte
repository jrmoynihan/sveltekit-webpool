<script context="module">
	export const load = async ({ page }) => ({
		props: {
			refresh: page.path.split('/')[2]
		}
	});
</script>

<script lang="ts">
	import NavLink from '$navigation/NavLink.svelte';
	import Navigator from '$navigation/Navigator.svelte';
	import { PageOption } from '$scripts/classes';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import { navChecked } from '$scripts/store';

	export let refresh;

	const weeklyTabs: PageOption[] = [
		new PageOption({ navigationText: 'Make Picks', path: '/weekly/makePicks' }),
		new PageOption({ navigationText: 'View League Picks', path: '/weekly/viewPicks' }),
		new PageOption({ navigationText: 'Standings', path: '/weekly/standings' }),
		new PageOption({ navigationText: 'Rules', path: '/weekly/rules' })
	];

	const textLengths: number[] = weeklyTabs.map((tab) => {
		return tab.navigationText.length;
	});

	const maxLengthText: number = Math.max(...textLengths);
</script>

<Navigator minItemSize="{maxLengthText}ch" maxItemSize="max-content">
	{#each weeklyTabs as tab, index}
		<NavLink {index} pageOption={tab} fullyRounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles={$navChecked ? 'margin-top: 0.6rem;' : 'margin-top: 0;'}>
	<slot />
</TransitionWrapper>
