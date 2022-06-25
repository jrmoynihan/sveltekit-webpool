import {
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
	type QueryConstraint
} from '@firebase/firestore';
import type { Player } from '../classes/player';
import { SeasonRecord, type PlayerRecord } from '../classes/playerRecord';
import { seasonRecordsCollection } from '../firebase/collections';
import { seasonRecordConverter } from '../firebase/converters';
import { ErrorAndToast, myLog } from '../utilities/logging';

interface createSeasonRecordForPlayerOptions {
	player: Player;
	season_year: number;
}
export const createSeasonRecordForPlayer = async (input: createSeasonRecordForPlayerOptions) => {
	const { player, season_year } = input;
	const doc_ref = doc(seasonRecordsCollection.withConverter(seasonRecordConverter));
	try {
		const data: SeasonRecord = new SeasonRecord({
			uid: player.uid,
			name: player.name,
			nickname: player.nickname,
			season_year,
			doc_ref,
			total_weekly_losses: 0,
			total_weekly_wins: 0
		});
		await setDoc(doc_ref, data);
		myLog({
			msg: `set season record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season`
		});
	} catch (error) {
		ErrorAndToast({
			msg: `Encountered an error while trying to set season record doc (${doc_ref.path}) for player: ${player.name} for ${season_year} season`,
			error,
			additional_params: `unable to update season record ${doc_ref.path} for player ${player.name}`
		});
	}
};

export const updateWeeklyPlayerSeasonRecord = async (
	player: Player,
	players_records: PlayerRecord[],
	season_year: number
) => {
	try {
		let total_weekly_wins: number = 0;
		let total_weekly_losses: number = 0;

		// Sum all weekly wins/losses
		for await (const record of players_records) {
			const { wins, losses } = record;
			total_weekly_wins += wins;
			total_weekly_losses += losses;
		}
		// Get the player's season record doc to update
		const { uid } = player;
		const constraints = [where('season_year', '==', season_year), where('uid', '==', uid)];
		const season_record_snapshot = await getSeasonRecords({ constraints });

		// If only one doc is returned (expected), update the doc
		if (season_record_snapshot.size === 1) {
			const { ref } = season_record_snapshot.docs[0];
			await updateDoc(ref, { total_weekly_wins, total_weekly_losses });
			return total_weekly_wins; // Return wins to compare who has the best record

			// If no docs are returned (unexpected), create a new doc
		} else if (season_record_snapshot.empty) {
			const new_doc = doc(seasonRecordsCollection.withConverter(seasonRecordConverter));
			const new_season_record_data = new SeasonRecord({
				uid,
				doc_ref: new_doc,
				season_year,
				total_weekly_wins,
				total_weekly_losses
			});
			await setDoc(new_doc, new_season_record_data);
			return total_weekly_wins; // Return wins to compare who has the best record

			// If more than one doc is returned (unexpected), throw an error
		} else {
			throw new Error(
				`More than one season record found for this ${player.name} (${player.nickname})`
			);
		}
	} catch (error) {
		ErrorAndToast({ title: 'Error updating weekly player season record!', error });
	}
};

type SeasonRecordOptions = {
	constraints: QueryConstraint[];
};
export const getSeasonRecords = async (input: SeasonRecordOptions) => {
	try {
		const { constraints } = input;
		const season_record_query = query(
			seasonRecordsCollection.withConverter(seasonRecordConverter),
			...constraints
		);
		const season_record_snapshot = await getDocs(season_record_query);
		return season_record_snapshot;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records!', error });
	}
};
export const getSeasonRecordsData = async (input: SeasonRecordOptions) => {
	try {
		const { constraints } = input;
		const records = await getSeasonRecords({ constraints });
		const data = records.docs.map((doc) => doc.data());
		return data;
	} catch (error) {
		ErrorAndToast({ title: 'Error getting season records data!', error });
	}
};
