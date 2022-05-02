<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import PlayerSelect from '$lib/components/selects/PlayerSelect.svelte';
	import RoleToggle from '$lib/components/switches/RoleToggle.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { Player } from '$lib/scripts/classes/player';
	import { updatePlayer } from '$lib/scripts/store';
	import { getWeeklyPlayers } from '$lib/scripts/weekly/weeklyPlayers';
	import { onMount } from 'svelte';

	let selectedPlayer: Player;
	let playersPromise: Promise<Player[]> = getWeeklyPlayers(false);
	let nicknameUpdate: string;
	let amountOwedUpdate: number;
	let amountPaidUpdate: number;

	const gridStyles = 'max-width: min(100%,40rem);';
	let weeklyWinnings: { week: string; amount: number }[];

	const sortWeeklyWinnings = () => {
		const keys = Object.keys(selectedPlayer.weeklyWinnings).sort();
		const filteredKeys = keys.filter((key) => key.match('week_'));
		const truncatedKeys = filteredKeys.map((key) => {
			const splitKey = key.split('_');
			return splitKey[1];
		});
		truncatedKeys.sort((first, second) => Number(first) - Number(second));
		const sorted = truncatedKeys.map((key) => {
			return { week: key, amount: selectedPlayer.weeklyWinnings[`week_${key}`] };
		});
		return sorted;
	};
	const updateDisplayedUser = (): void => {
		weeklyWinnings = sortWeeklyWinnings();
		nicknameUpdate = selectedPlayer.nickname;
	};

	onMount(async () => {
		const users = await playersPromise;
		selectedPlayer = users[0];
		nicknameUpdate = selectedPlayer.nickname;
		weeklyWinnings = sortWeeklyWinnings();
	});
</script>

<PageTitle>Manage Users</PageTitle>

{#await playersPromise}
	Loading users...
{:then}
	{#if selectedPlayer}
		<Grid
			customStyles="{gridStyles} grid-template-columns: auto max-content;text-align:left;justify-self:center;"
		>
			<PlayerSelect
				bind:selectedPlayer
				bind:playersPromise
				on:userChanged={updateDisplayedUser}
				customStyles="grid-column:span 2"
			/>
			<p class="title">Name:</p>
			<p>{selectedPlayer.name}</p>
			<p class="title">Email:</p>
			<p>{selectedPlayer.email}</p>
			<p class="title">UserID:</p>
			<p>{selectedPlayer.uid})</p>
			<p class="title">Nickname:</p>
			<input type="text" bind:value={nicknameUpdate} />
		</Grid>
		<hr />
		<Grid>
			<RoleToggle role="admin" bind:player={selectedPlayer} />
			<RoleToggle role="college" bind:player={selectedPlayer} />
			<RoleToggle role="pick6" bind:player={selectedPlayer} />
			<RoleToggle role="playoffs" bind:player={selectedPlayer} />
			<RoleToggle role="survivor" bind:player={selectedPlayer} />
			<RoleToggle role="weekly" bind:player={selectedPlayer} />
		</Grid>
		<Grid>
			<ToggleSwitch
				on:toggle={async () => await updatePlayer(selectedPlayer)}
				bind:checked={selectedPlayer.paidCollege}
				labelText="Paid College"
			/>
			<ToggleSwitch
				on:toggle={async () => await updatePlayer(selectedPlayer)}
				bind:checked={selectedPlayer.paidPick6}
				labelText="Paid Pick6"
			/>
			<ToggleSwitch
				on:toggle={async () => await updatePlayer(selectedPlayer)}
				bind:checked={selectedPlayer.paidPlayoffs}
				labelText="Paid Playoffs"
			/>
			<ToggleSwitch
				on:toggle={async () => await updatePlayer(selectedPlayer)}
				bind:checked={selectedPlayer.paidSurvivor}
				labelText="Paid Survivor"
			/>
			<ToggleSwitch
				on:toggle={async () => await updatePlayer(selectedPlayer)}
				bind:checked={selectedPlayer.paidWeekly}
				labelText="Paid Weekly"
			/>
		</Grid>
		<Grid
			customStyles="{gridStyles} justify-self: center;
		grid-template-columns: auto 1fr;"
		>
			<label for="amountOwed" class="title"> Amount Owed to Pool </label>
			<input id="amountOwed" type="number" value={selectedPlayer.amountOwedToPools} />

			<label for="amountPaid" class="title"> Amount Paid by Pool </label>
			<input id="amountPaid" type="number" value={selectedPlayer.amountPaidToPools} />

			<label for="winningsSummary" class="title"> Weekly Winnings </label>
			<AccordionDetails showArrow={false}>
				<div id="winningsSummary" slot="summary">
					<p class="title">${selectedPlayer.weeklyWinnings.total} total</p>
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
	{/if}
{:catch error}
	<ErrorModal>
		{error}
	</ErrorModal>
{/await}

<style lang="scss">
	input {
		@include editableInput;
	}
	.title {
		font-weight: bold;
	}
</style>
