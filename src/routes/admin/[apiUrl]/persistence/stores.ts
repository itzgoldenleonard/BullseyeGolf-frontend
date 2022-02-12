import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const tournamentList: Writable<Promise<ShortTournament[]>> = writable(undefined);
