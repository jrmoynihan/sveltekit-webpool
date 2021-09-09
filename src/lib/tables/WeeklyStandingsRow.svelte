<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';

	export let player: { nickname: any; wins: any; losses: any; tiebreaker: any };
	export let i: number;
	const isEvenRow = (index: number) => {
		if ((index + 1) % 2 === 0) {
			return true;
		} else {
			return false;
		}
	};
	const evenRow = isEvenRow(i);
</script>

<RowData {evenRow}>
	{i + 1}
</RowData>
<RowData {evenRow}>
	{player.nickname}
</RowData>
<RowData {evenRow}>
	{player.wins}
</RowData>
<RowData {evenRow}>
	{player.losses}
</RowData>
<RowData {evenRow}>
	{player.tiebreaker}
</RowData>
