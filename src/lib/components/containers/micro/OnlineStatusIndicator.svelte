<script lang="ts">
	// import { faExclamationCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
	// import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	let isOnline = false;
</script>

<div class="online-indicator">
	<Tooltip tooltipHorizontalPosition="-75%" tooltipWidth="150%" tooltipTop="150%" showArrow={false}>
		<div
			class="online-icon-wrapper"
			slot="content"
			style="--onlineBgColor:{isOnline ? 'rgb(39, 179, 39)' : 'red'}"
		>
			<!-- <Fa
				icon={isOnline ? faLightbulb : faExclamationCircle}
				color={isOnline ? 'var(--accent-color)' : 'red'}
			/> -->
		</div>
		<div slot="text">{isOnline ? 'Online' : 'Offline'}</div>
	</Tooltip>
</div>
<svelte:window bind:online={isOnline} />

<style lang="scss">
	.online-indicator {
		position: absolute;
		left: 0%;
		bottom: -10%;
		width: 100%;
		height: 1rem;
		// padding-right: 85%;
	}
	.online-icon-wrapper {
		border: var(--alternate-color) solid 2px;
		background-color: var(--onlineBgColor, --accent-color);
		border-radius: 100%;
		width: 0.8rem;
		height: 0.8rem;
	}
</style>
