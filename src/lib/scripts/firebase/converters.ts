import type { QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore';
import { Team } from '$lib/scripts/classes/team';
import { Rule, RuleCategory } from '$lib/scripts/classes/rules';
import { Game } from '../classes/game';
import { PickSixDoc, WeeklyPickDoc } from '../classes/picks';
import { WeeklyTiebreaker } from '../classes/tiebreaker';
import { WeekBoundDoc } from '../classes/weekBound';
import { Player } from '../classes/player';
import { SeasonBoundDoc } from '../classes/seasonBound';
import { PlayerRecord, SeasonRecord } from '../classes/playerRecord';
import { Survivor } from '../classes/survivor';

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
		const doc_ref = snapshot.ref;
		const data = snapshot.data();
		return new Game({ doc_ref, ...data });
	}
};

export const weeklyPickConverter = {
	toFirestore: (pick: WeeklyPickDoc): WeeklyPickDoc => {
		return { ...pick };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyPickDoc => {
		const doc_ref = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyPickDoc({ doc_ref, ...data });
	}
};
export const weeklyTiebreakerConverter = {
	toFirestore: (tiebreaker: WeeklyTiebreaker): WeeklyTiebreaker => {
		return { ...tiebreaker };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyTiebreaker => {
		const doc_ref = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyTiebreaker({ doc_ref, ...data });
	}
};
export const weekBoundConverter = {
	toFirestore: (bound: WeekBoundDoc): WeekBoundDoc => {
		return { ...bound };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WeekBoundDoc => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new WeekBoundDoc({ doc_ref: ref, doc_id: id, ...data });
	}
};
export const seasonBoundConverter = {
	toFirestore: (bound: SeasonBoundDoc): SeasonBoundDoc => {
		return { ...bound };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SeasonBoundDoc => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new SeasonBoundDoc({ doc_ref: ref, doc_id: id, ...data });
	}
};
export const recordConverter = {
	toFirestore: (record: PlayerRecord): PlayerRecord => {
		return { ...record };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PlayerRecord => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new PlayerRecord({ doc_ref: ref, doc_id: id, ...data });
	}
};
export const seasonRecordConverter = {
	toFirestore: (record: SeasonRecord): SeasonRecord => {
		return { ...record };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SeasonRecord => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new SeasonRecord({ doc_ref: ref, doc_id: id, ...data });
	}
};
export const pickSixConverter = {
	toFirestore: (pickSix: PickSixDoc): PickSixDoc => {
		return { ...pickSix };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PickSixDoc => {
		const data = snapshot.data(options);
		const { ref, id } = snapshot; // Destructure the ref and id props from snapshot object
		return new PickSixDoc({ doc_ref: ref, doc_id: id, ...data });
	}
};
export const survivorConverter = {
	toFirestore: (survivor: Survivor): Survivor => {
		return { ...survivor };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Survivor => {
		const data = snapshot.data(options);
		const { ref } = snapshot; // Destructure the ref and id props from snapshot object
		return new Survivor({ doc_ref: ref, ...data });
	}
};
