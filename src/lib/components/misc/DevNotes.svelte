<script lang="ts">
	import { dev } from '$app/env';
	import AccordionDetails from '$containers/AccordionDetails.svelte';

	export let customStyles: string = '';
</script>

{#if dev}
	<div class="dev-accordion" style={customStyles}>
		<AccordionDetails>
			<h4 slot="summary">Dev Notes (not visible in production)</h4>
			<section class="dev-notes" slot="content">
				<p>
					<slot />
				</p>
			</section>
		</AccordionDetails>
	</div>
{/if}

<style lang="scss">
	.dev-notes {
		display: grid;
		grid-template-columns: 1fr;
		justify-items: center;
		max-height: 50vh;
		overflow-y: scroll;
		scrollbar-width: thin;
	}
	.dev-accordion {
		// @include frostedGlassHighContrast;
		margin: 1rem;
		border-radius: 3vh;
	}
</style>
