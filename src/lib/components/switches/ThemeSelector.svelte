<script lang="ts">
	import { browser } from '$app/env';
	import { chosenMixBlendMode, useDarkTheme } from '$scripts/store';

	let root: HTMLElement;
	if (browser) {
		root = document.documentElement;
	}

	let mixBlendModes = [
		'normal',
		'multiply',
		'screen',
		'overlay',
		'darken',
		'lighten',
		'color-dodge',
		'color-burn',
		'hard-light',
		'soft-light',
		'difference',
		'exclusion',
		'hue',
		'saturation',
		'color',
		'luminosity'
	];

	export let lightThemeColors = {
		main: 'rgb(0,0,0)',
		alternate: 'rgb(255,255,255)',
		// accent: 'rgb(99,144,233)'
		accent: 'rgb(36,50,36)',
		admin: 'hsl(220,100%,35%)',
		adminBorder: 'hsl(220,100%,35%)',
		adminBackground: 'hsl(220, 40%, 85%)'
	};
	export let darkThemeColors = {
		main: 'rgb(255,255,255)',
		// alternate: 'rgb(22, 29, 45)',
		alternate: 'rgb(36,50,36)',
		// accent: 'rgb(99, 144, 233)'
		accent: 'rgb(233, 181, 99)',
		admin: 'hsl(220,100%,35%)',
		adminBorder: 'hsl(220,100%,35%)',
		adminBackground: 'hsl(220, 40%, 80%)'
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
				// Set a CSS custom property name and value for each theme array member; e.g. `--main-color: rgb(0,0,0)`
				root.style.setProperty(`--${key}-color`, color);

				// A regular expression to find elements within parentheses
				const regExp = /\(([^)]+)\)/;

				// RegExp search returns an arrau of 3 elements:
				// 0) everything to the left parentheses (including the parentheses), 1) everything in between parentheses, 2) everything to the right of the parentheses (including the parentheses)
				const matches = regExp.exec(color);
				if (matches) {
					root.style.setProperty(`--${key}Value-color`, matches[1]);
				} else {
					const rgbColor = hexToRgb(color);
					const rgbString = `${rgbColor.r},${rgbColor.g},${rgbColor.b}`;
					root.style.setProperty(`--${key}Value-color`, rgbString);
				}
			}
		}
	};

	// Converts hex color values from the default color picker to RGB for easier use
	function hexToRgb(hex: string): { r: number; g: number; b: number } {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
			  }
			: null;
	}

	// Resets both the CSS custom properties and the internal state of these theme objects to their defaults
	const resetCSSvariable = (colorName: string) => {
		const resetColor = $useDarkTheme ? darkResets[colorName] : lightResets[colorName];
		$useDarkTheme ? (darkThemeColors = { ...darkResets }) : (lightThemeColors = { ...lightResets });
		root.style.setProperty(`--${colorName}-color`, resetColor);
	};

	// Update/set the CSS custom properties anytime the colors object changes
	$: colors = $useDarkTheme ? { ...darkThemeColors } : { ...lightThemeColors };
	$: {
		setCSSvariable(colors);
	}
</script>

<section>
	<!-- <DatalistSelect
		inputID="mix-blend-mode-selector"
		items={mixBlendModes}
		displayedKeyNames={['name']}
		placeholder={'Select a mix-blend-mode'}
		bind:selectedItem={$chosenMixBlendMode}
	/> -->
	<select bind:value={$chosenMixBlendMode}>
		{#each mixBlendModes as mode}
			<option value={mode}>{mode}</option>
		{/each}
	</select>

	{#each Object.keys($useDarkTheme ? darkThemeColors : lightThemeColors) as color}
		<div class="container">
			<label for="{color}-color-picker">{color}</label>

			<!--@TODO Replace these with a more robust custom color picker -->
			{#if $useDarkTheme}
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
		color: var(--main-color, rgb(255, 255, 255));
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
	select {
		@include defaultButtonStyles;
		color: initial;
		background-color: revert;
		text-shadow: none;
	}
</style>
