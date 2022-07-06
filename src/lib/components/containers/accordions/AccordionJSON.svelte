<script lang="ts">
	export let key = '';
	export let value: unknown;
	export let open = false;
	export let level = 1;

	export const isValidUrl = (testString: string) => {
		try {
			if (testString) {
				new URL(testString);
				return true;
			}
		} catch (error) {
			return false;
		}
	};
</script>

<p>
	{#if value instanceof Object && Object.entries(value).length > 0}
		<details
			bind:open
			on:click|self|preventDefault|stopPropagation={() => {
				open ? (open = false) : (open = true);
			}}
		>
			<summary>
				<b>{key}:</b>
				{#if value instanceof Array}
					{#if open}
						<span>[ </span>
					{:else}
						<span>[ ]</span>
					{/if}
				{:else if open}
					{String.fromCodePoint(0x007b)}
				{:else}
					{String.fromCodePoint(0x007b)} {String.fromCodePoint(0x007d)}
				{/if}
			</summary>
			{#if open}
				<ul>
					{#each Object.entries(value) as [key, value]}
						<li style="--level:{level}">
							<svelte:self {key} {value} level={level + 1} />
						</li>
					{/each}
				</ul>
				{#if value instanceof Array}
					<span class="end-bracket" style="--level:{level}">]</span>
				{:else}
					<span class="end-bracket" style="--level:{level}">{String.fromCodePoint(0x007d)}</span>
				{/if}
			{/if}
		</details>
	{:else}
		<b>{key}: </b>
		<span class="indent">
			{#if isValidUrl(value?.toString())}
				<a href={value.toString()}>{value}</a>
			{:else}
				{value}
			{/if}
		</span>
	{/if}
</p>

<style lang="scss">
	$indentSize: 4ch;
	p {
		width: 100%;
		text-align: left;
	}
	.end-bracket {
		margin-left: calc(($indentSize - 1ch) * var(--level, 1));
	}
	li {
		text-indent: calc($indentSize * var(--level, 1));
		list-style-type: none;
	}
	.indent {
		text-indent: 2ch;
		word-break: break-word;
	}
	a {
		font-weight: 600;
		color: var(--background);
		background-color: hsla(var(--accent-value), 50%);
		border-radius: 1rem;
		padding: 0 0.5rem;
		text-decoration: underline;
	}
</style>
