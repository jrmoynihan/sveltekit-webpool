import type { SvelteComponentDev } from 'svelte/internal';

export class Tab {
	name: string;
	component: typeof SvelteComponentDev;
	constructor({ ...args }) {
		this.name = args.name;
		this.component = args.component;
	}
}
