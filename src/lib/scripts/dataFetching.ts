import { all_icons } from '$classes/constants';
import type {
	ESPNDrive,
	ESPNDriveRef,
	ESPNScore,
	ESPNSituation,
	ESPNStatus,
	ESPNTeamData,
	RefOnlyESPN
} from '$classes/game';
import { myError, myLog } from '$lib/scripts/utilities/logging';

export const fetchWithTimeout = async (resourceUrl: string, options: { timeout: number }) => {
	const { timeout = 8000 } = options;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(resourceUrl, {
		...options,
		signal: controller.signal
	});
	clearTimeout(id);
	return response;
};

export const convertToHttps = async (httpAddress: string): Promise<string> => {
	return httpAddress.replace('http', 'https');
};
export const fetchHttpsToJson = async (httpAddress: string) => {
	const httpsAddress = await convertToHttps(httpAddress);
	const response = await fetch(httpsAddress);
	const data = await response.json();
	return data;
};
export const getStatus = async (competitions: { status: RefOnlyESPN }[]): Promise<ESPNStatus> => {
	const httpGameStatusEndpoint: string = competitions[0].status.$ref;
	const httpsGameStatusEndpoint: string = await convertToHttps(httpGameStatusEndpoint);
	// console.log(httpsGameStatusEndpoint)
	const statusResponse = await fetch(httpsGameStatusEndpoint);
	const statusData = statusResponse.json();
	return statusData;
};
export const getSituation = async (
	competitions: { situation: RefOnlyESPN }[]
): Promise<ESPNSituation> => {
	const httpGameSituationEndpoint: string = competitions[0].situation.$ref;
	const httpsGameSituationEndpoint: string = await convertToHttps(httpGameSituationEndpoint);
	const situationResponse = await fetch(httpsGameSituationEndpoint);
	const situationData: ESPNSituation = await situationResponse.json();
	// console.table(situationData);
	return situationData;
};

export const getScoreData = async (
	competitions: { competitors: { score: RefOnlyESPN }[] }[]
): Promise<{ home_score_data: ESPNScore; away_score_data: ESPNScore }> => {
	try {
		let home_score_data: ESPNScore;
		let away_score_data: ESPNScore;
		const httpHomeEndpoint = competitions[0].competitors[0].score.$ref;
		const httpAwayEndpoint = competitions[0].competitors[1].score.$ref;
		const httpsHomeEndpoint = await convertToHttps(httpHomeEndpoint);
		const httpsAwayEndpoint = await convertToHttps(httpAwayEndpoint);
		const homeScoreResponse = await fetch(httpsHomeEndpoint);
		const awayScoreResponse = await fetch(httpsAwayEndpoint);

		if (homeScoreResponse.ok) {
			home_score_data = await homeScoreResponse.json();
		}
		if (awayScoreResponse.ok) {
			away_score_data = await awayScoreResponse.json();
		}
		if (home_score_data !== undefined && away_score_data !== undefined) {
			return { home_score_data, away_score_data };
		} else {
			throw `error getting scores`;
		}
	} catch (error) {
		myError({ msg: 'Error getting scores', error, icon: all_icons.policeCarLight });
	}
};

export const getConsensusSpread = async (gameID: string): Promise<number> => {
	try {
		const response = await fetch(
			`https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${gameID}/competitions/${gameID}/odds`
		);
		const data = await response.json();
		const spreadProviders = data.items;
		let consensus: number;
		let totalSpread = 0;
		for await (const spreadProvider of spreadProviders) {
			if (spreadProvider.provider.name === 'consensus') {
				consensus = spreadProvider.spread;
				// Return early if the consensus spread is found
				return consensus;
			} else if (spreadProvider.spread) {
				// Otherwise, total the spreads up
				totalSpread += spreadProvider.spread;
			}
		}
		// Take the average of spread providers if the consensus wasn't found
		consensus = roundToNearestHalf(totalSpread / spreadProviders.length);
		myLog({
			msg: `found consensus: ${consensus}, total spread: ${totalSpread}, spreadProviders: ${spreadProviders.length}`,
			icon: all_icons.butter
		});
		return consensus;
	} catch (error) {
		console.error(error);
	}
};
// A function to round to increments of .5
export const roundToNearestHalf = (num: number): number => {
	return Math.round(num * 2) / 2;
};

export const getTeamWithPossession = async (teamRef: string) => {
	const httpsAddress = await convertToHttps(teamRef);
	const response = await fetch(httpsAddress);
	const data: ESPNTeamData = await response.json();
	return data.abbreviation;
};
export const getMostRecentDrive = async (drivesRef: string): Promise<ESPNDrive> => {
	const data: ESPNDriveRef = await fetchHttpsToJson(drivesRef);
	const lastDriveNumber = data.items.length - 1;
	const lastDrive: ESPNDrive = data.items[lastDriveNumber];
	return lastDrive;
};
