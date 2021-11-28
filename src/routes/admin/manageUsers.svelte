<script lang="ts">
	import AccordionDetails from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import Grid from '$lib/components/containers/Grid.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import UserSelect from '$lib/components/selects/UserSelect.svelte';
	import ToggleSwitch from '$lib/components/switches/ToggleSwitch.svelte';
	import type { WebUser } from '$scripts/classes/webUser';
	import { updateUser } from '$scripts/store';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import RoleToggle from '$switches/RoleToggle.svelte';
	import { onMount } from 'svelte';

	let selectedUser: WebUser;
	let userPromise: Promise<WebUser[]> = getWeeklyUsers(false);
	let nicknameUpdate: string;
	let amountOwedUpdate: number;
	let amountPaidUpdate: number;

	const gridStyles = 'max-width: min(100%,40rem);';
	let weeklyWinnings: { week: string; amount: number }[];

	const sortWeeklyWinnings = () => {
		const keys = Object.keys(selectedUser.weeklyWinnings).sort();
		const filteredKeys = keys.filter((key) => key.match('week_'));
		const truncatedKeys = filteredKeys.map((key) => {
			const splitKey = key.split('_');
			return splitKey[1];
		});
		truncatedKeys.sort((first, second) => Number(first) - Number(second));
		const sorted = truncatedKeys.map((key) => {
			return { week: key, amount: selectedUser.weeklyWinnings[`week_${key}`] };
		});
		return sorted;
	};
	const updateDisplayedUser = (): void => {
		weeklyWinnings = sortWeeklyWinnings();
		nicknameUpdate = selectedUser.nickname;
	};

	onMount(async () => {
		const users = await userPromise;
		selectedUser = users[0];
		nicknameUpdate = selectedUser.nickname;
		weeklyWinnings = sortWeeklyWinnings();
	});
</script>

<PageTitle>Manage Users</PageTitle>

{#await userPromise}
	Loading users...
{:then}
	{#if selectedUser}
		<Grid
			customStyles="{gridStyles} grid-template-columns: auto max-content;text-align:left;justify-self:center;"
		>
			<UserSelect
				bind:selectedUser
				bind:userPromise
				on:userChanged={updateDisplayedUser}
				customStyles="grid-column:span 2"
			/>
			<p class="title">Name:</p>
			<p>{selectedUser.name}</p>
			<p class="title">Email:</p>
			<p>{selectedUser.email}</p>
			<p class="title">UserID:</p>
			<p>{selectedUser.uid})</p>
			<p class="title">Nickname:</p>
			<input type="text" bind:value={nicknameUpdate} />
		</Grid>
		<hr />
		<Grid>
			<RoleToggle role="admin" bind:user={selectedUser} />
			<RoleToggle role="college" bind:user={selectedUser} />
			<RoleToggle role="pick6" bind:user={selectedUser} />
			<RoleToggle role="playoffs" bind:user={selectedUser} />
			<RoleToggle role="survivor" bind:user={selectedUser} />
			<RoleToggle role="weekly" bind:user={selectedUser} />
		</Grid>
		<Grid>
			<ToggleSwitch
				on:toggle={async () => await updateUser(selectedUser)}
				bind:checked={selectedUser.paidCollege}
				labelText="Paid College"
			/>
			<ToggleSwitch
				on:toggle={async () => await updateUser(selectedUser)}
				bind:checked={selectedUser.paidPick6}
				labelText="Paid Pick6"
			/>
			<ToggleSwitch
				on:toggle={async () => await updateUser(selectedUser)}
				bind:checked={selectedUser.paidPlayoffs}
				labelText="Paid Playoffs"
			/>
			<ToggleSwitch
				on:toggle={async () => await updateUser(selectedUser)}
				bind:checked={selectedUser.paidSurvivor}
				labelText="Paid Survivor"
			/>
			<ToggleSwitch
				on:toggle={async () => await updateUser(selectedUser)}
				bind:checked={selectedUser.paidWeekly}
				labelText="Paid Weekly"
			/>
		</Grid>
		<Grid
			customStyles="{gridStyles} justify-self: center;
		grid-template-columns: auto 1fr;"
		>
			<label for="amountOwed" class="title"> Amount Owed to Pool </label>
			<input id="amountOwed" type="number" value={selectedUser.amountOwedToPools} />

			<label for="amountPaid" class="title"> Amount Paid by Pool </label>
			<input id="amountPaid" type="number" value={selectedUser.amountPaidToPools} />

			<label for="winningsSummary" class="title"> Weekly Winnings </label>
			<AccordionDetails showArrow={false}>
				<div id="winningsSummary" slot="summary">
					<p class="title">${selectedUser.weeklyWinnings.total} total</p>
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
