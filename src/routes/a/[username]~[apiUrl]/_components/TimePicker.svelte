<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { toISOTs, toUNIXTs } from '../scripts/timeConversion';

	import Textfield from '@smui/textfield';

	export let t_start: number;
	export let t_end: number;

	let tStart: string = '';
	let tEnd: string = '';

	onMount(() => {
		tStart = toISOTs(t_start);
		tEnd = toISOTs(t_end);
	});

	afterUpdate(() => {
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
