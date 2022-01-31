<script lang="ts">
	export let arrowhorizontalPosition = '50%';
	export let tooltipHorizontalPosition = '-50%';
	export let tooltipWidth = '100%';
	export let tooltipTop = '-300%';
	export let customStyleTooltipParent = '';
	export let customStyleTooltipSpan = '';
	export let showArrow = true;
</script>

<div class="tooltip-parent" style={customStyleTooltipParent}>
	<slot name="content" />
	<span
		class="tooltip"
		style="--leftTip:{tooltipHorizontalPosition}; --widthTip:{tooltipWidth}; --topTip:{tooltipTop}; {customStyleTooltipSpan};"
	>
		<slot name="text">Tooltip text goes in the 'text' slot</slot>
		{#if showArrow}
			<span class="tooltip-arrow" style="--leftArrow:{arrowhorizontalPosition}" />
		{/if}
	</span>
</div>

<style lang="scss">
	$topTip: var(--topTip);
	$widthTip: var(--widthTip);
	$leftTip: var(--leftTip);
	$leftArrow: var(--leftArrow);
	.tooltip-parent {
		position: relative;
		& > span.tooltip {
			@include defaultTransition;
			@include accelerate;
			box-sizing: border-box;
			visibility: hidden;
			opacity: 0;
			position: absolute;
			top: $topTip;
			width: $widthTip;
			height: auto;
			left: 50%;
			font-weight: normal;
			font-size: 0.8rem;
			background: var(--background, hsl(120, 16%, 17%));
			box-shadow: 0 0 10px 0px var(--accent, hsl(37, 75%, 65%));
			border-radius: 0.75rem;
			padding: 1rem;
			scale: 0;
			text-align: center;
			transform: translateX($leftTip);
			transform-origin: left;
			z-index: var(--zModal, 10);
		}

		.tooltip-arrow {
			@include accelerate;
			width: 50px;
			height: 25px;
			position: absolute;
			top: 100%;
			left: $leftArrow;
			transform: translateX(-50%);
			overflow: hidden;

			&::after {
				@include accelerate;
				content: '';
				position: absolute;
				width: 25px;
				height: 25px;
				background: var(--background, hsl(120, 16%, 17%));
				transform: translateX(-50%) translateY(-50%) rotate(45deg);
				top: 0;
				left: 50%;
				box-shadow: 1px 1px 10px 0px var(--accent, hsl(37, 75%, 65%));
			}
		}
		&:hover > span.tooltip,
		:hover > span.tooltip-arrow {
			visibility: visible;
			opacity: 1;
			scale: 1;
		}
	}
</style>
