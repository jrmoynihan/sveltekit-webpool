import type { Timestamp } from 'firebase/firestore';

export class WeekBoundDoc {
	week_1: WeekBound;
	week_2: WeekBound;
	week_3: WeekBound;
	week_4: WeekBound;
	week_5: WeekBound;
	week_6: WeekBound;
	week_7: WeekBound;
	week_8: WeekBound;
	week_9: WeekBound;
	week_10: WeekBound;
	week_11: WeekBound;
	week_12: WeekBound;
	week_13: WeekBound;
	week_14: WeekBound;
	week_15: WeekBound;
	week_16: WeekBound;
	week_17: WeekBound;
	week_18: WeekBound;
	constructor({ ...args }) {
		(this.week_1 = args.week_1),
			(this.week_2 = args.week_2),
			(this.week_3 = args.week_3),
			(this.week_4 = args.week_4),
			(this.week_5 = args.week_5),
			(this.week_6 = args.week_6),
			(this.week_7 = args.week_7),
			(this.week_8 = args.week_8),
			(this.week_9 = args.week_9),
			(this.week_10 = args.week_10),
			(this.week_11 = args.week_11),
			(this.week_12 = args.week_12),
			(this.week_13 = args.week_13),
			(this.week_14 = args.week_14),
			(this.week_15 = args.week_15),
			(this.week_16 = args.week_16),
			(this.week_17 = args.week_17);
		this.week_18 = args.week_18;
	}
}
export class WeekBound {
	firstGameTime: Timestamp;
	lastGameTime: Timestamp;
	week: number;
	constructor({ ...args }) {
		(this.firstGameTime = args.firstGameTime),
			(this.lastGameTime = args.lastGameTime),
			(this.week = args.week);
	}
}
