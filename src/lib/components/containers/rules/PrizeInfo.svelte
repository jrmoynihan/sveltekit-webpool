<script lang="ts">
	import type { QueryDocumentSnapshot } from '@firebase/firestore';

	export let rulesDocument: QueryDocumentSnapshot;

	let prizeData = { ...rulesDocument.data() };

	// Customize the view based on the type of info that needs to be presented
	var spanLength: number;
	$: if (prizeData.hasWeeklyPayout) {
		spanLength = 2;
		// console.log('hasWeeklyPayout: true');
		// console.log(spanLength);
	} else {
		spanLength = 4;
		// console.log('hasWeeklyPayout: false');
		// console.log(spanLength);
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
	{prizeData.endOfSeason}
	<!-- TODO this should be hidden if prizes can be calculated -->
	{prizeData.prizeTBDmessage}
</div>

<style lang="scss">
	$spanLength: var(--span-length);
	h3{
		color: var(--accent-color);
		text-decoration: underline 2px;
	}
	.title {
		grid-column: span $spanLength;
	}
	.prizes {
		grid-column: span $spanLength;
	}
	.details {
		grid-column: span 4;
		padding: 2vmin;
	}
</style>
