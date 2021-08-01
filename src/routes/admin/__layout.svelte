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

	export let refresh;

	const adminTabs: PageOption[] = [
		new PageOption({ navigationText: 'Admin Home', path: '/admin' }),
		new PageOption({ navigationText: 'Manage Teams', path: '/admin/manageTeams' })
	];

	const textLengths: number[] = adminTabs.map((tab) => {
		return tab.navigationText.length;
	});

	const maxLengthText: number = Math.max(...textLengths);
</script>

<Navigator minItemSize="{maxLengthText}ch" maxItemSize="max-content" customStyles="top:3.5em;">
	{#each adminTabs as tab, index}
		<NavLink {index} pageOption={tab} fullyRounded={true} />
	{/each}
</Navigator>
<TransitionWrapper {refresh} customStyles="display:grid;">
	<slot />
</TransitionWrapper>
