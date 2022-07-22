<script lang="ts">
	// SMUI Components
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	// Variables
	export let scores: Score[];
	// Functions
	import { displayScore } from '$lib/displayScore';

	function removeScore(index: number) {
		scores = scores.filter((e, i) => i !== index); // Removes the element at index and assigns to the array (to update the UI) at the same time
	}
</script>

<DataTable style="width: 100%; max-height: inherit;">
	<Head>
		<Row>
			<Cell>Nr.</Cell>
			<Cell style="width: 100%">Navn</Cell>
			<Cell>Score</Cell>
			<Cell checkbox />
		</Row>
	</Head>

	<Body>
		{#each scores as score, i}
			<Row>
				<Cell style="font-size: 1.5rem" class={`score-${i}`}>{i + 1}.</Cell>
				<Cell>{score.player_name}</Cell>
				<Cell>{displayScore(score.player_score)}m</Cell>
				<Cell checkbox
					><IconButton class="material-icons" on:click={() => removeScore(i)}>delete</IconButton
					></Cell
				>
			</Row>
		{:else}
			<Row>
				<Cell colspan={4}>Der er ingen noteringer endnu</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>
