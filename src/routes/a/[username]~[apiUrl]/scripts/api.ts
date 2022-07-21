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
