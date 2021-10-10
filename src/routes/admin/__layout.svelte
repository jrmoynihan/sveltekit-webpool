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
	import { PageOption } from '$scripts/classes/pageOption';
	import TransitionWrapper from '$lib/components/TransitionWrapper.svelte';
	import { dev } from '$app/env';

	export let refresh: any;

	const adminTabs: PageOption[] = [
		new PageOption({ navigationText: 'Manage Users', path: '/admin/manageUsers' }),
		new PageOption({ navigationText: 'Manage Teams', path: '/admin/manageTeams' }),
		new PageOption({ navigationText: 'Game Data', path: '/admin/setGames' }),
		new PageOption({ navigationText: 'Weekly Pool Admin', path: '/admin/weeklyPoolAdmin' })
	];

	const textLengths: number[] = adminTabs.map((tab) => {
		return tab.navigationText.length;
	});

	const maxLengthText: number = Math.max(...textLengths);
</script>

<Navigator minItemSize="{maxLengthText}ch" maxItemSize="max-content" customStyles="top:2.5rem;">
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
