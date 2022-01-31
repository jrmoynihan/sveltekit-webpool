<script script lang="ts">
	import AccordionDetailsv2 from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import MultiToggleSwitch from '$lib/components/switches/MultiToggleSwitch.svelte';
	import DriveChart from '$lib/images/DriveChart.svelte';
	import type { CompetitorESPN, ESPNGame, ESPNTeamData, Game } from '$scripts/classes/game';
	import { scheduleCollection } from '$scripts/collections';
	import { gameConverter } from '$scripts/converters';
	import { fetchHttpsToJson } from '$scripts/dataFetching';
	import { preferredScoreView } from '$scripts/store';
	import type { ScoreViewPreference } from '$scripts/types/types';
	import {
		faCalculator,
		faCheckDouble,
		faFootballBall,
		IconDefinition
	} from '@fortawesome/free-solid-svg-icons';
	import { getDocs, query, where } from 'firebase/firestore';

	let open = false;
	let isExpanding = false;
	let isCollapsing = false;

	let myItems = [
		{ label: 'Alpha', value: 1 },
		{ label: 'Beta', value: 'second' },
		{ label: 'Delta', value: { stuff: 'thingy' } }
	];
	let otherItems = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 },
		{ label: 'Four', value: 4 }
	];
	let viewPreferences: { label: string; value: ScoreViewPreference; icon?: IconDefinition }[] = [
		{ label: 'Actual Scores Only', value: 'Actual', icon: faFootballBall },
		{ label: 'ATS Only', value: 'ATS', icon: faCalculator },
		{ label: 'Both', value: 'Both', icon: faCheckDouble }
	];
	let q = query(scheduleCollection.withConverter(gameConverter), where('id', '==', '401326493'));
	const getGame = async (): Promise<Game> => {
		const doc = await getDocs(q);
		return doc.docs[0].data();
	};
	const getESPNGameData = async (game: Game) => {
		const data: ESPNGame = await fetchHttpsToJson(game.$ref);
		const homeTeam: CompetitorESPN = data.competitions[0].competitors[0];
		const awayTeam: CompetitorESPN = data.competitions[0].competitors[1];
		const drivesRef: string = data.competitions[0].drives.$ref;
		return { homeTeam, awayTeam, drivesRef, data };
	};
	const getTeamColors = async (competitor: CompetitorESPN) => {
		const data: ESPNTeamData = await fetchHttpsToJson(competitor.team.$ref);
		const color = data.color;
		const altColor = data.alternateColor;
		return { color, altColor };
	};

	const getData = async () => {
		const game: Game = await getGame();
		const { awayTeam, homeTeam } = game;
		const gameData = await getESPNGameData(game);
		const homeCompetitor: CompetitorESPN = gameData.homeTeam;
		const awayCompetitor: CompetitorESPN = gameData.awayTeam;
		const drivesRef: string = gameData.drivesRef;
		const homeColors: { color: string; altColor: string } = await getTeamColors(homeCompetitor);
		const awayColors: { color: string; altColor: string } = await getTeamColors(awayCompetitor);
		return { game, awayTeam, homeTeam, homeColors, awayColors, drivesRef, gameData: gameData.data };
	};
	let portal: HTMLElement;
	function activatePortal() {
		portal.activate();
	}
	if(browser && portal){
		window.addEventListener('portalactivate',(evt) => {
			const predecessor = evt.adoptPredecessor();
		}
		)
	}
</script>

<MultiToggleSwitch items={otherItems} selectedItem={otherItems[1]} titleText="This is the Title" />

<!-- <MultiToggleSwitch items={viewPreferences} adminOnly={true} titleText="Admin Options" /> -->
<MultiToggleSwitch
	items={viewPreferences}
	titleText="all true"
	selectedItem={viewPreferences[0]}
	showIcon={false}
	bind:selectedValue={$preferredScoreView}
/>
{#await getData()}
	Loading game...
{:then { game, awayTeam, homeTeam, homeColors, awayColors, drivesRef, gameData }}
	<DriveChart {awayTeam} {homeTeam} {homeColors} {awayColors} {game} {drivesRef} {gameData} />
{/await}

<AccordionDetailsv2 bind:open bind:isExpanding bind:isCollapsing>
	<div slot="summary">
		<h2>Open: {open} isExpanding: {isExpanding} isCollapsing: {isCollapsing}</h2>
	</div>
	<div slot="content">
		<p>Content</p>
	</div>
</AccordionDetailsv2>

<portal
	bind:this={portal}
	id="example"
	title="test"
	src="https://www.youtube.com/embed/95WCap877oM"
	style="width: 100%; height: 100%;"
	on:click={activatePortal}
/>

<style lang="scss">
	portal {
		position: fixed;
		width: 80%;
		height: 80%;
		opacity: 0;
		box-shadow: 0 0 20px 10px #999;
		transform: scale(0.4);
		transform-origin: bottom left;
		bottom: 20px;
		left: 20px;
		animation-name: fade-in;
		animation-duration: 1s;
		animation-delay: 2s;
		animation-fill-mode: forwards;
		transition: transform 0.4s;
		// transform: scale(1.0) translateX(-20px) translateY(20px);
	}
	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
