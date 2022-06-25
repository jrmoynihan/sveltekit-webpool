<script lang="ts">
	import { setLocalStorageItem } from '$lib/scripts/utilities/localStorage';
	import { use_dark_theme } from '$scripts/store';

	const storeDarkThemePreference = async () => {
		await setLocalStorageItem('useDarkTheme', $use_dark_theme);
	};
</script>

<label class="switch" tabindex="0">
	<input type="checkbox" bind:checked={$use_dark_theme} on:change={storeDarkThemePreference} />
	<div>
		<span />
	</div>
</label>

<style lang="scss">
	.switch {
		--line: var(--text, white);
		--dot: hsl(0, 0%, 0%);
		--circle: hsl(233, 100%, 98%); //#9EA0BE
		--duration: 0.3s;
		--text: hsl(236, 20%, 68%);
		cursor: pointer;
		outline: none;
		padding: 0.5rem;
		user-select: none;
		@include rounded;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
		input {
			display: none;
			& + div {
				position: relative;
				&:before,
				&:after {
					@include accelerate;
					--scale: 1;
					content: '';
					position: absolute;
					height: 0.25em;
					top: 0.625em;
					width: 1.5em;
					background: var(--line);
					transform: scaleX(var(--scale));
					transition: transform var(--duration) ease;
				}
				&:before {
					--scale: 0;
					left: 0;
					transform-origin: 0 50%;
					border-radius: 0.125em 0 0 0.125em;
				}
				&:after {
					left: 1.75em;
					transform-origin: 100% 50%;
					border-radius: 0 0.125em 0.125em 0;
				}
				span {
					padding-left: 3.5em;
					line-height: 1.5em;
					color: var(--text);
					&:before {
						@include accelerate;
						--translateX: 0;
						--box-shadow-color: var(--dot);
						--scale: 0.25em;
						content: '';
						position: absolute;
						left: 0;
						top: 0;
						width: 1.5em;
						height: 1.5em;
						border-radius: 50%;
						box-shadow: inset 0 0 0 var(--scale) var(--box-shadow-color);
						transform: translateX(var(--translateX));
						transition: box-shadow var(--duration) ease, transform var(--duration) ease;
					}
					&:not(:empty) {
						padding-left: 4em;
					}
				}
			}
			&:checked {
				& + div {
					&:before {
						--scale: 1;
					}
					&:after {
						--scale: 0;
					}
					span {
						&:before {
							--translateX: 1.7em;
							--scale: 0.25em;
							--box-shadow-color: var(--text);
						}
					}
				}
			}
		}
	}
</style>
