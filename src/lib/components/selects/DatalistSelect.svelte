<script lang="ts">
	import { createEventDispatcher } from 'svelte/internal';
	import { nanoid } from 'nanoid';
	// An id for the input element
	export let inputID = nanoid();
	// An array of objects to use as the datasource
	export let items: ArrayLike<unknown>;
	// Which of hte object's keynames will be displayed in the dropdown
	export let displayedKeyNames = Object.keys(items[0]);
	// How to separate each keyname in the dropdown; you can make a different delimiter after each keyword
	export let delimeters: string[] = [];
	export let prefixes: string[] = [];
	// Background-color of the input
	export let inputBGcolor = '';
	// Placeholder text
	export let placeholder = '';
	export let selectedItem = {};

	const dispatch = createEventDispatcher();
	function forwardToParent(event: { detail: any }): void {
		dispatch('pressedEnter', event.detail);
	}

	function onKeyPress(e: { key?: any; preventDefault?: any; target?: any; detail?: any }): void {
		if (e.key === 'Enter') {
			// e.preventDefault();
			handleInput(e);
			forwardToParent(e);
			inputBGcolor = '';
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			e.target.value = '';
			e.target.focus();
		}
	}
	const handleInput = (event: {
		key?: any;
		preventDefault?: any;
		target: any;
		detail?: any;
	}): void => {
		// Update the bound selected item (i.e. the whole object)
		if (items instanceof Array) {
			selectedItem = items.find((item) => buildItemString(item) === event.target.value);
		}
		blur();
	};
	function buildItemString(item: unknown): string {
		let itemStr = '';
		if (typeof item === 'object') {
			Object.keys(item).forEach((key) => {
				if (typeof item[key] !== 'object') {
					displayedKeyNames.forEach((displayKey, index) => {
						if (displayKey === key) {
							itemStr =
								itemStr +
								(prefixes[index] ? prefixes[index] : '') +
								item[displayKey] +
								(delimeters[index] ? delimeters[index] : '');
						}
					});
					// console.log(`${key} is NOT an object`);
				} else {
					// console.log(`${key} IS an object`);

					Object.keys(item[key]).forEach((subkey) => {
						displayedKeyNames.forEach((displayKey, index) => {
							if (displayKey === subkey) {
								itemStr = itemStr + prefixes[index] + item[key][displayKey] + delimeters[index];
							}
						});
					});
				}
			});
		} else if (typeof item === 'string') {
			itemStr = item;
		}

		return itemStr;
	}
	const selectText = (e): void => {
		e.target.select();
	};
	function handleChange(): void {
		blur();
	}
</script>

<!-- Leaving 'autocomplete' off prevents the browser from using strings the user has typed in fields elsewhere-->
<input
	id={inputID}
	list="data-{inputID}"
	autocomplete="off"
	type="search"
	{placeholder}
	style="background-color: {inputBGcolor};"
	on:keydown={onKeyPress}
	on:input={handleInput}
	on:focus={selectText}
	on:change={handleChange}
/>
<!-- The 'list' attribute in the input above points to the datalist with a matching 'id' attribute below -->
<datalist id="data-{inputID}" role="combobox">
	<!-- NOTE: The <select> element purely serves as a fallback for browsers that don't support datalist -->
	<select name="data-select">
		{#each items as item}
			<option value={buildItemString(item)}>
				{#if typeof items === 'object'}
					{#each Object.keys(item) as key}
						<!-- Uses the keys of the 'item' object looking for names that match the elements of the displayedKeyNames array, and appends prefixes and delimeters to their values -->
						{#if typeof item[key] === 'object'}
							{#each Object.keys(item[key]) as subkey}
								{#each displayedKeyNames as displayKey, idx}
									{#if displayKey === subkey}
										{prefixes[idx] !== undefined ? prefixes[idx] : ''}{item[key][
											subkey
										]}{delimeters[idx] !== undefined ? delimeters[idx] : ' '}
									{/if}
								{/each}
							{/each}
						{:else}
							{#each displayedKeyNames as displayKey, index}
								{#if displayKey === key}
									{prefixes[index] !== undefined ? prefixes[index] : ''}{item[key]}{delimeters[
										index
									] !== undefined
										? delimeters[index]
										: ' '}
								{/if}
							{/each}
						{/if}
					{/each}
				{:else}
					{item}
				{/if}
			</option>
		{/each}
	</select>
</datalist>

<style lang="scss">
	// @import 'src/styles/mixins.scss';

	input {
		width: 100%;
		padding: 0.5em 1em;
		outline: 0;
		border-radius: 2vmin;
		&:hover {
			@include dayShadow;
		}
		&:focus {
			@include nightShadow;
		}
	}
</style>
