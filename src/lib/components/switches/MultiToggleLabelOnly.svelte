<script lang="ts">
	import type { toggleItem } from '$scripts/types/toggleItem';

	export let item: toggleItem;
	export let id: string;
	export let adminOnly: boolean;
	export let optionLabelStyles: string;
	export let showLabelText: boolean = true;
</script>

<label
	for="{id}-{item.value}"
	id="{id}-{item.value}-label"
	class:adminOnly
	tabindex="0"
	style={optionLabelStyles}
	>{#if showLabelText}
		{item.label}
	{/if}
</label>

<style lang="scss">
	label {
		display: flex;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: rgba(var(--alternateValue-color, transparent));
	}
	.adminOnly {
		@include admin;
		border: none;
		padding: 0.2rem;
	}
</style>
