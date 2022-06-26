<script lang="ts">
    // SMUI Components
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import LinearProgress from '@smui/linear-progress';

    // Variables
	export let scores: Score[];
	export let loaded: boolean;

    // Functions
    import { displayScore } from '$lib/displayScore';
</script>

<DataTable style="width: 100%; max-height: inherit;">
	<Head>
		<Row>
			<Cell>Nr.</Cell>
            <Cell style="width: 100%">Navn</Cell>
			<Cell>Score</Cell>
		</Row>
	</Head>

	<Body>
		{#each scores as score, i}
			<Row class={`score-${i}`}>
				<Cell style="font-size: 1.5rem">{i + 1}.</Cell>
				<Cell>{score.player_name}</Cell>
				<Cell>{displayScore(score.player_score)}m</Cell>
			</Row>
		{/each}
	</Body>
	<LinearProgress
		indeterminate
		bind:closed={loaded}
		aria-label="Data is being loaded..."
		slot="progress"
	/>
</DataTable>
