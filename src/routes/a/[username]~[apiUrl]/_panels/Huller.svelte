<script lang="ts">
	import Textfield from '@smui/textfield';
	import Accordion, { Panel, Header, Content } from '@smui-extra/accordion';
	import Chip, { Set, Text } from '@smui/chips';
	import { onMount } from 'svelte';

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
		holes = [
			...holes,
			{
				hole_number: holeNumber,
				hole_text: '',
				hole_image: '',
				game_mode: '',
				hole_sponsor: '',
				scores: []
			}
		];
	}

	function removeHole(holeNumber: number) {
        let i: number = holes.findIndex((e) => e.hole_number == holeNumber);
        if (holes[i].scores.length !== 0) {
            alert('Du kan ikke fjerne et hul med scorer!');
            //selected = [...selected, String(holeNumber)];
            return;
        }

        holes = holes.filter((e) => e.hole_number !== holeNumber);
	}

	onMount(() => {
		for (let hole of holes) {
			selected.push(`${hole.hole_number}`);
		}
	});
</script>

{@debug selected}

<article>
	<h1>Vælg huller</h1>
	<Set chips={choices} let:chip filter bind:selected>
		<Chip {chip} touch on:click={() => chipClick(Number(chip))}>
			<Text>{chip}</Text>
		</Chip>
	</Set>

	<h1>Valgte huller</h1>
	<Accordion multiple>
		{#each holes as hole}
			<Panel>
				<Header>Hul {hole.hole_number}</Header>
				<Content>
					<div class="hide-file-ui">
						<Textfield variant="filled" bind:value={hole.hole_sponsor} label="Hul sponsor" />
						<Textfield variant="filled" bind:value={hole.hole_text} label="Hul tekst" />
						<Textfield variant="filled" value="" label="Hul billede" type="file" />
					</div>
				</Content>
			</Panel>
		{/each}
	</Accordion>

    <button on:click={() => selected = [...selected, String(5)]}>Add hole 5</button>
    <button on:click={() => selected = [...selected, String(6)]}>Add hole 6</button>
</article>

<style lang="scss">
	article {
		padding: 10px;
	}
</style>
