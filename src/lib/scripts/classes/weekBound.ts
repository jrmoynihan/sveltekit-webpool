import type { Timestamp } from '@firebase/firestore';
export class WeekBoundDoc {
	year: number;
	week: number;
	firstGameTime: Timestamp;
	lastGameTime: Timestamp;
	constructor({ ...args }) {
		(this.year = args.year),
			(this.week = args.week),
			(this.firstGameTime = args.firstGameTime),
			(this.lastGameTime = args.lastGameTime);
	}
}
