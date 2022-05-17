import type { DocumentReference, Timestamp } from '@firebase/firestore';

export class SeasonBoundDoc {
	doc_ref: DocumentReference;
	doc_id: string;
	year: number;
	start_date: Timestamp;
	end_date: Timestamp;
	type_name: string;
	type_number: number;
	number_of_weeks: number;
	constructor({ ...args }) {
		this.doc_ref = args.doc_ref;
		this.doc_id = args.doc_id;
		this.year = args.year;
		(this.start_date = args.start_date),
			(this.end_date = args.end_date),
			(this.type_name = args.type_name),
			(this.type_number = args.type_number);
		this.number_of_weeks = args.number_of_weeks;
	}
}
