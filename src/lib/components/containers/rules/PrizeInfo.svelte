<script lang="ts">
	import type { RuleCategory } from '$scripts/classes/rules';

	export let prizeData: RuleCategory;

	// Customize the view based on the type of info that needs to be presented
	var spanLength: number;
	$: if (prizeData.hasWeeklyPayout) {
		spanLength = 2;
	} else {
		spanLength = 4;
	}
</script>

{#if prizeData.hasWeeklyPayout}
	<div class="title" style="--span-length:{spanLength}">
		<h3>Weekly Prizes</h3>
	</div>
{/if}

<div class="title" style="--span-length:{spanLength}">
	<h3>Season Prizes</h3>
</div>

{#if prizeData.hasWeeklyPayout}
	<div class="prizes" style="--span-length:{spanLength}">
		<div>1st -- ${prizeData.weeklyFirst}</div>
		<div>2nd -- ${prizeData.weeklySecond}</div>
		<div>3rd -- ${prizeData.weeklyThird}</div>
	</div>
{/if}
<div class="prizes" style="--span-length:{spanLength}">
	<!-- TODO: Replace TBD strings with calculated totals based on entrants -->
	<div>1st -- TBD</div>
	<div>2nd -- TBD</div>
	<div>3rd -- TBD</div>
</div>
<div class="details">
	<p>{prizeData.endOfSeason}</p>
	<!-- TODO this should be hidden if prizes can be calculated -->
	<p>{prizeData.prizeTBDmessage}</p>
</div>

<style lang="scss">
	$spanLength: var(--span-length);
	h3 {
		color: var(--accent, hsl(37, 75%, 65%));
		text-decoration: underline 2px;
	}
	.title {
		grid-column: span $spanLength;
	}
	.prizes {
		grid-column: span $spanLength;
		font-family: Open Sans;
	}
	.details {
		grid-column: span 4;
		align-items: center;
		padding: 2vmin;
		& > p {
			width: 100%;
			padding: 0.25rem;
		}
	}
</style>
