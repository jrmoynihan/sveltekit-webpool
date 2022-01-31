<script lang="ts">
	import Grid from '$lib/components/containers/Grid.svelte';
	import type { ESPNDrive, ESPNGame, ESPNSituation, Game } from '$scripts/classes/game';
	import type { Team } from '$scripts/classes/team';
	import {
		convertToHttps,
		getMostRecentDrive,
		getSituation,
		getTeamWithPossession
	} from '$scripts/dataFetching';
	import { onDestroy, onMount } from 'svelte';
	import { draw } from 'svelte/transition';

	export let awayTeam: Team;
	export let homeTeam: Team;
	export let game: Game;
	export let homeColors: { color: string; altColor: string };
	export let awayColors: { color: string; altColor: string };
	export let drivesRef: string;
	export let gameData: ESPNGame;
	export let teamTextColor = 'var(--text)';

	let awayTeamColor: string = awayColors.color;
	let homeTeamColor: string = homeColors.color;
	let possessionTeamImageUrl = '';
	let refreshGameDataInterval: NodeJS.Timer;
	let svgWidth = 595;

	const getData = async () => {
		const situation: ESPNSituation = await getSituation(gameData.competitions);
		const teamWithPossession = situation.team
			? await getTeamWithPossession(situation.team.$ref)
			: null;
		const lastDrive: ESPNDrive = await getMostRecentDrive(drivesRef);
		const isScore = lastDrive.isScore;
		const driveResult = lastDrive.result;
		const lastPlayNumber = lastDrive.plays.items.length - 1;
		const lastPlay = lastDrive?.plays.items[lastPlayNumber];
		if (teamWithPossession) {
			possessionTeamImageUrl =
				teamWithPossession === awayTeam.abbreviation
					? awayTeam.logoPath
					: teamWithPossession === homeTeam.abbreviation
					? homeTeam.logoPath
					: '';
		} else {
			possessionTeamImageUrl = awayTeam.logoPath;
		}
		return {
			situation,
			teamWithPossession,
			lastDrive,
			lastPlay,
			isScore,
			driveResult,
			lastPlayNumber
		};
	};
	onMount(() => {
		refreshGameDataInterval = setInterval(async () => {
			getData();
		}, 20000);
	});
	onDestroy(() => {
		clearInterval(refreshGameDataInterval);
	});
</script>

<Grid customStyles={'justify-items:center'} customGridColumns={'grid-template-columns: 1fr'}>
	<input type="range" bind:value={svgWidth} min={100} max={1000} />
	{#await convertToHttps(game.$ref)}
		Getting game link...
	{:then ref}
		<a href={ref}>Game Link</a>
	{/await}
	{#await getData() then { situation, teamWithPossession, lastDrive, lastPlay, isScore, driveResult, lastPlayNumber }}
		<svg
			id="drivechart"
			class="desktop-tablet-only"
			height="110"
			version="1.1"
			width={svgWidth}
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			style="overflow: hidden; position: relative; left: -0.65625px;"
			viewBox="0 -40 595 110"
			preserveAspectRatio="xMinYMin"
		>
			<path
				class="field-bottom"
				fill="#356732"
				stroke="#000000"
				d="M493.1,35L444.1,35L394.4,35L345.7,35L298.5,35L296.6,35L248.1,35L199.3,35L149.7,35L100.7,35L80.9,35L51.6,35L51,35L51,38L542,38L542,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-bottom"
				fill="#2a443b"
				stroke="#000000"
				d="M7.1,35L7,35L7,38L51,38L51,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-bottom"
				fill="#2a443b"
				stroke="#000000"
				d="M542,35L542,38L589,38L589,35L542.2,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#356732"
				stroke="#000000"
				d="M300,35L298.4,5L296.7,5L296.6,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#356732"
				stroke="#000000"
				d="M298.5,35L298.4,5L296.7,5L296.6,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#356732"
				stroke="#000000"
				d="M298.5,35L298.4,5L296.7,5L296.6,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M296.6,35L296.7,5L254.5,5L248.1,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M345.7,35L339.3,5L298.4,5L298.5,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				id="field-top-1"
				class="field-top"
				fill="#359f47"
				stroke="#000000"
				d="M248.1,35L254.5,5L212.1,5L199.3,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#359f47"
				stroke="#000000"
				d="M394.4,35L381.7,5L339.3,5L345.7,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M444.1,35L424.8,5L381.7,5L394.4,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M199.3,35L212.1,5L169,5L149.7,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#359f47"
				stroke="#000000"
				d="M149.7,35L169,5L126.4,5L100.7,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#359f47"
				stroke="#000000"
				d="M493.1,35L467.4,5L424.8,5L444.1,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M542,35L542.2,35L510.1,5L467.4,5L493.1,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#39b54a"
				stroke="#000000"
				d="M119,5L83.7,5L51.6,35L80.9,35L100.7,35L126.4,5Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#ffffff"
				stroke="#000000"
				d="M551.3,5L510.1,5L542.2,35L589,35L589.5,35Z"
				opacity="0.1"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0.1; stroke-opacity: 1;"
			/>
			<path
				class="field-top field-home"
				fill="#{homeTeamColor}"
				stroke="#000000"
				d="M551.3,5L510.1,5L542.2,35L589,35L589.5,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="field-top"
				fill="#ffffff"
				stroke="#000000"
				d="M51.6,35L83.7,5L45.3,5L7.1,35L51,35Z"
				opacity="0.1"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); opacity: 0.1; stroke-opacity: 1;"
			/>
			<path
				class="field-top field-away"
				fill="#{awayTeamColor}"
				stroke="#000000"
				d="M51.6,35L83.7,5L45.3,5L7.1,35L51,35Z"
				stroke-width="0"
				stroke-opacity="1"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<defs style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" />

			<text
				class="field-text-team"
				x="40"
				y="55"
				text-anchor="start"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill={teamTextColor}
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: start; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
					>{awayTeam?.abbreviation ? awayTeam.abbreviation : 'away'}</tspan
				>
			</text>
			<text
				class="field-text-team"
				x="550"
				y="55"
				text-anchor="end"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill={teamTextColor}
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: end; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);"
					>{homeTeam?.abbreviation ? homeTeam.abbreviation : 'home'}</tspan
				>
			</text>
			<text
				class="field-number"
				x="198"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan>
			</text>
			<text
				class="field-number"
				x="246"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">40</tspan>
			</text>
			<text
				class="field-number"
				x="297"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">50</tspan>
			</text>
			<text
				class="field-number"
				x="347"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">40</tspan>
			</text>
			<text
				class="field-number"
				x="395"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">30</tspan>
			</text>
			<text
				class="red-zone-left"
				x="100"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">10</tspan>
			</text>
			<text
				class="red-zone-left"
				x="148"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">20</tspan>
			</text>
			<text
				class="red-zone-right"
				x="445"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">20</tspan>
			</text>
			<text
				class="red-zone-right"
				x="494"
				y="55"
				text-anchor="middle"
				font-family="BentonSans, Arial, Helvetica, sans-serif"
				font-size="10px"
				stroke="none"
				fill="#888888"
				style="text-anchor: middle; font-family: BentonSans, Arial, Helvetica, sans-serif; font-size: 10px;"
			>
				<tspan dy="3.5" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">10</tspan>
			</text>

			<path
				class="goal-post-left"
				fill="none"
				stroke="#faed24"
				d="M16.8,38.2H13.600000000000001C8.400000000000002,38.2,5.800000000000002,40,5.800000000000002,45.800000000000004V46.400000000000006"
				stroke-width="2"
				stroke-linecap="square"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: square; stroke-linejoin: round; stroke-miterlimit: 10; stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="none"
				stroke="#f8ed40"
				d="M17.8,37.7H13.200000000000001C8,37.7,5.400000000000001,40.5,5.400000000000001,46.300000000000004V47.50000000000001"
				stroke-miterlimit="10"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-miterlimit: 10; stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="#f8ed40"
				stroke="#000000"
				d="M21.2,35.9L22.2,35.9L22.2,3.3L21.2,2.6Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<rect
				class="goal-post-left"
				x="11.1"
				y="6.9"
				width="1.1"
				height="34.8"
				rx="0"
				ry="0"
				fill="#faed24"
				stroke="#000"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="#f8ed40"
				stroke="#000000"
				d="M10.2,41.7C10.2,41.7,10.2,42.1,10.5,42.400000000000006S11.2,42.60000000000001,11.2,42.60000000000001V7.4L10.2,6.6000000000000005V41.7Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="#818181"
				stroke="#000000"
				d="M6.7,56.4L8.6,55.2L8.6,46.8L6.7,48Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<rect
				class="goal-post-left"
				x="3"
				y="48"
				width="3.7"
				height="8.4"
				rx="0"
				ry="0"
				fill="#182e57"
				stroke="#000"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="#989898"
				stroke="#000000"
				d="M4.9,46.8L8.6,46.8L6.7,48L3,48Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-left"
				fill="#f8ed40"
				stroke="#000000"
				d="M12,41L22.3,35.9L21.2,35.5L11,40.6Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,12,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>

			<path
				class="goal-post-right"
				fill="none"
				stroke="#faed24"
				d="M646.5,38.2H649.7C654.9000000000001,38.2,657.5,40,657.5,45.800000000000004V46.400000000000006"
				stroke-width="2"
				stroke-linecap="square"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-linecap: square; stroke-linejoin: round; stroke-miterlimit: 10; stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="none"
				stroke="#f8ed40"
				d="M645.5,37.7H650.1C655.3000000000001,37.7,657.9,40.5,657.9,46.300000000000004V47.50000000000001"
				stroke-miterlimit="10"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-miterlimit: 10; stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="#f8ed40"
				stroke="#000000"
				d="M642,35.9L641,35.9L641,3.3L642,2.6Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<rect
				class="goal-post-right"
				x="651.1"
				y="6.9"
				width="1.1"
				height="34.8"
				rx="0"
				ry="0"
				fill="#faed24"
				stroke="#000"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="#f8ed40"
				stroke="#000000"
				d="M653,41.7C653,41.7,653,42.1,652.7,42.400000000000006S652,42.60000000000001,652,42.60000000000001V7.4L653,6.6000000000000005V41.7Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="#818181"
				stroke="#000000"
				d="M656.5,56.4L654.7,55.2L654.7,46.8L656.5,48Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<rect
				class="goal-post-right"
				x="656.5"
				y="48"
				width="3.7"
				height="8.4"
				rx="0"
				ry="0"
				fill="#2a443b"
				stroke="#000"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="#989898"
				stroke="#000000"
				d="M658.4,46.8L654.7,46.8L656.5,48L660.2,48Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<path
				class="goal-post-right"
				fill="#f8ed40"
				stroke="#000000"
				d="M651.2,41L641,35.9L642,35.5L652.3,40.6Z"
				stroke-width="0"
				stroke-opacity="1"
				transform="matrix(1,0,0,1,-79,-34)"
				style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-opacity: 1;"
			/>
			<desc>Created with Snap https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d </desc>
			{#key lastPlayNumber}
				<path
					transition:draw
					d="M 102.645 20 A 3.5,3.5,0,0,1,99.145,23.5 A 3.5,3.5,0,0,1,95.645,20 A 3.5,3.5,0,0,1,99.145,16.5 A 3.5,3.5,0,0,1,102.645,20 Z"
					style="opacity: 1;"
					fill="#ffffff"
					stroke="none"
					class="gp-path play-cap"
				/>
				<circle cx="70" cy="20" r="3.5" fill="red" />
				<path
					transition:draw
					d="M 99.145,20 L 488.8699999999999,20"
					style="stroke-width: 2px;"
					stroke="#ffffff"
					class="gp-path current-drive-line"
				/>
				<path
					transition:draw
					d="M 488.8699999999999,20"
					style="opacity: 0;"
					fill="#ffffff"
					stroke="none"
					class="gp-path play-cap play-cap-4013264621694 play-4013264621694"
				/>
			{/key}
			<path
				d="M 488.8699999999999,20 C 523.2574999999999,-37.5 592.0325,-37.5,626.4200000000001,20"
				style="opacity: 1; stroke-width: 2px; fill-opacity: 0; stroke-dasharray: 169.961px; stroke-dashoffset: 79.3149px; transition: stroke-dashoffset 1.2s ease-in-out 0s;"
				class="gp-path play-segment play-segment-4013264621715 play-4013264621715"
				stroke="#007b1d"
				clip-path="url(#curve-mask-0)"
			/><path
				d="M 492.3699999999999 20 A 3.5,3.5,0,0,1,488.8699999999999,23.5 A 3.5,3.5,0,0,1,485.3699999999999,20 A 3.5,3.5,0,0,1,488.8699999999999,16.5 A 3.5,3.5,0,0,1,492.3699999999999,20 Z"
				style="opacity: 1;"
				fill="#1a1a1a"
				stroke="none"
				class="gp-path play-cap play-cap-4013264621715 play-4013264621715"
			/><path
				d="M 579.912830255003,-19.484985321760178"
				style="opacity: 0;"
				fill="#1a1a1a"
				stroke="none"
				class="gp-path play-cap play-cap-4013264621715 play-4013264621715"
			/><path
				d="M46,24.3c0,12.2-22,33-22,33S2,36.4,2,24.3s9.8-22,22-22S46,12.1,46,24.3z"
				style="fill-opacity: 0.35;"
				fill="#cccccc"
				stroke="none"
				transform="matrix(1,0,0,1,464.87,-37.25)"
			/><g transform="matrix(1,0,0,1,464.87,-37.25)"
				><image
					xlink:href={possessionTeamImageUrl}
					preserveAspectRatio="true"
					x="5.5"
					y="5"
					width="35"
					height="35"
				/></g
			><path
				d="M23.1,53.8l4.2,3.5l-4.2,3.5V53.8z M23.5,58.3h-3.4v-2h3.4V58.3z"
				class="gp-arrow"
				style=""
				fill="#000000"
				stroke="none"
				transform="matrix(1,0,0,1,462.87,-37.25)"
			/><clipPath id="curve-mask-0" class="gp-path clip-segment"
				><circle cx="488.87314836572875" cy="19.99473587842658" r="1.5" /><circle
					cx="493.2157649642921"
					cy="13.29235851764679"
					r="1.5"
				/><circle cx="498.0612589409576" cy="6.922435648739338" r="1.5" /><circle
					cx="503.3964937042015"
					cy="0.9751410782337189"
					r="1.5"
				/><circle cx="509.23468858634754" cy="-4.497296214103699" r="1.5" /><circle
					cx="515.5520263989869"
					cy="-9.408820122480392"
					r="1.5"
				/><circle cx="522.3149092185515" cy="-13.67888044565916" r="1.5" /><circle
					cx="529.4802670580101"
					cy="-17.233024090528488"
					r="1.5"
				/><circle cx="536.977626929033" cy="-19.9977670237422" r="1.5" /><circle
					cx="544.745821577598"
					cy="-21.918880455195904"
					r="1.5"
				/><circle cx="552.6604426954453" cy="-22.945849895477295" r="1.5" /><circle
					cx="560.6668264535069"
					cy="-23.05919647216797"
					r="1.5"
				/><circle cx="568.6140955482638" cy="-22.254326790571213" r="1.5" /><circle
					cx="576.4280308631962"
					cy="-20.549406222999096"
					r="1.5"
				/><circle cx="584.0012409646907" cy="-17.985651940107346" r="1.5" /><circle
					cx="591.2522776043978"
					cy="-14.619994275271893"
					r="1.5"
				/><circle cx="598.1259950906081" cy="-10.5137924477458" r="1.5" /><circle
					cx="604.5428779366994"
					cy="-5.7621197029948235"
					r="1.5"
				/><circle cx="610.5009139465652" cy="-0.4207676649093628" r="1.5" /><circle
					cx="615.9721161684736"
					cy="5.429847128689289"
					r="1.5"
				/><circle cx="620.9242566940188" cy="11.685066223144531" r="1.5" /><circle
					cx="625.402779419981"
					cy="18.331880569458008"
					r="1.5"
				/></clipPath
			></svg
		>
		{#if lastPlay.text !== 'END GAME'}
			{#if lastDrive}
				<p>{lastDrive.description}</p>
			{/if}
			{#if situation}
				<p>{situation.downDistanceText}</p>
			{/if}
		{/if}
		{#if lastPlay}
			<p>{lastPlay.text}</p>
		{/if}
	{/await}
</Grid>

<style lang="scss">
</style>
