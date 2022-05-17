<script lang="ts">
	import Fa from 'svelte-fa';
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import { use_dark_theme } from '$scripts/store';
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/index.es';

	export let invisible = false;
	export let pulse = false;
	export let ableToTab = 0;
	export let disabled = false;

	const dispatch = createEventDispatcher();
	function buttonClicked(event: { detail: any }): void {
		dispatch('click', event.detail);
	}
</script>

<button
	on:click={buttonClicked}
	{disabled}
	class="submit {$use_dark_theme ? 'dark-mode' : 'light-mode'}"
	class:invisible
	class:pulse
	tabindex={ableToTab}
	in:fly={{ delay: 250, duration: 200, x: 100 }}
	out:fly={{ x: 100, duration: 200 }}
>
	Submit Picks <Fa icon={faCheckCircle} size="lg" />
</button>

<style lang="scss">
	.submit {
		@include defaultTransition;
		@include styledButton;
		gap: 0.5rem;
		align-items: center;
		align-self: center;
		padding: max(2%, 1rem);
		font-weight: bold;
		margin: unset;
		grid-area: pickCount;
		max-height: 5rem;
		&::before {
			@include defaultPseudoElement;
			z-index: var(--below);
		}
		&.dark-mode {
			@include styledButtonDark;
		}
	}
	.pulse {
		@include pulse($pulseDistance: 20px, $opacity: 80%);
	}
	.invisible {
		@include accelerate;
		opacity: 0;
		pointer-events: none;
		transform: translateX(100%);
	}
</style>
