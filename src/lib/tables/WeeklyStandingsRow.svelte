<script lang="ts">
	import RowData from '$lib/components/containers/micro/RowData.svelte';

	export let player: { nickname: any; wins: any; losses: any; tiebreaker: any };
	export let i: number;
</script>

<RowData {i}>
	{i + 1}
</RowData>
<RowData {i}>
	{player.nickname}
</RowData>
<RowData {i}>
	{player.wins}
</RowData>
<RowData {i}>
	{player.losses}
</RowData>
<RowData {i}>
	{player.tiebreaker}
</RowData>
