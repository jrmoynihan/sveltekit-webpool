<script lang="ts">
	export let text = '';
	export let disabled = false;
	export let customStyles = '';
</script>

<button on:click {disabled} style={customStyles}>
	{text}
	<slot />
</button>

<style lang="scss">
	button {
		@include styledButton;
	}
</style>
