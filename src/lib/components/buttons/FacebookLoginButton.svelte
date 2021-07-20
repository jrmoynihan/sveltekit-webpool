<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { faFacebook } from '@fortawesome/free-brands-svg-icons';
	import Fa from 'svelte-fa';

	const dispatch = createEventDispatcher();
	function buttonClicked(event) {
		dispatch('click', event.detail);
	}
</script>

<button class="facebook" on:click={buttonClicked}>
	<Fa icon={faFacebook} size="lg" class="faFacebook" style="padding-right: 8px; color:white" />
	Sign In With Facebook
</button>

<style lang="scss">
	// @import 'src/Styles/Mixins.scss';
	.facebook {
		@include defaultButtonStyles;
		@include frostedGlassHighContrast;
		align-items: center;
		display: grid;
		font-weight: medium;
		grid-template-columns: auto 1fr;
		font-size: large;
		text-shadow: none;
		background-color: #405d9a;
		color: white;
		padding: 1.2rem 0.8rem;
	}
</style>
