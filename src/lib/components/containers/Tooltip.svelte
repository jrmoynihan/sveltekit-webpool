<script lang="ts">
	export let arrowhorizontalPosition = '50%';
	export let tooltipHorizontalPosition = '-50%';
	export let tooltipWidth = '100%';
	export let tooltipTop = '-300%';
</script>

<div class="tooltip-parent">
	<slot name="content" />
	<span
		class="tooltip"
		style="--leftTip:{tooltipHorizontalPosition}; --widthTip:{tooltipWidth}; --topTip:{tooltipTop};"
	>
		<slot name="text">Tooltip text goes in the 'text' slot</slot>
		<span class="tooltip-arrow" style="--leftArrow:{arrowhorizontalPosition}" />
	</span>
</div>

<style lang="scss">
	$topTip: var(--topTip);
	$widthTip: var(--widthTip);
	$leftTip: var(--leftTip);
	$leftArrow: var(--leftArrow);
	.tooltip-parent {
		& > span.tooltip {
			@include defaultTransition;
			visibility: hidden;
			opacity: 0;
			position: absolute;
			top: $topTip;
			width: $widthTip;
			height: auto;
			z-index: 1;
			left: 50%;
			font-weight: normal;
			font-size: 0.8rem;
			background: var(--alternate-color);
			box-shadow: 0 0 10px 0px var(--accent-color);
			border-radius: 0.75rem;
			padding: 1rem;
			scale: 0;
			text-align: center;
			transform: translateX($leftTip);
			transform-origin: left;
			z-index: 10;
		}

		.tooltip-arrow {
			width: 50px;
			height: 25px;
			position: absolute;
			top: 100%;
			left: $leftArrow;
			transform: translateX(-50%);
			overflow: hidden;

			&::after {
				content: '';
				position: absolute;
				width: 25px;
				height: 25px;
				background: var(--alternate-color);
				transform: translateX(-50%) translateY(-50%) rotate(45deg);
				top: 0;
				left: 50%;
				box-shadow: 1px 1px 10px 0px var(--accent-color);

				// border-style: solid;
				// border-width: 1rem 0.75rem 0 0.75rem;
				// border-color: transparent;
				// border-top-color: transparent;
				// border-top-color: white;
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
