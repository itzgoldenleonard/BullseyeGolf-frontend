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
		const request_url: string = `${baseUrl}/${db_id}`;
		const response = await axios.get(request_url);
		response.data.db_id = db_id;
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function postTournament(baseUrl: string, tournament: Tournament): Promise<void> {
	try {
		const request_url: string = `${baseUrl}/${tournament.db_id}`;
		const response = await axios.post(request_url, tournament);
		console.log(response);
	} catch (error) {
		throw new Error(error);
	}
}
