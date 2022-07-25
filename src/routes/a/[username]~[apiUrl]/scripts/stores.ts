import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export const saved: Writable<boolean> = writable(true);
