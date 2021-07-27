<script>
	import { fade, fly, slide } from 'svelte/transition';

	export let refresh;
</script>

{#key refresh}
	<div
		class="transitionWrapper"
		in:fly={{ duration: 200, x: -50, delay: 400 }}
		out:fly={{ duration: 200, x: 50 }}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	.transitionWrapper {
		box-sizing: border-box;
		position: relative;
		max-width: 100%;
	}
</style>
