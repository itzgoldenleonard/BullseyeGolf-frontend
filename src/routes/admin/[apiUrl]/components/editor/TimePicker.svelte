<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { activeTournament } from '../../persistence/stores';
	import { toISOTs, toUNIXTs } from '../../scripts/timeConversion';
	import InputDateTime from '../../../../../../static/components/InputDateTime.svelte';

	let tStart: string;
	let tEnd: string;

	onMount(() => {
		tStart = toISOTs($activeTournament.t_start);
		tEnd = toISOTs($activeTournament.t_end);
	});

	afterUpdate(() => {
		$activeTournament.t_start = toUNIXTs(tStart);
		$activeTournament.t_end = toUNIXTs(tEnd);
	});
</script>

<div>
	<InputDateTime label="Start tidspunkt" bind:value={tStart} required/>
	<InputDateTime label="Start tidspunkt" bind:value={tEnd} required/>
</div>

<style lang="scss">
	@import '../../../../../../static/_variables';

	div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: $padding;
		
		@media only screen and (max-width: 1300px) {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
			row-gap: $padding-large;
		}
	}
</style>