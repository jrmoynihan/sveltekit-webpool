<script lang="ts">
	import MultiToggleSwitch from '$lib/components/switches/MultiToggleSwitch.svelte';
	import type { ScoreViewPreference } from '$scripts/classes/constants';
	import { preferredScoreView } from '$scripts/store';
	import {
		faCalculator,
		faCheckDouble,
		faFootballBall,
		IconDefinition
	} from '@fortawesome/free-solid-svg-icons';

	let myItems = [
		{ label: 'Alpha', value: 1 },
		{ label: 'Beta', value: 'second' },
		{ label: 'Delta', value: { stuff: 'thingy' } }
	];
	let otherItems = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 },
		{ label: 'Four', value: 4 }
	];
	let viewPreferences: { label: string; value: ScoreViewPreference; icon?: IconDefinition }[] = [
		{ label: 'Actual Scores Only', value: 'Actual', icon: faFootballBall },
		{ label: 'ATS Only', value: 'ATS', icon: faCalculator },
		{ label: 'Both', value: 'Both', icon: faCheckDouble }
	];
</script>

<MultiToggleSwitch items={otherItems} selectedItem={otherItems[1]} titleText="This is the Title" />

<!-- <MultiToggleSwitch items={viewPreferences} adminOnly={true} titleText="Admin Options" /> -->
<MultiToggleSwitch
	items={viewPreferences}
	titleText="all true"
	selectedItem={viewPreferences[0]}
	showIcon={false}
	bind:selectedValue={$preferredScoreView}
/>

<style lang="scss">
</style>
