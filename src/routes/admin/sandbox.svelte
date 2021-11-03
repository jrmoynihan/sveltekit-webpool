<script lang="ts">
	import MultiToggleSwitch from '$lib/components/switches/MultiToggleSwitch.svelte';

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
</script>

<MultiToggleSwitch items={otherItems} selectedItem={otherItems[1].label} />
<MultiToggleSwitch items={myItems} adminOnly={true} labelText="Admin Options" />

<style lang="scss">
</style>
