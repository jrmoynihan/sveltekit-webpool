import { PageOption } from '$classes/pageOption';

export const mobile_breakpoint = 1024;

export const page_options: PageOption[] = [
	new PageOption({ navigation_text: 'Home', path: '/', has_no_requirements: true }),
	new PageOption({ navigation_text: 'Weekly', path: '/weekly', requires_weekly: true }),
	new PageOption({ navigation_text: 'Survivor', path: '/survivor', requires_survivor: true }),
	new PageOption({ navigation_text: 'Pick6', path: '/pick6', requires_pick6: true }),
	new PageOption({ navigation_text: 'Playoffs', path: '/playoffs', requires_playoffs: true }),
	new PageOption({ navigation_text: 'College', path: '/college', requires_college: true }),
	new PageOption({ navigation_text: 'Admin', path: '/admin', requires_admin: true })
];
export const weekly_tabs: PageOption[] = [
	new PageOption({ navigation_text: 'Make Picks', path: '/weekly/make-picks' }),
	new PageOption({ navigation_text: 'View League Picks', path: '/weekly/view-picks' }),
	new PageOption({ navigation_text: 'Standings', path: '/weekly/standings' }),
	new PageOption({ navigation_text: 'Rules', path: '/weekly/rules' })
];
export const survivor_tabs: PageOption[] = [
	new PageOption({ navigation_text: 'Make Picks', path: '/survivor/make-picks' }),
	new PageOption({ navigation_text: 'View League Picks', path: '/survivor/view-picks' })
];
export const pick6_tabs: PageOption[] = [
	new PageOption({ navigation_text: 'Make Picks', path: '/pick6/make-picks' }),
	new PageOption({ navigation_text: 'Standings', path: '/pick6/standings' }),
	new PageOption({ navigation_text: 'Rules', path: '/pick6/rules' })
];
export const admin_tabs: PageOption[] = [
	new PageOption({ navigation_text: 'Manage Players', path: '/admin/manage-players' }),
	new PageOption({ navigation_text: 'Manage Teams', path: '/admin/manage-teams' }),
	new PageOption({ navigation_text: 'Game Data', path: '/admin/set-games' }),
	new PageOption({ navigation_text: 'Weekly Pool Admin', path: '/admin/weekly-pool-admin' }),
	new PageOption({ navigation_text: 'The Sandbox', path: '/admin/sandbox' })
];

// Set which pages should have an admin control button appear in the app-menu bar
export const admin_controls_pages: string[] = [
	'/weekly',
	'/weekly/make-picks',
	'/weekly/view-picks',
	'/weekly/standings',
	'/pick6/make-picks',
	'/pick6/rules',
	'/survivor',
	'/survivor/make-picks',
	'/survivor/make-picks'
];
