<script lang="ts">
	import { faToolbox } from '@fortawesome/free-solid-svg-icons/index.es';
	import Fa from 'svelte-fa';
	import AdminOnlyControl from '../misc/AdminOnlyControl.svelte';
	import PageTitle from '../misc/PageTitle.svelte';
	import ModalWithButton from './ModalWithButton.svelte';

	export let modal_button_styles = '';
	export let modal_button_hover_styles: { property: string; value: string }[] = [];
</script>

<AdminOnlyControl>
	<ModalWithButton use_admin_button={true} {modal_button_styles} {modal_button_hover_styles}>
		<Fa slot="button-icon" icon={faToolbox} class="faToolbox" size="lg" />
		<svelte:fragment slot="modal-content">
			<PageTitle customStyles={''}>Admin Controls</PageTitle>
			<slot name="modal-content" />
		</svelte:fragment>
	</ModalWithButton>
</AdminOnlyControl>
