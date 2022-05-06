console.log('converters.ts...');
import type { QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore';
import { Team } from '$lib/scripts/classes/team';
import { Rule, RuleCategory } from '$lib/scripts/classes/rules';
import { Game } from './classes/game';
import { WeeklyPickDoc } from './classes/picks';
import { WeeklyTiebreaker } from './classes/tiebreaker';
import { WeekBoundDoc } from './classes/weekBound';
import { Player } from './classes/player';

export const playerConverter = {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toFirestore: (player: Player): Player => {
		return { ...player };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Player => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new Player({ uid: id, ref, ...data });
	}
};
export const teamConverter = {
	toFirestore: (team: Team): Team => {
		return { ...team };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Team => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new Team({ docRef: ref, docID: id, ...data });
	}
};
export const ruleCategoryConverter = {
	toFirestore: (rule: RuleCategory): RuleCategory => {
		return { ...rule };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RuleCategory => {
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		const data = snapshot.data(options);
		return new RuleCategory({ docRef: ref, docID: id, ...data });
	}
};
export const ruleConverter = {
	toFirestore: (rule: Rule): Rule => {
		return { ...rule };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Rule => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		return new Rule({ docRef, ...data });
	}
};

export const gameConverter = {
	toFirestore: (game: Game): Game => {
		return { ...game };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): Game => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new Game({ docRef, ...data });
	}
};

export const weeklyPickConverter = {
	toFirestore: (pick: WeeklyPickDoc): WeeklyPickDoc => {
		return { ...pick };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyPickDoc => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyPickDoc({ docRef, ...data });
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
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new WeekBoundDoc({ docRef: ref, docID: id, ...data });
	}
};
console.log('converters.ts... done');
