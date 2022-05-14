import type { DocumentReference } from '@firebase/firestore';

export class Player {
	uid: string;
	ref: DocumentReference;
	name: string;
	nickname: string;
	email: string;
	active: boolean;
	admin: boolean;
	college: boolean;
	pick6: boolean;
	playoffs: boolean;
	survivor: boolean;
	weekly: boolean;
	weekly_pool_season_winnings: number;
	amount_owed_to_pools: number;
	amount_paid_to_pools: number;
	paid_weekly: boolean;
	paid_playoffs: boolean;
	paid_survivor: boolean;
	paid_college: boolean;
	paid_pick6: boolean;
	// TODO: add a method to migrate seasonal data to an array of objects at the end of the year
	constructor({ ...args }) {
		(this.uid = args.uid),
			(this.ref = args.ref),
			(this.name = args.name),
			(this.nickname = args.nickname),
			(this.email = args.email),
			(this.active = args.active || true),
			(this.admin = args.admin || false);
		this.college = args.college || false;
		this.pick6 = args.pick6 || false;
		this.playoffs = args.playoffs || false;
		this.survivor = args.survivor || false;
		this.weekly = args.weekly || false;
		this.weekly_pool_season_winnings = args.weekly_pool_season_winnings || 0;
		this.amount_owed_to_pools = args.amount_owed_to_pools || 0;
		this.amount_paid_to_pools = args.amount_paid_to_pools || 0;
		this.paid_weekly = args.paid_weekly;
		this.paid_playoffs = args.paid_playoffs;
		this.paid_survivor = args.paid_survivor;
		this.paid_college = args.paid_college;
		this.paid_pick6 = args.paid_pick6;
	}
}
