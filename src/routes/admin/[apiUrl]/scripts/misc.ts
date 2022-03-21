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
		db_id: generateID(),
		tournament_name: '',
		tournament_image: '',
		tournament_sponsor: '',
		holes: [],
		t_start: now,
		t_end: now + 86400
	};
	return tournament;
}

export async function deleteActiveTournament(
	baseAdminUrl: string,
	baseUserUrl: string
): Promise<void> {
	let tournament: Tournament;
	const unsubscribe = activeTournament.subscribe((value) => {
		tournament = value;
	});

	await deleteTournament(baseAdminUrl, tournament.db_id);

	unsubscribe();

	activeTournament.set(null);
	formChanged.set(false);

	updateTournamentList(baseUserUrl);
}

export function printScores(dbId: string): void {
	window.open(`./print?dbId=${dbId}`, '_blank').focus();
}