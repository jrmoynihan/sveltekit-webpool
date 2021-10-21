<script lang="ts">
	import { fly } from 'svelte/transition';

	export let refresh: unknown;
	export let customStyles = '';
	export let customClasses = '';
	export let inTransition = fly;
	export let inTransitionParams = { duration: 200, x: -50, delay: 400 };
	export let outTransition = fly;
	export let outTransitionParams = { duration: 200, x: 50 };
</script>

{#key refresh}
	<div
		class="transitionWrapper {customClasses}"
		style={customStyles}
		in:inTransition={inTransitionParams}
		out:outTransition={outTransitionParams}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	.transitionWrapper {
		box-sizing: border-box;
		position: relative;
		max-width: 100%;
		background-size: cover;
		will-change: opacity transform;
	}
</style>
