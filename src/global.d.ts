/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
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
		tournament_id: string;
		tournament_name: string;
		t_start: number;
		t_end: number;
		tournament_image: string;
		tournament_sponsor: string;
		holes: Hole[];
	}

	interface ShortTournament {
		tournament_id: string;
		tournament_name: string;
		active: boolean;
		t_start?: number;
		t_end?: number;
	}
}
