<script lang="ts">
	import AccordionDetails3 from '$lib/components/containers/accordions/AccordionDetails.svelte';
	import MultiToggleSwitch from '$lib/components/switches/MultiToggleSwitch.svelte';
	import DriveChart from '$lib/images/DriveChart.svelte';
	import type { CompetitorESPN, ESPNGame, ESPNTeamData, Game } from '$scripts/classes/game';
	import { scheduleCollection } from '$scripts/collections';
	import { gameConverter, } from '$scripts/converters';
	import { fetchHttpsToJson } from '$scripts/dataFetching';
	import { preferred_score_view } from '$scripts/store';
	import type { ScoreViewPreference } from '$scripts/types/types';
	import {
		faCalculator,
		faCheckDouble,
		faFootballBall,
		type IconDefinition
	} from '@fortawesome/free-solid-svg-icons';
	import { getDocs, query, where } from '@firebase/firestore';

	let open = false;
	let other_items = [
		{ label: 'One', value: 1 },
		{ label: 'Two', value: 2 },
		{ label: 'Three', value: 3 },
		{ label: 'Four', value: 4 }
	];
	let view_preferences: { label: string; value: ScoreViewPreference; icon?: IconDefinition }[] = [
		{ label: 'Actual Scores Only', value: 'Actual', icon: faFootballBall },
		{ label: 'ATS Only', value: 'ATS', icon: faCalculator },
		{ label: 'Both', value: 'Both', icon: faCheckDouble }
	];
	let q = query(scheduleCollection.withConverter(gameConverter), where('id', '==', '401326493'));
	const getGame = async (): Promise<Game> => {
		const doc = await getDocs(q.withConverter(gameConverter));
		return doc.docs[0].data();
	};
	const getESPNGameData = async (game: Game) => {
		const data: ESPNGame = await fetchHttpsToJson(game.$ref);
		const home_team: CompetitorESPN = data.competitions[0].competitors[0];
		const away_team: CompetitorESPN = data.competitions[0].competitors[1];
		const drives_ref: string = data.competitions[0].drives.$ref;
		return { home_team, away_team, drives_ref, data };
	};
	const getTeamColors = async (competitor: CompetitorESPN) => {
		const data: ESPNTeamData = await fetchHttpsToJson(competitor.team.$ref);
		const color = data.color;
		const altColor = data.alternateColor;
		return { color, altColor };
	};

	const getData = async () => {
		const game: Game = await getGame();
		const { away_team, home_team } = game;
		const ESPN_game_data = await getESPNGameData(game);
		const home_competitor: CompetitorESPN = ESPN_game_data.home_team;
		const away_competitor: CompetitorESPN = ESPN_game_data.away_team;
		const drives_ref: string = ESPN_game_data.drives_ref;
		const home_colors: { color: string; altColor: string } = await getTeamColors(home_competitor);
		const away_colors: { color: string; altColor: string } = await getTeamColors(away_competitor);
		return { game, away_team, home_team, home_colors, away_colors, drives_ref, game_data: ESPN_game_data.data };
	};
</script>

<MultiToggleSwitch
	items={other_items}
	selected_item={other_items[1]}
	title_text="This is the Title"
/>

<MultiToggleSwitch
	items={view_preferences}
	title_text="all true"
	selected_item={view_preferences[0]}
	show_icon={false}
	bind:selected_value={$preferred_score_view}
/>
{#await getData()}
	Loading game...
{:then { game, away_team, home_team, home_colors, away_colors, drives_ref, game_data }}
	<DriveChart {away_team} {home_team} {home_colors} {away_colors} {game} {drives_ref} {game_data} />
{/await}

<AccordionDetails3 bind:open>
	<div slot="summary">
		<h2>Open: {open}</h2>
	</div>
	<div slot="content">
		<p>Content</p>
	</div>
</AccordionDetails3>
