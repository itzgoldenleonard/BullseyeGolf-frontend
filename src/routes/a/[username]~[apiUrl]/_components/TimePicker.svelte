<script lang="ts">
	// SMUI Components
	import Textfield from '@smui/textfield';
	// Functions
	import { toISOTs, toUNIXTs } from '../scripts/timeConversion';
	import { afterUpdate, onMount } from 'svelte';

	// Varibles
	// External facing
	export let t_start: number;
	export let t_end: number;
	// Used for internal logic
	let tStart: string = '';
	let tEnd: string = '';

	// Lifecycle
	onMount(() => {
		// When component is created it converts the external time values (in UNIX time) to an ISO8601 string stored in the internal time values
		tStart = toISOTs(t_start);
		tEnd = toISOTs(t_end);
	});

	afterUpdate(() => {
		// Every time the DOM updates, that means whenever the forms change, the internal time values are converted from ISO8601 string format back to UNIX time and updates the external facing time values
		t_start = toUNIXTs(tStart);
		t_end = toUNIXTs(tEnd);
	});
</script>

<Textfield
	variant="filled"
	bind:value={tStart}
	label="Start tidspunkt"
	type="datetime-local"
	style="flex-grow:1;"
	required
/>
<Textfield
	variant="filled"
	bind:value={tEnd}
	label="Slut tidspunkt"
	type="datetime-local"
	style="flex-grow:1;"
	required
/>
