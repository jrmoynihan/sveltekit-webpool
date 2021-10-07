<script lang="ts">
	import ModalOnly from './ModalOnly.svelte';
</script>

<ModalOnly dialogOpen={true} isError={true}>
	<slot slot="modal-content" />
</ModalOnly>
