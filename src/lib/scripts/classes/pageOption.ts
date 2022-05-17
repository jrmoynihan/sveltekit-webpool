export class PageOption {
	navigation_text: string;
	path: string;
	requires_admin: boolean;
	requires_weekly: boolean;
	requires_survivor: boolean;
	requires_playoffs: boolean;
	requires_pick6: boolean;
	requires_college: boolean;
	has_no_requirements?: boolean;
	constructor({
		navigation_text,
		path,
		requires_admin,
		requires_weekly,
		requires_survivor,
		requires_playoffs,
		requires_pick6,
		requires_college,
		has_no_requirements
	}: {
		navigation_text: string;
		path: string;
		requires_admin?: boolean;
		requires_weekly?: boolean;
		requires_survivor?: boolean;
		requires_playoffs?: boolean;
		requires_pick6?: boolean;
		requires_college?: boolean;
		has_no_requirements?: boolean;
	}) {
		(this.navigation_text = navigation_text),
			(this.path = path),
			(this.requires_admin = requires_admin);
		this.requires_college = requires_college;
		this.requires_pick6 = requires_pick6;
		this.requires_playoffs = requires_playoffs;
		this.requires_survivor = requires_survivor;
		this.requires_weekly = requires_weekly;
		this.has_no_requirements = has_no_requirements;
	}
}
