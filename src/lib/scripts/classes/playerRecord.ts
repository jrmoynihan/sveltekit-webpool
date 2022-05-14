export class PlayerRecord {
	uid: string;
	wins: number;
	losses: number;
	net_tiebreaker: number;
	net_tiebreaker_absolute: number;
	season_type: string;
	week: number;
	year: number;
	prize_amount: number;
	constructor({ ...args }) {
		this.uid = args.uid;
		this.wins = args.wins || 0;
		this.losses = args.losses || 0;
		this.net_tiebreaker = args.net_tiebreaker || 0;
		this.net_tiebreaker_absolute = args.net_tiebreaker_absolute || 0;
		this.season_type = args.season_type;
		this.week = args.week;
		this.year = args.year;
		this.prize_amount = args.prize_amount || 0;
	}
}
export class SeasonRecord {
	uid: string;
	year: number;
	total_weekly_wins: number;
	total_weekly_losses: number;
	constructor({ ...args }) {
		this.uid = args.uid;
		this.year = args.year;
		this.total_weekly_wins = args.total_wins || 0;
		this.total_weekly_losses = args.total_losses || 0;
	}
}
