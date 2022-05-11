export class PlayerRecord {
	wins: number;
	losses: number;
	net_tiebreaker: number;
	net_tiebreaker_absolute: number;
	season_type: string;
	week: number;
	year: number;
	constructor({ ...args }) {
		this.wins = args.wins || 0;
		this.losses = args.losses || 0;
		this.net_tiebreaker = args.net_tiebreaker || 0;
		this.net_tiebreaker_absolute = args.net_tiebreaker_absolute || 0;
		this.season_type = args.season_type;
		this.week = args.week;
		this.year = args.year;
	}
}
