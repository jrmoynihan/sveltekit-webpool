<script lang="ts">
	import { useDarkTheme } from '$scripts/store';
</script>

<h1 class={$useDarkTheme ? 'highlight' : ''}>
	<slot />
</h1>

<style lang="scss">
	h1 {
		text-decoration: underline;
		padding: 2rem;
		padding-top: 0;
		padding-right: 0;
	}
	.highlight {
		text-shadow: 0 0 10px var(--accent-color, rgb(233, 181, 99));
	}
</style>
