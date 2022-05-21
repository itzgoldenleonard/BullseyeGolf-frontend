import axios from 'axios';

export async function getTournamentList(url: string): Promise<ShortTournament[]> {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getTournament(baseUrl: string, tournament_id: string): Promise<Tournament> {
	try {
		const request_url: string = `${baseUrl}/${tournament_id}`;
		const response = await axios.get(request_url);
		return response.data;
	} catch (error) {
		throw new Error(error);
	}
}

export async function postTournament(baseUrl: string, tournament: Tournament, apiKey: string): Promise<void> {
	try {
		const request_url: string = `${baseUrl}`;
		const response = await axios.post(request_url, tournament, {headers: {'X-API-KEY': apiKey}});
	} catch (error) {
		throw new Error(error);
	}
}

export async function deleteTournament(baseUrl: string, tournament_id: string, apiKey: string): Promise<void> {
	try {
		const request_url: string = `${baseUrl}/${tournament_id}`;
		const response = await axios.delete(request_url, {headers: {'X-API-KEY': apiKey}});
	} catch (error) {
		throw new Error(error);
	}
}
