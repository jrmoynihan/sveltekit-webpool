<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import type { Timestamp } from '@firebase/firestore';
	import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import TeamImage from './TeamImage.svelte';

	export let id = 'id';
	export let spread = 0;
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let timestamp: Timestamp;
	export let selectedTeam = '';
	export let showIDs = false;
</script>

<div class="matchup grid rounded">
	<!-- <div class="away"> -->
	<label for="{id}-away" class:pressed={selectedTeam === awayTeam.abbreviation} class='rounded' class:selected={selectedTeam === awayTeam.abbreviation}>
		<input id="{id}-away" type="radio" bind:group={selectedTeam} value={awayTeam.abbreviation} />
		<TeamImage
			team={awayTeam}
			grayscaled={selectedTeam === homeTeam.abbreviation && selectedTeam !== ''}
		/>
	</label>
	<!-- </div> -->
	<label class="game-info rounded" for="{id}-none">
		<span class='rounded' class:selected={selectedTeam === awayTeam.abbreviation}>{awayTeam.abbreviation}</span>
        <span> @ </span>
		<span class='rounded' class:selected={selectedTeam === homeTeam.abbreviation}>{homeTeam.abbreviation}</span>
		{#if spread}
			<p style="line-height: 2;">
				{#if spread > 0}
					<Fa icon={faArrowCircleLeft} size="lg" />
				{/if}
				{spread > 0 ? `+${spread}` : spread}
				{#if spread < 0}
					<Fa icon={faArrowCircleRight} size="lg" />
				{/if}
			</p>
		{:else}
			No spread field set.
		{/if}
		<div class="dateTime">
			{showIDs ? id : ''}
			{#if timestamp}
				<!-- {Intl.DateTimeFormat('en-US',{weekday:'long'}).format(timestamp.toDate().getDay())} -->
				<p>{timestamp.toDate().toDateString()}</p>
				<p>@ {timestamp.toDate().toLocaleTimeString([], { timeStyle: 'short' })}</p>
			{:else}
				No timestamp field set.
			{/if}
		</div>
		<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" />
	</label>
	<!-- <div class="home"> -->
	<label for="{id}-home" class:pressed={selectedTeam === homeTeam.abbreviation} class='rounded' class:selected={selectedTeam === homeTeam.abbreviation}>
		<input id="{id}-home" type="radio" bind:group={selectedTeam} value={homeTeam.abbreviation} />
		<TeamImage
			team={homeTeam}
			grayscaled={selectedTeam === awayTeam.abbreviation && selectedTeam !== ''}
		/>
	</label>
	<!-- </div> -->
</div>

<style lang="scss">
    *{
        @include defaultTransition;
    }
	input {
		visibility: hidden;
		height: 0;
		width: 0;
		display: none;
	}
	.grid {
		@include gridAndGap;
		justify-items: center;
	}
    .rounded{
        @include rounded;
    }
	.matchup {
		grid-template-columns: repeat(3, minmax(30%, 1fr));
	}
	label {
        @include defaultTransition;
        padding:0.5rem;
		height: 100%;
		width: 100%;
	}
	.selected {
        @include normalShadow;
		font-weight: bold;
		// text-decoration: underline 2px;
        color: var(--alternate-color);
        text-shadow: none;
        background-color: rgba(var(--accentValue-color),100%);
	}
	.pressed {
		// box-shadow: inset 2px var(--accent-color);
	}
    span{
        padding: 0.3rem 0.5rem ;
    }
</style>
