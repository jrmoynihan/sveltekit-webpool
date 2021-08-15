import type { QueryDocumentSnapshot, SnapshotOptions } from '@firebase/firestore';
import { WebUser } from '$scripts/classes/webUser';
import { Team } from '$scripts/classes/team';
import { RuleCategory } from '$scripts/classes/rules';
import { Game } from './classes/game';
import { WeeklyPickDoc } from './classes/picks';

export const userConverter = {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	toFirestore: (user: Partial<WebUser>): Partial<WebUser> => {
		return { ...user };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): WebUser => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new WebUser(
			docID,
			docRef,
			data.name,
			data.nickname,
			data.email,
			data.admin,
			data.college,
			data.pick6,
			data.playoffs,
			data.survivor,
			data.weekly
		);
	}
};
export const teamConverter = {
	toFirestore: (team: Partial<Team>): Partial<Team> => {
		return {
			...team
		};
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Team => {
		const data = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;
		return new Team(
			data.city,
			data.abbreviation,
			data.name,
			data.conference,
			data.division,
			data.logoPath,
			data.fontPath,
			data.wins,
			data.losses,
			data.ties,
			docRef,
			docID
		);
	}
};
export const rulesConverter = {
	toFirestore: (rule: Partial<RuleCategory>): Partial<RuleCategory> => {
		return { ...rule };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): RuleCategory => {
		const {
			order,
			title,
			endOfSeason = undefined,
			prizeTBDmessage = undefined,
			weeklyFirst = undefined,
			weeklySecond = undefined,
			weeklyThird = undefined,
			hasWeeklyPayout = undefined
		} = snapshot.data(options);
		const docRef = snapshot.ref;
		const docID = snapshot.id;

		return new RuleCategory({
			docRef,
			docID,
			order,
			title,
			endOfSeason,
			prizeTBDmessage,
			weeklyFirst,
			weeklySecond,
			weeklyThird,
			hasWeeklyPayout
		});
	}
};

export const gameConverter = {
	toFirestore: (game: Partial<Game>): Partial<Game> => {
		return { ...game };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): Game => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new Game(
			docRef,
			data.$ref,
			data.competitions,
			data.date,
			data.id,
			data.league,
			data.links,
			data.name,
			data.season,
			data.seasonType,
			data.shortName,
			data.spread,
			data.timeValid,
			data.timestamp,
			data.uid,
			data.venues,
			data.week,
			data.homeTeam,
			data.awayTeam
		);
	}
};

export const weeklyPickConverter = {
	toFirestore: (pick: WeeklyPickDoc): WeeklyPickDoc => {
		return { ...pick };
	},
	fromFirestore: (snapshot: QueryDocumentSnapshot): WeeklyPickDoc => {
		const docRef = snapshot.ref;
		const data = snapshot.data();
		return new WeeklyPickDoc(docRef, data.id, data.pick, data.uid, data.week);
	}
};
