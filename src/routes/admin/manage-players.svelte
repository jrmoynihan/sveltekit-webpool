<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import RoleToggle from '$lib/components/switches/RoleToggle.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { PlayerRecord } from '$lib/scripts/classes/playerRecord';
	import { selected_player, updatePlayer } from '$lib/scripts/store';
	import { getWeeklyRecordData } from '$lib/scripts/weekly/weeklyPlayers';
	import { orderBy, where } from '@firebase/firestore';

	const gridStyles = 'max-width: min(100%,40rem);';
	let weeklyWinnings: PlayerRecord[];

	const getPlayerWeeklyWinnings = async (player) => {
		const constraints = [where('uid', '==', player.uid), orderBy('week'), orderBy('year')];
		const winnings = await getWeeklyRecordData({ constraints });
		return winnings;
	};
	// TODO: Can this be made into a top-level await somehow?
	$: getPlayerWeeklyWinnings($selected_player).then((winnings) => {
		weeklyWinnings = winnings;
	});
</script>

<PageTitle>Manage Users</PageTitle>

<Grid
	customStyles="{gridStyles} grid-template-columns: auto max-content;text-align:left;justify-self:center;"
>
	<PlayerSelect player_pool="all" customStyles="grid-column:span 2" />
	<p class="title">Name:</p>
	<p>{$selected_player.name}</p>
	<p class="title">Email:</p>
	<p>{$selected_player.email}</p>
	<p class="title">UserID:</p>
	<p>{$selected_player.uid}</p>
	<p class="title">Nickname:</p>
	<input type="text" bind:value={$selected_player.nickname} />
</Grid>
<hr />
<Grid>
	<RoleToggle role="admin" bind:player={$selected_player} />
	<RoleToggle role="college" bind:player={$selected_player} />
	<RoleToggle role="pick6" bind:player={$selected_player} />
	<RoleToggle role="playoffs" bind:player={$selected_player} />
	<RoleToggle role="survivor" bind:player={$selected_player} />
	<RoleToggle role="weekly" bind:player={$selected_player} />
</Grid>
<Grid>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paid_college}
		labelText="Paid College"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paid_pick6}
		labelText="Paid Pick6"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paid_playoffs}
		labelText="Paid Playoffs"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paid_survivor}
		labelText="Paid Survivor"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paid_weekly}
		labelText="Paid Weekly"
	/>
</Grid>
<Grid
	customStyles="{gridStyles} justify-self: center;
		grid-template-columns: auto 1fr;"
>
	<label for="amountOwed" class="title"> Amount Owed to Pool </label>
	<input id="amountOwed" type="number" value={$selected_player.amount_owed_to_pools} />

	<label for="amountPaid" class="title"> Amount Paid by Pool </label>
	<input id="amountPaid" type="number" value={$selected_player.amount_paid_to_pools} />

	<label for="winningsSummary" class="title"> Weekly Winnings </label>
	<AccordionDetails expanderIconSide={'none'}>
		<div id="winningsSummary" slot="summary">
			<p class="title">${$selected_player.weekly_pool_season_winnings} total</p>
			<p><small><i>(click to reveal breakdown)</i></small></p>
		</div>
		<div slot="content">
			{#if weeklyWinnings}
				{#each weeklyWinnings as winningWeek}
					<p>Week {winningWeek.week}: ${winningWeek.prize_amount}</p>
				{/each}
			{/if}
		</div>
	</AccordionDetails>
</Grid>

<style lang="scss">
	input {
		@include defaultInput;
	}
	.title {
		font-weight: bold;
	}
</style>
