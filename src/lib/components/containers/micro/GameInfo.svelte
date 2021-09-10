<script lang="ts">
	import type { Team } from '$scripts/classes/team';
	import { showIDs } from '$scripts/store';
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
	import DateTimeOrDownDistance from './DateTimeOrDownDistance.svelte';
	import GameTime from './GameTime.svelte';
	import ScoresAts from './ScoresATS.svelte';
	import SpreadOrPossession from './SpreadOrPossession.svelte';
	import StatusInfo from './StatusInfo.svelte';
	import WinLossAt from './WinLossAt.svelte';

	export let promiseStatus: Promise<any>;
	export let promiseScores: Promise<any>;
	export let promiseSituation: Promise<any>;
	export let selectedTeam: string = '';
	export let homeTeam: Team;
	export let awayTeam: Team;
	export let spread: number;
	export let disabled: boolean = false;
	export let id: string = '';
	export let timestamp: Timestamp;
</script>

<label class="game-info rounded" for="{id}-none">
	<WinLossAt {promiseScores} {promiseStatus} {homeTeam} {awayTeam} {selectedTeam} {spread} />
	<StatusInfo {promiseStatus} {promiseScores} />
	<ScoresAts {promiseStatus} {promiseScores} {spread} />
	<SpreadOrPossession {spread} {disabled} {awayTeam} {homeTeam} {promiseSituation} />
	<DateTimeOrDownDistance {timestamp} {promiseStatus} {promiseSituation} />
	{#if $showIDs}
		<div>{id}</div>
	{/if}
	<input id="{id}-none" type="radio" bind:group={selectedTeam} value="" {disabled} />
</label>

<style lang="scss">
	.game-info {
		display: grid;
		align-items: end;
		grid-template-columns: repeat(auto, minmax(0, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
		grid-template-areas:
			'WinLossAt'
			'statusInfo'
			'scoresATS'
			'spreadOrPossession'
			'dateTimeOrDownDistance';
	}
	input {
		visibility: hidden;
		height: 0;
		width: 0;
		display: none;
	}
	// .grid {
	// 	@include gridAndGap;
	// 	justify-items: center;
	// }
	// span {
	// 	padding: 0.3rem 0.5rem;
	// 	align-self: center;
	// }
	// .status {
	// 	grid-template-columns: minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr);
	// }
	// .score {
	// 	font-weight: bold;
	// 	font-size: clamp(1rem, 5vw, 3rem);
	// 	min-width: 2ch;
	// }
	// .info {
	// 	width: auto;
	// 	justify-self: center;
	// }
	// .dayShadow:hover {
	// 	@include nightShadow;
	// }
	// .nightShadow:focus {
	// 	@include nightShadow;
	// }
</style>
