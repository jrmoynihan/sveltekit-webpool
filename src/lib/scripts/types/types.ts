import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { Team } from '$lib/scripts/classes/team';

export type toggleItem = { label: string; value: any; icon?: IconDefinition };
export type ScoreViewPreference = 'Actual' | 'ATS' | 'Both';
export type pickSixItem = {
	team: Team;
	selected: boolean;
};
