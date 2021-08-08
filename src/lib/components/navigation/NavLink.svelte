<script lang="ts">
	import { page } from '$app/stores';
	import { navChecked, useDarkTheme } from '$scripts/store';
	import type { PageOption } from '$scripts/classes/pageOption';
	import Fa from 'svelte-fa';
	import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import { matchPath } from '$scripts/functions';

	export let index = 0;
	export let pageOption: PageOption;
	export let fullyRounded = false;
	let active = false;

	$: {
		active = matchPath(pageOption.path, $page.path);
		// TODO fix the regeex so the index path ('/') doesn't match when it's
		active = pageOption.path === '/' && $page.path !== '/' ? false : active;
	}
</script>

<label
	for={pageOption.navigationText}
	tabindex={1 + index}
	class:active
	class="{$navChecked ? 'expanded' : 'collapsed'} {$useDarkTheme
		? 'dark-mode'
		: 'light-mode'} {fullyRounded ? 'rounded' : ''}"
>
	<a
		class:active={$page.path === pageOption.path && !$useDarkTheme}
		id={pageOption.navigationText}
		sveltekit:prefetch
		href={pageOption.path}
		>
		<Fa
			icon={faFootballBall}
			size="lg"
			style={$page.path === pageOption.path ? 'color:var(--alternate-color);' : ''}
		/>
		<h2>{pageOption.navigationText}</h2>
	</a>
</label>

<style lang="scss">
	label {
		@include rounded;
		position: relative;
		color: var(--main-color);
		display: inline-flex;
		box-shadow: 0 0 2px 2px rgba(var(--accentValue-color), 0.3);
		width: 100%;
		height: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 300ms ease-in-out;

		@include responsive_desktop_only {
			&:not(.rounded) {
				border-radius: 0 0 20px 20px;
			}
			height: 3em;
		}

		&.collapsed {
			// opacity: 0;
			height: 0;
			padding: 0;
		}
		&:hover:not(.active),
		&:focus:not(.active) {
			background: radial-gradient(var(--alternate-color) 30%, transparent 90%);
			background-color: rgba(var(--accentValue-color), 50%);
			// text-shadow: 2px 5px 10px var(--alternate-color);
			// box-shadow: 0 0 5px 5px rgba(var(--accentValue-color), 0.5);
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
		align-items: center;
		color: var(--alternate-color);
		display: flex;
		font-weight: 700;
		font-size: 0.8rem;
		gap: 0.7em;
		height: 100%;
		justify-content: center;
		letter-spacing: 10%;
		padding: 0 1em;
		text-decoration: none;
		text-transform: uppercase;
		transition: color 0.2s linear;
		width: 100%;
		&:visited {
			color: currentColor;
		}
		&.active {
			color: var(--alternate-color);
		}
	}
</style>
