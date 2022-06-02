<script lang="ts">
	import StyledButton from '$lib/components/buttons/StyledButton.svelte';
	import { findCurrentSeason } from '$lib/scripts/schedule';
	import { defaultToast } from '$lib/scripts/toasts';

	import { larger_than_mobile } from '$scripts/store';
	import AdminExpandSection from './adminExpandSection.svelte';

	export let customContentStyles = null;
	export let customSummaryStyles = null;
	let minColumns: string | number;
	let now: Date = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let dateString = `${year}-${month.toString().length < 2 ? '0' + month : month}-${
		day.toString().length < 2 ? '0' + day : day
	}`;
	$: minColumns = $larger_than_mobile ? 0 : '40%';

	function findWeekDateTimeBounds() {
		defaultToast({ title: 'Not Yet Implemented', msg: 'Find Week Bounds is not yet implemented.' });
	}
	async function findSeason() {
		const season = await findCurrentSeason(now);
		defaultToast({
			title: 'Season Found',
			msg: `${season.year} ${season.type_name} bounds found.`
		});
	}
</script>

<AdminExpandSection
	summaryText="Schedule"
	bind:minColumns
	{customContentStyles}
	{customSummaryStyles}
>
	<StyledButton text="Find Bounds for Each Week" on:click={findWeekDateTimeBounds} />
	<input
		type="date"
		bind:value={dateString}
		on:change={() => (now = new Date(dateString.replaceAll('-', '/')))}
	/>
	<StyledButton
		text="Find Season Bounds for Selected Date: ({now.toLocaleDateString()})"
		on:click={findSeason}
	/>
</AdminExpandSection>

<style lang="scss">
	input {
		@include defaultInput;
	}
</style>
