console.log('seasonType.ts...');

export class SeasonType {
	id: number;
	text: string;
	constructor(id: number, text: string) {
		(this.id = id), (this.text = text);
	}
}

console.log('seasonType.ts... done');
