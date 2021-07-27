<script lang="ts">
	import { page } from '$app/stores';
	import { navChecked, useDarkTheme } from '$scripts/store';
	import type { PageOption } from '$scripts/classes';
	import Fa from 'svelte-fa';
	import { faFootballBall } from '@fortawesome/free-solid-svg-icons';
	import { matchPath } from '$scripts/functions';

	export let index = 0;
	export let pageOption: PageOption;
	export let fullyRounded = false;
	let active = false;

	$: {
		$page.path;
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
	<a id={pageOption.navigationText} sveltekit:prefetch href={pageOption.path}
		><Fa
			icon={faFootballBall}
			size="lg"
			style={$page.path === pageOption.path ? 'color:var(--main-color);' : ''}
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
		box-shadow: 0 2px 2px 2px rgba(var(--accentValue-color), 0.4);
		width: 100%;
		height: 2em;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 300ms ease-in-out;
		background: radial-gradient(var(--alternate-color), transparent);
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
		&:hover,
		&:focus {
			background-color: rgba(var(--mainValue-color), 0.15);
			// text-shadow: 2px 5px 10px var(--alternate-color);
			// box-shadow: 0 0 5px 5px rgba(var(--accentValue-color), 0.5);
		}
		// Current page indicator
		&.active {
			color: var(--accent-color);
			text-decoration: underline 2px var(--main-color);
			background-color: rgba(var(--accentValue-color), 0.5);
			// &::before {
			// 	--size: 6px;
			// 	content: '';
			// 	width: 0;
			// 	height: 0;
			// 	position: absolute;
			// 	top: 0;
			// 	left: calc(50% - var(--size));
			// 	border: var(--size) solid transparent;
			// 	border-top: var(--size) solid var(--accent-color);
			// }
		}
	}
	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		width: 100%;
		justify-content: center;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
		color: var(--main-color);
		gap: 0.7em;
		&:visited {
			color: var(--main-color);
		}
	}
</style>
