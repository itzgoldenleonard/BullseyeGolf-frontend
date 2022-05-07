import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const VERSION: Writable<string> = writable('1.1.0-beta');
export const REPOURL: Writable<string> = writable('https://github.com/itzgoldenleonard'); // Dont end with a slash, dont include the repo name, it's assumed to be bullseyegolf-frontend
