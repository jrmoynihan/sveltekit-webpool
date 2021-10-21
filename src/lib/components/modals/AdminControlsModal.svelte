<script lang="ts">
	import { faToolbox } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AdminOnlyControl from '../misc/AdminOnlyControl.svelte';
	import PageTitle from '../misc/PageTitle.svelte';
	import ModalWithButton from './ModalWithButton.svelte';
</script>

<AdminOnlyControl>
	<ModalWithButton adminButton={true}>
		<Fa slot="button-icon" icon={faToolbox} class="faToolbox" size="lg" />
		<svelte:fragment slot="modal-content">
			<PageTitle customStyles={''}>Admin Controls</PageTitle>
			<slot name="modal-content" />
		</svelte:fragment>
	</ModalWithButton>
</AdminOnlyControl>
