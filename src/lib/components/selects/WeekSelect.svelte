<script lang='ts'>
	import { createEventDispatcher } from "svelte";

    let weeks: number[] = [];
    let currentWeek: number = 11; // @TODO find a function to determine the NFL week automatically
	export let selectedWeek: number = currentWeek

    for (let i = 1; i < 18; i++) {
        weeks = [...weeks, i];
    }

	const dispatch = createEventDispatcher()


</script>

<select bind:value={selectedWeek} on:change={()=>dispatch('weekChanged',selectedWeek)}>
    {#each weeks as week}
        <option value={week}>Week {week}</option>
    {/each}
</select>

<style lang='scss'>
    select {
		@include rounded;
		display: inline-flex;
		grid-area: selector;
		padding: 1rem;
		&:focus {
			@include nightShadow;
		}
		&:hover {
			@include dayShadow;
		}
	}
</style>