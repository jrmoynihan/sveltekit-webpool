<script lang="ts">
	import { useDarkTheme } from '$scripts/store';

	export let customStyles = '';
</script>

<h1 class={$useDarkTheme ? 'highlight' : ''} style={customStyles}>
	<slot />
</h1>

<style lang="scss">
	h1 {
		text-decoration: underline;
		padding: 1rem;
	}
	.highlight {
		text-shadow: 0 0 10px var(--accent-color, rgb(233, 181, 99));
	}
</style>
