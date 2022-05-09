import type { DocumentReference, Timestamp } from '@firebase/firestore';
import type { Team } from './team';

export class Game {
	docRef: DocumentReference;
	$ref: string;
	competitions: PrunedCompetition[];
	date: string;
	id: string;
	loser: string;
	name: string;
	season: { $ref: string };
	seasonType: { $ref: string };
	shortName: string;
	spread: number;
	timestamp: Timestamp;
	year: number;
	week: number;
	type: string;
	homeTeam: Team;
	awayTeam: Team;
	winner: string;
	ATSwinner: string;
	totalScore: number;
	isLastGameOfWeek: boolean;
	isBeforeGameTime?: boolean;

	constructor({ ...args }) {
		// this.docRef = args.docRef;
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
		this.isBeforeGameTime = args.isBeforeGameTime || false;
	}
}
export interface ESPNCompetition {
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
	venue: ESPNVenue;
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
export interface ESPNVenue {
	$ref: string;
	address: AddressESPN;
	capacity: number;
	fullName: string;
	grass: boolean;
	id: string;
	images: VenueImageESPN[];
	indoor: boolean;
}

export interface ESPNGame {
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
	competitions: ESPNCompetition[];
}
export interface CompetitorESPN {
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
export interface RefOnlyESPN {
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
	competitions: PrunedCompetition[];
}
export interface PrunedCompetition {
	$ref: string;
	competitors: CompetitorESPN[];
	date: string;
	details: RefOnlyESPN;
	id: string;
	leaders: RefOnlyESPN;
	odds: RefOnlyESPN;
	predictor: RefOnlyESPN;
	probabilities: RefOnlyESPN;
	situation: RefOnlyESPN;
	status: RefOnlyESPN;
}
export interface ESPNSituation {
	$ref: string;
	lastPlay: RefOnlyESPN;
	down: number;
	team: RefOnlyESPN;
	yardLine: number;
	distance: number;
	downDistanceText: string;
	shortDownDistanceText: string;
	possessionText: string;
	isRedZone: boolean;
	homeTimeouts: number;
	awayTimeouts: number;
}
export interface ESPNStatus {
	$ref: string;
	clock: number;
	displayClock: string;
	period: number;
	type: {
		id: string;
		name: string;
		state: string;
		completed: boolean;
		description: string;
		detail: string;
		shortDetail: string;
	};
}
export interface ESPNScore {
	$ref: string;
	value: number;
	displayValue: string;
	source: {
		id: string;
		description: string;
	};
	winner?: boolean;
}
export interface ESPNRecord {
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	items: ESPNRecordItem[];
}
export interface ESPNRecordItem {
	$ref: string;
	id: string;
	name: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	description: string;
	type: string;
	summary: string;
	displayValue: string;
	value: number;
	// Stats Array:
	// [0] playoff seed; [1] wins, [2] losses, [3] win percent, [4] games behind, [5] ties, [6] OT wins, [7] OT losses,
	// [8] games played, [9] points For, [10] points Against, [11] avg points For, [12] avg points against, [13] total points, [14] point differential,
	//  [15] streak, [16] division win percentage, [17] league win percentage, [18] division record, [19] division wins, [20] division ties, [21] division losses,
	stats: ESPNRecordStats[];
}
export interface ESPNRecordStats {
	name: string;
	displayName: string;
	shortDisplayName: string;
	description: string;
	abbreviation: string;
	type: string;
	value: number;
	displayValue: string;
}

//** Example: http://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2021/teams/2?lang=en&region=us */
export interface ESPNTeamData {
	$ref: string;
	id: string;
	guid: string;
	uid: string;
	alternateIds: {
		sdr: string;
	};
	slug: string;
	location: string;
	name: string;
	nickname: string;
	abbreviation: string;
	displayName: string;
	shortDisplayName: string;
	color: string;
	alternateColor: string;
	isActive: boolean;
	isAllStar: boolean;
	logos: ESPNTeamLogo[];
	record: RefOnlyESPN;
	oddsRecords: RefOnlyESPN;
	athletes: RefOnlyESPN;
	venue: ESPNVenue;
	groups: RefOnlyESPN;
	ranks: RefOnlyESPN;
	statistics: RefOnlyESPN;
	leaders: RefOnlyESPN;
	links: LinkESPN[];
	injuries: RefOnlyESPN;
	notes: RefOnlyESPN;
	againstTheSpreadRecords: RefOnlyESPN;
	franchise: RefOnlyESPN;
	depthCharts: RefOnlyESPN;
	projection: RefOnlyESPN;
	events: RefOnlyESPN;
	transactions: RefOnlyESPN;
	coaches: RefOnlyESPN;
}
export interface ESPNTeamLogo {
	href: string;
	width: number;
	height: number;
	alt: string;
	rel: string[];
	lastUpdated: string;
}
export interface ESPNDriveRef {
	$ref: string;
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	items: ESPNDrive[];
}
export interface ESPNPlaysRef {
	$ref: string;
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	items: ESPNPlay[];
}
export interface ESPNDrive {
	$ref: string;
	id: string;
	description: string;
	sequenceNumber: string;
	team: RefOnlyESPN;
	endTeam: RefOnlyESPN;
	start: ESPNDriveStartOrEnd;
	end: ESPNDriveStartOrEnd;
	timeElapsed: {
		value: number;
		displayValue: string;
	};
	yards: number;
	isScore: boolean;
	offensivePlays: number;
	result: string;
	shortDisplayResult: string;
	displayResult: string;
	source: SourceESPN;
	plays: ESPNPlaysRef;
}
export interface ESPNPlay {
	$ref: string;
	id: string;
	sequenceNumber: string;
	type: {
		id: string;
		text: string;
		abbreviation: string;
	};
	text: string;
	shortText: string;
	alternativeText: string;
	shortAlternativeText: string;
	awayScore: number;
	homeScore: number;
	period: {
		number: number;
	};
	clock: ESPNClock;
	scoringPlay: boolean;
	priority: boolean;
	scoreValue: number;
	modified: string;
	team: RefOnlyESPN;
	participants: ESPNParticipant[];
	probability: RefOnlyESPN;
	wallclock: string;
	drive: RefOnlyESPN;
	start: ESPNPlayStart;
	end: ESPNPlayEnd;
	statYardage: number;
}
export interface ESPNParticipant {
	athlete: RefOnlyESPN;
	position: RefOnlyESPN;
	statistics: RefOnlyESPN;
	stats: ESPNStat[];
	order: number;
	type: string;
}
export interface ESPNStat {
	name: string;
	displayName: string;
	shortDisplayName: string;
	description: string;
	abbreviation: string;
	value: number;
	displayValue: string;
}
export interface ESPNPlayStart {
	down: number;
	distance: number;
	yardLine: number;
	yardsToEndZone: number;
	team: RefOnlyESPN;
}
export interface ESPNPlayEnd {
	down: number;
	distance: number;
	yardLine: number;
	yardsToEndZone: number;
	downDistanceText: string;
	shortDownDistanceText: string;
	possessionText: string;
	team: RefOnlyESPN;
}
export interface ESPNClock {
	value: number;
	displayValue: number;
}
export interface ESPNPeriod {
	type: string;
	number: number;
}
export interface ESPNDriveStartOrEnd {
	period: ESPNPeriod;
	clock: ESPNClock;
	yardLine: number;
	text: string;
}

// ESPNSeason: used for finding season start and end timestamps, and can navigate to league (groups) and week (weeks) data
// https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/2/
export interface ESPNSeason {
	$ref: string;
	id: string;
	type: number;
	name: string;
	abbreviation: string;
	year: number;
	startDate: string;
	endDate: string;
	hasGroups: boolean;
	hasStandings: boolean;
	hasLegs: boolean;
	groups: RefOnlyESPN;
	weeks: RefOnlyESPN;
	corrections: RefOnlyESPN;
	slug: string;
}
// ESPNWeek: used for finding week number, start and end timestamps, rankings, and can be used to get to week events (if they exist)
// https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/2022/types/1/weeks/2?lang=en&region=us
export interface ESPNSeasonWeek {
	$ref: string;
	number: number;
	startDate: string;
	endDate: string;
	text: string;
	rankings: RefOnlyESPN;
	events: RefOnlyESPN;
}
export interface ESPNSeasonYear {
	$ref: string;
	year: number;
	startDate: string;
	endDate: string;
	displayName: string;
	type: ESPNSeason;
	rankings: RefOnlyESPN;
	futures: RefOnlyESPN;
	types: {
		$ref: string;
		count: number;
		pageIndex: number;
		pageSize: number;
		pageCount: number;
		items: ESPNSeason[];
	};
}
export interface ESPNWeekEvent {
	$meta?: {
		parameters: {
			week: string[]; // the week number
			season: string[]; // the year
			seasontypes: string[]; // the season type (1 = preseason, 2 = regular season, 3 = post season)
		};
	};
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	items: RefOnlyESPN[];
}
export interface ESPNSeasonCollection {
	count: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	items: RefOnlyESPN[];
}
