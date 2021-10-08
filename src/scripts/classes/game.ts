import type { DocumentReference, Timestamp } from '@firebase/firestore';
import type { Team } from './team';

export class Game {
	docRef: DocumentReference;
	$ref: string;
	competitions: Record<string, unknown>[];
	date: string;
	id: string;
	league: { $ref: string };
	links: Record<string, unknown>[];
	loser: string;
	name: string;
	season: { $ref: string };
	seasonType: { $ref: string };
	shortName: string;
	spread: number;
	timeValid: boolean;
	timestamp: Timestamp;
	uid: string;
	venues: Record<string, unknown>[];
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
		this.league = args.league;
		this.links = args.links;
		this.loser = args.loser;
		this.name = args.name;
		this.season = args.season;
		this.seasonType = args.seasonType;
		this.shortName = args.shortName;
		this.spread = args.spread;
		this.timeValid = args.timeValid;
		this.timestamp = args.timestamp;
		this.uid = args.uid;
		this.venues = args.venues;
		this.year = args.year;
		this.week = args.week;
		this.type = args.type;
		this.homeTeam = args.homeTeam;
		this.awayTeam = args.awayTeam;
		this.winner = args.winner;
		this.ATSwinner = args.ATSwinner;
		this.totalScore = args.totalScore;
		this.isLastGameOfWeek = args.isLastGameOfWeek;
	}
}
