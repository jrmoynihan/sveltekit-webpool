<script lang="ts">
	export let customStyles = '';
	export let min: string | number = 0;
	export let max: string | number = 'max-content';
	export let repeat: string | number = 'auto-fit';
	export let padding: string | number = '1rem';
	export let customGridColumns: string = undefined;
</script>

<div
	class="grid"
	style="--min:{min}; --max:{max}; --repeat:{repeat};--padding:{padding}; {customStyles};
	{customGridColumns ? customGridColumns : null};"
>
	<slot />
</div>

<style lang="scss">
	.grid {
		@include gridCenter($gap: 1rem);
		grid-template-columns: repeat(var(--repeat), minmax(var(--min), var(--max)));
		padding: var(--padding);
	}
</style>
