/// <reference types="@sveltejs/kit" />

interface Score {
	player_name: string;
	player_score: number;
}

interface Hole {
	hole_number: number;
	hole_text: string;
	game_mode: string;
	hole_sponsor: string;
	hole_image: string;
	scores: Score[];
}

interface Tournament {
	db_id: string;
	tournament_name: string;
	t_start: number;
	t_end: number;
	tournament_image: string;
	tournament_sponsor: string;
	holes: Hole[];
}

interface ShortTournament {
	db_id: string;
	tournament_name: string;
	active: boolean;
	t_start?: number;
	t_end?: number;
}
