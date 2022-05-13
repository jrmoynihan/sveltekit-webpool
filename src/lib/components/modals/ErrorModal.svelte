<script lang="ts">
	import Modal from './Modal.svelte';
	export let error = '';
</script>

<Modal dialog_starts_open={true} is_error={true}>
	<slot slot="modal-content" />
	{error}
</Modal>
