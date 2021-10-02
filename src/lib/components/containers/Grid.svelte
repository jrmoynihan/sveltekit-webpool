<script lang="ts">
	export let customStyles = '';
</script>

<div class="grid" style={customStyles}>
	<slot />
</div>

<style lang="scss">
	.grid {
		@include gridCenter;
	}
</style>
