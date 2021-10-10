import type { QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore';
import { Team } from '$scripts/classes/team';
import { Rule, RuleCategory } from '$scripts/classes/rules';
import { Game } from './classes/game';
import { WeeklyPickDoc } from './classes/picks';
import { WeeklyTiebreaker } from './classes/tiebreaker';
import { WeekBoundDoc } from './classes/weekBound';
import { WebUser } from './classes/webUser';

export const userConverter = {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toFirestore: (user: WebUser): WebUser => {
		return { ...user };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WebUser => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new WebUser({ id: docID, ref: docRef, ...data });
	}
};
export const teamConverter = {
	toFirestore: (team: Team): Team => {
		return { ...team };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Team => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new Team({ docID: docID, docRef: docRef, ...data });
	}
};
export const ruleCategoryConverter = {
	toFirestore: (rule: RuleCategory): RuleCategory => {
		return { ...rule };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RuleCategory => {
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		const data = snapshot.data(options);
		return new RuleCategory({ docRef: docRef, docID: docID, ...data });
	}
};
export const ruleConverter = {
	toFirestore: (rule: Rule): Rule => {
		return { ...rule };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Rule => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		return new Rule({ docRef: docRef, ...data });
	}
};

export const gameConverter = {
	toFirestore: (game: Game): Game => {
		return { ...game };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): Game => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new Game({ docRef: docRef, ...data });
	}
};

export const weeklyPickConverter = {
	toFirestore: (pick: WeeklyPickDoc): WeeklyPickDoc => {
		return { ...pick };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyPickDoc => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyPickDoc({ docRef: docRef, ...data });
	}
};
export const weeklyTiebreakerConverter = {
	toFirestore: (tiebreaker: WeeklyTiebreaker): WeeklyTiebreaker => {
		return { ...tiebreaker };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyTiebreaker => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyTiebreaker({ docRef, ...data });
	}
};
export const weekBoundConverter = {
	toFirestore: (bound: WeekBoundDoc): WeekBoundDoc => {
		return { ...bound };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WeekBoundDoc => {
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		const data = snapshot.data(options);
		return new WeekBoundDoc({ docRef, docID, ...data });
	}
};
