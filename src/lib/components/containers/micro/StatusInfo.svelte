<script lang="ts">
	import type { ESPNScore, ESPNStatus } from '$scripts/classes/game';
	import FinalGameScore from './FinalGameScore.svelte';
	import ScoresAts from './ScoresATS.svelte';
	import ErrorModal from '$lib/components/modals/ErrorModal.svelte';
	import { preferred_score_view } from '$scripts/store';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let promise_status: Writable<Promise<ESPNStatus>> = getContext('promise_status');
	let promise_scores: Writable<
		Promise<{ home_score_data: ESPNScore; away_score_data: ESPNScore }>
	> = getContext('promise_scores');
</script>

<div class="grid status-info">
	{#await $promise_status}
		<div />
		<div />
		<div />
	{:then status}
		{#if status.type.description === 'Final'}
			{#await $promise_scores}
				<div class="away">--</div>
				<div class="finalOrTime">Final</div>
				<div class="home">--</div>
			{:then { away_score_data, home_score_data }}
				{@const home_score = home_score_data.value}
				{@const away_score = away_score_data.value}
				{#if $preferred_score_view === 'Actual' || $preferred_score_view === 'Both'}
					<FinalGameScore
						isHigherScore={away_score > home_score}
						displayedScore={away_score_data}
						gridArea={'away'}
					/>
					<div class="finalOrTime">Final</div>
					<FinalGameScore
						isHigherScore={home_score > away_score}
						displayedScore={home_score_data}
						gridArea={'home'}
					/>
				{/if}
			{:catch error}
				<ErrorModal {error} />
			{/await}
		{:else if status.type.description === 'Scheduled'}
			<!-- <div class="away" />
			<div class="final" />
			<div class="home" /> -->
		{:else if status.type.description !== 'Canceled'}
			{#await $promise_scores}
				<div class="away score">--</div>
				<div class="finalOrTime">--</div>
				<div class="home score">--</div>
			{:then { away_score_data, home_score_data }}
				<div class="away score">{away_score_data.value}</div>
				<div class="grid period-clock finalOrTime">
					{#if status.type.completed === false}
						{#if status.type.description === 'Halftime'}
							<div>{status.type.description}</div>
						{:else if status.type.description !== 'Canceled'}
							<div>Q{status.period}</div>
							<div>{status.displayClock}</div>
						{:else}
							<div><strong>Canceled</strong></div>
						{/if}
					{/if}
				</div>
				<div class="home score">{home_score_data.value}</div>
			{:catch error}
				<div class="away">--</div>
				<ErrorModal {error} />
			{/await}
		{/if}
	{:catch error}
		<ErrorModal {error} />
	{/await}
	{#if $preferred_score_view === 'Both' || $preferred_score_view === 'ATS'}
		<ScoresAts />
	{/if}
</div>

<style lang="scss">
	.grid {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
	}
	.period-clock {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto-fit, minmax(1rem, 1fr));
		align-self: center;
	}
	div {
		align-self: center;
	}
	.status-info {
		width: auto;
		justify-self: center;
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
		grid-template-rows: repeat(auto-fit, minmax(0, auto));
		grid-template-areas:
			'away finalOrTime home'
			'awayATS ATS homeATS';
		grid-area: statusInfo;
		align-self: center;
	}
	.away {
		grid-area: away;
	}
	.home {
		grid-area: home;
	}
	.finalOrTime {
		grid-area: finalOrTime;
		padding: 1rem;
	}
	.score {
		font-weight: bold;
		font-size: min(2.5rem, 5vw);
		min-width: 2ch;
		padding: min(0.5rem, 1.4vw);
	}
</style>
