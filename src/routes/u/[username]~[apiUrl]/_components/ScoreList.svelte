<script lang="ts">
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import LinearProgress from '@smui/linear-progress';

	export let scores: Score[];
	export let loaded: boolean;
</script>

<DataTable style="width: 100%;">
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
				<Cell>{score.player_score}</Cell>
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

<style lang="scss">
	:global(.score-0) {
		//background: linear-gradient(137deg, hsl(50, 85%, 60%) 0%, 50%, hsl(45, 100%, 33%));
		background-image: linear-gradient(137deg, hsl(50, 85%, 60%) 0%, 50%, hsl(45, 100%, 33%));
		background-size: 100% 10px;
		background-position: 0 100%;
		background-repeat: no-repeat;
	}

	:global(.score-1) {
		//background: linear-gradient(142deg, hsl(225, 9%, 79%) 0%, 50%, hsl(225, 6%, 50%));
		background-image: linear-gradient(142deg, hsl(225, 9%, 79%) 0%, 50%, hsl(225, 6%, 50%));
		background-size: 100% 10px;
		background-position: 0 100%;
		background-repeat: no-repeat;
	}

	:global(.score-2) {
		//background: linear-gradient(150deg, hsl(25, 64%, 65%) 0%, 40%, hsl(20, 67%, 38%));
		background-image: linear-gradient(150deg, hsl(25, 64%, 65%) 0%, 40%, hsl(20, 67%, 38%));
		background-size: 100% 10px;
		background-position: 0 100%;
		background-repeat: no-repeat;
	}
</style>
