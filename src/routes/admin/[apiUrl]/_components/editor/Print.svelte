<script lang="ts">
	import { activeTournament } from '../../persistence/stores';

	//let table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	$: table = createTable($activeTournament);

	function calculateLargestHole(holes: Hole[]) {
		let longest: Number = 0;

		for (let hole of holes) {
			longest = hole.scores.length > longest ? hole.scores.length : longest;
		}

		return longest;
	}

	function createTable(tournament: Tournament) {
		if (tournament === null) return [0, 1, 2, 3, 4, 5, 6, 7, 8];
		let holes = tournament.holes;
		let largest = calculateLargestHole(holes);
		if (largest > 9) return [0, 1, 2, 3, 4, 5, 6, 7, 8];
		if (largest === 0) return [0];
		let table = [];
		for (let i = 0; i < largest; i++) {
			table.push(i);
		}
		return table;
	}
</script>

{#if $activeTournament !== null}
	<main>
		<div id="correct">
			<h1>
				{$activeTournament.tournament_name}
			</h1>

			<div class="triplet">
				{#each $activeTournament.holes as hole}
					<table>
						<caption>
							Hul {hole.hole_number}
						</caption>
						<thead>
							<tr>
								<th scope="col"> Navn: </th>
								<th scope="col"> Score: </th>
							</tr>
						</thead>
						<tbody>
							{#each table as i}
								{#if hole.scores.length > i}
									<tr>
										<td>
											{hole.scores[i].player_name}
										</td>
										<td>
											{hole.scores[i].player_score}m
										</td>
									</tr>
								{:else if hole.scores.length === 0 && i === 0}
									<tr><td colspan="2">Der er ingen scorer for dette hul</td></tr>
								{:else}
									<tr><td colspan="2" style="text-indent: -9999px;">|</td></tr>
								{/if}
							{/each}
						</tbody>
					</table>
				{/each}
			</div>
		</div>

		<h1 id="incorrect">For at printe skal du bruge stående A4 størrelse og slå marginer fra</h1>
	</main>
{:else}
	<h1>Du har ikke valgt nogen turnering</h1>
{/if}

<style lang="scss">
	main {
		position: absolute;
		top: 0;
		left: 0;
		padding: 12.5mm;
		width: 210mm;
		height: 297mm;
		background: white;
		color: black;
		font-size: 12pt;

		h1 {
			font-size: 24pt;
			font-weight: bold;
			margin-top: 0;
		}

		caption {
			text-align: left;
			font-size: 18pt;
			font-weight: 500;
			margin-top: 0;
			margin-bottom: 0.5rem;
		}

		.triplet {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-gap: 3mm;
			grid-template-rows: repeat(auto, 3);
			row-gap: 10mm;
		}

		table {
			table-layout: fixed;
			width: 100%;
			border-collapse: collapse;
			border: 1pt solid black;
			-webkit-print-color-adjust: exact; //:For Chrome
			color-adjust: exact; //:For Firefox

			th {
				width: 50%;
				text-align: left;
				background: hsl(0, 0%, 90%);
			}

			th,
			td {
				padding: 0.25rem;
				border: 1pt solid black;
			}

			tr:nth-child(even) {
				background-color: hsl(0, 0%, 95%);
			}
		}

		// logic
		#incorrect {
			display: none;
		}

		@media only screen {
			display: none;
		}

		@media only print and (max-width: 209mm),
			only print and (min-width: 211mm),
			only print and (orientation: landscape) {
			width: 100vw;
			#correct {
				display: none;
			}
			#incorrect {
				display: block;
			}
		}
	}

	h1 {
		@media only screen {
			display: none;
		}
	}
</style>
