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
		class="transition-wrapper {customClasses}"
		style={customStyles}
		in:inTransition={inTransitionParams}
		out:outTransition={outTransitionParams}
	>
		<slot />
	</div>
{/key}

<style lang="scss">
	.transition-wrapper {
		box-sizing: border-box;
		position: relative;
		max-width: 100%;
		background-size: cover;
		will-change: opacity transform;
		display: grid;
		grid-template-rows: auto 1fr;
		grid-template-areas: 'nav' 'content';
	}
</style>
