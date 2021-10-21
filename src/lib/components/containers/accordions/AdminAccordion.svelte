<script lang="ts">
	import AdminOnlyControl from '$lib/components/misc/AdminOnlyControl.svelte';
	import { faToolbox } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fly } from 'svelte/transition';
	import AccordionDetails from './AccordionDetails.svelte';

	export let open = false;
</script>

<AdminOnlyControl>
	<AccordionDetails bind:open adminOnly={true}>
		<svelte:fragment slot="summary">
			<div transition:fly={{ x: 100 }}>
				<Fa
					icon={faToolbox}
					class="faToolbox"
					size="lg"
					style="margin:auto;transition:all 300ms ease-in-out;translateX: -100px;"
				/>
				{open ? 'Admin Only Controls' : ''}
			</div>
		</svelte:fragment>
		<slot slot="content" name="content" />
	</AccordionDetails>
</AdminOnlyControl>

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	}
</style>
