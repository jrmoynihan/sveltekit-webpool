export class WeeklyPickRecord {
	week_1: UserRecord;
	week_2: UserRecord;
	week_3: UserRecord;
	week_4: UserRecord;
	week_5: UserRecord;
	week_6: UserRecord;
	week_7: UserRecord;
	week_8: UserRecord;
	week_9: UserRecord;
	week_10: UserRecord;
	week_11: UserRecord;
	week_12: UserRecord;
	week_13: UserRecord;
	week_14: UserRecord;
	week_15: UserRecord;
	week_16: UserRecord;
	week_17: UserRecord;
	week_18: UserRecord;
	constructor({ ...args }) {
		this.week_1 = args.week_1 || { ...new UserRecord({}) };
		this.week_2 = args.week_2 || { ...new UserRecord({}) };
		this.week_3 = args.week_3 || { ...new UserRecord({}) };
		this.week_4 = args.week_4 || { ...new UserRecord({}) };
		this.week_5 = args.week_5 || { ...new UserRecord({}) };
		this.week_6 = args.week_6 || { ...new UserRecord({}) };
		this.week_7 = args.week_7 || { ...new UserRecord({}) };
		this.week_8 = args.week_8 || { ...new UserRecord({}) };
		this.week_9 = args.week_9 || { ...new UserRecord({}) };
		this.week_10 = args.week_10 || { ...new UserRecord({}) };
		this.week_11 = args.week_11 || { ...new UserRecord({}) };
		this.week_12 = args.week_12 || { ...new UserRecord({}) };
		this.week_13 = args.week_13 || { ...new UserRecord({}) };
		this.week_14 = args.week_14 || { ...new UserRecord({}) };
		this.week_15 = args.week_15 || { ...new UserRecord({}) };
		this.week_16 = args.week_16 || { ...new UserRecord({}) };
		this.week_17 = args.week_17 || { ...new UserRecord({}) };
		this.week_18 = args.week_18 || { ...new UserRecord({}) };
	}
}

export class UserRecord {
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

export class UserWinnings {
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
