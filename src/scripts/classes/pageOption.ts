export class PageOption {
	navigationText: string;
	path: string;
	requiresAdmin: boolean;
	requiresWeekly: boolean;
	requiresSurvivor: boolean;
	requiresPlayoffs: boolean;
	requiresPick6: boolean;
	requiresCollege: boolean;
	// hasSidePanel: boolean;
	// sideComponent: any;

	constructor(
		{
			navigationText,
			path,
			requiresAdmin,
			requiresWeekly,
			requiresSurvivor,
			requiresPlayoffs,
			requiresPick6,
			requiresCollege
		}: {
			navigationText: string;
			path: string;
			requiresAdmin?: boolean;
			requiresWeekly?: boolean;
			requiresSurvivor?: boolean;
			requiresPlayoffs?: boolean;
			requiresPick6?: boolean;
			requiresCollege?: boolean;
		} // hasSidePanel?: boolean, // sideComponent?: any,
	) {
		(this.navigationText = navigationText),
			(this.path = path),
			(this.requiresAdmin = requiresAdmin);
		this.requiresCollege = requiresCollege;
		this.requiresPick6 = requiresPick6;
		this.requiresPlayoffs = requiresPlayoffs;
		this.requiresSurvivor = requiresSurvivor;
		this.requiresWeekly = requiresWeekly;
		// (this.hasSidePanel = hasSidePanel);
		// this.sideComponent = sideComponent;
	}
}
