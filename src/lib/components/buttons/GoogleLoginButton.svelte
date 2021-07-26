<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import GoogleLogo from '/static/GoogleLogo.svelte';

	const dispatch = createEventDispatcher();
	function buttonClicked(event) {
		dispatch('click', event.detail);
	}
</script>

<button class="google" on:click={buttonClicked}>
	<GoogleLogo />
	Sign In With Google
</button>

<style lang="scss">
	// @import 'src/Styles/Mixins.scss';

	.google {
		@include defaultButtonStyles;
		@include frostedGlassHighContrast;
		background-color: white;
		align-items: center;
		display: grid;
		font-weight: medium;
		grid-template-columns: auto 1fr;
		font-size: large;
		text-shadow: none;
		padding: 0 1em 0 0;
	}
</style>
