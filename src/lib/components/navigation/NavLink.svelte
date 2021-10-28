<script lang="ts">
	import { page } from '$app/stores';
	import { navChecked, useDarkTheme } from '$scripts/store';
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

	$: {
		active = matchPath(pageOption.path, $page.path);
		// console.log('pageOption.path: ', pageOption.path);
		// console.log('currentPage.path: ', $page.path);
		// TODO fix the regeex so the index path ('/') doesn't match when it's
		active = pageOption.path === '/' && $page.path !== '/' ? false : active;
	}
	const cleanupToNavigate = () => {
		const modals = Array.from(document.getElementsByTagName('dialog'));
		if (modals) {
			console.log(`found modals: ${modals}`);
			for (const modal of modals) {
				console.log(`closing modal id: ${modal.id}`);
				hideThisModalDelayed(modal);
			}
		} else {
			console.log(`didn't find modals: ${modals}`);
		}
		toast.pop(0);
	};
</script>

<label
	for={pageOption.navigationText}
	tabindex={1 + index}
	on:click={cleanupToNavigate}
	class:active
	class="{$navChecked ? 'expanded' : 'collapsed'} {$useDarkTheme
		? 'dark-mode'
		: 'light-mode'} {fullyRounded ? 'rounded' : ''}"
>
	<a
		class:active
		id={pageOption.navigationText}
		sveltekit:prefetch
		href={pageOption.path}
		class={$useDarkTheme ? 'dark-mode' : 'light-mode'}
	>
		<Fa icon={faFootballBall} size="lg" />
		<h2>{pageOption.navigationText}</h2>
	</a>
</label>

<style lang="scss">
	label {
		@include rounded;
		@include defaultTransition;
		@include flexCenter;
		position: relative;
		color: var(--main-color, rgb(255, 255, 255));
		box-shadow: 0 0 2px 2px rgba(var(--accentValue-color, rgb(233, 181, 99)) / 30%);
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
			// background: radial-gradient(transparent 60%, rgba(var(--accentValue-color) / 50%) 100%);
			background-color: rgba(var(--accentValue-color, rgb(233, 181, 99)) / 25%);
			transform: scale3d(1.15, 1.2, 1.1);
			margin: 0 2rem;
		}
		// Current page indicator
		&.active {
			&.dark-mode {
				@include active($backgroundAlpha: 0.4);
			}
			&.light-mode {
				@include active;
			}
		}
	}
	a {
		@include flexCenter;
		color: var(--main-color, rgb(255, 255, 255));
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
		&:visited {
			color: var(--main-color, rgb(255, 255, 255));
		}
		&.active,
		&:active {
			color: white;
			text-decoration: underline 2px white;
		}
	}
</style>
