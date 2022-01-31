<script lang="ts">
	// import { faExclamationCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';
	// import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';

	let isOnline = false;
	let onlineBgColor = isOnline ? 'hsl(120, 100%, 50%)' : 'red';
	let text = isOnline ? 'Online' : 'Offline';
</script>

<div class="online-indicator">
	<Tooltip tooltipHorizontalPosition="-75%" tooltipWidth="150%" tooltipTop="150%" showArrow={false}>
		<div class="online-icon-wrapper" slot="content" style="--onlineBgColor: {onlineBgColor};" />
		<div slot="text">{text}</div>
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
		box-sizing: border-box;
		border: var(--background) solid 2px;
		background-color: var(--onlineBgColor, --accent);
		border-radius: 100%;
		width: 0.8rem;
		height: 0.8rem;
	}
</style>
