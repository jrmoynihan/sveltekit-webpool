<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import type { Timestamp } from '@firebase/firestore';
	import {
		faArrowCircleLeft,
		faArrowCircleRight,
		faCheckCircle,
		faFootballBall,
		faLock,
		faTimesCircle
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Tooltip from '../Tooltip.svelte';
	import GameTime from './GameTime.svelte';
	import StatusInfo from './StatusInfo.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let promiseSituation: Promise<any>;
	export let selectedTeam: string = '';
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let spread: number;
	export let disabled: boolean = false;
	export let showIDs: boolean = false;
	export let showTimestamps: boolean = false;
	export let id: string = '';
	export let timestamp: Timestamp;
</script>

<label class="game-info rounded" for="{id}-none">
	<p class="grid info pick-at-pick">
		{#await promiseStatus}
			<span />
		{:then status}
			<span>
				{#if status.type.description === 'Final'}
					{#await promiseScores then { homeScoreData, awayScoreData }}
						{#if selectedTeam === awayTeam.abbreviation}
							{#if (spread < 0 && homeScoreData.value + spread < awayScoreData.value) || (spread > 0 && awayScoreData.value - spread > homeScoreData.value)}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{:else if spread === 0 && awayScoreData.value > homeScoreData.value}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{:else}
								<Fa icon={faTimesCircle} size="2x" color="red" />
							{/if}
						{/if}
					{/await}
				{/if}</span
			>
		{/await}
		<span class="at-symbol"> AT </span>
		{#await promiseStatus}
			<span />
		{:then status}
			<span>
				{#if status.type.description === 'Final'}
					{#await promiseScores then { homeScoreData, awayScoreData }}
						{#if selectedTeam === homeTeam.abbreviation}
							{#if (spread < 0 && homeScoreData.value + spread > awayScoreData.value) || (spread > 0 && awayScoreData.value - spread < homeScoreData.value)}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{:else if spread === 0 && homeScoreData.value > awayScoreData.value}
								<Fa icon={faCheckCircle} size="2x" color="green" />
							{:else}
								<Fa icon={faTimesCircle} size="2x" color="red" />
							{/if}
						{/if}
					{/await}
				{/if}</span
			>
		{/await}
	</p>
	<StatusInfo {promiseStatus} {promiseScores} />
	<!-- <p class="grid status info">
        {#await promiseStatus}
            <span />
            <span />
            <span />
        {:then status}
            {#if status.type.description === 'Final'}
                {#await promiseScores}
                    <span>--</span>
                {:then { awayScoreData, homeScoreData }}
                    <span class="score" class:higherScore={awayScoreData.value > homeScoreData.value}
                        >{awayScoreData.value}</span
                    >
                {:catch}
                    <span>--</span>
                {/await}

                <span>Final</span>

                {#await promiseScores}
                    <span>--</span>
                {:then { awayScoreData, homeScoreData }}
                    <span class="score" class:higherScore={homeScoreData.value > awayScoreData.value}
                        >{homeScoreData.value}</span
                    >
                {:catch}
                    <span>--</span>
                {/await}
            {:else if status.type.description === 'Scheduled'}
                <span />
                <span />
                <span />
            {:else if status.type.description !== 'Canceled'}
                {#await promiseScores}
                    <span>--</span>
                {:then { awayScoreData }}
                    <span class="score">{awayScoreData.value}</span>
                {:catch}
                    <span>--</span>
                {/await}

                <span>
                    {#if status.type.completed === false}
                        {#if status.type.description === 'Halftime'}
                            <p>{status.type.description}</p>
                        {:else if status.type.description !== 'Canceled'}
                            <p>Q{status.period}</p>
                            <p>{status.displayClock}</p>
                        {:else}
                            <p><strong>Canceled</strong></p>
                        {/if}
                    {/if}
                </span>

                {#await promiseScores}
                    <span>--</span>
                {:then { homeScoreData }}
                    <span class="score">{homeScoreData.value}</span>
                {:catch}
                    <span>--</span>
                {/await}
            {/if}
        {:catch}
            unable to get game status...
        {/await}
    </p> -->
	{#await promiseStatus then status}
		{#if status.type.description === 'Final'}
			<p style="display:grid; grid-template-columns: repeat(3,minmax(0,1fr));">
				{#await promiseScores then scores}
					{#if spread > 0}
						<span>({scores.awayScoreData.value - spread})</span>
						<span>ATS</span>
						<span>({scores.homeScoreData.value})</span>
					{:else if spread < 0}
						<span>({scores.awayScoreData.value})</span>
						<span>ATS</span>
						<span>({scores.homeScoreData.value - spread * -1})</span>
					{/if}
				{/await}
			</p>
		{/if}
	{/await}

	{#if spread}
		<p class="spread info" class:active-game={disabled} style="line-height: 2;">
			{#if disabled}
				{#await promiseSituation then situation}
					{#if situation.possessionText}
						{#if situation.possessionText.indexOf(awayTeam.abbreviation) >= 0}
							<Fa icon={faFootballBall} size="lg" rotate={45} />
							<Fa icon={faLock} size="lg" />
							<span />
						{/if}
					{/if}
				{/await}

				{#await promiseSituation then situation}
					{#if situation.possessionText}
						{#if situation.possessionText.indexOf(homeTeam.abbreviation) >= 0}
							<span />
							<Fa icon={faLock} size="lg" />
							<Fa icon={faFootballBall} size="lg" rotate={45} />
						{/if}
					{/if}
				{/await}
			{:else}
				{#if spread > 0}
					<div class="arrow-container">
						<Tooltip
							tooltipHorizontalPosition="-50%"
							tooltipTop="-220%"
							tooltipWidth="clamp(5rem,40ch,25rem)"
						>
							<Fa slot="content" icon={faArrowCircleLeft} size="lg" />
							<span slot="text" class="tooltip"
								>Away Team ({awayTeam.abbreviation}) is favored by {spread}.</span
							>
						</Tooltip>
					</div>
				{/if}
				<span>{spread > 0 ? `+${spread}` : spread}</span>
				{#if spread < 0}
					<div class="arrow-container">
						<Tooltip
							tooltipHorizontalPosition="-50%"
							tooltipTop="-220%"
							tooltipWidth="clamp(5rem,40ch,25rem)"
						>
							<Fa slot="content" icon={faArrowCircleRight} size="lg" />
							<span slot="text" class="tooltip"
								>Home Team ({homeTeam.abbreviation}) is favored by {Math.abs(spread)}.</span
							>
						</Tooltip>
					</div>
				{/if}
			{/if}
		</p>
	{:else}
		No spread field set.
	{/if}
	<div class="dateTime info">
		{showIDs ? id : ''}
		{showTimestamps ? timestamp.toDate().getTime() : ''}
		{#await promiseStatus}
			{#if timestamp}
				<GameTime {timestamp} />
			{:else}
				No timestamp field set.
			{/if}
		{:then status}
			{#if status.type.description === 'Scheduled'}
				{#if timestamp}
					<GameTime {timestamp} />
				{:else}
					No timestamp field set.
				{/if}
			{:else if status.type.completed === false}
				<!-- {#if status.type.description === 'Halftime'}
                    <p>{status.type.description}</p>
                {:else if status.type.description !== 'Canceled'}
                    <p>
                        <span>Q{status.period}</span>
                        <span>{status.displayClock}</span>
                    </p>
                {:else}
                    <p><strong>Canceled</strong></p>
                {/if} -->
				{#await promiseSituation then situation}
					{#if situation.downDistanceText !== undefined}
						<p style="font-size: 0.8rem;">
							<span class:red-zone={situation.yardLine <= 20}>{situation.downDistanceText}</span>
						</p>
					{/if}
				{/await}
			{/if}
		{/await}
	</div>
	<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
</label>

<style lang="scss">
	.grid {
		@include gridAndGap;
		justify-items: center;
	}
	span {
		padding: 0.3rem 0.5rem;
		align-self: center;
	}
	.game-info {
		display: grid;
		align-items: end;
	}
	.status {
		grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
	}
	.score {
		font-weight: bold;
		font-size: clamp(1rem, 5vw, 3rem);
		min-width: 2ch;
	}
	.info {
		width: auto;
		justify-self: center;
	}
	.dayShadow:hover {
		@include nightShadow;
	}
	.nightShadow:focus {
		@include nightShadow;
	}
	.arrow-container {
		position: relative;
	}
	.red-zone {
		background: darkred;
		border-radius: 1rem;
		color: white;
	}
	.dateTime {
		@include gridAndGap;
	}
	.active-game {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		width: 100%;
		justify-items: center;
	}
	.higherScore {
		text-decoration: underline 2px solid;
	}
</style>
