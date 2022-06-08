<script lang="ts">
	import { use_dark_theme } from '$lib/scripts/store';
	import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { useTooltip } from '@untemps/svelte-use-tooltip';

	export let is_correct: boolean;
	export let correct_tooltip: string = 'You picked correctly!';
	export let incorrect_tooltip: string = 'You got this one wrong. Better luck next time!';
	export let tooltip_position: 'top' | 'bottom' | 'left' | 'right' = 'top';
</script>

<span
	class="pick-indicator"
	use:useTooltip={{
		animated: true,
		position: tooltip_position,
		content: is_correct ? correct_tooltip : incorrect_tooltip,
		containerClassName: `custom-tooltip __tooltip __tooltip-${tooltip_position} ${
			use_dark_theme ? '__tooltip-dark' : ''
		}`
	}}
>
	{#if is_correct}
		<Fa
			icon={faCheckCircle}
			size="2x"
			color="green"
			style="background-color: white; border-radius:100%;"
		/>
	{:else if is_correct === false}
		<Fa
			icon={faTimesCircle}
			size="2x"
			color={$use_dark_theme ? 'tomato' : 'darkred'}
			style="background-color: white; border-radius:100%;"
		/>
	{/if}
</span>

<style lang="scss">
</style>
