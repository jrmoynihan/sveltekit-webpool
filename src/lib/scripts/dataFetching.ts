import { myError, policeCarLight } from './classes/constants';
import type {
	RefOnlyESPN,
	ESPNStatus,
	ESPNSituation,
	ESPNScore,
	ESPNTeamData,
	ESPNDrive,
	ESPNDriveRef
} from './classes/game';

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

export const getScores = async (
	competitions: { competitors: { score: RefOnlyESPN }[] }[]
): Promise<{ homeScoreData: ESPNScore; awayScoreData: ESPNScore }> => {
	try {
		let homeScoreData: ESPNScore;
		let awayScoreData: ESPNScore;
		const httpHomeEndpoint = competitions[0].competitors[0].score.$ref;
		const httpAwayEndpoint = competitions[0].competitors[1].score.$ref;
		const httpsHomeEndpoint = await convertToHttps(httpHomeEndpoint);
		const httpsAwayEndpoint = await convertToHttps(httpAwayEndpoint);
		const homeScoreResponse = await fetch(httpsHomeEndpoint);
		const awayScoreResponse = await fetch(httpsAwayEndpoint);

		if (homeScoreResponse.ok) {
			homeScoreData = await homeScoreResponse.json();
		}
		if (awayScoreResponse.ok) {
			awayScoreData = await awayScoreResponse.json();
		}
		if (homeScoreData !== undefined && awayScoreData !== undefined) {
			return { homeScoreData, awayScoreData };
		} else {
			throw `error getting scores`;
		}
	} catch (error) {
		console.error(`%c${policeCarLight} error getting scores!`);
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
		for (const spreadProvider of spreadProviders) {
			if (spreadProvider.provider.name === 'consensus') {
				consensus = spreadProvider.spread;
			}
		}
		if (consensus === undefined) {
			consensus = null;
		}
		return consensus;
	} catch (error) {
		console.error(error);
	}
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
