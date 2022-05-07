import axios from 'axios';

export async function getTournamentList(url: string): Promise<ShortTournament[]> {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getTournament(baseUrl: string, db_id: string): Promise<Tournament> {
	try {
		const requestUrl: string = `${baseUrl}/${db_id}`;
		const response = await axios.get(requestUrl);
		response.data.db_id = db_id;
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getHole(baseUrl: string, db_id: string, hole_number: number): Promise<Hole> {
	try {
		const requestUrl: string = `${baseUrl}/${db_id}/${hole_number}`;
		const response = await axios.get(requestUrl);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function submitScore(baseUrl: string, db_id: string, hole_number: number, name: string, scoreM: number, scoreCm: number): Promise<any> {
	try {
		const requestUrl: string = `${baseUrl}/${db_id}/${hole_number}`;
		const response = await axios.post(requestUrl, {
			player_name: name,
			player_score: scoreM + scoreCm * 0.01
		});
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}