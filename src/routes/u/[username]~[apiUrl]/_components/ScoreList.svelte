<script lang="ts">
	// SMUI Components
	import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
	import LinearProgress from '@smui/linear-progress';
	// Variables
	export let hole: Promise<Hole>;
	export let loading: boolean;
	// Functions
	import { displayScore } from '$lib/displayScore';
	import { afterUpdate } from 'svelte';

	afterUpdate(() => {
		hole.then(() => {
			loading = true;
			console.log('changed');
		});
	});
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
		{#await hole then hole}
			{#each hole.scores as score, i}
				<Row>
					<Cell style="font-size: 1.5rem" class={`score-${i}`}>{i + 1}.</Cell>
					<Cell>{score.player_name}</Cell>
					<Cell>{displayScore(score.player_score)}m</Cell>
				</Row>
			{:else}
				<Row>
					<Cell colspan={3}>Der er ingen noteringer endnu</Cell>
				</Row>
			{/each}
		{:catch Error}
			<Row>
				<Cell colspan={3}>{Error}</Cell>
			</Row>
		{/await}
	</Body>

	<LinearProgress
		indeterminate
		bind:closed={loading}
		aria-label="Data is being loaded..."
		slot="progress"
	/>
</DataTable>
