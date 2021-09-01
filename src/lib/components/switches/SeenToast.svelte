<script lang="ts">
	import ToggleSwitch from './ToggleSwitch.svelte';

	export let msgMarkup = '';
	export let localStorageKey = '';
	let checked = false;

	$: if (checked) {
		localStorage.setItem(localStorageKey, 'true');
	} else {
		localStorage.setItem(localStorageKey, 'false');
	}
</script>

<div class="grid">
	{@html msgMarkup}

	<div class="grid toggle">
		<ToggleSwitch bind:checked />
		<p>{checked ? `Won't show this again` : `Don't show this next time?`}</p>
	</div>
</div>

<style lang="scss">
	.grid {
		@include gridCenter($gap: 10px);
		gap: 2rem;
		margin: 0 auto;
	}
	.toggle {
		grid-template-columns: auto 1fr;
		font-size: small;
	}
</style>
