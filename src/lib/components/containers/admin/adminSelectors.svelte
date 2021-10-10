<script lang="ts">
	import UserSelect from '$lib/components/selects/UserSelect.svelte';

	import WeekSelect from '$lib/components/selects/WeekSelect.svelte';
	import YearSelect from '$lib/components/selects/YearSelect.svelte';
	import type { Game } from '$scripts/classes/game';
	import type { WebUser } from '$scripts/classes/webUser';
	import { largerThanMobile } from '$scripts/store';
	import { getAllGames } from '$scripts/weekly/weeklyAdmin';
	import { getWeeklyUsers } from '$scripts/weekly/weeklyUsers';
	import { faSync } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let userPromise: Promise<WebUser[]>;
	export let gamePromise: Promise<Game[]>;
	export let selectedWeek: number;
	export let selectedYear: number;
	export let selectedUser: WebUser;
	let min: string | number;
	let startOpen = true;
	let customDetailsStyles: string;

	$: customDetailsStyles = $largerThanMobile ? 'grid-column:span 2;' : undefined;
	$: min = $largerThanMobile ? 0 : '40%';
</script>

<AdminExpandSection summaryText="Selectors" bind:min {startOpen} {customDetailsStyles}>
	<label for="refresh" class="span-2">
		<p>Refresh Users and Games</p>
		<button
			id="refresh"
			class="refresh"
			on:click={async () => {
				userPromise = getWeeklyUsers();
				gamePromise = getAllGames();
				// maxWeekPromise = getMaxGameWeek();
			}}
		>
			<Fa icon={faSync} />
		</button>
	</label>
	<label for="week-select">
		<p>Week</p>
		<WeekSelect bind:selectedWeek />
	</label>
	<label for="year-select">
		<p>Year</p>
		<YearSelect bind:selectedYear />
	</label>

	{#await userPromise}
		Loading users...
	{:then users}
		<label for="user-select" class="span-2">
			<p>User</p>
			<UserSelect bind:selectedUser />
		</label>
	{/await}
</AdminExpandSection>

<!-- <AccordionDetails>
	<span slot="summary">Selectors</span>
	<Grid slot="content" bind:min>
		<label for="refresh">
			<p>Refresh Users and Games</p>
			<button
				id="refresh"
				class="refresh"
				on:click={async () => {
					userPromise = getWeeklyUsers();
					gamePromise = getAllGames();
					// maxWeekPromise = getMaxGameWeek();
				}}
			>
				<Fa icon={faSync} />
			</button>
		</label>
		<label for="week-select">
			<p>Week</p>
			<WeekSelect bind:selectedWeek />
		</label>
		<label for="year-select">
			<p>Year</p>
			<YearSelect bind:selectedYear />
		</label>

		{#await userPromise}
			Loading users...
		{:then users}
			<label for="user-select">
				<p>User</p>
				<UserSelect bind:selectedUser />
			</label>
		{/await}
	</Grid>
</AccordionDetails> -->
<style lang="scss">
	button {
		@include styledButton;
	}
	.refresh {
		max-width: max-content;
	}
	label {
		display: grid;
		justify-items: center;
	}
	.span-2 {
		grid-column: span 2;
	}
</style>
