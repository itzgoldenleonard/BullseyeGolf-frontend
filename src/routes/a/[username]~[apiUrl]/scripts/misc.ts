import { deleteTournament, getTournamentList } from './api';
import { activeTournament, formChanged, tournamentList } from '../persistence/stores';

// Maybe this file name could be better
export function generateID(): string {
	return String(Math.floor(Math.random() * 1000000));
}

export function updateTournamentList(url: string): void {
	tournamentList.set(getTournamentList(url));
}

export async function createDefaultTournament(): Promise<Tournament> {
	let now = Math.floor(Date.now() / 1000);

	let tournament: Tournament = {
		tournament_id: generateID(),
		tournament_name: '',
		tournament_image: '',
		tournament_sponsor: '',
		holes: [],
		t_start: now,
		t_end: now + 86400
	};
	return tournament;
}

export async function deleteActiveTournament(baseUrl: string, apiKey: string): Promise<void> {
	let tournament: Tournament;
	const unsubscribe = activeTournament.subscribe((value) => {
		tournament = value;
	});

	await deleteTournament(baseUrl, tournament.tournament_id, apiKey);

	unsubscribe();

	activeTournament.set(null);
	formChanged.set(false);

	updateTournamentList(baseUrl);
}
