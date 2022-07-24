<script lang="ts">
	// Stores
	import { fabExited } from '../scripts/stores';
	// SMUI Components
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import Tooltip, { Wrapper } from '@smui/tooltip';
	// Variables
	export let scores: Score[];
	// Functions
	import { displayScore } from '$lib/displayScore';
	import { toLocaleTs } from '../scripts/timeConversion';

	function removeScore(index: number) {
		scores = scores.filter((e, i) => i !== index); // Removes the element at index and assigns to the array (to update the UI) at the same time
		$fabExited = false;
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
			<Wrapper>
				<Row>
					<Cell style="font-size: 1.5rem" class={`score-${i}`}>{i + 1}.</Cell>
					<Cell>{score.player_name}</Cell>
					<Cell>{displayScore(score.player_score)}m</Cell>
					<Cell checkbox
						><IconButton class="material-icons" on:click$preventDefault={() => removeScore(i)}
							>delete</IconButton
						></Cell
					>
				</Row>
				<Tooltip>{toLocaleTs(score.t)}</Tooltip>
			</Wrapper>
		{:else}
			<Row>
				<Cell colspan={4}>Der er ingen noteringer endnu</Cell>
			</Row>
		{/each}
	</Body>
</DataTable>
