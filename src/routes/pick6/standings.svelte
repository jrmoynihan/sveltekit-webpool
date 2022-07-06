<script>
	import IncrementedMeter from '$components/misc/IncrementedMeter.svelte';

	// An easy way to modify the number of players being shown (dev-only)
	let number_of_players = 10;
	// Replace this with a DB query result
	let player_arr = [...Array(number_of_players).keys()];

	// The number of weeks we're through in the season ($current_week)
	let current_weeks = 5;
	let max_weeks = 18;
	let games_per_week = 6;
	let total_games = current_weeks * games_per_week;

	// Change this to extract display names from pick6 docs or match them with player docs
	let players = player_arr.map((p) => `Player ${p}`);

	// Mock data, providing averages for win projection
	let data = players?.map((p) => {
		// This will change to sum the wins through $current_week
		const wins = Math.floor(randomBetween(3 * current_weeks, total_games));
		const tiebreaker = Math.floor(randomBetween(0, 10)) + wins;
		return { name: p, wins, avg: wins / current_weeks, tiebreaker };
	});
	let wins = data?.map((d) => d.wins);
	let max_wins = Math.max(...wins);
	let speed = 450 / current_weeks;

	function randomBetween(min, max) {
		return Math.random() * (max - min) + min;
	}
</script>

<section class="view-standings">
	{#if data.length > 0}
		{#each data?.sort((a, b) => b.wins - a.wins) as { name, wins, avg, tiebreaker }}
			{@const projected = avg * max_weeks}
			<span class="player-name">
				{name}
			</span>
			<IncrementedMeter
				initial_value={wins}
				increments={max_wins}
				tiebreaker_wins={tiebreaker}
				{speed}
				increment_fill={`hsla(120, 30%, 40%)`}
				value_indicator_background={`hsl(24deg, 50%, 30%)`}
			/>
			<span title="projected" class="projected">({projected.toFixed(0)} projected)</span>
		{/each}
	{/if}
</section>

<style>
	.view-standings {
		padding: 1rem 1.5rem;
		max-width: 60rem;
		display: grid;
	}
	.projected,
	.player-name {
		display: grid;
	}
	.projected {
		padding: 0.5rem 0.25rem 0 0.5rem;
		justify-content: end;
	}
	.player-name {
		padding: 0.25rem;
	}
</style>
