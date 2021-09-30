<script lang="ts">
	import DevNotes from '$lib/components/misc/DevNotes.svelte';
	import PageTitle from '$lib/components/misc/PageTitle.svelte';
</script>

<svelte:head>
	<title>Weekly Pool</title>
</svelte:head>
<PageTitle>Weekly</PageTitle>

<DevNotes>
	<svelte:fragment slot="notes">
		This may be a good place to insert the "widgets". Out of the way enough to not be a bother, but
		still findable via normal navigation.
	</svelte:fragment>
</DevNotes>
