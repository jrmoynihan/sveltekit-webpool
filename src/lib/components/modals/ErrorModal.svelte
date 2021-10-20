<script lang="ts">
	import Modal from './Modal.svelte';
	export let error = '';
</script>

<Modal dialogOpen={true} isError={true}>
	<slot slot="modal-content" />
	{error}
</Modal>
