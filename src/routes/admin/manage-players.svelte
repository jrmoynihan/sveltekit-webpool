<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import RoleToggle from '$lib/components/switches/RoleToggle.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import { selected_player, updatePlayer } from '$lib/scripts/store';
	import { onMount } from 'svelte';

	let nicknameUpdate: string;
	// let amountOwedUpdate: number;
	// let amountPaidUpdate: number;

	const gridStyles = 'max-width: min(100%,40rem);';
	let weeklyWinnings: { week: string; amount: number }[];

	const sortWeeklyWinnings = () => {
		const keys = Object.keys($selected_player.weeklyWinnings).sort();
		const filteredKeys = keys.filter((key) => key.match('week_'));
		const truncatedKeys = filteredKeys.map((key) => {
			const splitKey = key.split('_');
			return splitKey[1];
		});
		truncatedKeys.sort((first, second) => Number(first) - Number(second));
		const sorted = truncatedKeys.map((key) => {
			return { week: key, amount: $selected_player.weeklyWinnings[`week_${key}`] };
		});
		return sorted;
	};
	const updateDisplayedPlayer = (): void => {
		weeklyWinnings = sortWeeklyWinnings();
		nicknameUpdate = $selected_player.nickname;
	};

	onMount(async () => {
		nicknameUpdate = $selected_player.nickname;
		weeklyWinnings = sortWeeklyWinnings();
	});
</script>

<PageTitle>Manage Users</PageTitle>

<Grid
	customStyles="{gridStyles} grid-template-columns: auto max-content;text-align:left;justify-self:center;"
>
	<PlayerSelect
		player_pool="all"
		on:change={updateDisplayedPlayer}
		customStyles="grid-column:span 2"
	/>
	<p class="title">Name:</p>
	<p>{$selected_player.name}</p>
	<p class="title">Email:</p>
	<p>{$selected_player.email}</p>
	<p class="title">UserID:</p>
	<p>{$selected_player.uid}</p>
	<p class="title">Nickname:</p>
	<input type="text" bind:value={nicknameUpdate} />
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
		bind:checked={$selected_player.paidCollege}
		labelText="Paid College"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paidPick6}
		labelText="Paid Pick6"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paidPlayoffs}
		labelText="Paid Playoffs"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paidSurvivor}
		labelText="Paid Survivor"
	/>
	<ToggleSwitch
		on:toggle={async () => await updatePlayer($selected_player)}
		bind:checked={$selected_player.paidWeekly}
		labelText="Paid Weekly"
	/>
</Grid>
<Grid
	customStyles="{gridStyles} justify-self: center;
		grid-template-columns: auto 1fr;"
>
	<label for="amountOwed" class="title"> Amount Owed to Pool </label>
	<input id="amountOwed" type="number" value={$selected_player.amountOwedToPools} />

	<label for="amountPaid" class="title"> Amount Paid by Pool </label>
	<input id="amountPaid" type="number" value={$selected_player.amountPaidToPools} />

	<label for="winningsSummary" class="title"> Weekly Winnings </label>
	<AccordionDetails expanderIconSide={'none'}>
		<div id="winningsSummary" slot="summary">
			<p class="title">${$selected_player.weeklyWinnings.total} total</p>
			<p><small><i>(click to reveal breakdown)</i></small></p>
		</div>
		<div slot="content">
			{#if weeklyWinnings}
				{#each weeklyWinnings as winningWeek}
					<p>Week {winningWeek.week}: ${winningWeek.amount}</p>
				{/each}
			{/if}
		</div>
	</AccordionDetails>
</Grid>

<style lang="scss">
	input {
		@include editableInput;
	}
	.title {
		font-weight: bold;
	}
</style>
