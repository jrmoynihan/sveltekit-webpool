<script lang="ts">
	import { largerThanMobile, useDarkTheme } from '$scripts/store';

	export let playerData = [];
</script>

{#each playerData as player, i}
	<div class="player rank {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme ? 'dark' : 'light'}">
		{i + 1}
	</div>
	<div
		class="player nickname {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme ? 'dark' : 'light'}"
	>
		{player.nickname}
	</div>
	<div class="player wins {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme ? 'dark' : 'light'}">
		{player.wins}
	</div>
	<div
		class="player losses {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme ? 'dark' : 'light'}"
	>
		{player.losses}
	</div>
	<div
		class="player percentage {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme
			? 'dark'
			: 'light'}"
	>
		{((player.wins / (player.wins + player.losses)) * 100).toFixed(2)}%
		{#if $largerThanMobile}
			<span
				style="--win-radii:{((player.wins / (player.wins + player.losses)) * 100).toString()}%"
			/>
		{/if}
	</div>
{/each}

<style lang="scss">
	$radii: var(--win-radii);

	.player {
		padding: 0.2em;
		height: 100%;
		align-content: center;
		display: grid;
	}
	.even-row {
		background-color: rgba(var(--accentValue-color), 50%);
		&.light {
			color: var(--alternate-color);
		}
		&.dark {
			color: var(--main-color);
		}
	}
	.percentage {
		display: inline-grid;
		gap: 10px;
		grid-template-columns: min-content min-content;
		align-items: center;
		justify-content: center;
	}
	span {
		aspect-ratio: 1/1;
		background: conic-gradient(var(--main-color) $radii, transparent $radii);
		border-radius: 50%;
		display: inline-block;
		height: 100%;
		width: 2em;
	}
</style>
