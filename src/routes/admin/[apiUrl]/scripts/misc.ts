// Maybe this file name could be better
export function generateID(): string {
    return String(Math.floor(Math.random() * 1000000));
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
    }
	return tournament;
}