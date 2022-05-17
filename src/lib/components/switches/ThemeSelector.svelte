<script lang="ts">
	import { browser } from '$app/env';
	import { use_dark_theme } from '$scripts/store';

	export let invisible = false;

	let root: HTMLElement = browser ? document.documentElement : null;

	export let lightThemeColors = {
		text: 'hsla(0, 0%, 0%, 1)', // main/text color
		background: 'hsla(0, 0%, 100%, 1)', // background/alternate color
		accent: 'hsla(120, 16.3%, 16.9%, 1)',
		admin: 'hsl(220 100% 35%)',
		adminBorder: 'hsl(220 100% 35%)',
		adminBackground: 'hsl(220 40% 85%)'
	};
	export let darkThemeColors = {
		text: 'hsla(0, 0%, 100%, 1)', // main/text color
		background: 'hsla(120, 16.3%, 16.9%, 1)', // background/alternate color
		accent: 'hsla(36.7, 75.3%, 65.1%, 1)',
		admin: 'hsla(220, 100%, 35%, 1)',
		adminBorder: 'hsla(220, 100%, 35%, 1)',
		adminBackground: 'hsla(220, 40%, 80%, 1)'
	};
	export let colors = { ...darkThemeColors };

	// Store these original colors for later if you want to reset them
	const darkResets = { ...darkThemeColors };
	const lightResets = { ...lightThemeColors };

	// Set globally available CSS custom properties (AKA variables) on the root element
	const setCSSvariable = (colors: { [x: string]: string }) => {
		// console.table(colors);
		for (const key of Object.keys(colors)) {
			const color = colors[key];
			if (browser) {
				// Set a CSS custom property name and value for each theme array member; e.g. `--text: hsl(0,0,0)`
				root.style.setProperty(`--${key}`, color);

				const inverted = key.includes('Inverted');
				const value = key.includes('Value');
				const gutter = key.includes('Gutter');
				const fade = key.includes('Fade');

				// Set derived colors
				if (inverted && value) {
					root.style.setProperty(`--${key.split('Inverted')[0]}-inverted-value`, color);
					// } else if (value) {
					// root.style.setProperty(`--${key.split('Value')[0]}-value`, color);
				} else if (inverted) {
					root.style.setProperty(`--${key.split('Inverted')[0]}-inverted`, color);
				} else if (gutter) {
					root.style.setProperty(`--${key.split('Gutter')[0]}-gutter`, color);
				} else if (fade) {
					root.style.setProperty(`--${key.split('Fade')[0]}-fade`, color);
				}
				// // A regular expression to find elements within parentheses
				const regExp = /\(([^)]+)\)/;
				// RegExp search returns an arrau of 3 elements:
				// 0) everything to the left parentheses (including the parentheses), 1) everything in between parentheses, 2) everything to the right of the parentheses (including the parentheses)
				const matches = regExp.exec(color);
				if (matches?.length > 0) {
					const [h, s, l, a] = matches[1].split(',');
					const hsl = `${h}, ${s}, ${l}`;
					root.style.setProperty(`--${key}-value`, hsl);
					root.style.setProperty(`--${key}-hue`, `${h}`);
					root.style.setProperty(`--${key}-saturation`, `${s}`);
					root.style.setProperty(`--${key}-lightness`, `${l}`);
					root.style.setProperty(`--${key}-alpha`, `${a}`);
				}
			}
		}
	};

	// Resets both the CSS custom properties and the internal state of these theme objects to their defaults
	const resetCSSvariable = (colorName: string) => {
		const resetColor = $use_dark_theme ? darkResets[colorName] : lightResets[colorName];
		$use_dark_theme
			? (darkThemeColors = { ...darkResets })
			: (lightThemeColors = { ...lightResets });
		root.style.setProperty(`--${colorName}-color`, resetColor);
	};

	// Update/set the CSS custom properties anytime the colors object changes
	$: colors = $use_dark_theme ? { ...darkThemeColors } : { ...lightThemeColors };
	$: setCSSvariable(colors);
</script>

<section class:invisible>
	{#each Object.keys($use_dark_theme ? darkThemeColors : lightThemeColors) as color}
		<div class="container">
			<label for="{color}-color-picker">{color}</label>

			<!--@TODO Replace these with a more robust custom color picker -->
			{#if $use_dark_theme}
				<input type="color" id="{color}-color-picker" bind:value={darkThemeColors[color]} />
			{:else}
				<input type="color" id="{color}-color-picker" bind:value={lightThemeColors[color]} />
			{/if}

			<button on:click={() => resetCSSvariable(color)}>Reset</button>
		</div>
	{/each}
</section>

<style lang="scss">
	section {
		display: grid;
		position: relative;
		width: max-content;
		color: var(--text, white);
	}
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 2fr;
		place-items: center;
	}
	label {
		text-transform: capitalize;
		max-width: max-content;
		grid-column: span 2;
	}
	button {
		@include defaultButtonStyles;
		display: inline-block;
	}
	.invisible {
		visibility: hidden;
		display: none;
		height: 0;
		width: 0;
	}
</style>
