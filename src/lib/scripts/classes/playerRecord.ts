export class WeeklyPickRecord {
	week_1: PlayerRecord;
	week_2: PlayerRecord;
	week_3: PlayerRecord;
	week_4: PlayerRecord;
	week_5: PlayerRecord;
	week_6: PlayerRecord;
	week_7: PlayerRecord;
	week_8: PlayerRecord;
	week_9: PlayerRecord;
	week_10: PlayerRecord;
	week_11: PlayerRecord;
	week_12: PlayerRecord;
	week_13: PlayerRecord;
	week_14: PlayerRecord;
	week_15: PlayerRecord;
	week_16: PlayerRecord;
	week_17: PlayerRecord;
	week_18: PlayerRecord;
	constructor({ ...args }) {
		this.week_1 = args.week_1 || { ...new PlayerRecord({}) };
		this.week_2 = args.week_2 || { ...new PlayerRecord({}) };
		this.week_3 = args.week_3 || { ...new PlayerRecord({}) };
		this.week_4 = args.week_4 || { ...new PlayerRecord({}) };
		this.week_5 = args.week_5 || { ...new PlayerRecord({}) };
		this.week_6 = args.week_6 || { ...new PlayerRecord({}) };
		this.week_7 = args.week_7 || { ...new PlayerRecord({}) };
		this.week_8 = args.week_8 || { ...new PlayerRecord({}) };
		this.week_9 = args.week_9 || { ...new PlayerRecord({}) };
		this.week_10 = args.week_10 || { ...new PlayerRecord({}) };
		this.week_11 = args.week_11 || { ...new PlayerRecord({}) };
		this.week_12 = args.week_12 || { ...new PlayerRecord({}) };
		this.week_13 = args.week_13 || { ...new PlayerRecord({}) };
		this.week_14 = args.week_14 || { ...new PlayerRecord({}) };
		this.week_15 = args.week_15 || { ...new PlayerRecord({}) };
		this.week_16 = args.week_16 || { ...new PlayerRecord({}) };
		this.week_17 = args.week_17 || { ...new PlayerRecord({}) };
		this.week_18 = args.week_18 || { ...new PlayerRecord({}) };
	}
}

export class PlayerRecord {
	wins: number;
	losses: number;
	netTiebreaker: number;
	netTiebreakerAbsolute: number;
	constructor({ ...args }) {
		this.wins = args.wins || 0;
		this.losses = args.losses || 0;
		this.netTiebreaker = args.netTiebreaker || 0;
		this.netTiebreakerAbsolute = args.netTiebreakerAbsolute || 0;
	}
}

export class PlayerWinnings {
	total: number;
	week_1: number;
	week_2: number;
	week_3: number;
	week_4: number;
	week_5: number;
	week_6: number;
	week_7: number;
	week_8: number;
	week_9: number;
	week_10: number;
	week_11: number;
	week_12: number;
	week_13: number;
	week_14: number;
	week_15: number;
	week_16: number;
	week_17: number;
	week_18: number;
	constructor({ ...args }) {
		this.total = args.total || 0;
		this.week_1 = args.week_1 || 0;
		this.week_2 = args.week_2 || 0;
		this.week_3 = args.week_3 || 0;
		this.week_4 = args.week_4 || 0;
		this.week_5 = args.week_5 || 0;
		this.week_6 = args.week_6 || 0;
		this.week_7 = args.week_7 || 0;
		this.week_8 = args.week_8 || 0;
		this.week_9 = args.week_9 || 0;
		this.week_10 = args.week_10 || 0;
		this.week_11 = args.week_11 || 0;
		this.week_12 = args.week_12 || 0;
		this.week_13 = args.week_13 || 0;
		this.week_14 = args.week_14 || 0;
		this.week_15 = args.week_15 || 0;
		this.week_16 = args.week_16 || 0;
		this.week_17 = args.week_17 || 0;
		this.week_18 = args.week_18 || 0;
	}
}
