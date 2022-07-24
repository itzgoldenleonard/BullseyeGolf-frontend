<script lang="ts">
	import { fabExited } from '../scripts/stores';
	import Accordion from '@smui-extra/accordion';
	import Chip, { Set, Text } from '@smui/chips';
	import { onMount } from 'svelte';

	import SingleHole from '../_components/SingleHole.svelte';

	// UI Variables
	let choices: string[] = [];
	for (let i = 1; i <= 18; i++) {
		choices.push(`${i}`);
	} // Immutable

	export let holes: Hole[];

	let selected: string[] = [];

	function chipClick(holeNumber: number) {
		if (selected.includes(String(holeNumber))) {
			removeHole(holeNumber);
		} else {
			addHole(holeNumber);
		}
	}

	function addHole(holeNumber: number) {
		holes.push({
			hole_number: holeNumber,
			hole_text: '',
			hole_image: '',
			game_mode: '',
			hole_sponsor: '',
			scores: []
		});
		holes = holes.sort((a, b) => a.hole_number - b.hole_number);
		$fabExited = false;
	}

	async function removeHole(holeNumber: number) {
		let i: number = holes.findIndex((e) => e.hole_number == holeNumber);
		if (holes[i].scores.length !== 0) {
			alert('Du kan ikke slette et hul med scorer!');
			await new Promise((r) => setTimeout(r, 0.5));
			selected = [...selected, String(holeNumber)];
			return;
		}

		holes = holes.filter((e) => e.hole_number !== holeNumber);
		$fabExited = false;
	}

	onMount(() => {
		for (let hole of holes) {
			selected.push(`${hole.hole_number}`);
		}
	});
</script>

<h1>Vælg huller</h1>
<Set chips={choices} let:chip filter bind:selected>
	<Chip {chip} touch on:click={() => chipClick(Number(chip))}>
		<Text>{chip}</Text>
	</Chip>
</Set>

<h1>Valgte huller</h1>
<Accordion>
	{#each holes as hole}
		<SingleHole bind:hole />
	{/each}
</Accordion>

<style lang="scss">
	article {
		overflow-x: hidden;
		overflow-y: auto;
		margin-bottom: 48px;
	}
</style>
