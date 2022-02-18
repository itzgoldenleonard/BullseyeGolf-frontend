import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const tournamentList: Writable<Promise<ShortTournament[]>> = writable(null);
export const activeTournament: Writable<Tournament> = writable(null);
export const formChanged: Writable<boolean> = writable(false);