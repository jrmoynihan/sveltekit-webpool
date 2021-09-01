<script lang="ts">
	export let width = '25%';
	export let left = '-5%';
	export let middleX = '40%';
	export let middleY = '40%';
	export let top = '-5%';
	export let right = '100%';
	export let bottom = '100%';
	export let msg = 'Loading...';
</script>

<div
	class="animation-container"
	style="--width:{width};--left:{left};--middleX:{middleX};--middleY:{middleY};--top:{top};--right:{right};--bottom:{bottom}"
>
	<p>{msg}</p>
	<div class="football">
		<span class="long-lace">
			<span class="short-lace first" />
			<span class="short-lace second" />
			<span class="short-lace third" />
		</span>
	</div>
</div>

<style lang="scss">
	$width: var(--width);
	$minHeight: $width;
	$left: var(--left);
	$middleX: var(--middleX);
	$middleY: var(--middleY);
	$top: var(--top);
	$right: var(--right);
	$bottom: var(--bottom);
	.animation-container {
		display: flex;
		position: relative;
		margin: auto;
		width: $width;
		min-height: $minHeight;
		overflow: clip;
		background-color: transparent;
		border-radius: 5vh;
		// border: 2px white(0.2) solid;
		& > p {
			display: inline-grid;
			color: var(--main-color);
			position: absolute;
			width: 100%;
			align-self: center;
			text-align: center;
			font-weight: bold;
		}
	}
	.football {
		@include accelerate;
		display: grid;
		position: relative;
		background: radial-gradient(#9e704f, saddlebrown);
		width: 50px;
		height: 50px;
		border: 1px solid black;
		border-radius: 80% 10px;
		transform: rotate(45deg);
		overflow: clip;
		animation: rotate linear 2s infinite;
	}
	@keyframes rotate {
		0% {
			left: $middleX;
			top: $top;
			transform: rotate(45deg);
			box-shadow: -10px 10px 5px 0px rgba(0, 0, 0, 0.25);
		}
		25% {
			left: $right;
			top: $middleY;
			transform: rotate(135deg);
			box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.25);
		}
		50% {
			left: $middleX;
			top: $bottom;
			transform: rotate(210deg);
			box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.25);
		}
		75% {
			left: $left;
			top: $middleY;
			transform: rotate(310deg);
			box-shadow: -10px -10px 5px 0px rgba(0, 0, 0, 0.25);
		}
		100% {
			left: $middleX;
			top: $top;
			transform: rotate(404deg);
			box-shadow: -10px 10px 5px 0px rgba(0, 0, 0, 0.25);
		}
	}

	.long-lace {
		display: inline-flex;
		position: relative;
		background-color: white;
		place-self: center;
		width: 65%;
		height: 4px;
		border-radius: 4px;
		transform: rotate(-45deg);
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: space-evenly;
		animation: spin 1s linear infinite both;
		&::before {
			content: '';
			position: absolute;
			background: rgba(0, 0, 0, 0.5);
			height: 1px;
			width: 300%;
			z-index: -2;
		}
		&::before {
			top: 50%;
		}
	}
	.short-lace {
		display: inline-grid;
		position: relative;
		background-color: white;
		align-self: center;
		width: 65%;
		height: 4px;
		border-radius: 4px;
		transform: rotate(90deg);
		border: 1px solid black;
	}
	.first {
		justify-self: start;
	}
	.second {
		justify-self: center;
	}
	.third {
		justify-self: end;
	}
	@keyframes spin {
		0% {
			transform: rotateZ(-45deg) translateY(-1000%);
		}
		25% {
			transform: rotateZ(-45deg) translateY(-550%) rotateX(-90deg);
		}
		50% {
			transform: rotateZ(-45deg) translateY(0%) rotateX(0deg);
		}
		75% {
			transform: rotateZ(-45deg) translateY(550%) rotateX(90deg);
		}
		100% {
			transform: rotateZ(-45deg) translateY(1000%);
		}
	}
</style>
