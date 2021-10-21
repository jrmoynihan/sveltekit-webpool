import type { DocumentReference, Timestamp } from 'firebase/firestore';
import type { Team } from './team';

export class Game {
	docRef: DocumentReference;
	$ref: string;
	competitions: Record<string, unknown>[];
	date: string;
	id: string;
	// league: { $ref: string };
	// links: Record<string, unknown>[];
	loser: string;
	name: string;
	season: { $ref: string };
	seasonType: { $ref: string };
	shortName: string;
	spread: number;
	// timeValid: boolean;
	timestamp: Timestamp;
	// uid: string;
	// venues: Record<string, unknown>[];
	year: number;
	week: number;
	type: string;
	homeTeam: Team;
	awayTeam: Team;
	winner: string;
	ATSwinner: string;
	totalScore: number;
	isLastGameOfWeek: boolean;

	constructor({ ...args }) {
		this.docRef = args.docRef;
		this.$ref = args.$ref;
		this.competitions = args.competitions;
		this.date = args.date;
		this.id = args.id;
		this.name = args.name;
		this.season = args.season;
		this.seasonType = args.seasonType;
		this.shortName = args.shortName;
		this.spread = args.spread;
		this.timestamp = args.timestamp;
		this.year = args.year;
		this.week = args.week;
		this.type = args.type;
		this.homeTeam = args.homeTeam;
		this.awayTeam = args.awayTeam;
		this.winner = args.winner || '';
		this.loser = args.loser || '';
		this.ATSwinner = args.ATSwinner || '';
		this.totalScore = args.totalScore || null;
		this.isLastGameOfWeek = args.isLastGameOfWeek || false;
		// this.uid = args.uid;
		// this.venues = args.venues;
		// this.timeValid = args.timeValid;
		// this.league = args.league;
		// this.links = args.links;
	}
}
export class ESPNGame {
	$ref: string;
	id: string;
	uid: string;
	date: string;
	name: string;
	shortName: string;
	season: RefOnlyESPN;
	seasonType: RefOnlyESPN;
	week: RefOnlyESPN;
	timeValid: boolean;
	competitions: [
		{
			$ref: string;
			id: string;
			guid: string;
			uid: string;
			date: string;
			attendance: number;
			type: {
				abbreviation: string;
				id: string;
				slug: string;
				text: string;
				type: string;
			};
			necessary: boolean;
			timeValid: boolean;
			neutralSite: boolean;
			divisionCompetition: boolean;
			conferenceCompetiton: boolean;
			previewAvailable: boolean;
			recapAvailable: boolean;
			boxscoreAvailable: boolean;
			lineupAvailable: boolean;
			gamecastAvailable: boolean;
			playByPlayAvailable: boolean;
			conversationAvailable: boolean;
			commentaryAvailable: boolean;
			pickcenterAvailable: boolean;
			summaryAvailable: boolean;
			liveAvailable: boolean;
			ticketsAvailable: boolean;
			shotChartAvailable: boolean;
			timeoutsAvailable: boolean;
			possessionArrowAvailable: boolean;
			onWatchESPN: boolean;
			recent: boolean;
			bracketAvailable: boolean;
			gameSource: SourceESPN;
			boxscoreSource: SourceESPN;
			playByPlaySource: SourceESPN;
			linescoreSource: SourceESPN;
			statsSource: SourceESPN;
			venue: {
				$ref: string;
				address: AddressESPN;
				capacity: number;
				fullName: string;
				grass: boolean;
				id: string;
				images: VenueImageESPN[];
				indoor: boolean;
			};
			competitors: CompetitorESPN[];
			notes: [];
			situation: RefOnlyESPN;
			status: RefOnlyESPN;
			odds: RefOnlyESPN;
			broadcasts: RefOnlyESPN;
			officials: RefOnlyESPN;
			details: RefOnlyESPN;
			leaders: RefOnlyESPN;
			links: LinkESPN[];
			predictor: RefOnlyESPN;
			probabilities: RefOnlyESPN;
			powerIndexes: RefOnlyESPN;
			format: {
				overtime: GameClockFormatESPN;
				regulation: GameClockFormatESPN;
			};
			drives: RefOnlyESPN;
		}
	];
}
export class CompetitorESPN {
	$ref: string;
	homeAway: string;
	id: string;
	leaders: RefOnlyESPN;
	linescores: RefOnlyESPN;
	nextCompetition: {
		$ref: string;
		order: number;
	};
	previousCompetition: RefOnlyESPN;
	record: RefOnlyESPN;
	roster: RefOnlyESPN;
	score: RefOnlyESPN;
	statistics: RefOnlyESPN;
	team: RefOnlyESPN;
	type: string;
	uid: string;
	winner: boolean;
}
export class RefOnlyESPN {
	$ref: string;
}
export class GameClockFormatESPN {
	clock: number;
	displayName: string;
	periods: number;
	slug: string;
}
export class SourceESPN {
	description: string;
	id: string;
	state: string;
}
export class LinkESPN {
	href: string;
	isExternal: boolean;
	isPremium: boolean;
	language: string;
	rel: string[];
	shortText: string;
	text: string;
}
export class AddressESPN {
	city: string;
	state: string;
	zipCode: string;
}
export class VenueImageESPN {
	alt: string;
	height: number;
	href: string;
	rel: string[];
	width: number;
}
export interface ESPNGamePruned {
	$ref: string;
	id: string;
	// uid: string;
	date: string;
	name: string;
	shortName: string;
	season: RefOnlyESPN;
	seasonType: RefOnlyESPN;
	week: RefOnlyESPN;
	// timeValid: boolean;
	competitions: [
		{
			$ref: string;
			id: string;
			// guid: string;
			// uid: string;
			date: string;
			// attendance: number;
			// type: {
			// 	abbreviation: string;
			// 	id: string;
			// 	slug: string;
			// 	text: string;
			// 	type: string;
			// };
			// necessary: boolean;
			// timeValid: boolean;
			// neutralSite: boolean;
			// divisionCompetition: boolean;
			// conferenceCompetiton: boolean;
			// previewAvailable: boolean;
			// recapAvailable: boolean;
			// boxscoreAvailable: boolean;
			// lineupAvailable: boolean;
			// gamecastAvailable: boolean;
			// playByPlayAvailable: boolean;
			// conversationAvailable: boolean;
			// commentaryAvailable: boolean;
			// pickcenterAvailable: boolean;
			// summaryAvailable: boolean;
			// liveAvailable: boolean;
			// ticketsAvailable: boolean;
			// shotChartAvailable: boolean;
			// timeoutsAvailable: boolean;
			// possessionArrowAvailable: boolean;
			// onWatchESPN: boolean;
			// recent: boolean;
			// bracketAvailable: boolean;
			// gameSource: SourceESPN;
			// boxscoreSource: SourceESPN;
			// playByPlaySource: SourceESPN;
			// linescoreSource: SourceESPN;
			// statsSource: SourceESPN;
			// venue: {
			// 	$ref: string;
			// 	address: AddressESPN;
			// 	capacity: number;
			// 	fullName: string;
			// 	grass: boolean;
			// 	id: string;
			// 	images: VenueImageESPN[];
			// 	indoor: boolean;
			// };
			competitors: CompetitorESPN[];
			// notes: [];
			situation: RefOnlyESPN;
			status: RefOnlyESPN;
			odds: RefOnlyESPN;
			// broadcasts: RefOnlyESPN;
			// officials: RefOnlyESPN;
			details: RefOnlyESPN;
			leaders: RefOnlyESPN;
			// links: LinkESPN[];
			predictor: RefOnlyESPN;
			probabilities: RefOnlyESPN;
			// powerIndexes: RefOnlyESPN;
			// format: {
			// 	overtime: GameClockFormatESPN;
			// 	regulation: GameClockFormatESPN;
			// };
			// drives: RefOnlyESPN;
		}
	];
}
