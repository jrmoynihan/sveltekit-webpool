<script lang="ts">
	import type { ESPNGame, ESPNGamePruned } from '$scripts/classes/game';

	import AccordionDetails from '../containers/accordions/AccordionDetails.svelte';
	import AccordionJson from '../containers/accordions/AccordionJSON.svelte';

	export let gameData: ESPNGame[] | ESPNGamePruned[];
	export let title = '';
	export let maxHeight = 25;
</script>

{#if title}
	<p>{title}</p>
{/if}
{#each gameData as game, i (game.id)}
	<AccordionDetails
		expanderIconSide={'left'}
		cloudyBackground={false}
		expandTitle={`Game ${i + 1} -- ${game.date.substring(0, 10)} ${game.name}`}
		customSummaryStyles="padding:1rem;"
		customContentStyles={`max-height: ${maxHeight}vh; scrollbar-width: thin;`}
	>
		<svelte:fragment slot="content">
			{#each Object.entries(game) as [key, value] (key)}
				<AccordionJson {key} {value} />
			{/each}
		</svelte:fragment>
	</AccordionDetails>
{/each}

<style lang="scss">
	p {
		width: 100%;
		font-weight: bold;
	}
</style>
