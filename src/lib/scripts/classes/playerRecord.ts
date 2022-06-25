import type { DocumentReference } from '@firebase/firestore';

export class PlayerRecord {
	doc_ref: DocumentReference;
	uid: string;
	nickname: string;
	name: string;
	wins: number;
	losses: number;
	net_tiebreaker: number;
	net_tiebreaker_absolute: number;
	season_type: string;
	week: number;
	season_year: number;
	prize_amount: number;
	constructor({ ...args }) {
		this.doc_ref = args.doc_ref;
		this.uid = args.uid;
		this.nickname = args.nickname;
		this.name = args.name;
		this.wins = args.wins || 0;
		this.losses = args.losses || 0;
		this.net_tiebreaker = args.net_tiebreaker || 0;
		this.net_tiebreaker_absolute = args.net_tiebreaker_absolute || 0;
		this.season_type = args.season_type;
		this.week = args.week;
		this.season_year = args.season_year;
		this.prize_amount = args.prize_amount || 0;
	}
}
export class SeasonRecord {
	doc_ref: DocumentReference;
	uid: string;
	nickname: string;
	name: string;
	season_year: number;
	total_weekly_wins: number;
	total_weekly_losses: number;
	grand_prize_winnings: number;
	constructor({ ...args }) {
		this.doc_ref = args.doc_ref;
		this.uid = args.uid;
		this.nickname = args.nickname;
		this.name = args.name;
		this.season_year = args.season_year;
		this.total_weekly_wins = args.total_weekly_wins || 0;
		this.total_weekly_losses = args.total_weekly_losses || 0;
		this.grand_prize_winnings = args.grand_prize_winnings || 0;
	}
}
