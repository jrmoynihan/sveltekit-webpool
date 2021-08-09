<script lang="ts">
	import { useDarkTheme } from '$scripts/store';

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
		class="player tiebreaker {(i + 1) % 2 === 0 ? 'even-row' : ''} {$useDarkTheme
			? 'dark'
			: 'light'}"
	>
		{player.tiebreaker}
	</div>
{/each}

<style lang="scss">
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
</style>
