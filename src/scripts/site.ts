import { PageOption } from '$scripts/classes/pageOption';

export const mobileBreakpoint = 1024;

export const PageOptions: PageOption[] = [
	new PageOption({ navigationText: 'Home', path: '/' }),
	new PageOption({ navigationText: 'Weekly', path: '/weekly', requiresWeekly: true }),
	new PageOption({ navigationText: 'Survivor', path: '/survivor', requiresSurvivor: true }),
	new PageOption({ navigationText: 'Pick6', path: '/pick6', requiresPick6: true }),
	new PageOption({ navigationText: 'Playoffs', path: '/playoffs', requiresPlayoffs: true }),
	new PageOption({ navigationText: 'College', path: '/college', requiresCollege: true }),
	new PageOption({ navigationText: 'Admin', path: '/admin', requiresAdmin: true })
];
