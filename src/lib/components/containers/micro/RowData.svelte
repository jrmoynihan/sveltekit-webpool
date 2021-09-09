<script lang="ts">
	import { useDarkTheme } from '$scripts/store';

	export let evenRow: boolean = false;
	let dark = $useDarkTheme;
</script>

<div class:evenRow class:dark>
	<slot />
</div>

<style lang="scss">
	div {
		@include defaultTransition;
		padding: 0.2em;
		min-height: 2rem;
		height: 100%;
		align-content: center;
		display: grid;
	}
	.evenRow {
		// opacity: 0.1;
		background-color: rgba(var(--accentValue-color), 50%);
		color: var(--alternate-color);
		&.dark {
			color: var(--main-color);
		}
	}
</style>
