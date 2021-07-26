import { PageOption, Team } from './classes';
import bufLogo from '../../static/BUF/buffalo-bills-football-logo.webp';

export const PageOptions: PageOption[] = [
	new PageOption({ navigationText: 'Home', path: '/' }),
	new PageOption({ navigationText: 'Weekly', path: '/weekly', requiresWeekly: true }),
	new PageOption({ navigationText: 'Survivor', path: '/survivor', requiresSurvivor: true }),
	new PageOption({ navigationText: 'Pick6', path: '/pick6', requiresPick6: true }),
	new PageOption({ navigationText: 'Playoffs', path: '/playoffs', requiresPlayoffs: true }),
	new PageOption({ navigationText: 'College', path: '/college', requiresCollege: true }),
	new PageOption({ navigationText: 'Admin', path: '/admin', requiresAdmin: true })
];

export const allTeams = [
	new Team('Bills', 'BUF', 'Buffalo', 'AFC', 'East', bufLogo)
	// new Team(
	// 	'Ravens',
	// 	'BAL',
	// 	'Baltimore',
	// 	'AFC',
	// 	'North',
	// 	'/output/BAL/baltimore-ravens-logo-transparent.webp',
	// 	'/output/BAL/baltimore-ravens-logo-font.webp'
	// )
];
