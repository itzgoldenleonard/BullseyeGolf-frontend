<script lang="ts">
	import { activeTournament } from '../../persistence/stores';
	import { displayScore } from '../../../../../scripts/displayScore';

	$: table = createTable($activeTournament);

	function calculateLargestHole(holes: Hole[]) {
		let longest: Number = 0;

		for (let hole of holes) {
			if (hole.scores.length > longest) {
				longest = hole.scores.length;
			}
		}

		return longest;
	}

	function createTable(tournament: Tournament) {
		if (tournament === null) return [];
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
		<h1>
			{$activeTournament.tournament_name}
		</h1>

		<div class="triplet">
			{#each $activeTournament.holes as hole}
				<table>
					<caption>
						<h2>Hul {hole.hole_number}</h2>
						<div>
							{#if hole.hole_sponsor}
								<p>Sponsor: {hole.hole_sponsor}</p>
							{/if}
							{#if hole.hole_text}
								<p>{hole.hole_text}</p>
							{/if}
						</div>
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
										{displayScore(hole.scores[i].player_score)}m
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

		.triplet {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 3mm;
			grid-template-rows: repeat(3, auto);
			row-gap: 10mm;

			table {
				table-layout: fixed;
				width: 100%;
				border-collapse: collapse;
				border: 1pt solid black;
				-webkit-print-color-adjust: exact; //:For Chrome
				color-adjust: exact; //:For Firefox

				caption {
					position: relative;
					h2 {
						text-align: left;
						font-size: 18pt;
						font-weight: 500;
						margin-top: 0;
						margin-bottom: 0.5rem;
					}
					div {
						position: absolute;
						width: 100%;
					}
					p {
						margin: 0;
						text-align: right;
						transform: translateY(-2.7rem);
					}
				}

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

				page-break-inside: avoid;
			}
		}

		@media only screen {
			display: none;
		}
	}

	@page {
		margin: 0;
		size: A4 portrait;
	}

	h1 {
		@media only screen {
			display: none;
		}
	}
</style>
