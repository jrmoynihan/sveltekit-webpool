<script lang="ts">
	import { use_dark_theme } from '$scripts/store';

	export let customStyles = '';
</script>

<h1 class={$use_dark_theme ? 'highlight' : ''} style={customStyles}>
	<slot />
</h1>

<style lang="scss">
	h1 {
		text-decoration: underline;
		padding: 1rem;
	}
	.highlight {
		text-shadow: 0 0 10px var(--accent, hsl(37, 75%, 65%));
	}
</style>
