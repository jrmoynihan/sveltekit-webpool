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

	constructor(
		docRef: DocumentReference,
		$ref: string,
		competitions: Record<string, unknown>[],
		date: string,
		id: string,
		league: { $ref: string },
		links: Record<string, unknown>[],
		name: string,
		season: { $ref: string },
		seasonType: { $ref: string },
		shortName: string,
		spread: number,
		timeValid: boolean,
		timestamp: Timestamp,
		uid: string,
		venues: Record<string, unknown>[],
		year: number,
		week: number,
		type: string,
		homeTeam: Team,
		awayTeam: Team
	) {
		this.docRef = docRef;
		this.$ref = $ref;
		this.competitions = competitions;
		this.date = date;
		this.id = id;
		this.league = league;
		this.links = links;
		this.name = name;
		this.season = season;
		this.seasonType = seasonType;
		this.shortName = shortName;
		this.spread = spread;
		this.timeValid = timeValid;
		this.timestamp = timestamp;
		this.uid = uid;
		this.venues = venues;
		this.year = year;
		this.week = week;
		this.type = type;
		this.homeTeam = homeTeam;
		this.awayTeam = awayTeam;
	}
}
