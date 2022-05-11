<script lang="ts">
	import { page } from '$app/stores';
	import { nav_toggled, use_dark_theme } from '$scripts/store';
	import type { PageOption } from '$scripts/classes/pageOption';
	import Fa from 'svelte-fa';
	import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import { matchPath } from '$scripts/functions';
	import { toast } from '@zerodevx/svelte-toast';
	import { hideThisModalDelayed } from '$scripts/modals/modalFunctions';

	export let index = 0;
	export let pageOption: PageOption;
	export let fullyRounded = false;
	let active = false;

	$: active =
		pageOption.path === '/' && $page.url.pathname !== '/'
			? false
			: matchPath(pageOption.path, $page.url.pathname);

	//TODO: remove this if no longer needed; 04/30/2022
	const cleanupToNavigate = () => {
		const modals = Array.from(document.getElementsByTagName('dialog'));
		if (modals) {
			for (const modal of modals) {
				hideThisModalDelayed(modal);
			}
		}
		toast.pop(0);
	};
</script>

<label
	for={pageOption.navigationText}
	tabindex={1 + index}
	on:click={cleanupToNavigate}
	class:active
	class="{$nav_toggled ? 'expanded' : 'collapsed'} {$use_dark_theme
		? 'dark-mode'
		: 'light-mode'} {fullyRounded ? 'rounded' : ''}"
>
	<a
		class:active
		id={pageOption.navigationText}
		sveltekit:prefetch
		href={pageOption.path}
		class={$use_dark_theme ? 'dark-mode' : 'light-mode'}
	>
		<Fa icon={faFootballBall} size="lg" />
		<h2>{pageOption.navigationText}</h2>
	</a>
</label>

<style lang="scss">
	a {
		@include flexCenter;
		box-sizing: border-box;
		color: var(--text, white);
		font-weight: 700;
		font-size: 0.8rem;
		gap: 0.7em;
		height: 100%;
		letter-spacing: 10%;
		padding: 0 1em;
		text-decoration: none;
		text-transform: uppercase;
		transition: color 0.2s linear;
		width: 100%;
		&:visited:not(.active) {
			color: var(--text, white);
		}
		&.active,
		&:active {
			color: white;
			text-decoration: underline 2px white;
		}
		&:hover:not(.active),
		&:focus:not(.active) {
			color: white;
		}
	}
	label {
		@include rounded;
		@include defaultTransition;
		@include flexCenter;
		position: relative;
		color: var(--text, white);
		box-shadow: 0 0 2px 2px hsla(var(--accent-value, hsl(37, 75%, 65%)), 30%);
		width: 100%;
		height: 2em;

		@include responsive_desktop_only {
			&:not(.rounded) {
				border-radius: 0 0 20px 20px;
			}
			height: 3em;
		}

		&.collapsed {
			height: 0;
			padding: 0;
		}
		&:hover:not(.active),
		&:focus:not(.active) {
			@include responsive_desktop_only {
				transform: scale3d(1.15, 1.2, 1.1);
				margin: 0 min(3%, 2.7rem);
			}
			&.dark-mode {
				// background: radial-gradient(transparent 60%, hsla(var(--accent-value), 50%) 100%);
				background-color: hsla(var(--accent-value, hsl(37, 75%, 65%)), 25%);
			}
			&.light-mode {
				background-color: hsla(var(--accent-value, forestgreen), 60%);
				color: var(--background);
			}
		}
		// Current page indicator
		&.active {
			@include responsive_desktop_only {
				margin: 0 min(2%, 2.5rem);
			}
			&.dark-mode {
				@include active($backgroundAlpha: 0.4);
			}
			&.light-mode {
				@include active;
			}
		}
	}
</style>
