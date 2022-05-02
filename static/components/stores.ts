import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const VERSION: Writable<string> = writable('1.0.0-beta')